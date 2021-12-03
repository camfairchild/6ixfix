import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
const User = mongoose.model("User");
const Profile = mongoose.model('Profile')
import { Router } from 'express';
import _ from 'lodash';

const router = new Router();

const log = console.log;

router.get('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/login');
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
    const goodLogin = await bcrypt.compare(password, user?.password)
    if (goodLogin) {
        req.session.user = user._id;
        req.session.username = user.userName;
        res.json({
            user,
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
    } else if (password.length < 8) {
        return res.status(400).json({
            error: 'Password length must be at least 8 characters long'
        })
    } else if (password !== confirmPassword) {
        return res.status(400).json({
            error: 'Password must match password confirmation'
        })
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
                error: 'Username is taken! Please provide a different userName'
            })
        }
        const newUser = new User({
            userName,
            password,
            email
        })
        await newUser.save()
        await Profile.create({
            userName,
            email,
            type,
            link: `/profile/${userName}`
        })

        req.session.user = newUser._id;

        return res.json({
            user: _.omit(newUser, 'password'),
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