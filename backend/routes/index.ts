const express = require("express");
const router = express.Router();
const userRouter = require('./user')
const clientRouter = require('./client')
const jobRouter = require('./job')
const warrentyRouter = require('./warrenty')

router.use('/users', userRouter);
router.use('/clients', clientRouter);
router.use('/jobs', jobRouter);
router.use('/warrenties', warrentyRouter);

// if (process.env.NODE_ENV === "production") {

// }
