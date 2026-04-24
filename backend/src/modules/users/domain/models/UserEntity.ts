// filepath: backend/src/modules/users/domain/models/UserEntity.ts
/**
 * Capa Domain - Entidad User
 * Representa las reglas de negocio puras sin dependencias externas
 */

export interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserEntity {
  private readonly _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: UserProps) {
    this._id = props.id || crypto.randomUUID();
    this._name = props.name;
    this._email = props.email;
    this._password = props.password;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  get id(): string { return this._id; }
  get name(): string { return this._name; }
  get email(): string { return this._email; }
  get password(): string { return this._password; }
  get createdAt(): Date { return this._createdAt; }
  get updatedAt(): Date { return this._updatedAt; }

  updateName(name: string): void {
    this._name = name;
    this._updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}