import mongoose from "mongoose";

const estudianteSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  edad: Number,
  cursos: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: "Curso",
    },
  ],
});

export const Estudiante = mongoose.model("Estudiante", estudianteSchema);
