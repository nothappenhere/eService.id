import express from 'express'
const router = express.Router()

import {
  loginUser,
  registerUser,
  getCurrentUser,
  checkEmailExist,
  resetPasswordUser,
} from '../controllers/authController.js'
import {
  validateLogin,
  validateRegister,
  validateResetPassword,
} from '../middlewares/authValidation.js'
import { authenticateToken } from '../middlewares/authMiddleware.js'

//* POST user register
//? Route untuk registrasi pengguna
router.post('/auth/register/:role', validateRegister, registerUser)

//* POST user login
//? Route untuk login pengguna
router.post('/auth/login', validateLogin, loginUser)

//* POST Check email existence
//? Route untuk memeriksa apakah email sudah terdaftar
router.post('/auth/check-email', checkEmailExist)

//* POST reset password
//? Route untuk reset password
router.post('/auth/reset-password', validateResetPassword, resetPasswordUser)

//* GET user info
//? Route untuk mendapatkan info user yang sedang login
router.get('/auth/me', authenticateToken, getCurrentUser)

export default router
