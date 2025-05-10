import { Libro } from "../models/Libro.model";
import { ILibro, IReserva } from "../types/libro.type";

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
    const targetLibro = await Libro.findOne({
      _id: id,
      disponible: true,
    });
    if (!targetLibro) {
      throw new Error("Book not found");
    }

    targetLibro.disponible = false;
    await targetLibro.save();
  }

  static async reservar(
    id: string,
    reservaData: IReserva
  ): Promise<ILibro | null> {
    const targetLibro = await Libro.findOne({
      _id: id,
      disponible: true,
    });

    if (!targetLibro) {
      throw new Error("Book not found");
    }

    if (!targetLibro.disponible) {
      throw new Error("The book is not available for reservation");
    }

    // Check if the book is already reserved
    if (targetLibro.reservas && targetLibro.reservas.length > 0) {
      const reservaActiva = targetLibro.reservas.find(
        (reserva) =>
          new Date(reserva.fechaEntrega) > new Date() &&
          new Date(reservaData.fechaReserva) < new Date(reserva.fechaEntrega)
      );

      if (reservaActiva) {
        throw new Error("The book is already reserved for the requested dates");
      }
    }

    // Validate reservation dates
    const today = new Date();
    if (new Date(reservaData.fechaReserva) < today) {
      throw new Error("Reservation date cannot be in the past");
    }

    if (
      new Date(reservaData.fechaEntrega) <= new Date(reservaData.fechaReserva)
    ) {
      throw new Error("Return date must be after the reservation date");
    }

    // Add the reservation
    targetLibro.reservas.push(reservaData);

    await targetLibro.save();
    return targetLibro;
  }
}
