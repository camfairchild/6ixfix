import express from 'express';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();

import mongoChecker from '../../middleware/mongoose.js';
import isLoggedIn from '../../middleware/loggedin.js';

const Message = mongoose.model('Message');
const User = mongoose.model('User');


router.get('/recent', mongoChecker, isLoggedIn, async (req, res) => {
    const user = req.user; // logged in user
    try {
        console.log("checking messages for: " + user.userName);
        const messages = await Message.aggregate([
            {
                $match: {
                    $or: [
                        {
                            to: user._id,
                        },
                        {
                            from: user._id,
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'from',
                    foreignField: '_id',
                    as: 'from',
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'to',
                    foreignField: '_id',
                    as: 'to',
                }
            },
            {
                $project: {
                    from: {
                        $arrayElemAt: ['$from', 0]
                    },
                    to: {
                        $arrayElemAt: ['$to', 0]
                    },
                    message: 1,
                    time_: 1,
                }
            },
            {
                $project: {
                    otherUser: {
                        $cond: {
                            if: {
                                $eq: ['$from.userName', user.userName ]
                            },
                            then: '$to.userName',
                            else: '$from.userName'
                        }
                    },
                    message: 1,
                    time_: 1,
                    from: 1,
                    to: 1,
                }
            },
            {
                $project: {
                    from: {
                        password: 0,
                        __v: 0,
                    },
                    to: {
                        password: 0,
                        __v: 0,
                    },
                }
            },
            {
                $sort: {
                    time_: -1
                }
            },
            {
                $group: {
                    _id: '$otherUser',
                    messages: {
                        $push: '$$ROOT'
                    }
                }
            },

            {
                $project: {
                    'messages.otherUser': 0,
                }
             },
             {
                $project: {
                    'messages': { $slice: ['$messages', 1] },
                    _id: 1,
                }
            },
            {
                $group: {
                  "_id": "$_id",
                  "d": {
                    $push: {
                      "k": "$_id",
                      "v": "$messages"
                    }
                  }
                }
              },
              {
                "$replaceRoot": {
                  "newRoot": {
                    "$mergeObjects": [
                      {
                        "$arrayToObject": "$d"
                      }
                    ]
                  }
                }
             },
        ]);
        const allMsg = messages.reduce((acc, curr) => {
            const user_ = Object.keys(curr)[0]
            acc[user_] = curr[user_]
            return acc;
        }, {})
        return res.json(allMsg);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
})

router.get('/contacts', mongoChecker, isLoggedIn, async (req, res) => {
    const user = req.user;
    try {
        const contacts = await Message.aggregate([
            {
                $match: {
                    $or: [
                        {
                            to: user._id,
                        },
                        {
                            from: user._id,
                        }
                    ]
                }
            },
            {
                $project: {
                    otherUser: {
                        $cond: {
                            if: {
                                $eq: ['$from', user._id ]
                            },
                            then: '$to',
                            else: '$from'
                        }
                    },
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'otherUser',
                    foreignField: '_id',
                    as: 'otherUser',
                }
            },
            {
                $project: {
                    otherUser: {
                        $arrayElemAt: ['$otherUser', 0]
                    },
                }
            },
            {
                $lookup: {
                    from: 'profiles',
                    localField: 'otherUser.userName',
                    foreignField: 'userName',
                    as: 'otherUser',
                }
            },
            {
                $project: {
                    otherUser: {
                        $arrayElemAt: ['$otherUser', 0]
                    },
                }
            },
            {
                $group: {
                  _id: '',
                  users: {
                    $addToSet: '$otherUser'
                  }
                }
              },
              {
                $unwind: '$users',
                
              },
              {
                $replaceRoot: {
                  newRoot: '$users'
                }
              }
        ])

        return res.json(contacts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
})

// GET /api/messages/
// Route for getting all messages for the loggedin user.
router.get('/', mongoChecker, isLoggedIn, async (req, res) => {
    const user = req.user; // logged in user
    try {
        console.log("checking messages for: " + user.userName);
        const messages = await Message.aggregate([
            {
                $match: {
                    $or: [
                        {
                            to: user._id,
                        },
                        {
                            from: user._id,
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'from',
                    foreignField: '_id',
                    as: 'from',
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'to',
                    foreignField: '_id',
                    as: 'to',
                }
            },
            {
                $project: {
                    from: {
                        $arrayElemAt: ['$from', 0]
                    },
                    to: {
                        $arrayElemAt: ['$to', 0]
                    },
                    message: 1,
                    time_: 1,
                }
            },
            {
                $project: {
                    otherUser: {
                        $cond: {
                            if: {
                                $eq: ['$from.userName', user.userName ]
                            },
                            then: '$to.userName',
                            else: '$from.userName'
                        }
                    },
                    message: 1,
                    time_: 1,
                    from: 1,
                    to: 1,
                }
            },
            {
                $project: {
                    from: {
                        password: 0,
                        __v: 0,
                    },
                    to: {
                        password: 0,
                        __v: 0,
                    },
                }
            },
            {
                $sort: {
                    time_: -1
                }
            },
            {
                $group: {
                    _id: '$otherUser',
                    messages: {
                        $push: '$$ROOT'
                    }
                }
            },

            {
                $project: {
                    'messages.otherUser': 0,
                }
             },
            {
                $group: {
                  "_id": "$_id",
                  "d": {
                    $push: {
                      "k": "$_id",
                      "v": "$messages"
                    }
                  }
                }
              },
              {
                "$replaceRoot": {
                  "newRoot": {
                    "$mergeObjects": [
                      {
                        "$arrayToObject": "$d"
                      }
                    ]
                  }
                }
             },
        ]);
        const allMsg = messages.reduce((acc, curr) => {
            const user_ = Object.keys(curr)[0]
            acc[user_] = curr[user_]
            return acc;
        }, {})
        return res.json(allMsg);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

// GET /api/messages/
// Route for getting all messages for the loggedin user.
router.get('/:checkTime', mongoChecker, isLoggedIn, async (req, res) => {
    const user = req.user; // logged in user
    let { checkTime } = req.params;
    if (isNaN(checkTime)) {
        return res.status(400).json({
            error: "Invalid time",
            timeStamp: checkTime
        });
    }
    checkTime = new Date(parseInt(checkTime)).toISOString()
    try {

        const messages = await Message.find({
            $or: [
                {
                    to: user._id,
                },
                {
                    from: user._id,
                }
            ],
            time_: {
                $gte: checkTime
            }
        })
        .populate('from', '-__v -password').populate('to', '-__v -password'); // populate the user objects


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
router.post('/', mongoChecker, isLoggedIn, async (req, res) => {
    const user = req.user
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }
    try {
        let otherUser;
        console.log(user, message)
        if (message.from === user.userName && message.to !== user.userName) {
            otherUser = message.to;
        } else {
            // cant send to yourself
            return res.status(400).json({ error: 'Invalid message' });
        }

        const user_ = await User.findOne({ userName: otherUser });
        if (!user_) {
            return res.status(404).json({ error: 'User does not exist' });
        }
        const id = user_._id;

        let msg = await Message.create({
            from: user._id,
            to: id,
            message: message.message,
        })
        msg = await Message.populate(msg, { path: 'from', select: '-__v -password' });
        msg = await msg.populate('to', '-__v -password')
        return res.json(msg);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

export default router;