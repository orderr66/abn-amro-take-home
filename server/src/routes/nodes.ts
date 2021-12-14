import { Router, Request, Response } from "express";
import NodeController from "nodes/nodes.controller";

const router = Router();

let nodeController: NodeController = new NodeController();
router.get("/", async (req: Request, res: Response) => {
  await nodeController.getAllNodes(req, res);
})

router.post("/", async(req: Request, res: Response) => {
  await nodeController.createNode(req, res);
})

export default router;

