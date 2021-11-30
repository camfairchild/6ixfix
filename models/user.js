import mongoose from 'mongoose';
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
});

const User = mongoose.model('User', UserSchema);
export default User;

hashPassword = (password) => {
    return bcrypt.hash(password, saltRounds);
}

User.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = this.hashPassword(this.password);
    }
    next();
});