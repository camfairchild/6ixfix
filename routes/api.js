import mongoose from 'mongoose';
import { Router } from 'express';
const router = new Router();

const log = console.log;

import profilesRouter from './api/profiles.js';
import clientsRouter from './api/clients.js';
import messagesRouter from './api/messages.js';
import authRouter from './api/auth.js';
import adminRouter from './api/admin.js';

import mongoChecker from '../middleware/mongoose.js';
import isLoggedIn from '../middleware/loggedin.js'

import { upload_image } from '../api/picture.js'

const Profile = mongoose.model('Profile');
const User = mongoose.model('User');
const HelpForm = mongoose.model('HelpForm');

router.use('/profiles', profilesRouter);
router.use('/clients', clientsRouter);
router.use('/messages', messagesRouter);
router.use('/auth', authRouter)
router.use('/admin', adminRouter);


/// Route for getting all mechanic profile information.
// GET /api/mechanics
router.get('/mechanics', mongoChecker, async (req, res) => {

	// Get the restaurants
	try {
		const profiles = await Profile.find(
			{ userType: "Mechanic" }
		)
		res.send(profiles)
	} catch (error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}

})

router.post('/help', mongoChecker, async (req, res) => {
	const {uName, email, message} = req.body
	try {
		const form = await HelpForm.create({
			name: uName,
			email: email,
			message: message
		})
		res.json(form)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			error, 
			message: 'Help form did not get submitted correctly'
		})
	}
})

/// Route for adding a car picture to a client's pictures.
/* 
Request body expects:
{
	picture: <image file>,
	caption: <caption>, (optional)
}
*/
// Returned JSON has the updated client database 
//   document that the picture was added to, AND the picture subdocument:
//   { "picture": <picture subdocument>, "client": <entire client document>}
// POST /clients/id
router.post('/clientPictures/', mongoChecker, isLoggedIn, async (req, res) => {
	const user_id = req.user._id
	const profile = await Profile.findOne({ userName: req.user.userName })
	const id = profile?._id

	// Good practise: Validate id immediately.
	if (!mongoose.isValidObjectId(id)) {
		res.status(404).json({
			error: "Invalid Id"
		}) // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	if (!req.files || !req.files.picture) {
		res.status(400).json({
			error: "Must include a picture to upload"
		})
	}
	try {
		const profile = await Profile.findById(id)
		if (!profile) {
			res.status(404).json('Resource not found')  // could not find this client
		} else if (profile.userType !== 'Client') {
			res.status(400).json("Bad Request: Not a client")
		} else {
			const picture = await upload_image(req.files.picture, req.body.caption)

			profile.carPics.push(picture._id)
			try {
				await profile.save()
				res.json({
					"picture": picture,
					"client": await profile.populate('carPics')
				})
			} catch (error) {
				throw error
			}
		}
	} catch (error) {
		log(error)
		res.status(500).json('Internal Server Error')  // server error
	}
})

router.post('/profilePic/', mongoChecker, isLoggedIn, async (req, res) => {
	const user_id = req.user
	const profile = (await Profile.findOne({ userName: req.user.userName }))

	if (!req.files || !req.files.picture) {
		res.status(400).json({
			error: "Must include a picture to upload"
		})
	}

	try {
		if (!profile) {
			res.status(404).json('Resource not found')  // could not find this client
		} else {
			const picture = await upload_image(req.files.picture, '')

			profile.picture = picture.url
			try {
				await profile.save()
				res.json({
					"picture": picture,
					"client": profile
				})
			} catch (error) {
				throw error
			}
		}
	} catch (error) {
		log(error)
		res.status(500).json('Internal Server Error')  // server error
	}
})

router.get('/profile', mongoChecker, isLoggedIn, async (req, res) => {
	try {
		const user = await User.findById(req.user);
		const profile = await Profile.findOne({ userName: user.userName })
		res.json(profile)
	} catch (error) {
		res.status(500).json({
			message: 'Server error',
			error
		})
	}
})

router.get('/user/:id', mongoChecker, isLoggedIn, async (req, res) => {
	try {
		const user = await User.findById(req.user);
		const profile = await Profile.findOne({ userName: user.userName })
		res.json(profile)
	} catch (error) {
		res.status(500).json({
			message: 'Server error',
			error
		})
	}
})

router.get('/search', mongoChecker, async (req, res) => {
	try {
		const query = req.query.query
		const filter = req.query
		delete filter.query
		delete filter.fields
		for (let key in filter) {
			filter[key] = (filter[key] === 'true')
		}

		console.log(query, filter)
		const userName = req.session?.userName
		const profile = await Profile.findOne({ userName: userName })
		let profiles = []
		if (filter !== {}) {
			let filter_ = {}
			let options = {}
			let sort = { userName: 1 }
			if (query) {
				filter_['$text'] = { $search: req.query.query }
				options = {score: { $meta: "textScore" }}
				sort = { score: { $meta: "textScore" } }
			}
			if (filter.hourly) {
				filter_.rate = { $regex: /\/hr|\/hour|\/h$/ }
			} else if (filter.perJob) {
				filter_.rate = { $regex: /\/job|\$[0-9]*$/ }
			}
			if (filter.certified) {
				filter_.certified = true
			}
			if (filter.profilePicture) {
				filter_.picture = { $ne: null }
			}
			if (filter.dealer) {
				filter_.mechType =  'Dealer' 
			} else if (filter.private) {
				filter_.mechType = 'Private'
			}
			if (filter.oilChange) {
				// case insensitive regex
				filter_.serviceRequested = { $regex: / ?oil( ||-)change ?/m, $options: 'i' }
			}
			// TODO: location
			//if (filter.within50km) {
			//
			//}
			// TODO: route for adding dyanmic filters
			//if (!profile && profile.userType === 'Mechanic') {
			//	filter_.userType = 'Client'
			//}
			console.log(filter_)
			profiles = await Profile.find(
				{ _id: { $ne: profile?._id }, ...filter_ },
				options,
			).sort(sort)
			console.log(profiles)
		} else {
			profiles = await Profile.find(
				{ $text: { $search: req.query.query || "" }, _id: { $ne: profile?._id } },
				{ score: { $meta: "textScore" } },
			).sort({ score: { $meta: "textScore" } })
		}
		res.json(profiles)
	} catch (error) {
		console.error(error)
		res.status(500).json({
			message: 'Server error',
			error
		})
	}
})

router.get('/search/filterOptions', mongoChecker, async (req, res) => {
	try {
		let profile;
		if (req.session.user) {
			const userName = req.session.userName
			profile = await Profile.findOne({ userName: userName })
		}
		switch (profile?.userType || "") {
			case 'Mechanic':
				res.json({
					oilChange: false,
					profilePicture: false,
					fields: [
						{ name: "oilChange", label: "Oil Change" },
						{ name: "profilePicture", label: "Has Profile Picture" },
					]
				})
				break
			default:
				res.json({
					hourly: false,
					perJob: false,
					certified: false,
					profilePicture: false,
					//within50km: false,
					dealer: false,
					private: false,
					fields: [
						{ name: "hourly", label: "Charge Hourly" },
						{ name: "perJob", label: "Charge Per Job" },
						{ name: "certified", label: "Certified" },
						{ name: "profilePicture", label: "Has Profile Picture" },
						//{name: "within50km", label: "Located within 50km"},
						{ name: "dealer", label: "Dealer Mechanic" },
						{ name: "private", label: "Private Mechanic" },
					]
				})
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({
			message: 'Server error',
			error
		})
	}

})

export default router;
