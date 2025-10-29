import { Router } from "express";
import { actualizarEstudiante, borrarEstudiante, buscarEstudianteId, crearEstudiante, estudiantesMasdeUnCurso, mostrarTodos } from "../controllers/estudianteController.js";

export const estudianteRoutes = Router()

estudianteRoutes.post("/", crearEstudiante);

estudianteRoutes.get("/",mostrarTodos);

estudianteRoutes.get("/multiples-cursos", estudiantesMasdeUnCurso);

estudianteRoutes.get("/:id",buscarEstudianteId);

estudianteRoutes.put("/", actualizarEstudiante);

estudianteRoutes.delete("/:id", borrarEstudiante);

