export const validarProduto = (req,res,next) => {
    // Verifica se o objeto possui todos os campos obrigatórios
    const campos = ['name', 'category', 'price', 'stock', 'brand']
  
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