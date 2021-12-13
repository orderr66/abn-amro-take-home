import { Neo4jService } from 'neo4j/neo4j.service';
import { clearNodes } from "./utils";

const startClearing = async (): Promise<void> => {
  const neo4jService: Neo4jService = new Neo4jService();
  const query: string = `MATCH (n: Node) DETACH DELETE n`
  await clearNodes(neo4jService, query);
  console.log("Nodes successfully deleted!")
  neo4jService.closeDriverConnection();
}

startClearing();