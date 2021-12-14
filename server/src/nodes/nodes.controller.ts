import { Request, Response } from "express";
import NodeService from "./nodes.service";

class NodeController {
  private nodeService: NodeService = new NodeService();
  async getAllNodes(req: Request, res: Response) {
    const result = await this.nodeService.getAllNodes();
    return res.json(result);
  }
  async createNode(req: Request, res: Response) {
    const result = await this.nodeService.createNode(req.body);
    return res.json(result);
  }
}

export default NodeController;