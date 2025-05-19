
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { COURSES, SECTIONS } from "@/lib/constants";

const studentSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  studentId: z.string().min(5, "Student ID must be at least 5 characters"),
  contactNumber: z.string().min(10, "Contact number must be at least 10 digits"),
  course: z.string().min(1, "Please select a course"),
});

type StudentFormValues = z.infer<typeof studentSchema>;

const StudentRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [section, setSection] = useState("");
  
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      studentId: "",
      contactNumber: "",
      course: "",
    },
  });
  
  const watchCourse = form.watch("course");
  
  // Automatically assign a section based on the course
  const assignSection = (courseId: string) => {
    // Simple algorithm: randomly assign between available sections for the course
    const courseSections = SECTIONS[courseId];
    if (courseSections && courseSections.length > 0) {
      const randomIndex = Math.floor(Math.random() * courseSections.length);
      return courseSections[randomIndex];
    }
    return "";
  };
  
  // Update section when course changes
  useState(() => {
    if (watchCourse) {
      const assignedSection = assignSection(watchCourse);
      setSection(assignedSection);
    } else {
      setSection("");
    }
  });
  
  const onSubmit = async (data: StudentFormValues) => {
    if (!section) {
      toast.error("No section available for the selected course");
      return;
    }
    
    setIsSubmitting(true);
    
    // Combine the data with assigned section
    const studentData = {
      ...data,
      section: section,
      registrationDate: new Date().toISOString(),
    };
    
    // In a real app, this would be an API call to save the student data
    console.log("Student data:", studentData);
    
    setTimeout(() => {
      toast.success("Student registered successfully!");
      form.reset();
      setSection("");
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-emerald-800 mb-6">Register New Student</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="student@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter student ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {COURSES.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <FormLabel>Assigned Section</FormLabel>
              <div className="h-10 px-3 py-2 rounded-md border border-input bg-background text-foreground">
                {section || "No section assigned yet"}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Section is assigned automatically based on course selection
              </p>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="bg-emerald-700 hover:bg-emerald-800" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register Student"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StudentRegistration;
