// filepath: backend/src/modules/users/application/use-cases/GetUserById.ts
/**
 * Capa Application - Caso de uso: Obtener Usuario por ID
 */

import { UserEntity } from '../../domain/models/UserEntity';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<UserEntity | null> {
    return await this.userRepository.findById(id);
  }
}