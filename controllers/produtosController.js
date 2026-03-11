import { products } from "../produtos.js";

export const getProducts = (req,res) => {
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
        console.log (req.body)
    }
}
// Busca por ID, path.params
export const getStats = (req,res) => {
    const stats = {
        totalProdutos: products.length,
        valorTotalEstoque: 'R$ ' + products.reduce( (total,el) => total + el.price,0 ).toFixed(2) ,
        produtosAtivos: products.filter( el => el.active == true).length,
        produtosInativos: products.filter( el => el.active == false).length
    }
    res.json(stats)
}