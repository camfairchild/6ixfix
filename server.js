/* server.js, with mongodb API */
const log = console.log
import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// mongoose and mongo connection

// to validate object IDs
import mongoose from 'mongoose';
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected - minimizes http requests hanging if this is the case.
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://affan:csc309project@cluster0.hc477.mongodb.net/6ixFixAPI'
const db = mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true})

// import the mongoose models
import Profile from './models/profiles.js'
import Picture from './models/picture.js'
import apiRouter from './routes/api.js'

// express json: middleware for parsing HTTP JSON body into a usable object
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({
	limits: { 
        fileSize: 2 * 1024 * 1024 * 1024 //2MB max file size
    },
}))

/*** Helper functions below **********************************/
function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

app.use('/api', apiRouter)

/*************************************************/

/*************************************************/


/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "/client/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    const goodPageRoutes = [
		"/", "/search", "/dashboard",
		"/help", "/about", "/profile",
		"/login", "/signup", "/admin",
		"/messages"
	];
    if (!goodPageRoutes.includes(req.url)) {
        // if url not in expected page routes, set status to 404.
        res.status(404);
    }

    // send index.html
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

/*************************************************/

// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
	mongoose.connection.on('connected', () => {
		log(`Mongoose connected to ${mongoURI}`)
	})

	mongoose.connection.on('error', (error) => {
		if (isMongoError(error)) {
			console.log(error)
           	console.log('Error connecting to mongodb. Timeout reached.') 
		}
	})
	
	log(`Listening on port ${port}...`)
}) 

export default app