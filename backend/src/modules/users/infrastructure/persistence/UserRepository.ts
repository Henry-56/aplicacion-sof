// filepath: backend/src/modules/users/infrastructure/persistence/UserRepository.ts
/**
 * Capa Infrastructure - Adaptador de salida (Persistencia)
 * Implementa el puerto IUserRepository usando Sequelize
 */

import { UserEntity, UserProps } from '../../domain/models/UserEntity';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { UserModel } from '../../../../shared/infrastructure/models/UserModel';

export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<UserEntity | null> {
    const user = await UserModel.findByPk(id);
    if (!user) return null;
    return this.toEntity(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) return null;
    return this.toEntity(user);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await UserModel.findAll();
    return users.map((u) => this.toEntity(u));
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const [savedUser] = await UserModel.findOrCreate({
      where: { email: user.email },
      defaults: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    return this.toEntity(savedUser);
  }

  async delete(id: string): Promise<void> {
    await UserModel.destroy({ where: { id } });
  }

  private toEntity(model: UserModel): UserEntity {
    return new UserEntity({
      id: model.id,
      name: model.name,
      email: model.email,
      password: model.password,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }
}