import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();

import mongoChecker from '../../middleware/mongoose.js';

const Message = mongoose.model('Message');
const User = mongoose.model('User');

// GET /api/messages/:userName/
// Route for getting all messages between the loggedin user and the user with the userName in the url.
router.get('/:userName/', mongoChecker, async (req, res) => {
    const { userName } = req.params;
    const { user } = req.session; // logged in user
    if (!user) {
        return res.redirect('/login');
    }
    try {
        const otherUser = await User.findOne({ userName });
        if (!otherUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const messages = await Message.find({
            $or: [
                {
                    to: user._id,
                    from: otherUser._id
                },
                {
                    to: otherUser._id,
                    from: user._id,
                }
            ]
        })
        .populate('from').populate('to'); // populate the user objects
        return res.json(messages);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

// GET /api/messages/
// Route for getting all messages for the loggedin user.
router.get('/', mongoChecker, async (req, res) => {
    const { user } = req.session; // logged in user
    if (!user) {
        return res.redirect('/login');
    }
    try {

        const messages = await Message.find({
            $or: [
                {
                    to: user._id,
                },
                {
                    from: user._id,
                }
            ]
        })
        .populate('from').populate('to'); // populate the user objects

        return res.json(messages);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

// POST /api/messages/
// Route to send message to user with id in the url.
router.post('/', mongoChecker, async (req, res) => {
    const { user } = req.session; // logged in user
    if (!user) {
        return res.redirect('/login');
    }
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }
    try {
        let otherUser;
        if (message.from === user.userName && message.to !== user.userName) {
            otherUser = message.from;
        } else {
            // cant send to yourself
            return res.status(400).json({ error: 'Invalid message' });
        }

        const user = await User.findOne({ userName: otherUser });
        if (!user) {
            return res.status(404).json({ error: 'User does not exist' });
        }
        const id = user._id;

        const msg = new Message({
            from: user._id,
            to: id,
            message,
        });
        await msg.save();
        return res.json(msg);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

export default router;