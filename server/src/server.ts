import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import routes from "routes/index";

export default function createServer() {

  const app: Application = express();
  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello World");
  })

  const allowOrigins = ["http://localhost:8080", "http://client:8080", "*"]

  const options : cors.CorsOptions = {
    origin: allowOrigins
  };

  app.use(cors(options));
  app.use(express.urlencoded({extended: true}));
  app.use(express.json());
  app.use(routes);


  return app;

}