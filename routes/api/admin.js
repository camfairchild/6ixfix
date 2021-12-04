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
router.get('/', mongoChecker, async (req, res) => {
   
})

export default router;
