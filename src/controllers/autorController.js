import { Autor } from "../models/autor.js";
import { Libro } from "../models/libro.js";
export const crearAutor = async (req, res) => {
  try {
    const { nombre, nacimiento } = req.body;

    const nuevoAutor = new Autor({
      nombre,
      nacimiento,
    });

    const autorGuardado = await nuevoAutor.save();

    return res.status(201).json(autorGuardado);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const mostrarTodos = async (req, res) => {
  try {
    const autores = await Autor.find();
    if (autores.length === 0) {
      res.status(204).json([]);
    }
    res.status(200).json(autores);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const buscarAutorId = async (req, res) => {
  try {
    const { id } = req.params;
    const autorEncontrado = await Autor.findById(id);

    if (!autorEncontrado) {
      res.status(404).json({ message: "Autor no encontrado" });
    }
    res.status(201).json(autorEncontrado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const actualizarAutor = async (req, res) => {
  try {
    const { id } = req.params;
    const nuevosDatos = req.body;

    const autorActualizado = await Autor.findByIdAndUpdate(
      id,
      nuevosDatos, 
      { new: true }
    );

    return res.status(200).json(autorActualizado);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el autor" });
  }
};

export const borrarAutor = async (req, res) => {
  try {
    const { id } = req.params;
    await Libro.deleteMany({ autor: id });
    const autorBorrado = await Autor.findByIdAndDelete(id);

    if (!autorBorrado) {
      return res.status(404).json({ message: "Autor no encontrado" });
    }

    res
      .status(200)
      .json({ message: "Autor borrado exitosamente", autor: autorBorrado });
  } catch (error) {
    res.status(400).json({ message: "Error al ejecutar el borrado" });
  }
};

export const totalLibros = async (req, res) => {
  try {
    const autores = await Autor.aggregate([
      {
        $lookup: {
          from: "libros",
          localField: "_id",
          foreignField: "autor",
          as: "librosDelAutor",
        },
      },

      {
        $addFields: {
          cantidadLibros: { $size: "$librosDelAutor" },
        },
      },
      {
        $project: {
          _id: 0,
          nombre: "$nombre",
          cantidadLibros: "$cantidadLibros",
        },
      },
    ]);
    return res.status(200).json(autores);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al obtener autores con total de libros" });
  }
};
