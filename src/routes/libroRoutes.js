import { Router } from "express";
import {
  actualizarLibro,
  borrarLibroId,
  buscarLibroPorId,
  crearLibro,
  mostrarTodos,
  promedioPaginas,
} from "../controllers/libroController.js";

export const libroRoutes = Router();

libroRoutes.post("/", crearLibro);

libroRoutes.get("/", mostrarTodos);

libroRoutes.get("/:id", buscarLibroPorId);

libroRoutes.put("/:id", actualizarLibro);

libroRoutes.delete("/:id", borrarLibroId);

libroRoutes.get("/reportes/promedio-paginas", promedioPaginas);

