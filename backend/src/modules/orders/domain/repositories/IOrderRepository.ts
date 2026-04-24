// filepath: backend/src/modules/orders/domain/repositories/IOrderRepository.ts
/**
 * Capa Domain - Puerto (Interface) para OrderRepository
 * Define el contrato que debe implementar la capa de infraestructura
 */

import { OrderEntity } from '../models/OrderEntity';

export interface IOrderRepository {
  findById(id: string): Promise<OrderEntity | null>;
  findByUserId(userId: string): Promise<OrderEntity[]>;
  findAll(): Promise<OrderEntity[]>;
  save(order: OrderEntity): Promise<OrderEntity>;
  delete(id: string): Promise<void>;
}