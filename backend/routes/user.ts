const express = require("express");
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router();

router.post('/', async (req: object, res: object) => {
    const { name, email, password, profilePicture, role, phone } = req.body;

  const user = await prisma.post.create({
    data: { name, email, password, profilePicture, role, phone }
  })

  res.json(user)

})