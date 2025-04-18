import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";
import ProtectedRoutes from "./ProtectedRoutes";
import { useAuth } from "./components/Context/AuthContext";
import News from "./pages/News";
import Tasks from "./pages/Task";
import Timely from "./pages/timely/Timely";
import Teacher from "./pages/Teacher";
import Employee from "./pages/Employee";
import Toiroh from "./pages/Toiroh";
import Student from "./pages/Student";
import Schedule from "./pages/Schedule";
import TimePlan from "./pages/timePlan/TimePlan";
import Department from "./pages/Department";
import Classes from "./pages/Classes";
import { Users } from "lucide-react";
import Software from "./pages/Software";
import Songolt from "./pages/Songolt";
import Program from "./pages/program/Program";
import ProgLesson from "./pages/program/ProgLesson";
import Login1 from "./pages/Login1";
import Feed from "./pages/Feed";
import Sudalgaa from "./pages/sudalgaa/Sudalgaa";
import ChangePassword from "./pages/auth/ChangePassword";
import Profile from "./pages/auth/Profile";
import LoginHistory from "./components/others/LoginHistory";
import Dun from "./pages/dun/Dun";
import Notification from "./pages/Notification";
import Database from "./pages/database/Database";
import Elderly from "./pages/Elderly";
import Tugusugch from "./pages/students/Tugusugch";
import TulburChart from "./pages/chart/TulburChart";
import MainChart from "./pages/chart/MainChart";
import SudalgaaOne from "./pages/sudalgaa/SudalgaaOne";
import Chiglel from "./pages/work/Chiglel";
import Asuulga from "./pages/sudalgaa/Asuulga";
import Elselt from "./pages/elselt/Elselt";
import StudentSudalgaa from "./pages/sudalgaa/StudentSudalgaa";

const App = () => {
  const { user } = useAuth();
  return (
    <div className="font-manrope ">
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login1" element={<Login1 />} />
        <Route element={<ProtectedRoutes user={user} />}>
          <Route path="dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="news" element={<News />} />
            <Route path="task" element={<Tasks />} />
            <Route path="chiglel" element={<Chiglel />} />
            <Route path="feed" element={<Feed />} />
            <Route path="notification" element={<Notification />} />
            <Route path="profile" element={<Profile />} />
            <Route path="login-history" element={<LoginHistory />} />
            <Route path="change-password" element={<ChangePassword />} />
            {/* <Route path="asuulga" element={<Asuulga />} /> */}
            <Route path="sudalgaa" element={<Sudalgaa />} />
            <Route path="research" element={<StudentSudalgaa />} />
            <Route path="sudalgaa/:sudid" element={<SudalgaaOne />} />
            <Route path="attendance" element={<Timely />} />
            <Route path="department" element={<Department />} />
            <Route path="classes" element={<Classes />} />
            <Route path="teacher" element={<Teacher />} />
            <Route path="employee" element={<Employee />} />
            <Route path="Elderly" element={<Elderly />} />
            <Route path="student" element={<Student />} />
            <Route path="tugsugch" element={<Tugusugch />} />
            <Route path="dun" element={<Dun />} />
            <Route path="chooselesson" element={<Songolt />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="timeplan" element={<TimePlan />} />
            <Route path="program" element={<Program />} />
            <Route path="program/:id" element={<ProgLesson />} />
            <Route path="software" element={<Software />} />
            <Route path="toiroh" element={<Toiroh />} />
            <Route path="info" element={<MainChart />} />
            <Route path="tulbur" element={<TulburChart />} />
            <Route path="elselt" element={<Elselt />} />
            <Route path="database" element={<Database />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
        <Route path="*" element={<Home user={user} />} />
      </Routes>
    </div>
  );
};

export default App;
