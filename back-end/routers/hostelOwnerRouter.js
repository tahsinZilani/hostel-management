const express = require('express');

const { hostelOwnerLogin, hostelOwnerSignup, statusUpdate } = require('../controllers/hostelOwner/hostelOwnerController');

const router = express.Router();

router.post('/login', hostelOwnerLogin);
router.post('/signUp', hostelOwnerSignup);
router.patch('/statusUpdate/:id',statusUpdate);

module.exports = router;