import mongoose from "mongoose";

export const cursoSchema = new mongoose.Schema({
    titulo : String,
    descripcion: String,
    estudiantes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Estudiante'
    }]
}) 

export const Curso = mongoose.model('Curso', cursoSchema);