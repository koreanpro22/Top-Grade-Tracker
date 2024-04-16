import express, { Request, Response } from "express";
import {db} from '../src/utils/db.server'

const router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
    const { jobId, duration } = req.body;


    const warrenty = await db.warrenty.create({
        data: {
            duration,
            jobId
        }
    });

    res.json(warrenty);
});

router.post('/getall', async (req: Request, res: Response) => {

    let warrentys = db.warrenty.findMany()

    res.json(warrentys)
})

router.post('/:warrentyId', async (req: Request, res: Response) => {

    const warrenty = db.warrenty.findUnique({
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

    const update = db.warrenty.findUnique({
        where: {
            id: parseInt(req.params.warrentyId)
        }
    })

    if (!update) {
        res.status(404).json({
            error: 'warrenty not found'
        })
    }

    const updated = await db.warrenty.update({
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

    const oldwarrenty = await db.warrenty.findUnique({
        where: {
            id: parseInt(req.params.warrentyId)
        }
    })

    if (!oldwarrenty) {
        res.status(404).json({
            error: 'warrenty not found'
        })
    }

    await db.warrenty.delete({
        where: {
            id: parseInt(req.params.warrentyId)
        }
    })

    res.json({
        message: 'warrenty deleted'
    })
})
