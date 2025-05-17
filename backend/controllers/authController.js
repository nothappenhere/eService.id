import db from '../config/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

/**
 * @desc Register a new user with the specified role
 * @route POST /api/auth/register/:role
 */
export const registerUser = async (req, res, next) => {
  const { role } = req.params
  const { full_name, email, password } = req.body

  try {
    // Periksa apakah email sudah terdaftar
    const [existingUser] = await db
      .promise()
      .query('SELECT email FROM users WHERE email = ?', [email])

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email is already registered.' })
    }

    // Hash password sebelum disimpan ke database
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Simpan user baru ke database
    const [result] = await db
      .promise()
      .query('INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)', [
        full_name,
        email,
        hashedPassword,
        role,
      ])

    res.status(201).json({
      message: 'User registered successfully.',
      user_id: result.insertId,
    })
  } catch (error) {
    console.error('Registration error:', error)
    next(error)
  }
}

/**
 * @desc Login user based on their role
 * @route POST /api/auth/login
 */
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body

  try {
    // Query user berdasarkan email
    const [rows] = await db.promise().query(
      `SELECT users.*, companies.company_id
        FROM users
        LEFT JOIN companies ON users.user_id = companies.user_id
        WHERE users.email = ?`,
      [email],
    )

    if (rows.length === 0) {
      return res.status(401).json({
        error: 'Invalid credentials, please check your email or password.',
      })
    }

    const user = rows[0]

    // Periksa kecocokan password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({
        error: 'Invalid credentials, please check your email or password.',
      })
    }

    // Generate token JWT
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    )

    res.status(200).json({
      message: 'Login successful.',
      token,
      data: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        company_id: user.company_id || null,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    next(error)
  }
}

/**
 * @desc Login user based on their role
 * @route POST /auth/me
 */
export const getCurrentUser = async (req, res) => {
  try {
    const { userId } = req.user

    const [rows] = await db
      .promise()
      .query('SELECT user_id, full_name, email, role FROM users WHERE user_id = ?', [userId])

    if (rows.length === 0) return res.status(404).json({ error: 'User not found.' })

    res.status(200).json({ user: rows[0] })
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user.' })
  }
}
