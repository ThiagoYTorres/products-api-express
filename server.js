import { products } from "./produtos.js";
import { router } from './routes/expressRouter.js'
import e from "express";

const app = e()

const PORT = 8000

app.use(e.json())

app.use('/produtos', router )


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

// Nessa URL passamos o objeto em formato JSON, app.use(e.json()) lê esse body
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

app.put('/produtos/:id', (req,res) => {
    const id = Number(req.params.id)
    const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }

  const { name,category,price,stock,brand,active } = req.body;

  products[index] = {
    id,
    name,
    category,
    price,
    stock,
    brand,
    active
  };

  res.json(products[index]);
    
})

app.listen( PORT,() => console.log(`servidor ligado / PORTA: ${PORT}`))