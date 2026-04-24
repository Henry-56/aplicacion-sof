// filepath: backend/src/modules/tourist-places/infrastructure/controllers/TouristPlaceController.ts
/**
 * Capa Infrastructure - Adaptador de entrada (Controlador)
 * Expone los casos de uso a través de una interfaz HTTP
 */

import { Request, Response } from 'express';
import { GetAllTouristPlacesUseCase } from '../../application/use-cases/GetAllTouristPlaces';
import { GetTouristPlaceByIdUseCase } from '../../application/use-cases/GetTouristPlaceById';
import { GetTouristPlacesByProvinceUseCase } from '../../application/use-cases/GetTouristPlacesByProvince';

export class TouristPlaceController {
  constructor(
    private readonly getAllTouristPlacesUseCase: GetAllTouristPlacesUseCase,
    private readonly getTouristPlaceByIdUseCase: GetTouristPlaceByIdUseCase,
    private readonly getTouristPlacesByProvinceUseCase: GetTouristPlacesByProvinceUseCase
  ) {}

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const places = await this.getAllTouristPlacesUseCase.execute();
      return res.json(places.map((p) => p.toJSON()));
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id as string;
      const place = await this.getTouristPlaceByIdUseCase.execute(id);
      if (!place) {
        return res.status(404).json({ error: 'Lugar turístico no encontrado' });
      }
      return res.json(place.toJSON());
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  async getByProvince(req: Request, res: Response): Promise<Response> {
    try {
      const province = req.params.province as string;
      const places = await this.getTouristPlacesByProvinceUseCase.execute(province);
      return res.json(places.map((p) => p.toJSON()));
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
}