import { Router } from "express";
import { getProdQuery , getStats, getProdByID, createProduct, updateProduct, deleteProduct } from '../controllers/produtosController.js'


export const router = Router()

const validarProduto = (req,res,next) => {
    // Verifica se o objeto possui todos os campos obrigatórios
    const campos = ['name', 'category', 'price', 'stock', 'brand', 'active' ]
  
    // [ in ] verifica se aquela propriedade existe naquele objeto
    const vefCampos = campos.every( el => el in req.body)
    if(!vefCampos){
        return res.status(400).json({
            erro: 'Campos obrigatórios faltando'
        })
    }
    // Verifica se nenhum valor está vazio ou possui um dado inválido
    const vefValores = Object.values(req.body).every(el => el !== null && el !== undefined && el !== "")
    
    if(!vefValores){
        return res.status(400).json({
            error: "Valores dos campos estão inválidos"
        })
        
    }
    next()
}

// [ /produtos ] já está em server.js, e como todas as rotas começam com /produtos ele pode ser omitido
router.get('/', getProdQuery )
router.get('/stats', getStats)
router.get('/:id', getProdByID)
router.post('/', validarProduto, createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
