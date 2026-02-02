import { Student } from '../models/student.model';

export class StudentRepository {
    private students: Student[] = [];
    private currentId: number = 1;

    create(studentData: Omit<Student, 'id' | 'createdAt'>): Student {
        const newStudent: Student = {
            ...studentData,
            id: this.currentId++,
            createdAt: new Date()
        };
        this.students.push(newStudent);
        return newStudent;
    }

    findAll(): Student[] {
        return [...this.students];
    }

    findById(id: number): Student | undefined {
        return this.students.find(s => s.id === id);
    }

    findByEmail(email: string): Student | undefined {
        return this.students.find(s => s.email === email);
    }

    update(id: number, updateData: Partial<Student>): Student | null {
        const studentIndex = this.students.findIndex(s => s.id === id);
        if (studentIndex === -1) {
            return null;
        }

        const updatedStudent = {
            ...this.students[studentIndex],
            ...updateData
        };

        this.students[studentIndex] = updatedStudent;
        return updatedStudent;
    }

    delete(id: number): boolean {
        const studentIndex = this.students.findIndex(s => s.id === id);
        if (studentIndex === -1) {
            return false;
        }

        this.students.splice(studentIndex, 1);
        return true;
    }
}
