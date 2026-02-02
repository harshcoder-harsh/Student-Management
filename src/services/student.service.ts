import { Student } from '../models/student.model';
import { StudentRepository } from '../repositories/student.repository';
import { AppError } from '../utils/AppError';

export class StudentService {
    private studentRepository: StudentRepository;

    constructor() {
        this.studentRepository = new StudentRepository();
    }

    createStudent(data: any): Student {
        if (!data.name || !data.email || !data.age || !data.course) {
             throw new AppError('Missing required fields: name, email, age, course', 400);
        }

        const existingStudent = this.studentRepository.findByEmail(data.email);
        if (existingStudent) {
            throw new AppError('Email already exists', 400);
        }

        if (data.isActive === undefined) {
            data.isActive = true;
        }

        return this.studentRepository.create(data);
    }

    getAllStudents(queryParams: any) {
        let students = this.studentRepository.findAll();

        if (queryParams.search) {
            const search = (queryParams.search as string).toLowerCase();
            students = students.filter(s => 
                s.name.toLowerCase().includes(search) || 
                s.email.toLowerCase().includes(search)
            );
        }

        if (queryParams.course) {
            students = students.filter(s => s.course === queryParams.course);
        }
        if (queryParams.isActive !== undefined) {
            const isActive = queryParams.isActive === 'true';
            students = students.filter(s => s.isActive === isActive);
        }

        if (queryParams.sortBy) {
            const sortBy = queryParams.sortBy as keyof Student;
            students.sort((a: any, b: any) => {
                if (a[sortBy] < b[sortBy]) return -1;
                if (a[sortBy] > b[sortBy]) return 1;
                return 0;
            });
        }

        const page = parseInt(queryParams.page as string) || 1;
        const limit = parseInt(queryParams.limit as string) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        
        const total = students.length;
        const paginatedStudents = students.slice(startIndex, endIndex);

        return {
            total,
            page,
            limit,
            data: paginatedStudents
        };
    }

    getStudentById(id: number): Student {
        const student = this.studentRepository.findById(id);
        if (!student) {
            throw new AppError('Student not found', 404);
        }
        return student;
    }

    updateStudent(id: number, data: any): Student {
        const student = this.studentRepository.findById(id);
        if (!student) {
             throw new AppError('Student not found', 404);
        }
        
        if (data.email && data.email !== student.email) {
             const existing = this.studentRepository.findByEmail(data.email);
             if (existing) {
                 throw new AppError('Email already exists', 400);
             }
        }

        const updated = this.studentRepository.update(id, data);
        if (!updated) {
            throw new AppError('Failed to update student', 500);
        }
        return updated;
    }

    deleteStudent(id: number): void {
        const deleted = this.studentRepository.delete(id);
        if (!deleted) {
             throw new AppError('Student not found', 404);
        }
    }
}
