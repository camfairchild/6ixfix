import mongoose from 'mongoose';
import { Router } from 'express';
const router = new Router();

const log = console.log;

import mongoChecker from '../middleware/mongoose.js';

const Picture = mongoose.model('Picture');

router.get('/picture/:id', mongoChecker, async (req, res) => {
	const id = req.params.id
	if (!mongoose.isValidObjectId(id)) {
		res.status(404).json() // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	try {
		const pic = await Picture.findOne({_id: id}, {url:1, caption: 1}).lean()
		if (!pic) {
			return res.status(404).json('Resource not found')  // could not find this client
		} else {
			return res.json({
				url: pic.url,
				caption: pic.caption
			})
		}
	} catch(error) {
		log(error)
		res.status(500).json('Internal Server Error')  // server error
	}		
	
})

export default router;