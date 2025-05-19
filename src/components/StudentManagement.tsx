
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Edit, Trash } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import EditStudentForm from "./EditStudentForm";
import { Student } from "@/lib/types";
import { getStudents, deleteStudent } from "@/lib/api";

const StudentManagement = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Load students
  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      try {
        const data = await getStudents();
        setStudents(data);
        setFilteredStudents(data);
      } catch (error) {
        toast.error("Failed to load students");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStudents();
  }, []);
  
  // Filter students when search term changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredStudents(students);
      return;
    }
    
    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = students.filter(
      student => 
        student.firstName.toLowerCase().includes(lowercasedSearch) ||
        student.lastName.toLowerCase().includes(lowercasedSearch) ||
        student.studentId.toLowerCase().includes(lowercasedSearch) ||
        student.email.toLowerCase().includes(lowercasedSearch) ||
        student.course.toLowerCase().includes(lowercasedSearch) ||
        student.section.toLowerCase().includes(lowercasedSearch)
    );
    
    setFilteredStudents(filtered);
  }, [searchTerm, students]);
  
  const handleEdit = (student: Student) => {
    setStudentToEdit(student);
    setIsDialogOpen(true);
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id);
        setStudents(prev => prev.filter(student => student.id !== id));
        toast.success("Student deleted successfully");
      } catch (error) {
        toast.error("Failed to delete student");
        console.error(error);
      }
    }
  };
  
  const handleSaveEdit = (updatedStudent: Student) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
    setIsDialogOpen(false);
    toast.success("Student updated successfully");
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-emerald-800">Student Records</h2>
        
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search students..." 
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-700"></div>
        </div>
      ) : (
        <>
          {filteredStudents.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              {searchTerm ? "No students match your search" : "No students registered yet"}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-emerald-50">
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.studentId}</TableCell>
                      <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell>{student.section}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEdit(student)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDelete(student.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
          </DialogHeader>
          {studentToEdit && (
            <EditStudentForm student={studentToEdit} onSave={handleSaveEdit} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentManagement;
