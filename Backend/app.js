const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require(`express-mongo-sanitize`)
const xss = require('xss-clean')
const hpp = require('hpp')
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const cors = require('cors');

const app = express()

//Gloabl middlewares

app.use(helmet())

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(cors());

//Limit req from same API
app.options('*', cors());


const limiter = rateLimit({
    max:100,
    windowMs:60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
})

app.use('/api',limiter)

//Body parser,reading data from body into req.body
app.use(express.json({limit:'10kb'}))
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.get('/api/v1/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.all('*',(req,res,next)=>{
    next(new AppError(`Cant't find ${req.originalUrl}on this server!`,404))
})
app.use(globalErrorHandler);
module.exports = app