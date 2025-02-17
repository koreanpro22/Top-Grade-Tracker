import express, { Request, Response } from "express";
import { db } from "../../src/utils/db.server";

const jobRouter = express.Router();

jobRouter.post("/create", async (req: Request, res: Response) => {
  try {
    const { description, address, clientName, clientEmail, clientPhone, userId, scheduledDate } = req.body;

    const parsedScheduledDate = new Date(scheduledDate);

    const job = await db.job.create({
      data: {
        description,
        clientEmail,
        clientName,
        clientPhone,
        address,
        userId,
        scheduledDate :parsedScheduledDate
      },
    });

    res.json(job);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: error });
  }
});

jobRouter.get("/getall", async (req: Request, res: Response) => {
  try {
    const jobs = await db.job.findMany();
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

jobRouter.get("/:jobId", async (req: Request, res: Response) => {
  try {
    const job = await db.job.findUnique({
      where: {
        id: parseInt(req.params.jobId),
      },
      include: {
        warrenties: true
      }
    });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

jobRouter.put("/:jobId", async (req: Request, res: Response) => {
  try {
    const { description, address, clientName, clientEmail, clientPhone, userId, scheduledDate } = req.body;

    const parsedScheduledDate = new Date(scheduledDate);

    const job = await db.job.findUnique({
      where: {
        id: parseInt(req.params.jobId),
      },
    });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    const updatedJob = await db.job.update({
      where: {
        id: parseInt(req.params.jobId),
      },
      data: {
        description,
        clientEmail,
        clientName,
        clientPhone,
        address,
        userId,
        scheduledDate :parsedScheduledDate
      },
    });

    res.json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


jobRouter.delete("/:jobId", async (req: Request, res: Response) => {
  try {
    const job = await db.job.findUnique({
      where: {
        id: parseInt(req.params.jobId),
      },
    });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    await db.job.delete({
      where: {
        id: parseInt(req.params.jobId),
      },
    });

    res.json({ message: "Job deleted" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default jobRouter;
