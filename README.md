# Backend

Backend para la gestion de usuarios, camiones, ubicaciones y ordenes

## Caracteristicas
- Se creo un CRUD para los camiones, ubicaciones y ordenes
- se agrego al autenticain con JWT el cual se configuro para que dure 1hr
- Se integro Places API (new) para gestion de ubicaciones

## Tecnologias
- Nde.js
- Express
- MongoDB
- JWT
- dotenv
- bcrypt
- Google Places API

## Instalacion

1. Clonar repositorio
``` bash
git clone git@github.com:ICDDGS/backendTest1.git
```
2. Entrar a la carpeta
``` bash
cd backendTest1
```
4. Instalar Dependecias
``` bash
npm install
```
6. agregar .env
7. Ejecutar el comando
``` bash
npm run dev
```
## Endpoints
###
| Método | Endpoint              | Descripción         |
| ------ | --------------------- | ------------------- |
| POST   | `/api/users/createUser` | Registro de usuario |
| POST   | `/api/users/readUser`    | Inicio de sesión    |

### Trucks
| Método | Endpoint                       | Descripción   |
| ------ | ------------------------------ | ------------- |
| POST   | `/api/trucks/createTruck`      | Crear camión  |
| GET    | `/api/trucks/getAlltrucks`     | Obtener todos |
| GET    | `/api/trucks/getTruckById/:id` | Obtener uno   |
| PUT    | `/api/trucks/updateTruck/:id`  | Actualizar    |
| DELETE | `/api/trucks/deletetruck/:id`  | Eliminar      |

### Locations
| Método | Endpoint                            | Descripción     |
| ------ | ----------------------------------- | --------------- |
| POST   | `/api/locations/createLocation`     | Crear ubicación |
| GET    | `/api/locations/getAllLocations`    | Obtener todas   |
| GET    | `/api/locations/getLocation/:id`    | Obtener una     |
| PUT    | `/api/locations/updateLocation/:id` | Actualizar      |
| DELETE | `/api/locations/deleteLocation/:id` | Eliminar        |

### Orders
| Método | Endpoint                       | Descripción      |
| ------ | ------------------------------ | ---------------- |
| POST   | `/api/orders/createOrder`      | Crear orden      |
| GET    | `/api/orders/getAllOrders`     | Listar órdenes   |
| GET    | `/api/orders/getOrder/:id`     | Obtener orden    |
| PUT    | `/api/orders/updateOrder/:id`  | Actualizar orden |
| PATCH  | `/api/orders/changeStatus/:id` | Cambiar estado   |
| DELETE | `/api/orders/deleteOrder/:id`  | Eliminar orden   |

