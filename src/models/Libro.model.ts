import { Schema, model } from "mongoose";
import { ILibro, IReserva } from "../types/libro.type";


const reservaSchema = new Schema<IReserva>({
  usuario: { type: String, required: true },
  fechaReserva: { type: Date, required: true },
  fechaEntrega: { type: Date, required: true },
});

const libroSchema = new Schema<ILibro>(
  {
    nombre: { type: String, required: true },
    autor: { type: String, required: true },
    genero: { type: String, required: true },
    casaEditorial: { type: String, required: true },
    fechaPublicacion: { type: Date, required: true },
    disponible: { type: Boolean, default: true },
    reservas: { type: [reservaSchema], default: [] }
  },
  {
    timestamps: true,
    collection: "libros",
  }
);

export const Libro = model<ILibro>("Libro", libroSchema);
