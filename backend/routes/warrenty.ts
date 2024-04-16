import express, { Request, Response } from "express";
import { db } from '../src/utils/db.server';

const warrentyRouter = express.Router();

warrentyRouter.post('/create', async (req: Request, res: Response) => {
    try {
        const { jobId, duration } = req.body;

        const warranty = await db.warrenty.create({
            data: {
                duration,
                jobId
            }
        });

        res.json(warranty);
    } catch (error) {
        console.error("Error creating warranty:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

warrentyRouter.get('/getall', async (req: Request, res: Response) => {
    try {
        const warranties = await db.warrenty.findMany();
        res.json(warranties);
    } catch (error) {
        console.error("Error fetching warranties:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

warrentyRouter.get('/:warrentyId', async (req: Request, res: Response) => {
    try {
        const warranty = await db.warrenty.findUnique({
            where: {
                id: parseInt(req.params.warrentyId)
            }
        });

        if (!warranty) {
            return res.status(404).json({ error: 'Warranty not found' });
        }

        res.json(warranty);
    } catch (error) {
        console.error("Error fetching warranty:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

warrentyRouter.put('/:warrentyId', async (req: Request, res: Response) => {
    try {
        const { jobId, duration } = req.body;

        const warranty = await db.warrenty.findUnique({
            where: {
                id: parseInt(req.params.warrentyId)
            }
        });

        if (!warranty) {
            return res.status(404).json({ error: 'Warranty not found' });
        }

        const updatedWarranty = await db.warrenty.update({
            where: {
                id: parseInt(req.params.warrentyId)
            },
            data: {
                duration,
                jobId
            }
        });

        res.json(updatedWarranty);
    } catch (error) {
        console.error("Error updating warranty:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

warrentyRouter.delete('/:warrentyId', async (req: Request, res: Response) => {
    try {
        const warranty = await db.warrenty.findUnique({
            where: {
                id: parseInt(req.params.warrentyId)
            }
        });

        if (!warranty) {
            return res.status(404).json({ error: 'Warranty not found' });
        }

        await db.warrenty.delete({
            where: {
                id: parseInt(req.params.warrentyId)
            }
        });

        res.json({ message: 'Warranty deleted' });
    } catch (error) {
        console.error("Error deleting warranty:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default warrentyRouter;
