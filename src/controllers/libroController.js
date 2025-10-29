import { Libro } from "../models/libro.js";
import { Autor } from "../models/autor.js";

export const mostrarTodos = async (req, res) => {
  try {
    const libros = await Libro.find();

    if (libros.length === 0) {
      res.status(204).json([]);
    }

    res.status(200).json(libros);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error interno del servidor: " + error.message });
  }
};

export const crearLibro = async (req, res) => {
  try {
    const { titulo, paginas, autor, categorias } = req.body;
    const autorExiste = await Autor.findById(autor);

    if (!autorExiste) {
      return res
        .status(404)
        .json({ message: "No se encontro el autor especificado" });
    }
    const nuevoLibro = new Libro({
      titulo,
      paginas,
      autor,
      categorias,
    });

    const libroGuardado = await nuevoLibro.save();

    return res.status(201).json(libroGuardado);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const buscarLibroPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const libroEncontrado = await Libro.findById(id).populate("autor");

    if (!libroEncontrado) {
      return res.status(404).json({ message: "Libro no encontrado" }); // 404 = No Encontrado
    }

    res.status(200).json(libroEncontrado);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el libro" });
  }
};

export const actualizarLibro = async (req, res) => {
  try {
    const { id } = req.params;
    const nuevosDatos = req.body;

    if (nuevosDatos.autor) {
      const nuevoAutorID = nuevosDatos.autor;
      const autorExiste = await Autor.exists({ _id: nuevoAutorID });
      if (!autorExiste) {
        return res
          .status(404)
          .json({ message: "El autor especificado no existe" });
      }
    }

    const libroActualizado = await Libro.findByIdAndUpdate(id, nuevosDatos, {
      new: true,
    });

    if (!libroActualizado) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    res.status(200).json(libroActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const borrarLibroId = async (req, res) => {
  try {
    const { id } = req.params;
    const libroBorrado = await Libro.findByIdAndDelete(id);

    if (!libroBorrado) {
      res.status(404).json({ message: "Libro no encontrado" });
    }

    res.status(200).json({
      message: "Libro borrado exitosamente",
      libro: libroBorrado,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const promedioPaginas = async (req, res) => {
  try {
    const pipeline = [
      { $group: { _id: '$autor', promedioPaginas: { $avg: "$paginas" } } },
      {
        $lookup: {
          from: 'autors',
          localField: '_id',
          foreignField: '_id',
          as: 'datosAutor'
        }
      },
      { $unwind: '$datosAutor' },
      {
        $project: {
          _id: 0,
          autor: '$datosAutor.nombre',
          promedio: '$promedioPaginas'
        }
      }
    ];
    
    const promedio = await Libro.aggregate(pipeline);

    return res.status(200).json(promedio);

  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los promedios", error: error.message });
  }
};
