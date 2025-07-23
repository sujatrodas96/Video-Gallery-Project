const express = require('express');
const authrouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const auth = require('../Middleware/auth');
const { registerUser, loginUser, logoutUser } = require('../controllers/User');

//register a new user
authrouter.post('/register', registerUser);

//login an existing user
authrouter.post('/login', loginUser);

//get user profile
authrouter.post('/logout', auth, logoutUser);

module.exports = authrouter;