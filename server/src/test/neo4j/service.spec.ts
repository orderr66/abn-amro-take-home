import { Neo4jService } from 'neo4j/neo4j.service';

import request from "supertest";
import { expect } from "chai";
import { Driver } from 'neo4j-driver';
import { afterEach } from 'mocha';

describe("Testing Neo4Service", function () {

  let service: Neo4jService;

  beforeEach(async () => {
    service = new Neo4jService();
  });

  afterEach(async () => {
    service.closeDriverConnection();
  });

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
  })

  it('Neo4J Service Connection Should Return Verified Object While Testing Connectivity', function() {
    return service.getDefaultDriver().verifyConnectivity().then(function(data){
      expect(data).to.be.an('object');
    });
  });

  it('Neo4J Service getReadSession Should Return Session Mode READ', function() {
    expect(service.getReadSession()["_mode"]).to.be.equal("READ")
  });

  it('Neo4J Service getWriteSession Should Return Session Mode WRITE', function() {
    expect(service.getWriteSession()["_mode"]).to.be.equal("WRITE")
  });

  it('Neo4J Service getReadSession Should Return DB Name When DB Provided', function() {
    expect(service.getReadSession("test")["_database"]).to.be.equal("test")
  });

  it('Neo4J Service getWriteSession Should Return DB Name When DB Provided', function() {
    expect(service.getWriteSession("test")["_database"]).to.be.equal("test")
  });

  it('Write Query Should Create Test node Alice', function() {
    let query = `MERGE (alice:Test {name : $nameParam}) RETURN alice.name AS name`
    return service.writeQuery(query, {nameParam: 'Alice'}).then(result => {
      result.records.forEach(record => {
        expect(record.get('name')).equal("Alice")
      })
    })
  });

  it('Read Query Should MATCH Test node Alice', function() {
    let query = `MATCH (alice:Test) RETURN alice.name AS name`
    return service.writeQuery(query, {}).then(result => {
      result.records.forEach(record => {
        expect(record.get('name')).equal("Alice")
      })
    })
  });
})
