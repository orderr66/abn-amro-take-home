import { Neo4jService } from '../neo4j/neo4j.service';
import { data, migrationQuery, isNodesExist } from "./utils";


const migrate = (service: Neo4jService): Promise<void> => {
  return service.writeQuery(migrationQuery, {data: data.data})
    .then(() => {
      console.log("Migration process successfully finished!")
    })
    .catch(error => {
      console.log(error)
  })
}

const startMigration = async (): Promise<void> => {
  const neo4jService: Neo4jService = new Neo4jService();
  const query: string = `MATCH (nodes:Node) RETURN nodes.name AS name`
  const isMigrated: boolean = await isNodesExist(neo4jService, query)
  if(isMigrated) {
    console.log("Data already migrated please check Neo4j DB!")
  } else {
    await migrate(neo4jService)
  }
  neo4jService.closeDriverConnection()
}

startMigration()
