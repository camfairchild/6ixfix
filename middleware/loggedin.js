import mongoose from 'mongoose';
const User = mongoose.model('User');

export default async (req, res, next) => {
    // check user exists
    if (!req.session.user) {
        console.log(req.session)
        res.status(401).send('Unauthorized');
        return;
    } else {
        const user = await User.findById(req.session.user);
        if (!user) {
            res.status(401).send('Unauthorized');
            return;
        }
        req.user = user; // store user in req for use in other middleware
        next();
    }  
}