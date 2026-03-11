import e from "express";
import { getProducts, getStats } from "../controllers/produtosController.js";

export const router = e.Router()

router.get('/', getProducts)
router.get('/stats', getStats)
