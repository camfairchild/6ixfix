/* Student mongoose model */
const mongoose = require('mongoose')
const validator = require('validator')

const CarSchema = new mongoose.Schema({
    carMake: {
        type: String,
        required: true,
        trim: true
    },
    carModel: {
        type: String,
        required: true,
        trim: true
    },
    carYear: {
        type: Number,
        required: true
    }
})

const CarPictureSchema = new mongoose.Schema({
    picture: {
        type: String,
    },
    caption: {
        type: String,
        trim: true
    }
})

const ProfileSchema = mongoose.Schema({
	fullName: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	type: {
		type: String,
		required: true,
        enum: ['Client', 'Mechanic', 'Admin'],
        default: 'Client'
	},
    userName: {
        type: String,
		required: true,
		minlength: 1,
		trim: true
    },
    location: {
        type: String,
		required: true,
		minlength: 1,
		trim: true
    },
    picture: {
        type: String,
        required: false,
        default: null
    },
    link: {
        type: String,
        required: true
    },
    email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,   // custom validator
			message: 'Not valid email'
		}
	},
    bio: {
        type: String,
        required: true,
        trim: true
    },
    bannerImage: {
        type: String,
        required: false,
        default: null
    },
    cars: {
        type: [CarSchema],
        required: false,
        default: null
    },
    defaultCar: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'CarSchema',
        default: null
    },
    serviceRequested: {
        type: String,
        required: false,
        trim: true,
        minlength: 1,
        default: null
    },
    mechType: {
        type: String,
        required: false,
        enum: ['Dealer', 'Private', null],
        default: null
    },
    certified: {
        type: Boolean,
        required: false,
        default: null
    },
    rate: {
        type: String,
        required: false,
        trim: true,
        default: null
    },
    numViews: {
        type: Number,
        required: true,
        default: 0
    },
    carPics:  {
        type: [CarPictureSchema],
        required: false,
        default: null
    }

})

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = { Profile }