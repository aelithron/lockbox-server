import express, { Request, Response } from 'express';
import { KeyType, verifyAuth, readBox } from './db';
import { BoxItem } from '../lockbox';
import { randomBytes } from 'crypto';
export const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  res.contentType("application/json");
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader.length === 0) {
    res.status(401);
    res.json({ success: false, message: "Missing Authorization header." });
    return;
  }
  const token = authHeader.split("Unlock-Key ")[1];
  if (!(await verifyAuth(token, KeyType.UnlockKey))) {
    res.status(403);
    res.json({ success: false, message: "Invalid key, make sure you are sending a valid Unlock-Key." });
    return;
  }
  const boxContents: BoxItem[] = await readBox(token);
  res.status(200);
  res.json({ success: true, boxContents });
  return;
});

router.post('/', async (req: Request, res: Response) => {
  res.contentType("application/json");
  const dropKey = Buffer.from(randomBytes(24)).toString('base64url');
  const unlockKey = Buffer.from(randomBytes(12)).toString('base64url');
  res.status(200);
  res.json({ success: true, boxContents });
  return;
});