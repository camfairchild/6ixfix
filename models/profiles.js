/* Student mongoose model */
import mongoose from 'mongoose'
import validator from 'validator'

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
        mimetype: String,
        size: Number,
        data: Buffer
    },
    caption: {
        type: String,
        trim: true
    }
})

const ProfileSchema = new mongoose.Schema({
	fullName: {
		type: String,
		minlength: 1,
		trim: true,
        default: null
	},
	userType: {
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
		minlength: 1,
		trim: true,
        default: null
    },
    picture: {
        type: String,
        default: null
    },
    link: {
        type: String,
        required: true,
        default: null
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
        trim: true,
        default: null
    },
    bannerImage: {
        type: String,
        default: null
    },
    cars: {
        type: [CarSchema],
        default: null
    },
    defaultCar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CarSchema',
        default: null
    },
    serviceRequested: {
        type: String,
        trim: true,
        minlength: 1,
        default: null
    },
    mechType: {
        type: String,
        enum: ['Dealer', 'Private', null],
        default: null
    },
    certified: {
        type: Boolean,
        default: null
    },
    rate: {
        type: String,
        trim: true,
        default: null
    },
    numViews: {
        type: Number,
        default: 0
    },
    carPics:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Picture',
        default: null
    }

})

ProfileSchema.index({ fullName: "text", bio: "text", serviceRequested: "text", email: "text", userName: "text", location: "text" }); // text index for search
const Profile = mongoose.model('Profile', ProfileSchema);
export default Profile;