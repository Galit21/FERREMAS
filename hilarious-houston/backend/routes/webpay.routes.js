import express from "express";
import { crearTransaccion, confirmarTransaccion } from "../controllers/webpay.controller.js";

const router = express.Router();

router.post("/crear", crearTransaccion);
router.get("/respuesta", confirmarTransaccion);

export default router;
