// filepath: backend/src/main.ts
/**
 * Punto de entrada de la aplicación
 * 
 * Arquitectura Hexagonal:
 * - Domain: Entidades y reglas de negocio puras
 * - Application: Casos de uso (servicios)
 * - Infrastructure: Adaptadores (controllers, persistence)
 */

import express from 'express';
import cors from 'cors';
import { sequelize, testConnection } from './shared/infrastructure/Database';
import { UserModel } from './shared/infrastructure/models/UserModel';
import { TouristPlaceModel } from './shared/infrastructure/models/TouristPlaceModel';
import { UserLikeModel } from './shared/infrastructure/models/UserLikeModel';
import { seedTouristPlaces } from './shared/infrastructure/models/seeders';

// Repositorios
import { UserRepository } from './modules/users/infrastructure/persistence/UserRepository';
import { TouristPlaceRepository } from './modules/tourist-places/infrastructure/persistence/TouristPlaceRepository';

// Casos de uso
import { CreateUserUseCase } from './modules/users/application/use-cases/CreateUser';
import { GetUserByIdUseCase } from './modules/users/application/use-cases/GetUserById';
import { LoginUserUseCase } from './modules/users/application/use-cases/LoginUser';
import { GetAllTouristPlacesUseCase } from './modules/tourist-places/application/use-cases/GetAllTouristPlaces';
import { GetTouristPlaceByIdUseCase } from './modules/tourist-places/application/use-cases/GetTouristPlaceById';
import { GetTouristPlacesByProvinceUseCase } from './modules/tourist-places/application/use-cases/GetTouristPlacesByProvince';

// Controladores
import { UserController } from './modules/users/infrastructure/controllers/UserController';
import { TouristPlaceController } from './modules/tourist-places/infrastructure/controllers/TouristPlaceController';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Inicializar repositorios
const userRepository = new UserRepository();
const touristPlaceRepository = new TouristPlaceRepository();

// Inicializar casos de uso
const createUserUseCase = new CreateUserUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const loginUserUseCase = new LoginUserUseCase(userRepository);
const getAllTouristPlacesUseCase = new GetAllTouristPlacesUseCase(touristPlaceRepository);
const getTouristPlaceByIdUseCase = new GetTouristPlaceByIdUseCase(touristPlaceRepository);
const getTouristPlacesByProvinceUseCase = new GetTouristPlacesByProvinceUseCase(touristPlaceRepository);

// Inicializar controladores
const userController = new UserController(createUserUseCase, getUserByIdUseCase, loginUserUseCase);
const touristPlaceController = new TouristPlaceController(
  getAllTouristPlacesUseCase,
  getTouristPlaceByIdUseCase,
  getTouristPlacesByProvinceUseCase
);

// Rutas
app.post('/api/users', (req, res) => userController.create(req, res));
app.post('/api/users/login', (req, res) => userController.login(req, res));
app.get('/api/users/:id', (req, res) => userController.getById(req, res));

// Rutas de favoritos (Likes)
app.post('/api/users/likes', (req, res) => userController.toggleLike(req, res));
app.get('/api/users/:userId/likes', (req, res) => userController.getLikes(req, res));

app.get('/api/tourist-places', (req, res) => touristPlaceController.getAll(req, res));
app.get('/api/tourist-places/:id', (req, res) => touristPlaceController.getById(req, res));
app.get('/api/tourist-places/province/:province', (req, res) => touristPlaceController.getByProvince(req, res));


// Iniciar servidor
async function start() {
  try {
    // Probar conexión
    await testConnection();
    
    // Sincronizar modelos (crear tablas)
    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados con la base de datos');
    
    // Sembrar datos iniciales
    await seedTouristPlaces();
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

start();

export default app;