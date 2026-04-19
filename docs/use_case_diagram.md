# Use Case Diagram

```mermaid
usecaseDiagram
    actor Admin
    actor Student as "Student Actor"

    package "Student Management System" {
        usecase "Login / Register" as UC1
        usecase "Manage Students\n(CRUD, Upload image)" as UC2
        usecase "Manage Courses\n(Create, enroll)" as UC3
        usecase "Mark Attendance" as UC4
        usecase "View Own Profile" as UC5
        usecase "View Own Attendance" as UC6
        usecase "Generate Reports" as UC7
    }

    Admin --> UC1
    Admin --> UC2
    Admin --> UC3
    Admin --> UC4
    Admin --> UC7

    Student --> UC1
    Student --> UC5
    Student --> UC6
```
