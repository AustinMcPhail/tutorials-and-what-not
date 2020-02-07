const express = require('express');

const router = express.Router();

// @route   POST api/contacts
// @desc    Get all user's contacts
// @access  Private
router.get('/', (req, res) => {
  res.send('All User contacts');
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Public
router.post('/', (req, res) => {
  res.send('Add new contact');
});

// @route   POST api/contacts/:id
// @desc    Update a contact
// @access  Public
router.put('/:contactId', (req, res) => {
  res.send('Update contact');
});

// @route   POST api/contacts/:id
// @desc    Delete a contact
// @access  Public
router.delete('/:contactId', (req, res) => {
  res.send('Register a user');
});

module.exports = router;
