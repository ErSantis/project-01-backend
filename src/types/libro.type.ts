export interface IReserva {
  usuario: string;
  fechaReserva: Date;
  fechaEntrega: Date;
}

export interface ILibro {
  _id?: string;
  nombre: string;
  autor: string;
  genero: string;
  casaEditorial: string;
  fechaPublicacion: Date;
  disponible: boolean;
  reservas: IReserva[];
  createdAt?: Date;
  updatedAt?: Date;
}
