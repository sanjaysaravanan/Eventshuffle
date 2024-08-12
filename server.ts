import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";

import eventRouter from "./routes/events";
import connectViaMongoose from "./db-utils/mongodb-connection";
import userRouter from "./routes/auth";
import authMiddleware from "./middlewares/authMiddleware";

const app = express();

// Serve the static files from the React app's build directory
app.use(express.static(path.join(__dirname, "./client/dist")));

const PORT = process.env.PORT || 8000;

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(new Date().toString(), req.method, req.url);
  next();
};

app.use(logger);

app.use(express.json());
app.use(cors());

app.use("/api/v1/event", authMiddleware, eventRouter);

app.use("/api/v1/auth", userRouter);

// Handle React routing, return all requests to the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
});

connectViaMongoose().then(() => {
  app.listen(PORT, () => {
    console.log(new Date(), "listening on port", PORT);
  });
});
