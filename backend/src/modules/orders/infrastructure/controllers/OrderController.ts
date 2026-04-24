// filepath: backend/src/modules/orders/infrastructure/controllers/OrderController.ts
/**
 * Capa Infrastructure - Adaptador de entrada (Controlador)
 * Expone los casos de uso a través de una interfaz HTTP
 */

import { Request, Response } from 'express';
import { CreateOrderUseCase, CreateOrderDTO } from '../../application/use-cases/CreateOrder';
import { GetOrderByIdUseCase } from '../../application/use-cases/GetOrderById';

export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOrderByIdUseCase: GetOrderByIdUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const dto: CreateOrderDTO = req.body;
      const order = await this.createOrderUseCase.execute(dto);
      return res.status(201).json(order.toJSON());
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id as string;
      const order = await this.getOrderByIdUseCase.execute(id);
      if (!order) {
        return res.status(404).json({ error: 'Orden no encontrada' });
      }
      return res.json(order.toJSON());
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
}