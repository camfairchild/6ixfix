 const user_id = req.user
    try {
    const user = await User.findById(user_id).lean()
    const profile = await Profile.findOne({ userName: user.userName }).lean()
    const isAdmin = (profile.userType === 'Admin')
    
    } catch (error) {
      console.log(error)
      res.status(500).json({ error })
    }

