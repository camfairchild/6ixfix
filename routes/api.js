import mongoose from 'mongoose';
import { Router } from 'express';
const router = new Router();

const log = console.log;

import profilesRouter from './api/profiles.js';
import clientsRouter from './api/clients.js';
import messagesRouter from './api/messages.js';

import mongoChecker from '../middleware/mongoose.js';

const Profile = mongoose.model('Profile');

router.use('/profiles', profilesRouter);
router.use('/clients', clientsRouter);
router.use('/messages', messagesRouter);

/// Route for getting all mechanic profile information.
// GET /api/mechanics
router.get('/mechanics', mongoChecker, async (req, res) => {

	// Get the restaurants
	try {
		const profiles = await Profile.find(
            {type: "Mechanic"}
        )
		res.send(profiles) 
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}

})



/// Route for adding a car picture to a client's pictures.
/* 
Request body expects:
{
	picture: <image file>,
    caption: <caption>, (optional)
}
*/
// Returned JSON has the updated client database 
//   document that the picture was added to, AND the picture subdocument:
//   { "picture": <picture subdocument>, "client": <entire client document>}
// POST /clients/id
router.post('/clientPictures/:id', mongoChecker, async (req, res) => {
	// Add code here

	const id = req.params.id

	// Good practise: Validate id immediately.
	if (!mongoose.isValidObjectId(id)) {
		res.status(404).json() // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	try {
		const profile = await Profile.findById(id)
		if (!profile) {
			res.status(404).json('Resource not found')  // could not find this client
		} else if (profile.type !== 'Client') {
            res.status(400).json("Bad Request: Not a client")
        } else if (!req.files) {
            res.status(400).json("Bad Request: No files were uploaded")
        } else {  
			const picture = profile.carPics.create({ 
				picture: {
                    data: req.files.picture.data,
                    size: req.files.picture.size,
                    mimetype: req.files.picture.mimetype
                },
				caption: req.body.caption,
			});
			profile.carPics.push(picture)
			try {
				await profile.save()
				res.json({
					"picture": picture, 
					"client": profile
				})
			} catch (error) {
				log(error)
				res.status(400).json('Bad Request')  // server error
			}
		}
	} catch(error) {
		log(error)
		res.status(500).json('Internal Server Error')  // server error
	}
})

router.get('/picture/:id', mongoChecker, async (req, res) => {
	const id = req.params.id
	if (!mongoose.isValidObjectId(id)) {
		res.status(404).json() // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	try {
		const pic = Picture.findById(id)
		if (!pic) {
			return res.status(404).json('Resource not found')  // could not find this client
		} else {
			res.set('Content-Type', pic.picture.mimetype)
			res.end(pic.picture.data, 'binary')
		}
	} catch(error) {
		log(error)
		res.status(500).json('Internal Server Error')  // server error
	}		
	
})

export default router;