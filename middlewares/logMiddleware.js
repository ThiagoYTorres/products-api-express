export const logMiddleware = (req,res,next) => {
    const tempo = new Date().toLocaleTimeString()
    console.log(`[${tempo}] ${req.method} URL: ${req.url}`)
    next()
}