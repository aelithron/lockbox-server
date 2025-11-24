import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { KeyType, verifyAuth } from './db';

import { router as openBox } from "./box";

dotenv.config();
export const app: Express = express();
const port = process.env.PORT || 3010;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.contentType("application/json");
  res.status(200);
  res.json({
    server: "Lockbox Server",
    github_repo: "https://github.com/aelithron/lockbox-server",
    uptime: Math.floor(process.uptime()) + "s",
    accessing_on: req.hostname
  });
});
app.get('/verify', async (req: Request, res: Response) => {
  res.contentType("application/json");
  const authToken = req.headers.authorization;
  if (!authToken || authToken.length === 0) {
    res.status(401);
    res.json({ success: false, message: "Missing Authorization header." });
    return;
  }
  if (authToken.startsWith("Drop-Key")) {
    if (await verifyAuth(authToken.split("Drop-Key ")[1], KeyType.DropKey)) {
      res.status(200);
      res.json({ success: true, message: "Successfully verified your Drop Key." });
      return;
    } else {
      res.status(403);
      res.json({ success: false, message: "Invalid Drop Key, make sure you are sending a valid key." });
      return;
    }
  } else if (authToken.startsWith("Unlock-Key")) {
    if (await verifyAuth(authToken.split("Unlock-Key ")[1], KeyType.UnlockKey)) {
      res.status(200);
      res.json({ success: true, message: "Successfully verified your Unlock Key." });
      return;
    } else {
      res.status(403);
      res.json({ success: false, message: "Invalid Unlock Key, make sure you are sending a valid key." });
      return;
    }
  } else {
    res.status(403);
    res.json({ success: false, message: "Invalid Authorization header." });
    return;
  }
});

app.use("/open", openBox);

if (process.env.NODE_ENV !== "test") { startServer(); }

export function startServer() {
  return app.listen(port, () => {
    console.log(`[server] The Lockbox server is running at http://localhost:${port}`);
  });
}