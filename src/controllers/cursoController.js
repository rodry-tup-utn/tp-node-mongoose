import mongoose from "mongoose";
import { Curso } from "../models/curso.js";
import { Estudiante } from "../models/estudiante.js";

export const crearCurso = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    const estudiantes = [];
    const nuevoCurso = new Curso({
      titulo,
      descripcion,
      estudiantes,
    });

    const cursoGuardado = await nuevoCurso.save();
    return res.status(201).json({ cursoGuardado });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const mostrarTodos = async (req, res) => {
  try {
    const cursos = await Curso.find().populate("estudiantes", "nombre email");
    if (cursos.length === 0) {
      return res
        .status(204)
        .json({ message: "No hay estudiantes cargados", cursos: [] });
    }
    return res.status(200).json(cursos);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};

export const buscarCursoId = async (req, res) => {
  try {
    const { id } = req.params;
    const cursoEncontrado = await Curso.findById(id).populate(
      "estudiantes",
      "nombre"
    );

    if (!cursoEncontrado) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }
    return res.status(201).json(cursoEncontrado);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};

export const actualizarCurso = async (req, res) => {
  try {
    const { id } = req.params;
    const nuevosDatos = req.body;
    const cursoActualizado = await Curso.findByIdAndUpdate(id, nuevosDatos, {
      new: true,
    });

    return res.status(200).json(cursoActualizado);
  } catch (error) {
    return res.status(400).json({ message: "Error al actualizar el autor" });
  }
};

export const agregarEstudiante = async (req, res) => {
  try {
    const { cursoId } = req.params;
    const { estudianteId } = req.body;

    const estudianteExiste = await Estudiante.exists({
      _id: estudianteId,
    });

    if (!estudianteExiste) {
      return res.status(404).json({
        message: "No se encontro el estudiante con el id proporcionado",
      });
    }

    const cursoExiste = await Curso.exists({ _id: cursoId });

    if (!cursoExiste) {
      return res.status(404).json({
        message: "El id del curso no corresponde con ningun curso existente",
      });
    }

    await Estudiante.findByIdAndUpdate(
      estudianteId,
      { $addToSet: { cursos: cursoId } },
      { new: true }
    );

    const cursoActualizado = await Curso.findByIdAndUpdate(
      cursoId,
      { $addToSet: { estudiantes: estudianteId } },
      { new: true }
    ).populate("estudiantes", "nombre email");

    return res.status(200).json({
      message: "Estudiante agregado al curso exitosamente",
      estudiante: cursoActualizado,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error en el servidor al agregar el curso",
      error: error.message,
    });
  }
};

export const eliminarCurso = async (req, res) => {
  const { id } = req.params;

  try {
    const cursoEliminado = await Curso.findByIdAndDelete(id);

    if (!cursoEliminado) {
      return res
        .status(404)
        .json({ message: "No se encontro el curso con el id suministrado" });
    }

    const idsEstudiantes = cursoEliminado.estudiantes;

    if (idsEstudiantes && idsEstudiantes.length > 0) {
      await Estudiante.updateMany(
        { _id: { $in: idsEstudiantes } },
        { $pull: { cursos: id } }
      );
    }

    return res.status(200).json({
      message: "Curso eliminado exitosamente",
      curso: cursoEliminado,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const totalEstudiantes = async (req, res) => {
  try {
    const totalEstudiantes = await Curso.aggregate([
      {
        $addFields: {
          totalEstudiantes: { $size : "$estudiantes"},
        },
      },
      {
        $project: {
          _id: 0,
          titulo: 1,
          totalEstudiantes: 1,
        },
      },
    ]);

    return res.status(200).json(totalEstudiantes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
