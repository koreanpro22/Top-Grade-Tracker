import express, { Request, Response } from "express";
import { db } from '../src/utils/db.server';

const clientRouter = express.Router();

clientRouter.post('/create', async (req: Request, res: Response) => {
    try {
        const { name, email, phone, address } = req.body;

        const client = await db.client.create({
            data: {
                name,
                email,
                phone,
                address
            }
        });

        res.json(client);
    } catch (error) {
        console.error("Error creating client:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

clientRouter.get('/getall', async (req: Request, res: Response) => {
    try {
        const clients = await db.client.findMany();
        res.json(clients);
    } catch (error) {
        console.error("Error fetching clients:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

clientRouter.get('/:clientId', async (req: Request, res: Response) => {
    try {
        const client = await db.client.findUnique({
            where: {
                id: parseInt(req.params.clientId)
            }
        });

        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }

        res.json(client);
    } catch (error) {
        console.error("Error fetching client:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

clientRouter.put('/:clientId', async (req: Request, res: Response) => {
    try {
        const { name, email, phone, address } = req.body;

        const client = await db.client.findUnique({
            where: {
                id: parseInt(req.params.clientId)
            }
        });

        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }

        const updatedClient = await db.client.update({
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

        res.json(updatedClient);
    } catch (error) {
        console.error("Error updating client:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

clientRouter.delete('/:clientId', async (req: Request, res: Response) => {
    try {
        const client = await db.client.findUnique({
            where: {
                id: parseInt(req.params.clientId)
            }
        });

        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }

        await db.client.delete({
            where: {
                id: parseInt(req.params.clientId)
            }
        });

        res.json({ message: 'Client deleted' });
    } catch (error) {
        console.error("Error deleting client:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default clientRouter;
