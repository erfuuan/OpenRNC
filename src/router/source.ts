import { Router } from "express";
const router = Router();
import Controller from "../controller/index";

router.post("/", Controller.source.create);
router.get("/", Controller.source.getAll);
router.get("/:id", Controller.source.getAll);
router.put("/:id", Controller.source.put);
router.delete("/", Controller.source.delete);

export default router;
