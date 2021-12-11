
import "dotenv/config";

type Neo4jConfig = {
    host: string;
    username: string;
    password: string;
    database?: string;
}

export const config: Neo4jConfig  = {
  host: process.env.NEO4J_HOST ?? "bolt://localhost:7687",
  username: process.env.NEO4J_USERNAME ?? "neo4j",
  password: process.env.NEO4J_PASSWORD ?? "test"
}
