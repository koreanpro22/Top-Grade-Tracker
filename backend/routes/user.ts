import express, { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
  const { name, email, password, profilePicture, role, phone } = req.body;

  const theUser = await prisma.user.create({
    data: {
      name,
      email,
      password,
      profilePicture,
      role,
      phone
    }
  });

  res.json(theUser);
});

router.get('/getall', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany()

  res.json(users)
})

router.get('/:userId', async (req: Request, res: Response) => {
  const theUser = await prisma.user.findUnique({
    where: {
      id: parseInt(req.params.userId)
    }
  });

  if (!theUser) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json(theUser);
});

router.put('/:userId', async (req: Request, res: Response) => {
  const { name, email, password, profilePicture, role, phone } = req.body;

  const update = await prisma.user.update({
    where: {
      id: parseInt(req.params.userId)
    },
    data: {
      name,
      email,
      password,
      profilePicture,
      role,
      phone
    }
  });

  res.json(update);
});

router.delete('/:userId', async (req: Request, res: Response) => {

  const oldUser = await prisma.user.findUnique({
    where: {
      id: parseInt(req.params.userId)
    }
  })

  if(!oldUser){
    res.status(404).json({
      error: 'user not found'
    })
  }

  await prisma.user.delete({
    where: {
      id: parseInt(req.params.userId)
    }
  })

  res.json({
    message: 'user deleted'
  })
})

module.exports = router
