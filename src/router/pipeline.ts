import { Router } from "express";
const router = Router();
import Controller from "../controller/index";

router.post("/", Controller.pipeline.create);
router.get("/", Controller.pipeline.getAll);
router.get("/:id", Controller.pipeline.getAll);
router.put("/:id", Controller.pipeline.put);
router.delete("/", Controller.pipeline.delete);

export default router;
