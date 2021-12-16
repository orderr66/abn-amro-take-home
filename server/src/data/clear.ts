import { Neo4jService } from '../neo4j/neo4j.service';
import { clearNodes } from "./utils";

const startClearing = async (): Promise<any> => {
  const neo4jService: Neo4jService = new Neo4jService();
  neo4jService.getDefaultDriver().verifyConnectivity().then(result => {
    console.log("Successfully connected!")
  }).catch(error=>{
    process.exit(1)
  })
  const query: string = `MATCH (n: Node) DETACH DELETE n`
  clearNodes(neo4jService, query).then(result => {
    console.log("Nodes successfully deleted!")
  }).catch(error=> {
    return error
  });
  neo4jService.closeDriverConnection();
}

startClearing();