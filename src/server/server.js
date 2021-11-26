/* server.js, with mongodb API */
'use strict';
const log = console.log
const path = require('path')

const express = require('express')
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require('./db/mongoose')
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected - minimizes http requests hanging if this is the case.

// import the mongoose models
const { Profile } = require('./models/profiles')

// to validate object IDs
const { ObjectID } = require('mongodb')

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser') 
app.use(bodyParser.json())

/*** Helper functions below **********************************/
function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

/*** Middleware: */
// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    } else {
        next()  
    }   
}

/*** Profile API Routes below ************************************/
// The '/api' indicates that this is a route for a data resource API (in this case, a JSON API).

/** Profile resource routes **/
// a POST route to *create* a Profile
app.post('/api/profiles', mongoChecker, async (req, res) => {
	// log(req.body)

	// Create a new Profile using the Profile mongoose model
	const profile = new Profile({
		fullName: req.body.fullName,
        type: req.body.type,
        userName: req.body.userName,
        location: req.body.location,
        picture: req.body.picture,
        link: `/profile/${req.body.userName}`,
        email: req.body.email,
        bio: req.body.bio,
        bannerImage: req.body.bannerImage,
        numViews: 0,
        cars: null,
        serviceRequested: null,
        carPics: null,
        mechType: null,
        certified: null,
        rate: null
	})

    if (req.body.type === 'Client') {
        profile.cars = []
        const car = profile.cars.create({
            carMake: req.body.carMake,
            carModel: req.body.carModel,
            carYear: req.body.carYear
        })
        profile.cars.push(car)
        profile.serviceRequested = req.body.serviceRequested
        profile.carPics = []
        profile.defaultCar = car._id
    }
    if (req.body.type === 'Mechanic') {
        profile.mechType = req.body.mechType
        profile.certified = req.body.certified,
        profile.certified = req.body.rate
    }


	try {
		const result = await profile.save()	
		res.send(result)
	} catch(error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}

})

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
}) 
