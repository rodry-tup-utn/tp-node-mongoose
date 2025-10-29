import mongoose from "mongoose";

const libroSchema = new mongoose.Schema({
    titulo: String,
    paginas: Number,
    autor : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Autor'
    },
    categorias: [String]
});

export const Libro = mongoose.model('Libro', libroSchema);

