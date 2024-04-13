import express, { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
    const { jobId, duration } = req.body;


    const warrenty = await prisma.warrenty.create({
        data: {
            duration,
            jobId
        }
    });

    res.json(warrenty);
});

router.post('/getall', async (req: Request, res: Response) => {

    let warrentys = prisma.warrenty.findMany()

    res.json(warrentys)
})

router.post('/:warrentyId', async (req: Request, res: Response) => {

    const warrenty = prisma.warrenty.findUnique({
        where: {
            id: parseInt(req.params.warrentyId)
        }
    })

    if (!warrenty) {
        res.status(404).json({
            error: 'warrenty not found'
        })
    }

    res.json(warrenty)
})

router.put('/:warrentyId', async (req: Request, res: Response) => {

    const { jobId, duration } = req.body;

    const update = prisma.warrenty.findUnique({
        where: {
            id: parseInt(req.params.warrentyId)
        }
    })

    if (!update) {
        res.status(404).json({
            error: 'warrenty not found'
        })
    }

    const updated = await prisma.warrenty.update({
        where: {
            id: parseInt(req.params.warrentyId)
        },
        data: {
            duration,
            jobId
        }
    })

    res.json(updated)
})

router.delete('/:warrentyId', async (req: Request, res: Response) => {

    const oldwarrenty = await prisma.warrenty.findUnique({
        where: {
            id: parseInt(req.params.warrentyId)
        }
    })

    if (!oldwarrenty) {
        res.status(404).json({
            error: 'warrenty not found'
        })
    }

    await prisma.warrenty.delete({
        where: {
            id: parseInt(req.params.warrentyId)
        }
    })

    res.json({
        message: 'warrenty deleted'
    })
})
