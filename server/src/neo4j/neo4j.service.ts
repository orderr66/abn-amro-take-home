import neo4j, { Driver, Result } from 'neo4j-driver';
import { config } from './neo4j.config';

export class Neo4jService {

  private driver: Driver;

  constructor() {
    this.driver = neo4j.driver(
      config.host,
      neo4j.auth.basic(config.username, config.password)
    )
  }

  getDefaultDriver(): Driver {
    return this.driver
  }

  getReadSession(database?: string) {
    return this.driver.session({
      database: database || config.database,
      defaultAccessMode: neo4j.session.READ,
    })
  }

  getWriteSession(database?: string) {
    return this.driver.session({
        database: database || config.database,
        defaultAccessMode: neo4j.session.WRITE,
    })
  }

  getReactiveReadSession(database?: string) {
    return this.driver.rxSession({
      database: database || config.database,
      defaultAccessMode: neo4j.session.READ,
    })
  }

  getReactiveWriteSession(database?: string) {
    return this.driver.rxSession({
        database: database || config.database,
        defaultAccessMode: neo4j.session.WRITE,
    })
  }

  readQuery(cypher: string, params: Record<string, any>, database?: string): Result {
    const session = this.getReadSession(database)
    return session.run(cypher, params)
  }

  writeQuery(cypher: string, params: Record<string, any>, database?: string): Result {
    const session = this.getWriteSession(database)
    return session.run(cypher, params)
  }

  closeDriverConnection() {
    this.driver.close();
  }
}