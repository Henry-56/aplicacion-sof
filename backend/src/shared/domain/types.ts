// filepath: backend/src/shared/domain/types.ts
/**
 * Shared Domain - Tipos globales
 * Tipos compartidos entre todas las entidades
 */

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}