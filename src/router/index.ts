import { Router } from "express";
const router = Router();
import authRoute from "./auth";
import homeRoute from "./home";
import sourceRoute from "./source";
import destinationRoute from "./destination";
import piplineRoute from "./pipeline";
import consumeRoute from "./consume";

router.use("/auth", authRoute);
router.use("/home", homeRoute);
router.use("/source", sourceRoute);
router.use("/destination", destinationRoute);
router.use("/pipeline", piplineRoute);
router.use("/consume", consumeRoute);

export default {};
