import express, { Request, Response } from 'express';
import { KeyType, verifyAuth } from './db';
export const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  res.contentType("application/json");
  const authToken = req.headers.authorization;
  if (!authToken || authToken.length === 0) {
    res.status(401);
    res.json({ success: false, message: "Missing Authorization header." });
    return;
  }
  if (!(await verifyAuth(authToken.split("Unlock-Key ")[1], KeyType.UnlockKey))) {
    res.status(403);
    res.json({ success: false, message: "Invalid key, make sure you are sending a valid Unlock-Key." });
    return;
  }
  res.status(200);
  res.json({ status: true, message: "Successfully verified your key." });
  return;
})