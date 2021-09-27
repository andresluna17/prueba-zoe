import { Router } from "express";
import { getStatus } from "./controllers/status.controller";
import { getIp, uploadFile } from "./controllers/upload.controller";
import { verifyAccessToken } from "./middlewares/accesToken";

const router: Router = Router();

router.get("/status", getStatus);
router.post("/upload", uploadFile);
router.get("/get-ip", verifyAccessToken, getIp);

export default router;
