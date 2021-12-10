import "dotenv/config";
import createServer from "server";

const startServer = () => {

  const app = createServer();
  const port: number = parseInt(<string> process.env.NODE_PORT);

  app.listen(port, () => {
    console.log(`Server Running on port: ${port}`);
  })

}

startServer();