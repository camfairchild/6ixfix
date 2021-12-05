import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
const User = mongoose.model("User");
const Profile = mongoose.model('Profile')
import { Router } from 'express';
import _ from 'lodash';

const router = new Router();

const log = console.log;

router.put('/logout', (req,res) => {
    req.session.destroy();
    res.json({
        success: true
    })
});

//login route
router.post('/login', async (req, res) => {
    const { userName, password } = req.body
    if (!userName || !password ) {
        return res.status(400).json({
            error: 'Please provide a userName and password'
        })
    }
    const user = await User.findOne({ userName }).lean()
    const goodLogin = user && await bcrypt.compare(password, user?.password)
    if (goodLogin) {
        req.session.user = user._id;
        req.session.username = user.userName;
        const profile = await Profile.findOne({userName: user.userName }).lean()
        return res.json({
            user: {
                userName: user.userName,
                _id: user._id
            },
            profile,
            message: 'Authenticated'
        })
    } else {
        return res.status(401).json({
            error: 'Incorrect userName or password'
        })
    }
})

//signup route
router.post('/signup', async (req, res) => {
    const { userName, password, confirmPassword, type, email } = req.body
    if (!userName || !password ) {
        return res.status(400).json({
            error: 'Please provide a userName, password, email, and type'
        })
    } else if (password !== confirmPassword) {
        return res.status(400).json({
            error: 'Password must match password confirmation'
        })
    }
    
    // don't check for dev environment
    if (process.env.NODE_ENV !== "development") {
        if (password.length < 8) {
            return res.status(400).json({
                error: 'Password length must be at least 8 characters long'
            })
        }

        // dont let people create Admin accounts through the signup form
        if (type === 'Admin') {
            return res.status(403).json({
                error: 'Admin account is not allowed'
            })
        }
    }
    try {
        const user = await User.count({ $or: [
            {
                userName
            },
            {
                email
            }
        ]})
        if (user > 0) {
            return res.status(400).json({
                error: 'Username or email is taken! Please provide a different userName'
            })
        }
        const newUser = new User({
            userName,
            password,
            email
        })
        await newUser.save()
        
        let profile = await Profile.findOne({userName: userName})
        if (!profile) {
            profile = await Profile.create({
                userName,
                email,
                type,
                link: `/profile/${userName}`
            })
        }

        req.session.user = newUser._id;
        req.session.username = newUser.userName;
        delete newUser.password // delete password from response
        return res.json({
            user_id: newUser._id,
            user: profile,
            message: 'Account created'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error occurred during signup',
            error
        })
    }
    
})

export default router;
