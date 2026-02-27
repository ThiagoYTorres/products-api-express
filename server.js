import { products } from "./produtos.js";

import e from "express";

const app = e()

const PORT = 8000


app.get('/produtos', (req,res) => {
    
// Query Strings
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
    }
})   

app.get('/produtos/stats', (req,res) => {
    const stats = {
        totalProdutos: products.length,
        valorTotalEstoque: 'R$ ' + products.reduce( (total,el) => total + el.price,0 ).toFixed(2) ,
        produtosAtivos: products.filter( el => el.active == true).length,
        produtosInativos: products.filter( el => el.active == false).length
    }
    res.json(stats)
})


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





app.listen( PORT,() => console.log(`servidor ligado / PORTA: ${PORT}`))