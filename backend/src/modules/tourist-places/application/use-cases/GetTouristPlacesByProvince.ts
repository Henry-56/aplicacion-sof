// filepath: backend/src/modules/tourist-places/application/use-cases/GetTouristPlacesByProvince.ts
/**
 * Capa Application - Caso de uso: Obtener lugares por provincia
 */

import { TouristPlaceEntity } from '../../domain/models/TouristPlaceEntity';
import { ITouristPlaceRepository } from '../../domain/repositories/ITouristPlaceRepository';

export class GetTouristPlacesByProvinceUseCase {
  constructor(private readonly touristPlaceRepository: ITouristPlaceRepository) {}

  async execute(province: string): Promise<TouristPlaceEntity[]> {
    return await this.touristPlaceRepository.findByProvince(province);
  }
}