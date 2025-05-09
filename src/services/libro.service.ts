import { Libro } from "../models/Libro.model";

export class LibroActions {
  static async create(data: any) {
    return await Libro.create(data);
  }

  static async readById(id: string) {
    return await Libro.findOne({ _id: id, inhabilitado: false });
  }

  static async readByFilters(filters: any) {
    return await Libro.find(filters);
  }

  static async update(id: string, updates: any) {
    return await Libro.findByIdAndUpdate(id, updates, { new: true });
  }

  static async disable(id: string) {
    return await Libro.findByIdAndUpdate(id, { inhabilitado: true });
  }
}
