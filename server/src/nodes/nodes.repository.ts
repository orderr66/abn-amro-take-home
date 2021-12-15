import { QueryResult } from 'neo4j-driver';
import { Neo4jService } from 'neo4j/neo4j.service';
import Node from "./nodes.model";
import { migrationQuery } from "data/utils";

export class NodeRepository {

  getNeo4JService(): Neo4jService  {
	  return new Neo4jService();
  }

  getAllNodes(): Promise<Node[]>{
	const neo4jService = this.getNeo4JService();
	const query = `MATCH (nodes: Node) RETURN nodes`
	return neo4jService.readQuery(query, {}).then(result => {
		neo4jService.closeDriverConnection();
		return 	result.records.map(r => new Node(r.get('nodes')["properties"]));

	}).catch(error => {
		console.log(error)
		return error
	})
  }
  createNode(node: Node): Promise<Node> {
    const neo4jService = this.getNeo4JService();
    return neo4jService.writeQuery(migrationQuery, {data: node})
    .then((result) => {
      neo4jService.closeDriverConnection();
      return result.summary.query.parameters["data"];
    })
    .catch(error => {
      console.log(error)
      return error
  })
  }
  deleteNode(node: Node): Promise<Node> {
    const neo4jService = this.getNeo4JService();
    const query: string = `MATCH (node:Node {name : '${node.getName()}'}) DETACH DELETE node`;
    return neo4jService.writeQuery(query, {})
    .then((result) => {
      neo4jService.closeDriverConnection();
      return result.summary.query.parameters;
    })
    .catch(error => {
      console.log(error)
      return error
  })
  }
}
export default NodeRepository;