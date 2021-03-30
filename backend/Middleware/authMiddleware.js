import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
  //   console.log(req.headers.authorization);
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // console.log('token', req.headers.authorization);
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // console.log(decoded);
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('not authorized , token failed ')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not Authorized , no token')
  }
  //   next();
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin ')
  }
}

export { protect, admin }
