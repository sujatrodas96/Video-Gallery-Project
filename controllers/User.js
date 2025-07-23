const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { success, error } = require('../utils/responseHandler');

async function registerUser(req, res) {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    return success(res, 'User registered successfully', { username });
    //res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    return error(res, 'Registration failed', err.message);
    //res.status(400).json({ error: err.message });
  }
}

async function loginUser(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1 * 60 * 60 * 1000 // 1 Hr
    });
    res.status(200).json({message: 'Login successful' });
    return success(res, 'Login successful');
  } catch (err) {
    return error(res, 'Login failed', err.message);
    res.status(500).json({ error: err.message });
  }
}

async function logoutUser(req, res) {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  return success(res, 'Logged out successfully');
  //res.status(200).json({ message: 'Logged out successfully' });
}

module.exports = {
  registerUser,
    loginUser,
    logoutUser
};
