import { products } from "./produtos.js";

import e from "express";

const app = e()

const PORT = 8000


app.get('/produtos', (req,res) => {
    

// Query Strings
if(req.query){
        let queryData = products
        const { name , category, precMin, precMax } = req.query

        if(name){
            queryData = queryData.filter( el => el.name.toLowerCase().includes(name.toLowerCase()) )
        }
        if(category){
            queryData = queryData.filter( el => el.category.toLowerCase() === category.toLowerCase() )
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





app.listen( PORT,() => console.log(`servidor ligado / PORTA: ${PORT}`))