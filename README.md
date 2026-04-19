# Student Management System

A production-ready **Student Management System** built with **Node.js**, **Express**, **TypeScript**, and **MongoDB** — featuring clean architecture, JWT authentication, and full Docker support.

---

## Features

| Category | Details |
|---|---|
| **Architecture** | Layered MVC — Routes → Controllers → Services → Models |
| **Authentication** | JWT-based role auth (Admin, Student) with Bcrypt password hashing |
| **Core Modules** | Student CRUD, Course Enrollments, Attendance Tracking |
| **Rate Limiting** | API rate limiting middleware |
| **Logging** | Morgan HTTP logging + Winston error logging to files |
| **Soft Delete** | Soft delete pattern across entities |
| **File Upload** | Profile image upload via Multer |
| **Email Service** | Mock email service using Nodemailer |
| **Documentation** | Swagger API docs + extensive Markdown diagrams in `docs/` |
| **Docker** | Containerized app and MongoDB via Docker Compose |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Language** | TypeScript |
| **Database** | MongoDB with Mongoose ODM |
| **Testing** | Jest + Supertest |
| **Environment** | Docker + Docker Compose |

---

## Getting Started

### Prerequisites

- Node.js `>= 18.x`
- MongoDB (local or Atlas)
- Docker & Docker Compose *(for containerized setup)*

---

### Option 1 — Local Setup

**1. Install dependencies**
```bash
npm install
```

**2. Configure environment**

Rename `.env.example` to `.env` and fill in the required variables:
```bash
cp .env.example .env
```

**3. Start the development server**
```bash
npm run dev
```

> App runs at **http://localhost:3000**

---

### Option 2 — Docker Setup *(recommended)*

Run the full stack (App + MongoDB) with a single command:

```bash
docker-compose up --build
```

> App runs at **http://localhost:3000**

---

## Folder Structure

```
├── src/
│ ├── controllers/ # Request handling logic
│ ├── services/ # Business logic operations
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Express routers
│ ├── middlewares/ # Auth, RateLimiter, Upload
│ └── utils/ # Logger, Email mock
├── tests/ # Integration tests (Jest + Supertest)
├── docs/ # Architecture diagrams and documentation
├── docker-compose.yml
├── Dockerfile
└── .env.example
```

---

## API Endpoints

Full API documentation is available via **Swagger UI** once the server is running:

> **`http://localhost:3000/api-docs`**

### Highlighted Routes

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Login and receive JWT | Public |
| `GET` | `/api/students` | Get all students | Admin |
| `GET` | `/api/students/:id` | Get student by ID | Admin / Student |
| `PUT` | `/api/students/:id` | Update student profile | Admin / Student |
| `DELETE` | `/api/students/:id` | Soft delete student | Admin |
| `POST` | `/api/courses` | Create a course | Admin |
| `GET` | `/api/courses` | List all courses | Authenticated |
| `POST` | `/api/courses/:id/enroll` | Enroll in a course | Student |
| `POST` | `/api/attendance` | Mark attendance | Admin |

---

## Testing

Run all unit and integration tests:

```bash
npm run test
```

Run tests with coverage report:

```bash
npm run test -- --coverage
```

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `PORT` | Server port | `3000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/sms` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key` |
| `JWT_EXPIRES_IN` | JWT expiry duration | `7d` |
| `BCRYPT_SALT_ROUNDS` | Bcrypt hashing rounds | `10` |
| `EMAIL_HOST` | SMTP host for Nodemailer | `smtp.mailtrap.io` |
| `EMAIL_USER` | SMTP username | `your_email_user` |
| `EMAIL_PASS` | SMTP password | `your_email_pass` |

---

## Architecture Overview

```
Client Request
│
▼
[ Routes ]
│
▼
[ Middlewares ] ← Auth, RateLimiter, Multer
│
▼
[ Controllers ] ← Request / Response handling
│
▼
[ Services ] ← Business logic
│
▼
[ Models ] ← Mongoose schemas (MongoDB)
```

---

## Docker Services

| Service | Port | Description |
|---|---|---|
| `app` | `3000` | Node.js Express application |
| `mongo` | `27017` | MongoDB database |

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run compiled production build |
| `npm run test` | Run all tests |
| `npm run lint` | Run ESLint |
