/*** Middleware: */
// mongoose and mongo connection
import mongoose from 'mongoose'

// middleware for mongo connection error for routes that need it
export default function mongoChecker(req, res, next) {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        console.log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    } else {
        next()  
    }   
}