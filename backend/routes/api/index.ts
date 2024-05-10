import express from "express";
import userRouter from "./user";
import jobRouter from "./job";
import warrentyRouter from "./warrenty";

const router = express.Router();

router.use("/users", userRouter);
router.use("/jobs", jobRouter);
router.use("/warrenties", warrentyRouter);

module.exports = router;
