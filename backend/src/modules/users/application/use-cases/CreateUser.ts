// filepath: backend/src/modules/users/application/use-cases/CreateUser.ts
/**
 * Capa Application - Caso de uso: Crear Usuario
 * Coordina la lógica de negocio sin conocer detalles de implementación
 */

import { UserEntity, UserProps } from '../../domain/models/UserEntity';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: CreateUserDTO): Promise<UserEntity> {
    // Validaciones de negocio
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    const userProps: UserProps = {
      name: dto.name,
      email: dto.email,
      password: dto.password, // En producción: hashear la contraseña
    };

    const user = new UserEntity(userProps);
    return await this.userRepository.save(user);
  }
}