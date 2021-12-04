const User = mongoose.model('User');
const Profile = mongoose.model('Profile');

export default async function isAdmin(req, res, next) {
  const user_id = req.user
    try {
     const user = await User.findById(user_id).lean()
     const profile = await Profile.findOne({ userName: user.userName }).lean()
     const isAdmin = ()
     if (profile.userType === 'Admin') {
      next();
     } else {
      return res.status(401).json({ message: "Not admin"})
     }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error })
    }
}
