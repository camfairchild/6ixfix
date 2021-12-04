import { Router } from 'express';
const router = new Router();
import mongoose from 'mongoose';

const Profile = mongoose.model('Profile')
const log = console.log;

import mongoChecker from '../../middleware/mongoose.js';

/// Route for getting all client profile information.
// GET /api/clients
router.get('/', mongoChecker, async (req, res) => {

	// Get all clients
	try {
		const profiles = await Profile.find(
            {userType: "Client"}
        )
		res.send(profiles) 
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}

})

/// Route for adding a car to a client.
/* 
Request body expects:
{
	carMake: <make>,
    carModel: <model>,
    carYear: <year>
}
*/
// Returned JSON has the updated client database 
//   document that the car was added to, AND the car subdocument:
//   { "car": <car subdocument>, "client": <entire client document>}
// POST /clients/id
router.post('/:id', mongoChecker, async (req, res) => {
	// Add code here

	const id = req.params.id

	// Good practise: Validate id immediately.
	if (!mongoose.isValidObjectId(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	try {
		const profile = await Profile.findById(id)
		if (!profile) {
			res.status(404).send('Resource not found')  // could not find this client
		} else if (profile.userType !== 'Client') {
            res.status(400).send("Bad Request: Not a client")
        } else {  
			const car = profile.cars.create({ 
				carMake: req.body.carMake,  
				carModel: req.body.carModel,
                carYear: req.body.carYear
			});
			profile.cars.push(car)
			try {
				await profile.save()
				res.send({
					"car": car, 
					"client": profile
				})
			} catch (error) {
				log(error)
				res.status(400).send('Bad Request')  // server error
			}
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}
})

/// Route for getting information for one car of a client (subdocument)
// GET /api/clients/id
router.get('/:id/:car_id', mongoChecker, async (req, res) => {
	// Add code here
	const id = req.params.id

	const cid = req.params.car_id

	// Good practise: Validate id immediately.
	if (!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(cid)) {
		res.status(404).send('Resource not found: Invalid id')  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	try {
		const profile = await Profile.findById(id)
		if (!profile) {
			res.status(404).send('Resource not found')  // could not find this profile
		} else if (profile.userType !== "Client") {
            res.status(400).send("Bad Request: Not a client") //this profile is not for a client so no cars
        } else {  
			const car = profile.cars.id(cid)
			if (!car) {
				res.status(404).send('Resource not found')  // could not find this car
			} else {
				res.send(car)
			}
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}


})

/// Route for deleting a car from a client
// Returned JSON should have the updated client database
//   document from which the car was deleted, AND the car subdocument deleted:
//   { "car": <car subdocument>, "client": <entire client document>}
// DELETE /api/clients/<client_id>/<car_id>
router.delete('/:id/:car_id', mongoChecker, async (req, res) => {
	// Add code here
	const id = req.params.id

	const cid = req.params.car_id

	// Good practise: Validate id immediately.
	if (!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(cid)) {
		res.status(404).send('Resource not found: Invalid id')  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	try {
		const profile = await Profile.findByIdAndUpdate(id, [
			{$pull: {
				cars: {
					_id: cid
				}
			}},
			{$set: { // check if defaultCar was this one, set to null if so
				defaultCar: {
					$cond : [
						{ $eq: [ "$defaultCar._id", cid ] },
						null,
						"$defaultCar"
					]
				}
			}
		}], {
			new: false
		}).catch(error => {
			log(error)
			return res.status(500).send('Internal Server Error')  // server error
		})

		if (!profile) {
			return res.status(404).send('Resource not found')  // could not find this profile
		} 
		return res.json({
			"car": profile.cars.id(cid),
		})
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}
})




/// Route for changing car information
/* 
Request body expects:
{
	carMake: <make>,
    carModel: <model>,
    carYear: <year>
}
*/
// Returned JSON should have the updated restaurant database
//   document in which the car was changed, AND the car subdocument changed:
//   { "car": <car subdocument>, "client": <entire car document>}
// PATCH restaurant/<client_id>/<car_id>
router.patch('/:id/:car_id', mongoChecker, async (req, res) => {
	// Add code here
	const id = req.params.id

	const cid = req.params.car_id

	// Good practise: Validate id immediately.
	if (!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(cid)) {
		res.status(404).send('Resource not found: Invalid id')  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	try {
		const profile = await Profile.findById(id)
		if (!profile) {
			res.status(404).send('Resource not found')  // could not find this client
		} else if (profile.userType !== "Client") {
            res.status(400).send("Bad Request: Not a client") //this profile is not for a client so no cars
        } else {  
			const car = profile.cars.id(cid)
			if (!car) {
				res.status(404).send('Resource not found')  // could not find this restaurant
			} else {
				car.carMake = req.body.carMake
				car.carModel = req.body.carModel
				car.carYear = req.body.carYear
				try {
					await profile.save()
					res.send({
						"car": car, 
						"client": profile
					})
				} catch (error) {
					log(error)
					res.status(500).send('Internal Server Error')  // server error
				}
			}
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}

})

/// Route for changing a car picture for a particular client
/* 
Request body expects:
{
	picture: <picture_url>,
    caption: <caption>, (optional)
}
*/
// Returned JSON has the updated client database 
//   document in which the picture was changed, AND the picture subdocument:
//   { "picture": <picture subdocument>, "client": <entire client document>}
// PATCH restaurant/<client_id>/<car_id>
router.patch('/pictures/:id/:pict_id', mongoChecker, async (req, res) => {
	// Add code here
	const id = req.params.id

	const pid = req.params.pict_id

	// Good practise: Validate id immediately.
	if (!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(pid)) {
		res.status(404).send('Resource not found: Invalid id')  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	try {
		const profile = await Profile.findById(id)
		if (!profile) {
			res.status(404).send('Resource not found')  // could not find this client
		} else if (profile.userType !== "Client") {
            res.status(400).send("Bad Request: Not a client") //this profile is not for a client so no cars
        } else {  
			const picture = profile.carPics.id(pid)
			if (!picture) {
				res.status(404).send('Resource not found')  // could not find this restaurant
			} else {
				picture.picture = req.body.picture 
				picture.caption = req.body.caption
				try {
					await profile.save()
					res.send({
						"picture": picture, 
						"client": profile
					})
				} catch (error) {
					log(error)
					res.status(500).send('Internal Server Error')  // server error
				}
			}
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}

})

export default router;