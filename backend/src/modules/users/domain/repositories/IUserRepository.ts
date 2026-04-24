// filepath: backend/src/modules/users/domain/repositories/IUserRepository.ts
/**
 * Capa Domain - Puerto (Interface) para UserRepository
 * Define el contrato que debe implementar la capa de infraestructura
 */

import { UserEntity } from '../models/UserEntity';

export interface IUserRepository {
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findAll(): Promise<UserEntity[]>;
  save(user: UserEntity): Promise<UserEntity>;
  delete(id: string): Promise<void>;
}