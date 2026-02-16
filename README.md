# OOP E-commerce API

A production-ready RESTful API for an E-commerce platform built with Node.js, Express, and MongoDB, following Object-Oriented Programming (OOP) principles and specific layered architecture.

## Architecture

The project follows a localized layered architecture:
`Routes` -> `Controllers` -> `Services` -> `Repositories` -> `Database`

- **Controllers**: Handle HTTP requests/responses.
- **Services**: Contain business logic.
- **Repositories**: Handle database interactions.
- **Models**: Database schemas.

## Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- JOI Validation
- ES Modules

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (see `.env.example`).
4. Run the seeder to import sample data:
   ```bash
   npm run data:import
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user & get token
- `GET /api/users/profile` - Get user profile (Protected)
- `GET /api/users` - Get all users (Admin)

### Products
- `GET /api/products` - Get all products (Pagination, Search, Filter)
  - Query Params: `pageNumber`, `limit`, `keyword`, `sortBy`, `minPrice`, `maxPrice`, `category`
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create new order (Protected)
- `GET /api/orders/myorders` - Get logged in user orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)


