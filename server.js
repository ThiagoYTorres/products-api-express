import { products } from "./produtos.js";
import e from "express";
import { router } from './routes/expressRouter.js'
const app = e()

const PORT = 8000

const logMiddleware = (req,res,next) => {
    const tempo = new Date().toLocaleTimeString()
    console.log(`[${tempo}] ${req.method} URL: ${req.url}`)
    next()
}
// middleware global usado para ler o body das requisições
app.use(e.json())
app.use(logMiddleware)




app.use('/produtos', router)


app.listen( PORT,() => console.log(`servidor ligado / PORTA: ${PORT}`))