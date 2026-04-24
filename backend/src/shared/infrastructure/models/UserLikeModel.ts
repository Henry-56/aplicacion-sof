// filepath: backend/src/shared/infrastructure/models/UserLikeModel.ts
/**
 * Modelo Sequelize - UserLike
 * Tabla: user_likes
 * Relaciona usuarios con sus lugares favoritos
 */

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../Database';

export interface UserLikeAttributes {
  id?: number;
  userId: string;
  placeId: string;
  createdAt?: Date;
}

export class UserLikeModel extends Model<UserLikeAttributes> implements UserLikeAttributes {
  public id!: number;
  public userId!: string;
  public placeId!: string;
  public readonly createdAt!: Date;
}

UserLikeModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    placeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'tourist_places',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'user_likes',
    timestamps: true,
    updatedAt: false, // Solo nos interesa cuándo se dio like
  }
);
