import express, { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();


router.post('/create', async (req: Request, res: Response) => {
    const { name, email, phone, address } = req.body;

    const theClient = await prisma.client.create({
        data: {
            name,
            email,
            phone,
            address
        }
    });

    res.json(theClient);
});

router.get('/getall', async (req: Request, res: Response) => {
    const clients = await prisma.client.findMany()

    res.json(clients)
})

router.get('/:clientId', async (req: Request, res: Response) => {
    const theClient = await prisma.client.findUnique({
        where: {
            id: parseInt(req.params.clientId)
        }
    });

    if (!theClient) {
        res.status(404).json({ error: 'User not found' });
        return;
    }

    res.json(theClient);
});
