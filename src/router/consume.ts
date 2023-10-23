import { Router } from "express";
const router = Router();
import Controller from "../controller/index";

router.post('/',Controller.consume.create)
router.get('/',Controller.consume.getAll)
router.get('/:id',Controller.consume.getOne)
router.put('/',Controller.consume.put)
router.delete('/',Controller.consume.delete)

export default router;