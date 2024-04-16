import express from "express";
import userRouter from './user';
import clientRouter from './client';
import jobRouter from './job';
import warrentyRouter from './warrenty';

const router = express.Router();

router.use('/users', userRouter);
router.use('/clients', clientRouter);
router.use('/jobs', jobRouter);
router.use('/warrenties', warrentyRouter);

// if (process.env.NODE_ENV === "production") {

// }

export default router;
