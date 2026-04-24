// filepath: backend/src/modules/orders/infrastructure/persistence/OrderRepository.ts
/**
 * Capa Infrastructure - Adaptador de salida (Persistencia)
 * Implementa el puerto IOrderRepository usando una base de datos
 */

import { OrderEntity, OrderProps } from '../../domain/models/OrderEntity';
import { IOrderRepository } from '../../domain/repositories/IOrderRepository';

// Simulación de base de datos en memoria
const ordersDB: Map<string, OrderEntity> = new Map();

export class OrderRepository implements IOrderRepository {
  async findById(id: string): Promise<OrderEntity | null> {
    return ordersDB.get(id) || null;
  }

  async findByUserId(userId: string): Promise<OrderEntity[]> {
    return Array.from(ordersDB.values()).filter(o => o.userId.toString() === userId);
  }

  async findAll(): Promise<OrderEntity[]> {
    return Array.from(ordersDB.values());
  }

  async save(order: OrderEntity): Promise<OrderEntity> {
    ordersDB.set(order.id, order);
    return order;
  }

  async delete(id: string): Promise<void> {
    ordersDB.delete(id);
  }
}