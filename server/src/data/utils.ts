import { QueryResult } from 'neo4j-driver-core';
import { Neo4jService } from 'neo4j/neo4j.service';

export const clearNodes = (service: Neo4jService, query:string): Promise<QueryResult> => {
  return service.writeQuery(query, {})
    .then((result) => {
      return result;
    })
    .catch(error => {
      console.log(error)
      return error
  })}

export const isNodesExist = (service: Neo4jService, query:string): Promise<boolean>  => {
  return service.readQuery(query, {}).then(result => {
    return !!result.records.length
  })
  .catch(error => {
    console.log(error)
    return false;
  })
}

export const migrationQuery = `UNWIND $data AS node
CREATE (n:Node)
SET n=node
WITH n, node.parent as parentNode
MATCH (parent:Node {name:parentNode})
CREATE (n)-[:CHILD]->(parent)`

export const data = {
  "data":[
  {
  "name":"A",
  "description":"This is a description of A",
  "parent":""
  },
  {
  "name":"B",
  "description":"This is a description of B",
  "parent":"A"
  },
  {
  "name":"C",
  "description":"This is a description of C",
  "parent":"A"
  },
  {
  "name":"D",
  "description":"This is a description of D",
  "parent":"A"
  },
  {
  "name":"B-1",
  "description":"This is a description of B-1",
  "parent":"B"
  },
  {
  "name":"B-2",
  "description":"This is a description of B-2",
  "parent":"B"
  },
  {
  "name":"B-3",
  "description":"This is a description of B-3",
  "parent":"B"
  }
  ]
  }
