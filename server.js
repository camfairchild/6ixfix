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
const { ObjectId } = require('mongodb')

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser'); 
const { mongo } = require('mongoose');
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
        profile.rate = req.body.rate
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

/// Route for getting all profile information.
// GET /api/profiles
app.get('/api/profiles', mongoChecker, async (req, res) => {

	// Get the restaurants
	try {
		const profiles = await Profile.find()
		res.send(profiles) 
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}

})


/// Route for getting information for one profile.
// GET /api/profiles/id
app.get('/api/profiles/:id', mongoChecker, async (req, res) => {
	// Add code here

	const id = req.params.id

	// Good practise: Validate id immediately.
	if (!ObjectId.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	// If id valid, findById
	try {
		const profile = await Profile.findById(id)
		if (!profile) {
			res.status(404).send('Resource not found')  // could not find this restaurant
		} else {  
			res.send(profile)
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}

})

/// Route for getting all client profile information.
// GET /api/clients
app.get('/api/clients', mongoChecker, async (req, res) => {

	// Get the restaurants
	try {
		const profiles = await Profile.find(
            {type: "Client"}
        )
		res.send(profiles) 
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}

})

/// Route for getting all mechanic profile information.
// GET /api/mechanics
app.get('/api/mechanics', mongoChecker, async (req, res) => {

	// Get the restaurants
	try {
		const profiles = await Profile.find(
            {type: "Mechanic"}
        )
		res.send(profiles) 
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}

})

/// Route for adding a car to a client.
/* 
Request body expects:
{
	carMake: <make>,
    carModel: <model>,
    carYear: <year>
}
*/
// Returned JSON has the updated client database 
//   document that the car was added to, AND the car subdocument:
//   { "car": <car subdocument>, "client": <entire client document>}
// POST /clients/id
app.post('/api/clients/:id', mongoChecker, async (req, res) => {
	// Add code here

	const id = req.params.id

	// Good practise: Validate id immediately.
	if (!ObjectId.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	try {
		const profile = await Profile.findById(id)
		if (!profile) {
			res.status(404).send('Resource not found')  // could not find this client
		} else if (profile.type !== 'Client') {
            res.status(400).send("Bad Request: Not a client")
        } else {  
			const car = profile.cars.create({ 
				carMake: req.body.carMake,  
				carModel: req.body.carModel,
                carYear: req.body.carYear
			});
			profile.cars.push(car)
			try {
				await profile.save()
				res.send({
					"car": car, 
					"client": profile
				})
			} catch (error) {
				log(error)
				res.status(400).send('Bad Request')  // server error
			}
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}
})

/// Route for adding a car picture to a client's pictures.
/* 
Request body expects:
{
	picture: <picture_url>,
    caption: <caption>, (optional)
}
*/
// Returned JSON has the updated client database 
//   document that the picture was added to, AND the picture subdocument:
//   { "picture": <picture subdocument>, "client": <entire client document>}
// POST /clients/id
app.post('/api/clientPictures/:id', mongoChecker, async (req, res) => {
	// Add code here

	const id = req.params.id

	// Good practise: Validate id immediately.
	if (!ObjectId.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	try {
		const profile = await Profile.findById(id)
		if (!profile) {
			res.status(404).send('Resource not found')  // could not find this client
		} else if (profile.type !== 'Client') {
            res.status(400).send("Bad Request: Not a client")
        } else {  
			const picture = profile.carPics.create({ 
				picture: req.body.picture,  
				caption: req.body.caption,
			});
			profile.carPics.push(picture)
			try {
				await profile.save()
				res.send({
					"picture": picture, 
					"client": profile
				})
			} catch (error) {
				log(error)
				res.status(400).send('Bad Request')  // server error
			}
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}
})


/// Route for getting information for one car of a client (subdocument)
// GET /api/clients/id
app.get('/api/clients/:id/:car_id', mongoChecker, async (req, res) => {
	// Add code here
	const id = req.params.id

	const cid = req.params.car_id

	// Good practise: Validate id immediately.
	if (!ObjectId.isValid(id) || !ObjectId.isValid(cid)) {
		res.status(404).send('Resource not found: Invalid id')  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	try {
		const profile = await Profile.findById(id)
		if (!profile) {
			res.status(404).send('Resource not found')  // could not find this profile
		} else if (profile.type !== "Client") {
            res.status(400).send("Bad Request: Not a client") //this profile is not for a client so no cars
        } else {  
			const car = profile.cars.id(cid)
			if (!car) {
				res.status(404).send('Resource not found')  // could not find this car
			} else {
				res.send(car)
			}
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}


})

/// Route for deleting a car from a client
// Returned JSON should have the updated client database
//   document from which the car was deleted, AND the car subdocument deleted:
//   { "car": <car subdocument>, "client": <entire client document>}
// DELETE /api/clients/<client_id>/<car_id>
app.delete('/api/clients/:id/:car_id', mongoChecker, async (req, res) => {
	// Add code here
	const id = req.params.id

	const cid = req.params.car_id

	// Good practise: Validate id immediately.
	if (!ObjectId.isValid(id) || !ObjectId.isValid(cid)) {
		res.status(404).send('Resource not found: Invalid id')  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	try {
		const profile = await Profile.findByIdAndUpdate(id, [
			{$pull: {
				cars: {
					_id: cid
				}
			}},
			{$set: { // check if defaultCar was this one, set to null if so
				defaultCar: {
					$cond : [
						{ $eq: [ "$defaultCar._id", cid ] },
						null,
						"$defaultCar"
					]
				}
			}
		}], {
			new: false
		}).catch(error => {
			log(error)
			return res.status(500).send('Internal Server Error')  // server error
		})

		if (!profile) {
			return res.status(404).send('Resource not found')  // could not find this profile
		} 
		return res.json({
			"car": profile.cars.id(cid),
		})
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}
})

/// a DELETE route to remove a profile by their id.
/// Return JSON is the profile document that was deleted
app.delete('/api/profiles/:id', mongoChecker, async (req, res) => {
	const id = req.params.id

	// Validate id
	if (!ObjectId.isValid(id)) {
		res.status(404).send('Resource not found') 
		return;
	}

	// Delete a profile by their id
	try {
		const profile = await Profile.findByIdAndRemove(id)
		if (!profile) {
			res.status(404).send() // could not find this profile
		} else {   
			res.send(profile)
		}
	} catch(error) {
		log(error)
		res.status(500).send() // server error, could not delete.
	}
})


/// Route for changing car information
/* 
Request body expects:
{
	carMake: <make>,
    carModel: <model>,
    carYear: <year>
}
*/
// Returned JSON should have the updated restaurant database
//   document in which the car was changed, AND the car subdocument changed:
//   { "car": <car subdocument>, "client": <entire car document>}
// PATCH restaurant/<client_id>/<car_id>
app.patch('/api/clients/:id/:car_id', mongoChecker, async (req, res) => {
	// Add code here
	const id = req.params.id

	const cid = req.params.car_id

	// Good practise: Validate id immediately.
	if (!ObjectId.isValid(id) || !ObjectId.isValid(cid)) {
		res.status(404).send('Resource not found: Invalid id')  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	try {
		const profile = await Profile.findById(id)
		if (!profile) {
			res.status(404).send('Resource not found')  // could not find this client
		} else if (profile.type !== "Client") {
            res.status(400).send("Bad Request: Not a client") //this profile is not for a client so no cars
        } else {  
			const car = profile.cars.id(cid)
			if (!car) {
				res.status(404).send('Resource not found')  // could not find this restaurant
			} else {
				car.carMake = req.body.carMake
				car.carModel = req.body.carModel
				car.carYear = req.body.carYear
				try {
					await profile.save()
					res.send({
						"car": car, 
						"client": profile
					})
				} catch (error) {
					log(error)
					res.status(500).send('Internal Server Error')  // server error
				}
			}
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}

})

/// Route for changing a car picture for a particular client
/* 
Request body expects:
{
	picture: <picture_url>,
    caption: <caption>, (optional)
}
*/
// Returned JSON has the updated client database 
//   document in which the picture was changed, AND the picture subdocument:
//   { "picture": <picture subdocument>, "client": <entire client document>}
// PATCH restaurant/<client_id>/<car_id>
app.patch('/api/clients/pictures/:id/:pict_id', mongoChecker, async (req, res) => {
	// Add code here
	const id = req.params.id

	const pid = req.params.pict_id

	// Good practise: Validate id immediately.
	if (!ObjectId.isValid(id) || !ObjectId.isValid(pid)) {
		res.status(404).send('Resource not found: Invalid id')  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	try {
		const profile = await Profile.findById(id)
		if (!profile) {
			res.status(404).send('Resource not found')  // could not find this client
		} else if (profile.type !== "Client") {
            res.status(400).send("Bad Request: Not a client") //this profile is not for a client so no cars
        } else {  
			const picture = profile.carPics.id(pid)
			if (!picture) {
				res.status(404).send('Resource not found')  // could not find this restaurant
			} else {
				picture.picture = req.body.picture 
				picture.caption = req.body.caption
				try {
					await profile.save()
					res.send({
						"picture": picture, 
						"client": profile
					})
				} catch (error) {
					log(error)
					res.status(500).send('Internal Server Error')  // server error
				}
			}
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}

})

/// a PATCH route for making *specific* changes to a profile.
// The body will be an array that consists of a list of changes to make to the
//  resource:
/*
[
  { "op": "replace", "path": "/serviceRequested", "value": "brake maintenance" },
  { "op": "replace", "path": "/fullName", "value": "Ryan Dragic" },
  ...
]
*/
// Based on standard specifcation: https://tools.ietf.org/html/rfc6902#section-3
//   - there are other ways to modify resources (adding, removing properties), but here we will
//     just deal with replacements since our schema is fixed.
app.patch('/api/profiles/:id', mongoChecker, async (req, res) => {
	const id = req.params.id

	if (!ObjectId.isValid(id)) {
		res.status(404).send()
		return;  // so that we don't run the rest of the handler.
	}


	// Find the fields to update and their values.
	const fieldsToUpdate = {}
	req.body.map((change) => {
		const propertyToChange = change.path.substr(1) // getting rid of the '/' character
		fieldsToUpdate[propertyToChange] = change.value
	})

	// Update the student by their id.
	try {
		const profile = await Profile.findOneAndUpdate({_id: id}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false})
		if (!profile) {
			res.status(404).send('Resource not found')
		} else {   
			res.send(profile)
		}
	} catch (error) {
		log(error)
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
	}
})

/*************************************************/

/*************************************************/


/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "/client/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    const goodPageRoutes = [
		"/", "/search", "/dashboard",
		"/help", "/about", "/profile",
		"/login", "/signup", "/admin",
		"/messages"
	];
    if (!goodPageRoutes.includes(req.url)) {
        // if url not in expected page routes, set status to 404.
        res.status(404);
    }

    // send index.html
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

/*************************************************/


// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
}) 
