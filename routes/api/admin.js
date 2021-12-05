import mongoose from 'mongoose';
import { Router } from 'express';
const router = new Router();

const log = console.log;

import mongoChecker from '../../middleware/mongoose.js';
import isLoggedIn from '../../middleware/loggedin.js'
import isAdmin from '../../middleware/isAdmin.js'

const Profile = mongoose.model('Profile');
const User = mongoose.model('User');

router.use(isAdmin) // checks session first to check if admin user

// example route
//router.get('/', mongoChecker, async (req, res) => {
//   
//})

/// a DELETE route to remove a profile by their id.
/// Checks if user is logged in and is an admin
/// Return JSON is the profile document that was deleted
router.delete('/profiles/:id', mongoChecker, async (req, res) => {
	const id = req.params.id

	// Validate id
	if (!mongoose.isValidObjectId(id)) {
		res.status(400).json({
            error: 'Invalid User ID'
        }) 
		return;
	}

	// Delete a profile by their id
	try {
        log('Deleting profile with id: ' + id)
        log('Admin: ' + req.user)
		const profile = await Profile.findByIdAndRemove(id)
		if (!profile) {
			res.status(404).json({
                error: 'Resource not found'
            }) // could not find this profile
		} else {   
			res.send(profile)
		}
	} catch(error) {
		log(error)
		res.status(500).json({
            error: 'Server Error'
        }) // server error, could not delete.
	}
})

export default router;
