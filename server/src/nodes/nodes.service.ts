import { QueryResult } from "neo4j-driver";
import { NodeRepository } from './nodes.repository';
import Node from './nodes.model';


class NodeService {
  private nodeRepository: NodeRepository = new NodeRepository();
  async getAllNodes(): Promise<Node[]> {
    const result = await this.nodeRepository.getAllNodes();
    return result;
  }
  async createNode(node: Node): Promise<Node> {
    const result = await this.nodeRepository.createNode(node);
    return result;
  }
  async deleteNode(node: object): Promise<Node> {
    let newNode: Node = new Node(node)
    const result = await this.nodeRepository.deleteNode(newNode);
    return result;
  }
}

export default NodeService;