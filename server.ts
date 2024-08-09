import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import eventRouter from "./routes/events";
import connectViaMongoose from "./db-utils/mongodb-connection";

const app = express();

const PORT = process.env.PORT || 8000;

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(new Date().toString(), req.method, req.url);
  next();
};

app.use(logger);

app.use(express.json());
app.use(cors());

app.use("/api/v1/event", eventRouter);

connectViaMongoose().then(() => {
  app.listen(PORT, () => {
    console.log(new Date(), "listening on port", PORT);
  });
});
