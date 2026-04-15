# 📝 Todo REST API

> A production-ready RESTful API built with **Node.js**, **Express.js**, and **MongoDB** featuring JWT authentication and full CRUD Todo management.

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

</div>

---

## 📁 Project Structure

```
todo-api/
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   ├── authController.js      # Register, Login, Get Profile
│   └── todoController.js      # CRUD operations for todos
├── middleware/
│   ├── authMiddleware.js      # JWT verification (protect routes)
│   ├── errorMiddleware.js     # Global error handler & 404
│   └── validateMiddleware.js  # Input validation rules
├── models/
│   ├── User.js                # User schema (with bcrypt hook)
│   └── Todo.js                # Todo schema
├── routes/
│   ├── authRoutes.js          # /api/auth routes
│   └── todoRoutes.js          # /api/todos routes
├── utils/
│   ├── generateToken.js       # JWT token generator
│   └── apiResponse.js         # Consistent response helpers
├── .env.example               # Template for environment variables
├── .gitignore                 # Files to ignore in Git
├── package.json
├── server.js                  # App entry point
└── README.md
```

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud)

---

## 🚀 Setup & Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/rajpratham1/todo-api.git
cd todo-api
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

```bash
# Copy the example env file
cp .env.example .env
```

Now open `.env` and fill in your values:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/todo_db
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
```

> 🔐 **Never commit your `.env` file to Git!**

### Step 4: Start the Server

```bash
# Development mode (auto-restarts on file changes)
npm run dev

# Production mode
npm start
```

You should see:
```
✅ MongoDB Connected: localhost
🚀 Server is running in development mode on port 5000
📡 API Health Check: http://localhost:5000/
```

---

## 📡 API Endpoints

### Base URL: `http://localhost:5000/api`

---

### 🔐 Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | ❌ No |
| POST | `/api/auth/login` | Login and get token | ❌ No |
| GET | `/api/auth/me` | Get current user profile | ✅ Yes |

---

### ✅ Todo Routes (`/api/todos`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/todos` | Get all todos (current user) | ✅ Yes |
| POST | `/api/todos` | Create a new todo | ✅ Yes |
| GET | `/api/todos/:id` | Get a specific todo | ✅ Yes |
| PUT | `/api/todos/:id` | Update a todo | ✅ Yes |
| DELETE | `/api/todos/:id` | Delete a todo | ✅ Yes |

---

## 📬 Sample API Requests

### Register a New User

**POST** `/api/auth/register`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful!",
  "data": {
    "user": {
      "id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### Login

**POST** `/api/auth/login`

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

### Create a Todo

**POST** `/api/todos`

Headers:
```
Authorization: Bearer <your_jwt_token>
```

Body:
```json
{
  "title": "Learn Node.js",
  "description": "Complete the Express.js crash course",
  "priority": "high"
}
```

---

### Update a Todo

**PUT** `/api/todos/:id`

Headers:
```
Authorization: Bearer <your_jwt_token>
```

Body:
```json
{
  "title": "Learn Node.js",
  "completed": true,
  "priority": "medium"
}
```

---

### Delete a Todo

**DELETE** `/api/todos/:id`

Headers:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🛡️ Authentication Flow

```
1. User registers  → POST /api/auth/register
2. User logs in    → POST /api/auth/login → receives JWT token
3. For protected routes, include the token in headers:
   Authorization: Bearer <token>
4. The protect middleware verifies the token on each request
```

---

## 🔒 Security Features

- ✅ Passwords hashed with **bcryptjs** (salt rounds: 10)
- ✅ **JWT** tokens with expiry
- ✅ Environment variables via **dotenv**
- ✅ Input validation with **express-validator**
- ✅ Route-level authorization (users can only access their own todos)
- ✅ Sensitive fields (`password`) excluded from responses

---

## 🧪 Testing with Postman

1. Open [Postman](https://www.postman.com/)
2. Set the base URL to `http://localhost:5000`
3. Register a user → copy the token from the response
4. For protected routes, go to **Authorization** tab → select **Bearer Token** → paste your token
5. Test all CRUD operations on todos

---

## 🐛 Error Response Format

All errors follow this consistent format:

```json
{
  "success": false,
  "message": "Descriptive error message here"
}
```

| Status Code | Meaning |
|-------------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request / Validation Error |
| 401 | Unauthorized (invalid/missing token) |
| 403 | Forbidden (not your resource) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📜 Terms and Conditions

By using this API project, you agree to the following:

1. **Personal Use**: This project is open-source and free for personal and educational use.
2. **Attribution**: If you use this project as a base for your work, a credit to the original author is appreciated but not required.
3. **No Warranty**: This software is provided "as is" without warranty of any kind. The author is not responsible for any issues arising from the use of this code.
4. **Data Privacy**: This project does not collect, store, or transmit any personal data beyond what is stored locally in your own MongoDB instance.
5. **Commercial Use**: For commercial use, please contact the developer.
6. **Modifications**: You are free to fork and modify this project. Redistribution of modified versions must maintain the original license.

---

## 📄 License

This project is licensed under the **MIT License** — you are free to use, copy, modify, and distribute it.

---

## 👨‍💻 About the Developer

<div align="center">

**Pratham Raj**
*Full-Stack Developer | Open Source Enthusiast*

[![GitHub](https://img.shields.io/badge/GitHub-rajpratham1-181717?style=for-the-badge&logo=github)](https://github.com/rajpratham1)

> Passionate about building clean, scalable, and beginner-friendly backend systems.
> Always learning, always building. 🚀

</div>

---

## 🙏 Acknowledgements

- [Express.js](https://expressjs.com/) — Fast, minimalist web framework
- [Mongoose](https://mongoosejs.com/) — Elegant MongoDB object modeling
- [JSON Web Tokens](https://jwt.io/) — Secure authentication standard
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) — Password hashing library

---

<div align="center">

Made with ❤️ by [rajpratham1](https://github.com/rajpratham1)

⭐ Star this repo if you found it helpful!

</div>
