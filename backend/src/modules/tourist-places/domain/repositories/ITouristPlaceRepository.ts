// filepath: backend/src/modules/tourist-places/domain/repositories/ITouristPlaceRepository.ts
/**
 * Capa Domain - Puerto (Interface) para TouristPlaceRepository
 * Define el contrato que debe implementar la capa de infraestructura
 */

import { TouristPlaceEntity } from '../models/TouristPlaceEntity';

export interface ITouristPlaceRepository {
  findById(id: string): Promise<TouristPlaceEntity | null>;
  findByProvince(province: string): Promise<TouristPlaceEntity[]>;
  findByCategory(category: string): Promise<TouristPlaceEntity[]>;
  findAll(): Promise<TouristPlaceEntity[]>;
  save(place: TouristPlaceEntity): Promise<TouristPlaceEntity>;
  delete(id: string): Promise<void>;
}