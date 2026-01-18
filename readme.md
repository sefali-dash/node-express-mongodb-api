# Node API Project

A robust Node.js REST API for user management, built with Express.js and MongoDB. This project provides secure user authentication, registration, and profile management features.

## 🚀 Features

- **User Registration**: Secure user signup with password hashing
- **User Authentication**: JWT-based login system
- **User Profile Management**: Protected routes for user data retrieval
- **Security**: Helmet for security headers, CORS support, and JWT token verification
- **Database**: MongoDB integration with Mongoose ODM
- **Middleware**: Custom authentication middleware and request logging

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT), bcrypt for password hashing
- **Security**: Helmet, CORS
- **Development**: Nodemon for hot reloading

## 📁 Project Structure

```
node_api_project/
├── config/
│   └── db.js                 # Database connection configuration
├── middleware/
│   └── auth.js               # JWT authentication middleware
├── model/
│   └── user.model.js         # User data model
├── routes/
│   └── user.rout.js          # User-related API routes
├── server.js                 # Main application entry point
├── package.json              # Project dependencies and scripts
└── readme.md                 # Project documentation
```

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory.

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory with the following variables:

   ```
   MONGO_URL=mongodb://localhost:27017/your_database_name
   SECRET_KEY=your_jwt_secret_key_here
   ```

4. **Start the development server**:

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000` (or the port specified in your environment).

## 🔑 Environment Variables

| Variable     | Description                      | Example                         |
| ------------ | -------------------------------- | ------------------------------- |
| `MONGO_URL`  | MongoDB connection string        | `mongodb://localhost:27017/api` |
| `SECRET_KEY` | Secret key for JWT token signing | `your_secret_key_here`          |

## 📡 API Endpoints

### Authentication

#### Register User

- **POST** `/api/users`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response**: `{ "id": "user_id" }`

#### Login

- **POST** `/api/users/login`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response**: `{ "token": "jwt_token_here" }`

### User Management

#### Get User Profile

- **GET** `/api/users/:userId`
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Response**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "avatar_url",
    "_id": "user_id",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

### Health Check

#### Server Health

- **GET** `/health`
- **Response**: `{ "msg": "server_status" }`

## 🔒 Security Features

- **Password Hashing**: Uses bcrypt for secure password storage
- **JWT Authentication**: Stateless authentication with token expiration
- **Security Headers**: Helmet middleware for enhanced security
- **CORS**: Configured for cross-origin requests
- **Input Validation**: Basic validation for required fields

## 🏗 Architecture

The application follows a modular architecture:

- **Server Layer** (`server.js`): Sets up Express app, middleware, and routes
- **Database Layer** (`config/db.js`): Handles MongoDB connection
- **Model Layer** (`model/user.model.js`): Defines data schemas
- **Route Layer** (`routes/user.rout.js`): Handles HTTP requests and responses
- **Middleware Layer** (`middleware/auth.js`): Provides authentication logic

## 🧪 Testing

To run tests (if implemented):

```bash
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 📞 Support

For questions or support, please open an issue in the repository.
