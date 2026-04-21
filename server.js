import { products } from "./produtos.js";
import e from "express";
import { router } from './routes/expressRouter.js'
import { pool } from "./config/db.js";
const app = e()

const PORT = 8000

pool.getConnection()
  .then(() => console.log('✅ MySQL conectado com sucesso!'))
  .catch(err => console.error('❌ Erro ao conectar no MySQL:', err.message))


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