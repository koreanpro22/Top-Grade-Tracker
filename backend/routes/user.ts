const express = require("express");
import { db } from '../src/utils/db.server';

const router = express.Router();

router.post('/', async (req: object, res: object) => {
    const { name, email, password, profilePicture, role, phone } = req.body;

  const user = await db.user.create({
    data: { name, email, password, profilePicture, role, phone }
  })


})