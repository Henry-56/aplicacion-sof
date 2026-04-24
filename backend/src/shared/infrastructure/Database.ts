// filepath: backend/src/shared/infrastructure/Database.ts
/**
 * Shared Infrastructure - Conexión a PostgreSQL Neon usando Sequelize
 */

import 'dotenv/config';
import { Sequelize } from 'sequelize';
import pg from 'pg';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL no está configurada en el archivo .env');
}

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false, // Desactivar logs de SQL para limpieza en consola
});

export async function testConnection(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a PostgreSQL (Sequelize) establecida');
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    throw error;
  }
}

export default sequelize;