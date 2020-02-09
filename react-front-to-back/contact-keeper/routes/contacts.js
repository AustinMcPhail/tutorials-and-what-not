const express = require('express');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Contact = require('../models/Contact');

const router = express.Router();

// @route   POST api/contacts
// @desc    Get all user's contacts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Public
router.post('/', [auth, [
  check('name', 'Name is required').notEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, phone, type } = req.body;
  try {
    const newContact = new Contact({ user: req.user.id, name, email, phone, type })
    const contact = await newContact.save();

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST api/contacts/:id
// @desc    Update a contact
// @access  Public
router.put('/:contactId', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  try {
    let contact = await Contact.findById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Access denied' })
    }

    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    contact = await Contact.findByIdAndUpdate(req.params.contactId,
      { $set: contactFields },
      { new: true} );
    
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST api/contacts/:id
// @desc    Delete a contact
// @access  Public
router.delete('/:contactId', auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.contactId);
    if (req.user.id !== contact.user.toString()) {
      return res.status(401).json({ msg: 'Access denied' });
    }
    await contact.delete()
    res.status(204).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
