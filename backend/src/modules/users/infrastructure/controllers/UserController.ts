// filepath: backend/src/modules/users/infrastructure/controllers/UserController.ts
/**
 * Capa Infrastructure - Adaptador de entrada (Controlador)
 * Expone los casos de uso a través de una interfaz HTTP
 */

import { Request, Response } from 'express';
import { CreateUserUseCase, CreateUserDTO } from '../../application/use-cases/CreateUser';
import { GetUserByIdUseCase } from '../../application/use-cases/GetUserById';
import { LoginUserUseCase, LoginDTO } from '../../application/use-cases/LoginUser';
import { UserLikeModel } from '../../../../shared/infrastructure/models/UserLikeModel';

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly loginUserUseCase: LoginUserUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const dto: CreateUserDTO = req.body;
      const user = await this.createUserUseCase.execute(dto);
      return res.status(201).json(user.toJSON());
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const dto: LoginDTO = req.body;
      const user = await this.loginUserUseCase.execute(dto);
      return res.json({
        message: 'Login exitoso',
        user: user.toJSON()
      });
    } catch (error) {
      return res.status(401).json({ error: (error as Error).message });
    }
  }

  async toggleLike(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, placeId } = req.body;
      const existing = await UserLikeModel.findOne({ where: { userId, placeId } });
      
      if (existing) {
        await existing.destroy();
        return res.json({ liked: false });
      } else {
        await UserLikeModel.create({ userId, placeId });
        return res.json({ liked: true });
      }
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  async getLikes(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const likes = await UserLikeModel.findAll({ where: { userId } });
      return res.json(likes.map(l => l.placeId));
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {

    try {
      const id = req.params.id as string;
      const user = await this.getUserByIdUseCase.execute(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      return res.json(user.toJSON());
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
}