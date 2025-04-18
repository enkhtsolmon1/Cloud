import React from "react";
import TimelyOne from "./timely/TimelyOne";
import { useAuth } from "../components/Context/AuthContext";

import { Button } from "../components/ui/button";
import { toast } from "sonner";
import MathJax from "../components/Demo/MathJax";
import StudentSudalgaa from "../pages/sudalgaa/StudentSudalgaa";

const Dashboard = () => {
  const { user, checkRole } = useAuth();
  const getSubdomain = () => {
    const host = window.location.hostname; // "mongol.hovd.shop"
    console.log("🚀 ~ getSubdomain ~ host:", host);
    const parts = host.split(".");
    if (parts.length > 2) {
      return parts[0]; // "mongol"
    }
    return null; // үндсэн домэйн
  };

  // console.log(getSubdomain());
  return (
    <div className="flex flex-wrap items-start gap-2">
      {checkRole(["Student"], user?.rols) && <StudentSudalgaa />}

      {/* <MathJax formula="When $a \ne 0$, there are two solutions to \(ax^2 + bx + c = 0\) and they are $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$" /> */}
      {/* <Button
        onClick={() => {
          toast.success("Тест амжилттай хийгдлээ");
        }}
      >
        Clicl me
      </Button> */}
      {checkRole(["teacher", "employee"], user?.rols) && <TimelyOne />}
      {/* <iframe
        frameborder="0"
        className="w-full h-screen"
        src="https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&layers=1&nav=1&title=%D0%94%D0%BE%D1%82%D0%BE%D0%BE%D0%B4%20%D1%81%D2%AF%D0%BB%D0%B6%D1%8D%D1%8D%2C%20%D0%BA%D0%B0%D0%BC%D0%B5%D1%80.drawio&dark=auto#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1ld6YXDWSq8FgXoUeApjNGlGepDlywtbi%26export%3Ddownload"
      ></iframe> */}
    </div>
  );
};

export default Dashboard;
