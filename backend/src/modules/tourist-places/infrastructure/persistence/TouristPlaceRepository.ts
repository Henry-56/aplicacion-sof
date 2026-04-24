// filepath: backend/src/modules/tourist-places/infrastructure/persistence/TouristPlaceRepository.ts
/**
 * Capa Infrastructure - Adaptador de salida (Persistencia)
 * Implementa el puerto ITouristPlaceRepository usando Sequelize
 */

import { TouristPlaceEntity, TouristPlaceProps } from '../../domain/models/TouristPlaceEntity';
import { ITouristPlaceRepository } from '../../domain/repositories/ITouristPlaceRepository';
import { TouristPlaceModel } from '../../../../shared/infrastructure/models/TouristPlaceModel';

export class TouristPlaceRepository implements ITouristPlaceRepository {
  async findById(id: string): Promise<TouristPlaceEntity | null> {
    const place = await TouristPlaceModel.findByPk(id);
    if (!place) return null;
    return this.toEntity(place);
  }

  async findByProvince(province: string): Promise<TouristPlaceEntity[]> {
    const places = await TouristPlaceModel.findAll({
      where: { province: province },
    });
    return places.map((p) => this.toEntity(p));
  }

  async findByCategory(category: string): Promise<TouristPlaceEntity[]> {
    const places = await TouristPlaceModel.findAll({
      where: { category },
    });
    return places.map((p) => this.toEntity(p));
  }

  async findAll(): Promise<TouristPlaceEntity[]> {
    const places = await TouristPlaceModel.findAll();
    return places.map((p) => this.toEntity(p));
  }

  async save(place: TouristPlaceEntity): Promise<TouristPlaceEntity> {
    const [savedPlace] = await TouristPlaceModel.findOrCreate({
      where: { name: place.name },
      defaults: {
        id: place.id,
        name: place.name,
        description: place.description,
        location: place.location,
        district: place.district,
        province: place.province,
        department: place.department,
        category: place.category,
        imageUrl: place.imageUrl,
        latitude: place.latitude,
        longitude: place.longitude,
      },
    });
    return this.toEntity(savedPlace);
  }

  async delete(id: string): Promise<void> {
    await TouristPlaceModel.destroy({ where: { id } });
  }

  private toEntity(model: TouristPlaceModel): TouristPlaceEntity {
    return new TouristPlaceEntity({
      id: model.id,
      name: model.name,
      description: model.description,
      location: model.location,
      district: model.district,
      province: model.province,
      department: model.department,
      category: model.category,
      imageUrl: model.imageUrl,
      latitude: model.latitude ? Number(model.latitude) : undefined,
      longitude: model.longitude ? Number(model.longitude) : undefined,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }
}