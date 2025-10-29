import { Router } from "express";
import { actualizarAutor, borrarAutor, buscarAutorId, crearAutor, mostrarTodos, totalLibros } from "../controllers/autorController.js";

export const autorRoutes = Router();

autorRoutes.get("/", mostrarTodos);

autorRoutes.get("/:id", buscarAutorId);

autorRoutes.post("/", crearAutor);

autorRoutes.put("/:id", actualizarAutor);

autorRoutes.delete("/:id", borrarAutor)

autorRoutes.get("/reportes/total-libros", totalLibros);

