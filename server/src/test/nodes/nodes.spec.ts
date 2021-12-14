
import { expect } from "chai";
import { NodeRepository } from 'nodes/nodes.repository';
import Node from "nodes/nodes.model";
import { Neo4jService } from "neo4j/neo4j.service";

describe("Testing Neo4Service", function () {
  let nodeRepo: NodeRepository;
  beforeEach(async () => {
    nodeRepo = new NodeRepository();
  });

  after(async () => {
    const service: Neo4jService = new Neo4jService();
    let query = `MATCH (n:Node {name:"F"}) DETACH DELETE n`
    return service.writeQuery(query, {}).then(() => {
      console.log("Test Data Deleted!")
    }).catch(error=>{
      console.log(error)
    }).then(() =>{
      service.closeDriverConnection();
    })
  })
  it('Node getAllNodes method should get all nodes', () => {
    return nodeRepo.getAllNodes().then(result => {
      expect(!!result.length).equal(true);
    });
  });

  it('Node createNode method should create node', () => {
    const node: Node = new Node({name: "F", description: "This is a description of F", parent: "A" })
    return nodeRepo.createNode(node).then(result => {
      expect(result["name"]).equal("F");
    });
  });
})
