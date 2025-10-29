import mongoose from "mongoose";

const autorShema = new mongoose.Schema({
    nombre : String,
    nacimiento : String
});

export const Autor = mongoose.model('Autor', autorShema);