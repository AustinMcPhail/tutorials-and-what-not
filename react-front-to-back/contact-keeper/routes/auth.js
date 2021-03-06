const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, (req, res) => {
  res.json(req.user);
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Incorrect email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Incorrect email or password' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    let jwtSecret;
    if (process.env.NODE_ENV === 'production') {
      jwtSecret = process.env.JWT_SECRET;
    } else {
      jwtSecret = config.get('jwtSecret');
    }

    jwt.sign(payload, jwtSecret, {
      expiresIn: 360000,
    }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
