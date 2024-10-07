import { Router, Request, Response } from "express";

const router = Router();

// Routing
router.get('/', (req: Request, res: Response) => {
    res.json({message: "hey!!!"});
});

export default router
