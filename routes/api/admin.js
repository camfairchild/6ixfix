import mongoose from 'mongoose';
import { Router } from 'express';
const router = new Router();

const log = console.log;

import mongoChecker from '../../middleware/mongoose.js';
import isLoggedIn from '../../middleware/loggedin.js'

const Profile = mongoose.model('Profile');
const User = mongoose.model('User');

router.get('/', mongoChecker, isLoggedIn, async (req, res) => {
    const user_id = req.user
    try {
    const user = await User.findById(user_id).lean()
    const profile = await Profile.findOne({ userName: user.userName }).lean()
    const isAdmin = (profile.userType === 'Admin')
    
    } catch (error) {
      console.log(error)
      res.status(500).json({ error })
    }
})

export default router;
