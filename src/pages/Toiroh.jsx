import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PrinterIcon } from "lucide-react";
import moment from "moment-timezone";
import React, { useRef } from "react";

import { useReactToPrint } from "react-to-print";
import { useAuth } from "../components/Context/AuthContext";
const list = [
  {
    name: "Сургалт оюутны хэлтсийн дарга (Хичээлийн I байр-301А тоот)	",
    roles: ["teacher", "employee", "Student"],
  },
  {
    name: "Эрдэм шинжилгээ, хамтын ажиллагааны хэлтсийн дарга (Хичээлийн I байр-312 тоот)",
    roles: ["teacher", "employee"],
  },
  {
    name: "Санхүү хангамж үйлчилгээний хэлтсийн дарга (Хичээлийн I байр 103 тоот)",
    roles: ["employee", "teacher"],
  },
  {
    name: "Бодлого төлөвлөлт, стратеги хариуцсан мэргэжилтэн (Хичээлийн I байр 202 тоот)",
    roles: ["teacher", "employee"],
  },
  {
    name: "Ахлах нягтлан бодогч (Хичээлийн I байр-101 тоот)	",
    roles: ["teacher"],
  },
  {
    name: "Нягтлан бодогч (Хичээлийн I байр-101 тоот)",
    roles: ["teacher", "employee", "Student"],
  },
  {
    name: "Хөтөлбөр, багшийн хөгжил хариуцсан ахлах мэргэжилтэн (Хичээлийн I байр-302 тоот)",
    roles: ["teacher"],
  },
  {
    name: "Сургалтын технологи хариуцсан мэргэжилтэн (Хичээлийн I байр-302 тоот)	",
    roles: ["teacher"],
  },
  {
    name: "Нярав (Хичээлийн I байр 101 тоот )",
    roles: ["teacher", "employee"],
  },
  {
    name: "Тэнхимийн эрхлэгч",
    roles: ["teacher", "Student"],
  },
  {
    name: "Тэнхимийн туслах ажилтан",
    roles: ["Student", "teacher"],
  },
  {
    name: "Анги удирдсан багш	",
    roles: ["Student"],
  },
  {
    name: "Оюутны дотуур байрны багш",
    roles: ["Student"],
  },
  {
    name: "Номын сангийн эрхлэгч (I байр)",
    roles: ["teacher", "employee", "Student"],
  },

  {
    name: "Фондын эрхлэгч (I байр)",
    roles: ["teacher", "employee", "Student"],
  },
];

export default function Toiroh() {
  const nowDate = moment().tz("Asia/Hovd").format("YYYY-MM-DD");
  const { user, teacherOne, checkRole, studentOne } = useAuth();
  console.log("🚀 ~ Toiroh ~ teacherOne:", teacherOne);

  const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
      <div className="p-4 max-w-[297mm] w-full overflow-auto mx-auto" ref={ref}>
        <div className=" flex flex-col justify-center items-center gap-2">
          <img
            width="60"
            src="https://auth.num.edu.mn/oauth2/Image/num-logo.svg"
            alt=""
          />
          <p className="uppercase">МУИС-ийн Баруун бүсийн сургууль</p>
          <p className="font-medium">ТООЦООНЫ ТОЙРОХ ХУУДАС</p>
        </div>
        <div className="flex flex-row justify-between mb-1 text-sm ">
          {checkRole(["Student"], user?.rols) && (
            <p className="flex gap-2">
              <span>{studentOne?.department_id?.name}</span>
              <span>
                {studentOne?.class_id?.name}-{studentOne?.class_id?.kurs_id}
              </span>
              <span>
                {studentOne?.lastName} {studentOne?.firstName}
              </span>
            </p>
          )}
          {checkRole(["teacher", "employee"], user?.rols) && (
            <p className="text-xs">
              {teacherOne?.department?.name} {teacherOne?.lastname}{" "}
              {teacherOne?.firstname} / {teacherOne.office}{" "}
              {teacherOne.typeOfTeacher} /
            </p>
          )}
          <p className="text-xs">Огноо: {nowDate}</p>
        </div>

        <table className="border  w-full">
          <thead>
            <tr className="text-xs border ">
              <th className="border  p-1">№</th>
              <th className="border  p-1">Тооцоо хийх газрууд </th>
              <th className="border  p-1">Тооцоотой эсэх тухай тэмдэглэлүүд</th>
              <th className="border  p-1">
                Тооцоо хийсэн хүний гарын үсэг /тэмдэг дарна/
              </th>
            </tr>
          </thead>
          <tbody>
            {list
              .filter((el) => el.roles.includes(user?.role))
              .map((item, index) => (
                <tr className="border   text-xs" key={index}>
                  <td className="border  p-1 text-center">{index + 1}</td>
                  <td className="border  p-1 text-justify">{item.name}</td>
                  <td className="border  p-1"></td>
                  <td className="border  p-1"></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  });

  const componentRef = useRef(null);

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "AwesomeFileName",
  });

  return (
    <div className="mx-auto w-full p-6">
      <Button
        variant="outline"
        onClick={printFn}
        className="flex flex-row gap-2"
      >
        <PrinterIcon className="size-4" />
        Хэвлэх
      </Button>

      <ComponentToPrint ref={componentRef} />
    </div>
  );
}
