import express from "express"
import mongoose from "mongoose"
import { libroRoutes } from "./routes/libroRoutes.js"
import { autorRoutes } from "./routes/autorRoutes.js"
import { cursoRoutes } from "./routes/cursoRoutes.js"
import { estudianteRoutes } from "./routes/estudianteRoutes.js"
const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URL,{
    dbName:process.env.DB_NAME
}).then(()=>{
    console.log("Conectado correctamete a la bbdd")
}).catch((e)=>{
    console.error(`Error al conectarse a la bbdd: ${e}`)
})

app.use("/libros", libroRoutes)

app.use("/autores", autorRoutes);

app.use("/cursos", cursoRoutes);

app.use("/estudiantes", estudianteRoutes);

app.listen(process.env.PORT,()=>{
    console.log("ejecutando en el puerto", process.env.PORT)
})