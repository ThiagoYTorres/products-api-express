import { Router } from "express";
import { getProdQuery , getStats, getProdByID, createProduct, updateProduct, deleteProduct } from '../controllers/produtosController.js'
import { validarProduto } from '../middlewares/validarProduto.js'

export const router = Router()

// [ /produtos ] já está em server.js, e como todas as rotas começam com /produtos ele pode ser omitido
router.get('/', getProdQuery )
router.get('/stats', getStats)
router.get('/:id', getProdByID)
router.post('/', validarProduto, createProduct)
router.put('/:id', validarProduto, updateProduct)
router.delete('/:id', deleteProduct)
