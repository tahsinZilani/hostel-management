const express = require('express');

const { getHostels, deleteHostel, addHostel, editHostel, getHostel, getHostelBooking, getHostelsAdminDashboard } = require('../controllers/hostelController');

const router = express.Router();

router.get('/', getHostels);
router.get('/adminGetHostels', getHostelsAdminDashboard);
router.get('/:name', getHostel);
// router.get('/:name/:approved', getPendingHostel);
router.get('/getBookingRequest/:name/:mode', getHostelBooking);
router.delete('/:id', deleteHostel);
router.post('/addHostel',addHostel)
router.patch('/:id',editHostel);
module.exports = router;