import React from "react";
import { useAuth } from "../../components/Context/AuthContext";
import AgeChart from "./AgeChart";
import GenderStudentChart from "./GenderStudentChart";
import GenderTeacher from "./GenderTeacher";
import EduLevelChart from "./EduLevelChart";
import FeedChart from "./FeedChart";
import WorkTypeChart from "./WorkTypeChart";
import KursChart from "./KursChart";

const MainChart = () => {
  const { user, checkRole } = useAuth();

  return (
    <div className="flex flex-wrap items-start gap-2">
      {!checkRole(["Student"], user?.rols) && <AgeChart />}
      <FeedChart />
      {/* {checkRole(["teacher", "employee"], user?.rols) && <TimelyChart />} */}
      {/* <NewsChart /> */}
      {/* <EduChart /> */}
      <GenderStudentChart />

      {!checkRole(["Student"], user?.rols) && <GenderTeacher />}
      {!checkRole(["Student"], user?.rols) && <EduLevelChart />}
      {!checkRole(["Student"], user?.rols) && <WorkTypeChart />}
      {!checkRole(["Student"], user?.rols) && <KursChart />}
    </div>
  );
};

export default MainChart;
