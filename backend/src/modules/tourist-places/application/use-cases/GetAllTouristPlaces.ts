// filepath: backend/src/modules/tourist-places/application/use-cases/GetAllTouristPlaces.ts
/**
 * Capa Application - Caso de uso: Obtener todos los lugares turísticos
 */

import { TouristPlaceEntity } from '../../domain/models/TouristPlaceEntity';
import { ITouristPlaceRepository } from '../../domain/repositories/ITouristPlaceRepository';

export class GetAllTouristPlacesUseCase {
  constructor(private readonly touristPlaceRepository: ITouristPlaceRepository) {}

  async execute(): Promise<TouristPlaceEntity[]> {
    return await this.touristPlaceRepository.findAll();
  }
}