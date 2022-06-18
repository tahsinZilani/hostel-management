const express = require('express');

const { studentLogin, studentSignup, hostelBook } = require('../controllers/student/studentController');

const router = express.Router();

router.post('/login', studentLogin);
router.post('/signUp', studentSignup);
router.post('/bookHostel', hostelBook);


module.exports = router;