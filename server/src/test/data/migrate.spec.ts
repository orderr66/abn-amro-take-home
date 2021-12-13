
import { Neo4jService } from 'neo4j/neo4j.service';
import { isNodesExist, clearNodes } from "data/utils";

import { expect } from "chai";
import { afterEach } from 'mocha';

describe("Testing Data Migration", function () {

  let service: Neo4jService;

  beforeEach(async () => {
    service = new Neo4jService();
  });

  afterEach(async()=> {
    service.closeDriverConnection();
  })

  after(async () => {
    service = new Neo4jService();
    let query = `MATCH (n:Test) DETACH DELETE n`
    return service.writeQuery(query,{}).then(result => {
      console.log("Test Data Deleted!")
    }).catch(error=>{
      console.log(error)
    }).then(() =>{
      service.closeDriverConnection();
    })
  });

  it('Write Query Should Create Test node Alice', function() {
    let query = `CREATE (alice:Test {name : $nameParam}) RETURN alice.name AS name`
    return service.writeQuery(query, {nameParam: 'Alice'}).then(result => {
      result.records.forEach(record => {
        expect(record.get('name')).equal("Alice")
      })
    })
  });

  it('isNodesExist method should return true if Node exist', function() {
    let query = `MATCH (alice:Test) RETURN alice.name AS name`
    return isNodesExist(service, query).then(result => {
      expect(result).equal(true)
    })
  });

  it('clearNodes method should return true if empty after deleting nodes', function() {
    let query = `MATCH (n: Test) DETACH DELETE n`
    return clearNodes(service, query).then(result => {
      expect(!result.records.length).equal(true)
    })
  });

})
