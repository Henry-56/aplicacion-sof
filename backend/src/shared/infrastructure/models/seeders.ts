// filepath: backend/src/shared/infrastructure/models/seeders.ts
/**
 * Seed - Datos iniciales de lugares turísticos de Huancayo y Junín
 */

import { TouristPlaceModel, TouristPlaceCreationAttributes } from './TouristPlaceModel';

export const touristPlacesSeed: TouristPlaceCreationAttributes[] = [
  {
    name: 'Plaza de la Constitución',
    description: 'La plaza principal de Huancayo, rodeada de arquitectura colonial y edificios históricos.',
    location: 'Centro Histórico',
    district: 'Huancayo',
    province: 'Huancayo',
    department: 'Junín',
    category: 'Patrimonio',
    crowdLevel: 'Alta',
    latitude: -12.0691,
    longitude: -75.2042,
    imageUrl: 'data:image/jpeg;base64,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'
  },
  {
    name: 'Cerro de la Libertad',
    description: 'Mirador natural con vista panorámica a la ciudad de Huancayo y los valles interandinos.',
    location: 'Barrio San Cristóbal',
    district: 'Huancayo',
    province: 'Huancayo',
    department: 'Junín',
    category: 'Naturaleza',
    crowdLevel: 'Media',
    latitude: -12.0525,
    longitude: -75.1989,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Huancayo%2C_Cerrito_de_la_Libertad.jpg'
  },
  {
    name: 'Museo Regional de Junín',
    description: 'Museo que exhibe piezas arqueológicas de las culturas prehispánicas de la región.',
    location: 'Av. Peru',
    district: 'Huancayo',
    province: 'Huancayo',
    department: 'Junín',
    category: 'Cultura',
    crowdLevel: 'Baja',
    latitude: -12.0683,
    longitude: -75.2056,
    imageUrl: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'Laguna de Paca',
    description: 'Hermosa laguna rodeada de totoras y flora nativa, ideal para paseos en bote.',
    location: 'Distrito de Paca',
    district: 'Paca',
    province: 'Jauja',
    department: 'Junín',
    category: 'Naturaleza',
    crowdLevel: 'Alta',
    latitude: -11.7833,
    longitude: -75.4667,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Laguna_de_Paca.jpg'
  },
  {
    name: 'Templo de la Veracruz',
    description: 'Iglesia colonial del siglo XVI con arquitectura renacentista y retablos barrocos.',
    location: 'Plaza de Armas',
    district: 'Jauja',
    province: 'Jauja',
    department: 'Junín',
    category: 'Patrimonio',
    crowdLevel: 'Baja',
    latitude: -11.7758,
    longitude: -75.4961,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Capilla_cristo-pobre.jpg'
  },
  {
    name: 'Bosque de Piedras de Runatullo',
    description: 'Formaciones rocosas naturales que parecen esculturas, rodeadas de flora andina.',
    location: 'Distrito de Runatullo',
    district: 'Runatullo',
    province: 'Tarma',
    department: 'Junín',
    category: 'Naturaleza',
    crowdLevel: 'Baja',
    latitude: -11.4167,
    longitude: -75.6500,
    imageUrl: 'https://images.unsplash.com/photo-1582231644140-5e821034f71a?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'Catarata de Aco',
    description: 'Impresionante cascada de más de 30 metros de altura en plena cordillera.',
    location: 'Distrito de Aco',
    district: 'Aco',
    province: 'Tarma',
    department: 'Junín',
    category: 'Naturaleza',
    crowdLevel: 'Media',
    latitude: -11.2833,
    longitude: -75.7833,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'Ciudad Prehispánica de Vilca',
    description: 'Sitio arqueológico de la cultura Huari con estructuras piramidales y plazas.',
    location: 'Distrito de Vilca',
    district: 'Vilca',
    province: 'Huancayo',
    department: 'Junín',
    category: 'Arqueología',
    crowdLevel: 'Baja',
    latitude: -12.2500,
    longitude: -75.1167,
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'Nevado Huaytapallana',
    description: 'Montaña nevada de más de 5,500 metros, ideal para trekking de alta montaña.',
    location: 'Cordillera Central',
    district: 'Yauli',
    province: 'Yauli',
    department: 'Junín',
    category: 'Aventura',
    crowdLevel: 'Media',
    latitude: -11.9000,
    longitude: -75.8833,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Huaytapallana_panoramica.jpg'
  },
  {
    name: 'Laguna de Junín',
    description: 'Segunda laguna más grande del Perú, habitat de aves migratorias y flora nativa.',
    location: 'Meseta del Bombón',
    district: 'Junín',
    province: 'Junín',
    department: 'Junín',
    category: 'Naturaleza',
    crowdLevel: 'Media',
    latitude: -11.0333,
    longitude: -76.0167,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Lago_Junin.jpg'
  },
  {
    name: 'Santuario Nacional de Pampa Hermosa',
    description: 'Reserva natural con cuevas prehistóricas y pinturas rupestres.',
    location: 'Distrito de Pampa Hermosa',
    district: 'Pampa Hermosa',
    province: 'Jauja',
    department: 'Junín',
    category: 'Arqueología',
    crowdLevel: 'Baja',
    latitude: -11.6500,
    longitude: -75.3000,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Paisaje_de_Santuario_Nacional_de_Pampa_Hermosa.jpg'
  },
  {
    name: 'Puente de Piedra de Jauja',
    description: 'Puente colonial de piedra sobre el río Mantaro, patrimonio histórico.',
    location: 'Centro Histórico',
    district: 'Jauja',
    province: 'Jauja',
    department: 'Junín',
    category: 'Patrimonio',
    crowdLevel: 'Alta',
    latitude: -11.7742,
    longitude: -75.4939,
    imageUrl: 'https://images.unsplash.com/photo-1570126688035-1e0adadb32bc?auto=format&fit=crop&q=80&w=800'
  },
];

export async function seedTouristPlaces(): Promise<void> {
  try {
    for (const place of touristPlacesSeed) {
      await TouristPlaceModel.findOrCreate({
        where: { name: place.name },
        defaults: place,
      });
    }
    console.log('✅ Datos de lugares turísticos sembrados');
  } catch (error) {
    console.error('❌ Error al sembrar datos:', error);
  }
}