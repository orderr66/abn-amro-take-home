import { Router } from "express";
import nodes from "./nodes";

const router = Router();

router.use("/nodes", nodes);

export default router;