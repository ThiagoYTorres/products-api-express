import { products } from "./produtos.js";
import e from "express";
import { router } from './routes/expressRouter.js'
import { pool } from "./config/db.js";
import { logMiddleware } from "./middlewares/logMiddleware.js";

const app = e()

const PORT = 8000

pool.getConnection()
  .then(() => console.log('✅ MySQL conectado com sucesso!'))
  .catch(err => console.error('❌ Erro ao conectar no MySQL:', err.message))


// middleware global usado para ler o body das requisições
app.use(e.json())
app.use(logMiddleware)


app.use('/produtos', router)


app.listen( PORT,() => console.log(`servidor ligado / PORTA: ${PORT}`))