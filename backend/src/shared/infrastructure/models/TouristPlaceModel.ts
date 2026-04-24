// filepath: backend/src/shared/infrastructure/models/TouristPlaceModel.ts
/**
 * Modelo Sequelize - TouristPlace
 * Tabla: tourist_places
 * Lugares turísticos de Huancayo y Junín
 */

import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../Database';

export interface TouristPlaceAttributes {
  id: string;
  name: string;
  description: string;
  location: string;
  district: string;
  province: string;
  department: string;
  category: string;
  crowdLevel: 'Baja' | 'Media' | 'Alta';
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TouristPlaceCreationAttributes extends Optional<TouristPlaceAttributes, 'id' | 'createdAt' | 'updatedAt' | 'crowdLevel'> {}

export class TouristPlaceModel extends Model<TouristPlaceAttributes, TouristPlaceCreationAttributes> implements TouristPlaceAttributes {
  public id!: string;
  public name!: string;
  public description!: string;
  public location!: string;
  public district!: string;
  public province!: string;
  public department!: string;
  public category!: string;
  public crowdLevel!: 'Baja' | 'Media' | 'Alta';
  public imageUrl?: string;
  public latitude?: number;
  public longitude?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TouristPlaceModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: 'Junín',
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    crowdLevel: {
      type: DataTypes.ENUM('Baja', 'Media', 'Alta'),
      allowNull: false,
      defaultValue: 'Baja',
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'tourist_places',
    timestamps: true,
  }
);