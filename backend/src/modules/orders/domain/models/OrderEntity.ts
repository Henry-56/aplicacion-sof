// filepath: backend/src/modules/orders/domain/models/OrderEntity.ts
/**
 * Capa Domain - Entidad Order
 * Representa las reglas de negocio puras sin dependencias externas
 */

export interface OrderProps {
  id?: string;
  userId: string;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  items: OrderItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export class OrderEntity {
  private readonly _id: string;
  private readonly _userId: number;
  private _total: number;
  private _status: 'pending' | 'completed' | 'cancelled';
  private readonly _items: OrderItem[];
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: OrderProps) {
    this._id = props.id || crypto.randomUUID();
    this._userId = props.userId as unknown as number;
    this._total = props.total;
    this._status = props.status;
    this._items = [...props.items];
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  get id(): string { return this._id; }
  get userId(): number { return this._userId; }
  get total(): number { return this._total; }
  get status(): 'pending' | 'completed' | 'cancelled' { return this._status; }
  get items(): OrderItem[] { return [...this._items]; }
  get createdAt(): Date { return this._createdAt; }
  get updatedAt(): Date { return this._updatedAt; }

  complete(): void {
    if (this._status !== 'pending') {
      throw new Error('Solo se pueden completar órdenes pendientes');
    }
    this._status = 'completed';
    this._updatedAt = new Date();
  }

  cancel(): void {
    if (this._status === 'completed') {
      throw new Error('No se puede cancelar una orden completada');
    }
    this._status = 'cancelled';
    this._updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this._id,
      userId: this._userId,
      total: this._total,
      status: this._status,
      items: this._items,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}