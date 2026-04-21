import { pool } from '../config/db.js'
import { products } from '../produtos.js'

export const getProdQuery = async (req,res) => {
// GET Busca por Query Strings
console.log("Query Strings", req.query)
const possuiQuery = Object.keys(req.query).length > 0
    if(possuiQuery){
            let [queryData] = await pool.query('SELECT * FROM produtos')
            const { name , category, precMin, precMax, brand } = req.query
            if(name){
                queryData = queryData.filter( el => el.name.toLowerCase().includes(name.toLowerCase()) )
            }
            if(category){
                queryData = queryData.filter( el => el.category.toLowerCase() === category.toLowerCase() )
            }
            if(brand){
                queryData = queryData.filter( el => el.brand.toLowerCase() === brand.toLowerCase() )
            }
            if(precMax){
                queryData = queryData.filter( el => el.price <= Number(precMax))
            }
            if(precMin){
                queryData = queryData.filter( el => el.price >= Number(precMin))
            }
            res.json(queryData)
        }
        else{
            try{
                const [rows] = await pool.query('SELECT * FROM produtos')
                res.json(rows)
            }
            catch(error){
                console.error('Erro ao buscar produtos', error)
                res.status(500).json({message:'Erro no servidor'})
            }
            
        }
}

// GET status de todos os produtos
 export const getStats = async (req,res) => {
    try{
        const [products] = await pool.query('SELECT * FROM produtos')
        const stats = {
            totalProdutos: products.length,
            valorTotalEstoque: 'R$ ' + products.reduce( (total,el) => total + el.price,0 ).toFixed(2) ,
            produtosAtivos: products.filter( el => el.active == true).length,
            produtosInativos: products.filter( el => el.active == false).length
    }
    res.json(stats)
    }
    catch(error){
        console.error('Erro ao buscar estatísticas', error)
        res.status(500).json({message:'erro no servidor'})
    }
    
}

// GET busca de produto pelo ID
 export const getProdByID = async (req,res) => {

    const {id} = req.params
    if(isNaN(id)){
         return res.status(400).json({
                status:400,
                error:"Not Found",
                message:"id do produto precisa ser um número"
            })
        
    }
try{
    const [selectProd] = await pool.query('SELECT * FROM produtos where id = ?', [id])
    
        if(selectProd.length === 0){
           return res.status(404).json({
                message:"produto não encontrado",
                error:"Not Found"
            })
        }            
        res.json(selectProd)             
            
} catch(error){
    console.error('Erro ao buscar produto por ID:', error)
    res.status(500).json({ 
            message: 'Erro no servidor',
            error: error 
        })
}
    
       
}

// POST
export const createProduct = async (req,res) => {
    const { name,category,price,stock,brand,value, active } = req.body
    console.log(req.body)
    try{
        const [produto] = await pool.query(`INSERT INTO produtos (name,category,price,stock,brand,active) 
            VALUES (?,?,?,?,?,?)`,[name,category,price,stock,brand,active] )
            

        res.status(201).json({
            message:"Produto adicionado com sucesso!",
            id: produto.insertId
        })

    }
    catch(error){
        res.status(500).json({
            message:"Erro no servidor",
            error: error
        })
    }   
}

// PUT
export const updateProduct = async (req,res) => {

    console.log(req.params)
    const id = Number(req.params.id)
try{
    const [produtos] = await pool.query('SELECT * FROM produtos')

    const index = produtos.findIndex( el => el.id === id)
    
//findIndex() retorna -1 caso não ache o elemento
  if (index === -1) {
    return res.status(404).json({ message: "Produto não encontrado" })
  }
  const { name,category,price,stock,brand,active } = req.body

  const [produto] = await pool.query(`
    UPDATE produtos 
    SET name = ?,
        category = ?,
        price = ?,
        stock = ?,
        brand = ?,
        active = ? WHERE id = ?`, [name,category,price,stock,brand,active,id] )

  
  res.status(200).json({
    message: `Produto atualizado com sucesso!`
    
  })

} catch(error){
    res.status(500).json({
            message:"Erro no servidor",
            error: error
        })
}
    
}

export const deleteProduct = async (req,res) => {
    const id = Number(req.params.id)
    console.log(id)
    
try{
    const [produto] = await pool.query('SELECT * FROM produtos')
    
    console.log(produto[0])
    console.log(Object.keys(produto[0]))
    
    const index = produto.findIndex( el => el.id === id )

    if (index === -1) {
     return res.status(404).json({ message: "Produto não encontrado" });
    }
    
    await pool.query('DELETE FROM produtos WHERE id = ?',[id])

    res.status(200).json({
        message:`Produto excluído com sucesso`,
    })
    
} catch(error){
    res.status(500).json({
            message:"Erro no servidor",
            error: error
        })
}

}