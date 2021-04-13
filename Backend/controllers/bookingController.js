const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.createBooking = catchAsync(async (req, res, next) => {

  const {paymentMethod,tour } = req.body
  // 1) Get the currently booked tour
  const tourDetails = await Tour.findById(tour);
  
  
  if (!tourDetails){
    res.status(400)
    throw new Error('No order items')
    
  } else {
    const booking = new Booking({
      user:req.user._id,
      tour,
      paymentMethod,
      price:tourDetails.price
    })

    const createdBooking = await booking.save()
    res.status(201).json(createdBooking)
  }

});

exports.getBokingById = catchAsync(async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (booking) {
    res.json(booking)
  } else {
    res.status(404)
    throw new Error('Booking not found')
  }
})


exports.updateBookingToPaid = catchAsync(async (req, res) => {
  const booking = await Booking.findById(req.params.id)

  if (booking) {
    booking.isPaid = true
    booking.paidAt = Date.now()
    booking.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedBooking = await booking.save()

    res.json(updatedBooking)
  } else {
    res.status(404)
    throw new Error('Booking not found')
  }
})

exports.getMyBookings = catchAsync(async (req, res) => {
  const booking = await Booking.find({ user: req.user._id })
  res.json(booking)
})


exports.getBookings = catchAsync(async (req, res) => {
  const bookings = await Booking.find({}).populate('user', 'id name')
  res.json(bookings)
})





