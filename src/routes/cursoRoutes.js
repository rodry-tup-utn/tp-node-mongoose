import { Router } from "express";
import { actualizarCurso, agregarEstudiante, buscarCursoId, crearCurso, eliminarCurso, mostrarTodos, totalEstudiantes } from "../controllers/cursoController.js";

export const cursoRoutes = Router();

cursoRoutes.post("/", crearCurso)

cursoRoutes.get("/", mostrarTodos);

cursoRoutes.get("/:id", buscarCursoId);

cursoRoutes.put("/", actualizarCurso);

cursoRoutes.put("/agregar-estudiante/:cursoId", agregarEstudiante)

cursoRoutes.delete("/:id", eliminarCurso)


cursoRoutes.get("/reportes/total-estudiantes", totalEstudiantes);
