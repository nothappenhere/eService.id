import express from 'express'
const router = express.Router()

import {
  loginUser,
  registerUser,
  getCurrentUser,
  // checkEmailExist,
  // resetPasswordUser,
} from '../controllers/usersController.js'
import {
  validateLogin,
  validateRegister,
  // checkEmail,
  // validateResetPassword,
} from '../middlewares/authValidation.js'
import { authenticateToken } from '../middlewares/authMiddleware.js'

//* POST user register
// Route untuk registrasi pengguna dengan validasi input
router.post('/auth/register/:role', validateRegister, registerUser)

//* POST user login
// Route untuk login pengguna dengan validasi input
router.post('/auth/login', validateLogin, loginUser)

//* GET user info
// Route untuk mendapatkan info user yang sedang login
router.get('/auth/me', authenticateToken, getCurrentUser)

export default router
