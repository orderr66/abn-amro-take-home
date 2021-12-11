import { Neo4jService } from 'neo4j/neo4j.service';

import request from "supertest";
import { expect } from "chai";
import { Driver } from 'neo4j-driver';

describe("Testing Neo4Service", function () {

  let driver: Neo4jService;

  before(async () => {
    driver = new Neo4jService();
  });

  after(async () => {
    driver.closeDriverConnection();
  });

  it('Neo4J Service Connection Should Return Verified Object While Testing Connectivity', function() {
    return driver.getDefaultDriver().verifyConnectivity().then(function(data){
      expect(data).to.be.an('object');
    });
  });

  it('Neo4J Service getReadSession Should Return Session Mode READ', function() {
    expect(driver.getReadSession()["_mode"]).to.be.equal("READ")
  });

  it('Neo4J Service getWriteSession Should Return Session Mode WRITE', function() {
    expect(driver.getWriteSession()["_mode"]).to.be.equal("WRITE")
  });

  it('Neo4J Service getReadSession Should Return DB Name When DB Provided', function() {
    expect(driver.getReadSession("test")["_database"]).to.be.equal("test")
  });

  it('Neo4J Service getWriteSession Should Return DB Name When DB Provided', function() {
    expect(driver.getWriteSession("test")["_database"]).to.be.equal("test")
  });
})
