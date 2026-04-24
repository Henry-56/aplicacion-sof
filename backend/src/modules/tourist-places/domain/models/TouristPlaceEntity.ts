// filepath: backend/src/modules/tourist-places/domain/models/TouristPlaceEntity.ts
/**
 * Capa Domain - Entidad TouristPlace
 * Representa las reglas de negocio puras sin dependencias externas
 */

export interface TouristPlaceProps {
  id?: string;
  name: string;
  description: string;
  location: string;
  district: string;
  province: string;
  department: string;
  category: string;
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class TouristPlaceEntity {
  private readonly _id: string;
  private _name: string;
  private _description: string;
  private _location: string;
  private _district: string;
  private _province: string;
  private _department: string;
  private _category: string;
  private _imageUrl?: string;
  private _latitude?: number;
  private _longitude?: number;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: TouristPlaceProps) {
    this._id = props.id || crypto.randomUUID();
    this._name = props.name;
    this._description = props.description;
    this._location = props.location;
    this._district = props.district;
    this._province = props.province;
    this._department = props.department;
    this._category = props.category;
    this._imageUrl = props.imageUrl;
    this._latitude = props.latitude;
    this._longitude = props.longitude;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  get id(): string { return this._id; }
  get name(): string { return this._name; }
  get description(): string { return this._description; }
  get location(): string { return this._location; }
  get district(): string { return this._district; }
  get province(): string { return this._province; }
  get department(): string { return this._department; }
  get category(): string { return this._category; }
  get imageUrl(): string | undefined { return this._imageUrl; }
  get latitude(): number | undefined { return this._latitude; }
  get longitude(): number | undefined { return this._longitude; }
  get createdAt(): Date { return this._createdAt; }
  get updatedAt(): Date { return this._updatedAt; }

  updateImageUrl(imageUrl: string): void {
    this._imageUrl = imageUrl;
    this._updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this._id,
      name: this._name,
      description: this._description,
      location: this._location,
      district: this._district,
      province: this._province,
      department: this._department,
      category: this._category,
      imageUrl: this._imageUrl,
      latitude: this._latitude,
      longitude: this._longitude,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}