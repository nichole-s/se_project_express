# WTWR (What to Wear?) — Back End

This is the **back-end API server** for the WTWR application. The project supports user registration, authentication, and CRUD operations for managing clothing items. It includes secure password handling, token-based authorization, and MongoDB data storage.

---

## Features

- User registration and login with hashed passwords
- JSON Web Token (JWT) authentication
- Authorization middleware to protect routes
- CRUD operations for clothing items
- Ownership-based access control for deletions
- Centralized error handling
- Input validation using Mongoose and `validator`
- CORS enabled for frontend-backend integration

---

## Technologies Used

- Node.js
- Express.js
- MongoDB / Mongoose
- JWT (jsonwebtoken)
- bcrypt.js
- dotenv / config
- Validator
- ESLint (Airbnb config)
- Postman (for API testing)

---

## Running the Project
`npm run start` — to launch the server 

`npm run dev` — to launch the server with the hot reload feature
