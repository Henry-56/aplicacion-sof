// filepath: backend/src/modules/orders/application/use-cases/GetOrderById.ts
/**
 * Capa Application - Caso de uso: Obtener Orden por ID
 */

import { OrderEntity } from '../../domain/models/OrderEntity';
import { IOrderRepository } from '../../domain/repositories/IOrderRepository';

export class GetOrderByIdUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(id: string): Promise<OrderEntity | null> {
    return await this.orderRepository.findById(id);
  }
}