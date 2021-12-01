import mongoose from 'mongoose';
import validator from 'validator'
import bcrypt from 'bcrypt';
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,   // custom validator
			message: 'Not valid email'
		}
    }
});


const hashPassword = async (password) => {
    return await bcrypt.hash(password, saltRounds);
}

UserSchema.pre('save', async function(next) {
    console.log("pre-save")
    if (this.isModified('password')) {
        console.log('hash password')
        this.password = await hashPassword(this.password);
    }
    next();
});

const User = mongoose.model('User', UserSchema);
export default User;
