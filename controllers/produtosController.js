import { products } from '../produtos.js'

export const getProdQuery = (req,res) => {
// GET Busca por Query Strings
    if(req.query){
        console.log(req.query)
            let queryData = products
            const { name , category, precMin, precMax, brand } = req.query

            if(name){
                queryData = queryData.filter( el => el.name.toLowerCase().includes(name.toLowerCase()) )
            }
            if(category){
                queryData = queryData.filter( el => el.category.toLowerCase() === category.toLowerCase() )
            }
            if(brand){
                queryData = queryData.filter(  el => el.brand.toLowerCase() === brand.toLowerCase() )
            }
            if(precMax){
                queryData = queryData.filter(el => el.price <= Number(precMax))
            }
            if(precMin){
                queryData = queryData.filter(el => el.price >= Number(precMin))
            }
            res.json(queryData)
        }
        else{
            res.json(products)
            console.log (req.body)
        }
}

// GET status de todos os produtos
 export const getStats = (req,res) => {
    const stats = {
        totalProdutos: products.length,
        valorTotalEstoque: 'R$ ' + products.reduce( (total,el) => total + el.price,0 ).toFixed(2) ,
        produtosAtivos: products.filter( el => el.active == true).length,
        produtosInativos: products.filter( el => el.active == false).length
    }
    res.json(stats)
}

// GET busca de produto pelo ID
 export const getProdByID = (req,res) => {
    const {id} = req.params
    
    let selectProd = products

    if(isNaN(id)){
         res.status(400).json({
                status:400,
                error:"Not Found",
                message:"id do produto precisa ser um número"
            })
    }
    else{
        selectProd = selectProd.find( el => el.id == Number(id))
                if(!selectProd){
                    res.status(404).json({
                        status:404,
                        error:"Not Found",
                        message:"Produto não encontrado"
                    })
                }
                else{
                    res.json(selectProd)             
            }
    }
       
}

// POST
export const createProduct = (req,res) => {
    const { name,category,price,stock,brand,value } = req.body
    console.log(Object.values(req.body))
    console.log(Object.keys(req.body))
    const novoProd = {
        id: products.length + 1,
        name,
        category,
        price,
        stock,
        brand,
        value
    }
    console.log(req.body)
    products.push(novoProd)
    res.status(201).json({message:"Produto adicionado com sucesso!"})
}

// PUT
export const updateProduct = (req,res) => {
    const id = Number(req.params.id)
    const index = products.findIndex(p => p.id === id);
    
//findIndex() retorna -1 caso não ache o elemento
  if (index === -1) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }

  const prodAtualizado = products[index]
  console.log(prodAtualizado)
  const { name,category,price,stock,brand,active } = req.body;
  
  products[index] = {
    id,
    name,
    category,
    price,
    stock,
    brand,
    active
  }

  res.status(200).json({
    message: `Produto (${prodAtualizado.name} / ID:${prodAtualizado.id} ) atualizado com sucesso!`,
    data: products[index] 
  })
    
}

export const deleteProduct = (req,res) => {
    const id = Number(req.params.id)
    const index = products.findIndex( el => el.id === id )
    
    if (index === -1) {
     return res.status(404).json({ message: "Produto não encontrado" });
  }
    
    const prodD = products.splice(index,1)
    console.log(prodD)

    res.status(200).json({
        message:`Produto ( ${prodD[0].name} / ID:${prodD[0].id} ) foi excluído com sucesso`,
    })

}