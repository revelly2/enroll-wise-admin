
import { Student } from "./types";
import { COURSES } from "./constants";

// Mock student data
const MOCK_STUDENTS: Student[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    studentId: "ST001",
    contactNumber: "09123456789",
    course: "bsit",
    section: "BSIT-1A",
    registrationDate: new Date(2023, 5, 15).toISOString(),
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    studentId: "ST002",
    contactNumber: "09234567890",
    course: "bscs",
    section: "BSCS-1A",
    registrationDate: new Date(2023, 6, 12).toISOString(),
  },
  {
    id: "3",
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.johnson@example.com",
    studentId: "ST003",
    contactNumber: "09345678901",
    course: "bsit",
    section: "BSIT-2A",
    registrationDate: new Date(2023, 7, 22).toISOString(),
  },
];

// Simulate local storage for demo purposes
let students = [...MOCK_STUDENTS];

// Helper to get course name from ID
const getCourseNameById = (courseId: string): string => {
  const course = COURSES.find(c => c.id === courseId);
  return course ? course.name : courseId;
};

// Get all students with course names
export const getStudents = async (): Promise<Student[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return students;
};

// Add new student
export const addStudent = async (student: Omit<Student, "id">): Promise<Student> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newStudent = {
    ...student,
    id: Math.random().toString(36).substring(2, 9), // Generate random ID
  };
  
  students = [...students, newStudent];
  return newStudent;
};

// Update student
export const updateStudent = async (id: string, data: Partial<Student>): Promise<Student> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const studentIndex = students.findIndex(s => s.id === id);
  
  if (studentIndex === -1) {
    throw new Error("Student not found");
  }
  
  const updatedStudent = {
    ...students[studentIndex],
    ...data,
  };
  
  students[studentIndex] = updatedStudent;
  return updatedStudent;
};

// Delete student
export const deleteStudent = async (id: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  students = students.filter(s => s.id !== id);
};
