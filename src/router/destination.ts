import { Router } from "express";
const router = Router();
import Controller from "../controller/index";

router.post("/", Controller.destination.create);
router.get("/", Controller.destination.getAll);
router.get("/:id", Controller.destination.getAll);
router.put("/:id", Controller.destination.put);
router.delete("/", Controller.destination.delete);

export default router;
