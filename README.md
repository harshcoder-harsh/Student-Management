# Student Management System (Backend)

A beginner-friendly CRUD backend using Node.js, TypeScript, Express, and Object-Oriented Programming (OOP) principles.

## Project Structure

```
src/
 ├── controllers/       # Handles HTTP requests and responses
 │    └── student.controller.ts
 ├── services/          # Contains business logic
 │    └── student.service.ts
 ├── repositories/      # Manages data access (in-memory array)
 │    └── student.repository.ts
 ├── models/            # Defines data structures (Interfaces)
 │    └── student.model.ts
 ├── routes/            # Defines API routes
 │    └── student.routes.ts
 ├── middlewares/       # Custom middlewares (Error handling)
 │    └── error.middleware.ts
 ├── utils/             # Utility classes/functions
 │    ├── AppError.ts
 │    └── response.util.ts
 ├── app.ts             # App configuration
 └── server.ts          # Entry point
```

## OOP Principles Applied

1.  **Encapsulation**:
    *   `StudentRepository` encapsulates the `students` array (data source). It's `private` and can only be accessed via public methods (`create`, `findAll`, etc.).
    *   `StudentService` encapsulates business logic and validation.
    *   `StudentController` encapsulates request handling.

2.  **Separation of Concerns (SoC)**:
    *   **Repository**: Only cares about data access (CRUD on array).
    *   **Service**: Only cares about business rules (Validation, Search, Filter, Sort).
    *   **Controller**: Only cares about HTTP (Parsing request, sending response).
    *   **Model**: Defines the shape of data.

3.  **Abstraction**:
    *   The `StudentService` doesn't need to know *how* data is stored (array or DB), it just calls `studentRepository`.
    *   The `StudentController` doesn't need to know complex logic, it just calls `studentService`.

## API Endpoints

### 1. Create Student
**POST** `/students`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 20,
  "course": "Computer Science"
}
```

### 2. Get All Students (with Search, Filter, Sort, Pagination)
**GET** `/students`
*   Search: `?search=John` (Matches name or email)
*   Filter: `?course=Computer Science&isActive=true`
*   Sort: `?sortBy=age`
*   Pagination: `?page=1&limit=5`

**Example**: `GET /students?search=John&limit=5`

### 3. Get Single Student
**GET** `/students/:id`

### 4. Update Student
**PUT** `/students/:id`
```json
{
  "age": 21
}
```

### 5. Delete Student
**DELETE** `/students/:id`

## How to Run

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Start the server:
    ```bash
    npx ts-node src/server.ts
    ```
    Or use `npm run dev` if you added a script (e.g., `nodemon src/server.ts`).
