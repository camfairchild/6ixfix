import { Router } from 'express';
const router = new Router();

const log = console.log

import mongoChecker from '../../middleware/mongoose.js';
import isLoggedIn from '../../middleware/loggedin.js';
import isAdmin from '../../middleware/isAdmin.js'
import mongoose from 'mongoose';

const Profile = mongoose.model('Profile');

router.get('/', mongoChecker, async (req, res) => {
	try {
		const query = req.query.query
		const filter = req.query
		delete filter.query
		delete filter.fields
		for (let key in filter) {
			filter[key] = (filter[key] === 'true')
		}

		const userName = req.session?.userName
		const profile = await Profile.findOne({ userName: userName })
		let profiles = []
		if (filter !== {}) {
			let filter_ = {}
			let options = {}
			let sort = { userName: 1 }
			if (query) {
				filter_['$text'] = { $search: query }
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
				filter_.mechType = { $in: ['Dealer', null]}
			} else if (filter.private) {
				filter_.mechType = { $in: ['Private', null]}
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
		} else {
			profiles = await Profile.find(
				{ $text: { $search: query || "" }, _id: { $ne: profile?._id } },
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

router.get('/filterOptions', mongoChecker, async (req, res) => {
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