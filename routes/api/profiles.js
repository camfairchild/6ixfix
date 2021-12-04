import { Router } from 'express';
const router = new Router();

const log = console.log

import mongoChecker from '../../middleware/mongoose.js';
import isLoggedIn from '../../middleware/loggedin.js';
import mongoose from 'mongoose';
const Profile = mongoose.model('Profile')
const Picture = mongoose.model('Picture')

/*** Profile API Routes below ************************************/
// The '/api' indicates that this is a route for a data resource API (in this case, a JSON API).

/** Profile resource routes **/
// a POST route to *create* a Profile
router.post('/', mongoChecker, async (req, res) => {
	// log(req.body)
	let bannerImage;
	let picture;

	if (req.files?.bannerImage) {
		bannerImage = new Picture({
			picture: {
				data: req.files.bannerImage.data,
				mimetype: req.files.bannerImage.mimetype,
			},
		})
	}
	if (req.files?.picture) {
		picture = new Picture({
			picture: {
				data: req.files.picture.data,
				mimetype: req.files.picture.mimetype,
			},
		})
	}
	// Create a new Profile using the Profile mongoose model
	const profile = new Profile({
		fullName: req.body.fullName,
        userType: req.body.userType,
        userName: req.body.userName,
        location: req.body.location,
        picture: picture,
        link: `/profile/${req.body.userName}`,
        email: req.body.email,
        bio: req.body.bio,
        bannerImage: bannerImage,
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
router.get('/', mongoChecker, async (req, res) => {

	// Get the restaurants
	try {
		const profiles = await Profile.find()
		res.send(profiles) 
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}

})


/// Route for getting information for one profile by userName.
// GET /api/profiles/:userName
router.get('/:userName', mongoChecker, isLoggedIn, async (req, res) => {
	const { userName } = req.params

	if (!userName) {
		return res.status(400).json({
			error: 'Missing userName param'
		})
	}
	// If id valid, findById
	try {
		const profile = await Profile.findOne({ userName })
		if (!profile) {
			res.status(404).json({
				error: 'Resource not found'
			})
		} else {  
			res.json(profile)
		}
	} catch(error) {
		log(error)
		res.status(500).json({
			error: 'Internal Server Error'
		})  // server error
	}

})

/// a DELETE route to remove a profile by their id.
/// Return JSON is the profile document that was deleted
router.delete('/:id', mongoChecker, async (req, res) => {
	const id = req.params.id

	// Validate id
	if (!mongoose.isValidObjectId(id)) {
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
router.patch('/:id', mongoChecker, async (req, res) => {
	const id = req.params.id

	if (!mongoose.isValidObjectId(id)) {
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

export default router;