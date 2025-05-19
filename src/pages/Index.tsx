
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Users, BookOpen } from "lucide-react";
import StudentRegistration from "@/components/StudentRegistration";
import StudentManagement from "@/components/StudentManagement";
import AdminHeader from "@/components/AdminHeader";
import AdminLogin from "@/components/AdminLogin";

const Index = () => {
  const [authenticated, setAuthenticated] = useState(false);
  
  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-emerald-50">
      <AdminHeader />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-emerald-800 mb-6">Enrollment Management System</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-md">
            <CardHeader className="bg-emerald-700 text-white pb-2">
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                New Students
              </CardTitle>
              <CardDescription className="text-emerald-100">
                Students registered this month
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold">24</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md">
            <CardHeader className="bg-emerald-700 text-white pb-2">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Total Students
              </CardTitle>
              <CardDescription className="text-emerald-100">
                All registered students
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold">152</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md">
            <CardHeader className="bg-emerald-700 text-white pb-2">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Active Courses
              </CardTitle>
              <CardDescription className="text-emerald-100">
                Available for enrollment
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold">8</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="registration" className="bg-white rounded-lg shadow-md">
          <TabsList className="border-b w-full rounded-t-lg bg-emerald-100 p-0">
            <TabsTrigger 
              value="registration"
              className="data-[state=active]:bg-white data-[state=active]:text-emerald-800 data-[state=active]:shadow-none rounded-none rounded-tl-lg py-3 px-6 border-r"
            >
              Student Registration
            </TabsTrigger>
            <TabsTrigger 
              value="management"
              className="data-[state=active]:bg-white data-[state=active]:text-emerald-800 data-[state=active]:shadow-none rounded-none py-3 px-6"
            >
              Student Management
            </TabsTrigger>
          </TabsList>
          <TabsContent value="registration" className="p-6">
            <StudentRegistration />
          </TabsContent>
          <TabsContent value="management" className="p-6">
            <StudentManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
