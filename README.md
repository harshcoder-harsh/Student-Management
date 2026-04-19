🎓 Student Management System
A production-ready Student Management System built with Node.js, Express, TypeScript, and MongoDB — featuring clean architecture, JWT authentication, and full Docker support.

✨ Features
CategoryDetails🏗️ ArchitectureLayered MVC — Routes → Controllers → Services → Models🔐 AuthenticationJWT-based role auth (Admin, Student) with Bcrypt password hashing👨‍🎓 Core ModulesStudent CRUD, Course Enrollments, Attendance Tracking🚦 Rate LimitingAPI rate limiting middleware📋 LoggingMorgan HTTP logging + Winston error logging to files🗑️ Soft DeleteSoft delete pattern across entities📁 File UploadProfile image upload via Multer📧 Email ServiceMock email service using Nodemailer📖 DocumentationSwagger API docs + extensive Markdown diagrams in docs/🐳 DockerContainerized app and MongoDB via Docker Compose

🛠️ Tech Stack
LayerTechnologyRuntimeNode.jsFrameworkExpress.jsLanguageTypeScriptDatabaseMongoDB with Mongoose ODMTestingJest + SupertestEnvironmentDocker + Docker Compose

🚀 Getting Started
Prerequisites

Node.js >= 18.x
MongoDB (local or Atlas)
Docker & Docker Compose (for containerized setup)


Option 1 — Local Setup
1. Install dependencies
bashnpm install
2. Configure environment
Rename .env.example to .env and fill in the required variables:
bashcp .env.example .env
3. Start the development server
bashnpm run dev

App runs at http://localhost:3000


Option 2 — Docker Setup (recommended)
Run the full stack (App + MongoDB) with a single command:
bashdocker-compose up --build

App runs at http://localhost:3000


📁 Folder Structure
├── src/
│   ├── controllers/        # Request handling logic
│   ├── services/           # Business logic operations
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express routers
│   ├── middlewares/        # Auth, RateLimiter, Upload
│   └── utils/              # Logger, Email mock
├── tests/                  # Integration tests (Jest + Supertest)
├── docs/                   # Architecture diagrams and documentation
├── docker-compose.yml
├── Dockerfile
└── .env.example

📡 API Endpoints
Full API documentation is available via Swagger UI once the server is running:

http://localhost:3000/api-docs

Highlighted Routes
MethodEndpointDescriptionAccessPOST/api/auth/registerRegister a new userPublicPOST/api/auth/loginLogin and receive JWTPublicGET/api/studentsGet all studentsAdminGET/api/students/:idGet student by IDAdmin / StudentPUT/api/students/:idUpdate student profileAdmin / StudentDELETE/api/students/:idSoft delete studentAdminPOST/api/coursesCreate a courseAdminGET/api/coursesList all coursesAuthenticatedPOST/api/courses/:id/enrollEnroll in a courseStudentPOST/api/attendanceMark attendanceAdmin

🧪 Testing
Run all unit and integration tests:
bashnpm run test
Run tests with coverage report:
bashnpm run test -- --coverage

🔐 Environment Variables
VariableDescriptionExamplePORTServer port3000MONGODB_URIMongoDB connection stringmongodb://localhost:27017/smsJWT_SECRETSecret key for JWT signingyour_secret_keyJWT_EXPIRES_INJWT expiry duration7dBCRYPT_SALT_ROUNDSBcrypt hashing rounds10EMAIL_HOSTSMTP host for Nodemailersmtp.mailtrap.ioEMAIL_USERSMTP usernameyour_email_userEMAIL_PASSSMTP passwordyour_email_pass

🏛️ Architecture Overview
Client Request
     │
     ▼
 [ Routes ]
     │
     ▼
[ Middlewares ]  ← Auth, RateLimiter, Multer
     │
     ▼
[ Controllers ]  ← Request / Response handling
     │
     ▼
 [ Services ]    ← Business logic
     │
     ▼
  [ Models ]     ← Mongoose schemas (MongoDB)

🐳 Docker Services
ServicePortDescriptionapp3000Node.js Express applicationmongo27017MongoDB database

📜 Scripts
CommandDescriptionnpm run devStart dev server with hot reloadnpm run buildCompile TypeScript to JavaScriptnpm startRun compiled production buildnpm run testRun all testsnpm run lintRun ESLint

📄 License
This project is licensed under the MIT License.
```
