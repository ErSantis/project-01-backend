import { Request, Response } from "express";
import { LibroActions } from "../services/libro.service";

export class LibroController {
  static async create(req: Request, res: Response) {

    const { nombre, autor, genero, casaEditorial, fechaPublicacion} = req.body;

    if (!nombre || !autor || !genero || !casaEditorial || !fechaPublicacion) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    try {
      const libro = await LibroActions.create(req.body);
      res.status(201).json(libro);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async readById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const libro = await LibroActions.readById(id);
      if (!libro) {
        res.status(404).json({ error: "Book not found" });
        return;
      }
      res.json(libro);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async readByFilters(req: Request, res: Response) {
    const filters = req.query;

    try {
      const libros = await LibroActions.readByFilters(filters);
      res.json(libros);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const updates = req.body;


    try {
      const libro = await LibroActions.update(id, updates);
      if (!libro) {
        res.status(404).json({ error: "Book not found" });
        return;
      }
      res.json(libro);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async disable(req: Request, res: Response) {
    const { id } = req.params;


    try {
      await LibroActions.disable(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async reservar(req: Request, res: Response) {
    const { id } = req.params;
    const { fechaReserva, fechaEntrega } = req.body;
    
    // Check if user is authenticated
    if (!req.user) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    if (!fechaReserva || !fechaEntrega) {
      res.status(400).json({ error: "Reservation date and return date are required" });
      return;
    }

    try {
      const libro = await LibroActions.reservar(id, {
        usuario: req.user._id, // Use authenticated user's ID
        fechaReserva: new Date(fechaReserva),
        fechaEntrega: new Date(fechaEntrega)
      });
      res.status(200).json(libro);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
