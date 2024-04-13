import express, { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
    const { description, address, clientId, userId } = req.body;


    const job = await prisma.job.create({
        data: {
            description,
            address,
            clientId: parseInt(clientId),
            userId: userId
        }
    });

    res.json(job);
});

router.post('/getall', async (req: Request, res: Response) => {

    let jobs = prisma.job.findMany()

    res.json(jobs)
})

router.post('/:jobId', async (req: Request, res: Response) => {

    const job = prisma.job.findUnique({
        where: {
            id: parseInt(req.params.jobId)
        }
    })

    if (!job) {
        res.status(404).json({
            error: 'job not found'
        })
    }

    res.json(job)
})

router.put('/:jobId', async (req: Request, res: Response) => {

    const { description, address, clientId, userId } = req.body;

    const update = prisma.job.findUnique({
        where: {
            id: parseInt(req.params.jobId)
        }
    })

    if (!update) {
        res.status(404).json({
            error: 'job not found'
        })
    }

    const updated = await prisma.job.update({
        where: {
            id: parseInt(req.params.jobId)
        },
        data: {
            description,
            address,
            clientId,
            userId
        }
    })

    res.json(updated)
})

router.delete('/:jobId', async (req: Request, res: Response) => {

    const oldJob = await prisma.job.findUnique({
        where: {
            id: parseInt(req.params.JobId)
        }
    })

    if (!oldJob) {
        res.status(404).json({
            error: 'Job not found'
        })
    }

    await prisma.job.delete({
        where: {
            id: parseInt(req.params.JobId)
        }
    })

    res.json({
        message: 'job deleted'
    })
})
