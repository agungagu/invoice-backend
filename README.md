# Invoice Backend - User Management System

This is a Node.js/Express backend application with user management functionality that only allows admin users to register new users.

## Features

- **Admin-only User Registration**: Only users with admin role can register new users
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Admin and user roles
- **User Management**: CRUD operations for user management (admin only)
- **Password Security**: Bcrypt password hashing
- **Input Validation**: Express-validator for request validation

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd invoice-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/your_database"
   JWT_SECRET="your-super-secret-jwt-key"
   PORT=3000
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma migrate dev

   # Seed the database with admin user
   npm run seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication Routes

#### POST `/api/auth/login`

Login with email and password

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

#### GET `/api/auth/me`

Get current user profile (requires authentication)

#### PUT `/api/auth/me`

Update current user profile (requires authentication)

```json
{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
```

#### PUT `/api/auth/change-password`

Change password (requires authentication)

```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword"
}
```

### User Management Routes (Admin Only)

#### POST `/api/users`

Register a new user (admin only)

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

#### GET `/api/users`

Get all users (admin only)

#### GET `/api/users/:id`

Get user by ID (admin only)

#### PUT `/api/users/:id`

Update user (admin only)

```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "role": "admin"
}
```

#### DELETE `/api/users/:id`

Delete user (admin only)

## Default Admin User

After running the seed script, a default admin user is created:

- **Email**: admin@example.com
- **Password**: admin123
- **Role**: admin

**Important**: Change the default password after first login!

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Role System

- **Admin**: Can register, view, update, and delete users
- **User**: Regular user with limited permissions

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- Role-based access control
- Protection against self-deletion for admins

## Database Schema

The application uses Prisma with PostgreSQL and includes:

- **User**: id, name, email, password, role, timestamps
- **Product**: Product management
- **Customer**: Customer management
- **Invoice**: Invoice management
- **StockIn/StockOut**: Inventory tracking

## Development

### Running in Development Mode

```bash
npm run dev
```

### Database Migrations

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Reset database
npx prisma migrate reset
```

### Prisma Studio

```bash
npx prisma studio
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Validation errors if any
}
```

## Success Responses

Successful operations return:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {} // Response data
}
```

## License

This project is licensed under the ISC License.
