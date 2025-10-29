import { Curso } from "../models/curso.js";
import { Estudiante } from "../models/estudiante.js";

export const crearEstudiante = async (req, res) => {
  try {
    const { nombre, email, edad } = req.body;
    const cursos = [];
    const nuevoEstudiante = new Estudiante({
      nombre,
      email,
      edad,
      cursos,
    });

    const estudianteGuardado = await nuevoEstudiante.save();
    return res.status(201).json({ estudianteGuardado });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const mostrarTodos = async (req, res) => {
  try {
    const estudiantes = await Estudiante.find().populate("cursos", "titulo");
    if (estudiantes.length === 0) {
      return res
        .status(204)
        .json({ message: "No hay estudiantes cargados", estudiantes: [] });
    }
    return res.status(200).json(estudiantes);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};

export const buscarEstudianteId = async (req, res) => {
  try {
    const { id } = req.params;
    const estudianteEncontrado = await Estudiante.findById(id).populate(
      "cursos",
      "titulo"
    );

    if (!estudianteEncontrado) {
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }
    return res.status(201).json(estudianteEncontrado);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};

export const actualizarEstudiante = async (req, res) => {
  try {
    const { id } = req.params;
    const nuevosDatos = req.body;
    const estudianteActualizado = await Estudiante.findByIdAndUpdate(
      id,
      nuevosDatos,
      { new: true }
    );

    return res.status(200).json(estudianteActualizado);
  } catch (error) {
    return res.status(400).json({ message: "Error al actualizar el autor" });
  }
};

export const borrarEstudiante = async (req, res) => {
  const { id } = req.params;

  try {
    const estudianteBorrado = await Estudiante.findByIdAndDelete(id);

    if (!estudianteBorrado) {
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }

    const idsCursos = estudianteBorrado.cursos;

    if (idsCursos && idsCursos.length > 0) {
      await Curso.updateMany(
        { _id: { $in: idsCursos } },
        { $pull: { estudiantes_inscritos: id } }
      );
    }

    return res.status(200).json({
      message: "Estudiante borrado exitosamente y referencias actualizadas",
      estudiante: estudianteBorrado,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al ejecutar el borrado",
      error: error.message,
    });
  }
};

export const estudiantesMasdeUnCurso = async (req, res) => {
  try {
    const estudiantes = await Estudiante.aggregate([
      { $match: { "cursos.1": { $exists: true } } },
      {$lookup : {
        from: "cursos", 
          localField: "cursos", 
          foreignField: "_id", 
          as: "cursos_info"
      }},
      {
        $project: {
          _id: 0,
          nombre: 1,
          totalCursos : {$size : "$cursos"} ,
          cursos : "$cursos_info.titulo"
        },
      },
    ]);

    return res.status(200).json(estudiantes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
