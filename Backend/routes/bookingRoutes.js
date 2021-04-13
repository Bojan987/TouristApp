const express = require('express');
const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');


const router = express.Router();

router.use(authController.protect);

router.route('/').post(bookingController.createBooking)

router.route('/mybookings').get(bookingController.getMyBookings)
router.route('/:id').get(bookingController.getBokingById)
router.route('/:id/pay').put(bookingController.updateBookingToPaid)




router.use(authController.restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .get(bookingController.getBookings)


module.exports = router;