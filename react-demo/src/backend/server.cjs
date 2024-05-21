const express = require('express')
const bcrypt = require('bcrypt')
var cors = require('cors')
const jwt = require('jsonwebtoken')
var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync('./db.json')
var db = low(adapter)

// Initialize Express app
const app = express()

// Define a JWT secret key. This should be isolated by using env variables for security
const jwtSecretKey = 'dsfdsfsdfdsvcsvdfgefg'

// Set up CORS and JSON middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Basic home route for the API
app.get('/', (_req, res) => {
  res.send('Auth API.\nPlease use POST /auth for authentication')
})

// The auth endpoint logs a user based on an existing record
app.post('/auth', (req, res) => {
  const { username, password } = req.body

  // Look up the user entry in the database
  const user = db
    .get('users')
    .value()
    .filter((user) => username === user.name)

  // If found, compare the hashed passwords and generate the JWT token for the user
  if (user.length === 1) {
    if (password !== user[0].password) {
        return res.status(401).json({ message: 'Invalid password' })
    } else {
        console.log('Login successful')
        let loginData = {
          username,
          signInTime: Date.now(),
        }

        const token = jwt.sign(loginData, jwtSecretKey)
        res.status(200).json({ message: 'success', token })
    }
    // no user is found
  } else if (user.length === 0) {
    console.log('Invalid username')
    return res.status(401).json({ status: 'invalid username', message: 'error' })
  }
})


app.listen(3080)
//print
console.log('Server running on http://localhost:3080')