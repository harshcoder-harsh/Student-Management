# Student Management System

A production-ready Student Management System built with Node.js, Express, TypeScript, and MongoDB. 

## Features
- **Clean Architecture**: Layered MVC (Routes, Controllers, Services, Models).
- **Authentication**: JWT based role authentication (Admin, Student) using Bcrypt.
- **Core Modules**: Student CRUD, Course Enrollments, Attendance Tracking.
- **Advanced Features**: API Rate limiting, Morgan logging + Winston error logging to files, Soft delete pattern, File upload using Multer (Profile Images), mock email service (Nodemailer).
- **Documentation**: Swagger API docs, and extensive markdown diagrams (`docs/`).
- **Dockerized**: Containerized App and MongoDB.

## Tech Stack
- Backend: Node.js, Express.js, TypeScript
- Database: MongoDB (Mongoose ODM)
- Testing: Jest, Supertest
- Environment: Docker, Docker-Compose

## Setup Instructions

### Local Storage setup
1. Install dependencies:
```bash
npm install
```
2. Configure environment:
Rename `.env.example` to `.env` and fill the variables.
3. Start the dev server:
```bash
npm run dev
```

### Docker Setup
To run the full stack effortlessly (MongoDB and Application):
```bash
docker-compose up --build
```
*Application runs on http://localhost:3000.*

## API Endpoints
All endpoints are fully documented in Swagger. Once the server is running, visit:
**`http://localhost:3000/api-docs`**

Some highlighted routes:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/students`
- `POST /api/courses`
- `POST /api/courses/{id}/enroll`
- `POST /api/attendance`

## Folder Structure
- `src/`
  - `controllers/`: Request handling logic
  - `services/`: Business logic operations
  - `models/`: Mongoose schemas
  - `routes/`: Express routers
  - `middlewares/`: Custom middlewares (Auth, RateLimiter, Upload)
  - `utils/`: Reusable utilities (Logger, Email mock)
- `tests/`: Integration tests using Jest
- `docs/`: Diagram architectures and idea info

## Testing
Run unit and integration tests via:
```bash
npm run test
```
