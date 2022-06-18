const express = require('express');

const { adminLogin, adminSignup, adminHostelApproval } = require('../controllers/admin/adminController');

const router = express.Router();

router.post('/login', adminLogin);
router.post('/signUp', adminSignup);
router.patch('/approval/:id/:mode', adminHostelApproval);

module.exports = router;