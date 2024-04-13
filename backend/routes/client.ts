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

router.put('/:clientId', async (req: Request, res: Response) => {
    const { name, email, phone, address } = req.body;

    const update = await prisma.client.update({
        where: {
            id: parseInt(req.params.clientId)
        },
        data: {
            name,
            email,
            phone,
            address
        }
    });

    res.json(update);
});

router.delete('/:clientId', async (req: Request, res: Response) => {

    const oldClient = await prisma.client.findUnique({
        where: {
            id: parseInt(req.params.clientId)
        }
    })

    if (!oldClient) {
        res.status(404).json({
            error: 'client not found'
        })
    }

    await prisma.client.delete({
        where: {
            id: parseInt(req.params.clientId)
        }
    })

    res.json({
        message: 'client deleted'
    })
})
