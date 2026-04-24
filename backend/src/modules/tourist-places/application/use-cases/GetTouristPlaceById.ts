// filepath: backend/src/modules/tourist-places/application/use-cases/GetTouristPlaceById.ts
/**
 * Capa Application - Caso de uso: Obtener lugar turístico por ID
 */

import { TouristPlaceEntity } from '../../domain/models/TouristPlaceEntity';
import { ITouristPlaceRepository } from '../../domain/repositories/ITouristPlaceRepository';

export class GetTouristPlaceByIdUseCase {
  constructor(private readonly touristPlaceRepository: ITouristPlaceRepository) {}

  async execute(id: string): Promise<TouristPlaceEntity | null> {
    return await this.touristPlaceRepository.findById(id);
  }
}