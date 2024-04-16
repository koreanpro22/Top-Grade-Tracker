import express, { Request, Response } from "express";
import {db} from '../src/utils/db.server'

const router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
  const { name, email, password, profilePicture, role, phone } = req.body;

  const theUser = await db.user.create({
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
  const users = await db.user.findMany()

  res.json(users)
})

router.get('/:userId', async (req: Request, res: Response) => {
  const theUser = await db.user.findUnique({
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

  const update = await db.user.update({
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

  const oldUser = await db.user.findUnique({
    where: {
      id: parseInt(req.params.userId)
    }
  })

  if(!oldUser){
    res.status(404).json({
      error: 'user not found'
    })
  }

  await db.user.delete({
    where: {
      id: parseInt(req.params.userId)
    }
  })

  res.json({
    message: 'user deleted'
  })
})
module.exports = router
