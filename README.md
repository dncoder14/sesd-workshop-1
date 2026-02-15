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

