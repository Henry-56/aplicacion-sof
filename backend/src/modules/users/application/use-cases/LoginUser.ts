// filepath: backend/src/modules/users/application/use-cases/LoginUser.ts
/**
 * Capa Application - Caso de uso: Login de Usuario
 */

import { UserEntity } from '../../domain/models/UserEntity';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export interface LoginDTO {
  email: string;
  password: string;
}

export class LoginUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: LoginDTO): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(dto.email);
    
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // En producción: comparar con el hash de la contraseña
    if (user.password !== dto.password) {
      throw new Error('Credenciales inválidas');
    }

    return user;
  }
}
