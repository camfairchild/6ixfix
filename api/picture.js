import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

const Picture = mongoose.model('Picture');

export async function upload_image(image, caption) {
	if (!image) {
		throw "Image is null"
	}
	try {
		// Use uploader.upload API to upload image to cloudinary server.
		//console.log(image)
		const result = await cloudinary.uploader.upload(
			image.tempFilePath // takes a base64 string
		); // req.files contains uploaded files
		const picture = await Picture.create({ 
			url: result.url,
			public_id: result.public_id,
			caption: caption,
		});
		return picture
	} catch (error) {
		console.error(error)
		throw "Error saving picture to cloudinary"
	}
}