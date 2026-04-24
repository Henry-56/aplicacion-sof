// filepath: backend/src/modules/orders/application/use-cases/CreateOrder.ts
/**
 * Capa Application - Caso de uso: Crear Orden
 * Coordina la lógica de negocio sin conocer detalles de implementación
 */

import { OrderEntity, OrderProps } from '../../domain/models/OrderEntity';
import { IOrderRepository } from '../../domain/repositories/IOrderRepository';

export interface CreateOrderDTO {
  userId: string;
  items: { productId: string; quantity: number; price: number }[];
}

export class CreateOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(dto: CreateOrderDTO): Promise<OrderEntity> {
    // Calcular total
    const total = dto.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const orderProps: OrderProps = {
      userId: dto.userId,
      total,
      status: 'pending',
      items: dto.items,
    };

    const order = new OrderEntity(orderProps);
    return await this.orderRepository.save(order);
  }
}