import express, { Request, Response } from "express";
import { db } from "../../src/utils/db.server";
const userRouter = express.Router();

userRouter.post("/create", async (req: Request, res: Response) => {
  const { name, email, password, profilePicture, isAdmin, phone } = req.body;

  try {
    const user = await db.user.create({
      data: {
        name,
        email,
        password,
        profilePicture,
        isAdmin,
        phone,
      },
    });

    res.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
});

userRouter.get("/getall", async (req: Request, res: Response) => {
  try {
    const users = await db.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users");
  }
});

userRouter.get("/:userId", async (req: Request, res: Response) => {
  try {
    const theUser = await db.user.findUnique({
      where: {
        id: parseInt(req.params.userId),
      },
    });

    if (!theUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(theUser);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.put("/:userId", async (req: Request, res: Response) => {
  try {
    const { name, email, password, profilePicture, isAdmin, phone } = req.body;

    const update = await db.user.update({
      where: {
        id: parseInt(req.params.userId),
      },
      data: {
        name,
        email,
        password,
        profilePicture,
        isAdmin,
        phone,
      },
    });

    res.json(update);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.delete("/:userId", async (req: Request, res: Response) => {
  try {
    const oldUser = await db.user.findUnique({
      where: {
        id: parseInt(req.params.userId),
      },
    });

    if (!oldUser) {
      return res.status(404).json({ error: "User not found" });
    }

    await db.user.delete({
      where: {
        id: parseInt(req.params.userId),
      },
    });

    res.json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default userRouter;
