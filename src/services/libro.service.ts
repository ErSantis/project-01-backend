import { Libro } from "../models/Libro.model";
import { ILibro } from "../types/libro.type";

export class LibroActions {
  static async create(data: ILibro): Promise<ILibro> {
    return await Libro.create(data);
  }

  static async readById(id: string): Promise<ILibro | null> {
    const libro = await Libro.findOne({ _id: id, disponible: true }).lean();
    if (!libro) {
      throw new Error("Book not found");
    }
    return libro;
  }

  static async readByFilters(filters: any): Promise<ILibro[]> {
    const libros = await Libro.find({ ...filters, disponible: true }).lean();
    if (!libros || libros.length === 0) {
      throw new Error("No books found");
    }
    return libros;
  }

  static async update(
    id: string,
    updates: Partial<ILibro>
  ): Promise<ILibro | null> {
    const targetLibro = await Libro.findById(id);
    if (!targetLibro) {
      throw new Error("Book not found");
    }

    return await Libro.findByIdAndUpdate(id, updates, {
      new: true,
    }).lean();
  }

  static async disable(id: string): Promise<void> {
    const targetLibro = await Libro.findById(id);
    if (!targetLibro) {
      throw new Error("Book not found");
    }

    targetLibro.disponible = false;
    await targetLibro.save();
  }
}
