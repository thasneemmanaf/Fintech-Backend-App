# Fintech Backend

This repository contains the backend implementation for a Fintech application, providing the API services needed to support the frontend web application.

## Features

- **Company Management**: Retrieve company information and dashboard data
- **Card Management**: Fetch card details with masked sensitive data
- **Transaction History**: Retrieve transaction data with pagination
- **API Documentation**: Swagger/OpenAPI integration
- **Error Handling**: Comprehensive error handling system
- **Authentication**: JWT-based authentication (currently bypassed for demonstration)
- **Logging**: Centralized logging with Bunyan

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database (simulated with JSON files for demo)
- **Bunyan**: Structured logging
- **JWT**: Authentication and authorization
- **Swagger/OpenAPI**: API documentation
- **Ajv**: Request validation
- **Supertest**: Automated tests

## API Endpoints

| Endpoint                                 | Method | Description                                  |
| ---------------------------------------- | ------ | -------------------------------------------- |
| `/api/companies`                         | GET    | Get all companies for the authenticated user |
| `/api/companies/:id`                     | GET    | Get a specific company by ID                 |
| `/api/companies/:id/dashboard`           | GET    | Get dashboard data for a company             |
| `/api/companies/:companyId/cards`        | GET    | Get all cards for a company                  |
| `/api/cards/:id`                         | GET    | Get a specific card by ID                    |
| `/api/companies/:companyId/transactions` | GET    | Get transactions for a company               |

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file based on the `.env.example` file

   ```bash
   cp .env.example .env
   ```

4. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. The API will be available at `http://localhost:3001`
6. API documentation will be available at `http://localhost:3001/api-docs`

## Available Scripts

- `npm start`: Runs the app in production mode
- `npm run dev`: Runs the app in development mode
- `npm run lint`: Lints the codebase for potential errors
- `npm run lint:fix`: Fixes linting errors automatically

## Data Storage

For demonstration purposes, the application uses JSON files to store and retrieve data. In a production environment, this would be replaced with a MongoDB database.

The mock data is located in the `src/data` directory:

- `companies.json`: Company information
- `cards.json`: Card details
- `invoices.json`: Invoice information
- `transactions.json`: Transaction history

## Authentication

The application includes JWT authentication, which is currently bypassed for demonstration purposes. In a production environment, you would need to:

1. Update the authentication middleware in `src/middleware/auth.js`
2. Add a login route and controller
3. Set a secure JWT secret in your environment variables

## Error Handling

The application includes a comprehensive error handling system:

- Custom error classes for different HTTP status codes
- Centralized error handling middleware
- Structured logging with Bunyan

## API Documentation

API documentation is available using Swagger/OpenAPI. You can access the documentation at `http://localhost:3001/api-docs` when the server is running.

## Logging

The application uses Bunyan for structured logging:

- Console logging for development
- Different log levels (info, warn, error, fatal)

## Security Features

- JWT authentication

## Future Enhancements

- Implement full MongoDB integration
- Add user management system
- Implement role-based access control
