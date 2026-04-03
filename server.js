import { products } from "./produtos.js";
import e from "express";

const app = e()

const PORT = 8000

// usado para ler o body das requisições
app.use(e.json())

app.get('/produtos', (req,res) => {
// Busca por Query Strings
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
})


app.get( '/produtos/stats' , (req,res) => {
    const stats = {
        totalProdutos: products.length,
        valorTotalEstoque: 'R$ ' + products.reduce( (total,el) => total + el.price,0 ).toFixed(2) ,
        produtosAtivos: products.filter( el => el.active == true).length,
        produtosInativos: products.filter( el => el.active == false).length
    }
    res.json(stats)
})




// Busca por ID, path.params
app.get('/produtos/:id', (req,res) => {
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
       
})

// Nessa URL é passado o objeto em formato JSON no body da requisição, app.use(e.json()) traduz o body da req para JS
app.post('/produtos' ,(req,res) => {
    const { name,category,price,stock,brand,value } = req.body

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
})

//Busca por id, busca o produto pelo ID e atualiza todas as suas propriedades 
// (precisa mandar um body na req, com um novo produto)
app.put('/produtos/:id', (req,res) => {
    const id = Number(req.params.id)
    const index = products.findIndex(p => p.id === id);
    

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
    
})

app.delete('/produtos/:id' , (req,res) => {
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

})


app.listen( PORT,() => console.log(`servidor ligado / PORTA: ${PORT}`))