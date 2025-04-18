import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { useAuth } from "../components/Context/AuthContext";
import { useCtx } from "../components/Context/MainContext";

const Schedule = () => {
  const { depState, user, getDepTeachers, teacherState, yearState, checkRole } =
    useAuth();

  const { huvaariState, getTeacherHuvaari, getAngiHuvaari } = useCtx();
  const [data, setdata] = useState({
    department: "",
    teacher: "",
    yearLesson: "2024-2025",
    semister: 2,
  });

  useEffect(() => {
    if (checkRole(["teacher"], user?.rols)) {
      getTeacherHuvaari(user._id, data.yearLesson, data.semister);
    }
    if (checkRole(["Student"], user?.rols)) {
      getAngiHuvaari(user._id, data.yearLesson, data.semister);
    }
  }, []);

  const days = ["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан"];

  return (
    <div className="">
      <CardHeader>
        <CardTitle className="text-center text-xl text-blue-600 uppercase">
          Хичээлийн хуваарь
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {checkRole(
            ["admin", "person", "director", "manager"],
            user?.rols
          ) && (
            <Select
              onValueChange={(value) => {
                setdata({ ...data, department: value });
                getDepTeachers(value);
              }}
            >
              <SelectTrigger className="w-60">
                <SelectValue placeholder="Тэнхим сонгох" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Тэнхимүүд</SelectLabel>
                  {depState
                    .filter((el) => el.role === "department")
                    .map((dep, index) => {
                      return (
                        <SelectItem key={index} value={dep.id}>
                          {dep.name}
                        </SelectItem>
                      );
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          {checkRole(
            ["admin", "person", "director", "manager", "department"],
            user?.rols
          ) && (
            <Select
              onValueChange={(value) => {
                setdata({ ...data, teacher: value });
                getTeacherHuvaari(value, data.yearLesson, data.semister);
              }}
            >
              <SelectTrigger className="w-60">
                <SelectValue placeholder="Багш сонгох" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Багш нар</SelectLabel>
                  {teacherState.map((teach, index) => {
                    return (
                      <SelectItem key={index} value={teach.id}>
                        {teach.firstname}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          <Select
            onValueChange={(value) => {
              setdata({ ...data, yearLesson: value });

              if (checkRole(["teacher"], user?.rols)) {
                getTeacherHuvaari(
                  checkRole(["teacher", user?.rols]) ? user?.id : data.teacher,
                  value,
                  data.semister
                );
              }
              if (checkRole(["Student"], user?.rols)) {
                getAngiHuvaari(user._id, value, data.semister);
              }
            }}
            value={data.yearLesson}
          >
            <SelectTrigger className="w-auto min-w-24">
              <SelectValue placeholder="Хичээлийн жил сонгох" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Хичээлийн жил</SelectLabel>
                {yearState.map((item, index) => {
                  return (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => {
              setdata({ ...data, semister: value });

              if (checkRole(["teacher"], user?.rols)) {
                getTeacherHuvaari(
                  checkRole(["teacher"], user?.rols) ? user?.id : data.teacher,
                  data.yearLesson,
                  value
                );
              }
              if (checkRole(["Student"], user?.rols)) {
                getAngiHuvaari(user._id, data.yearLesson, value);
              }
            }}
            value={data.semister}
          >
            <SelectTrigger className="w-auto min-w-24">
              <SelectValue placeholder="Улирал сонгох" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Улирал</SelectLabel>
                {[1, 2].map((item, index) => {
                  return (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <table className="w-full mt-4">
          <thead className="">
            <tr className="">
              <th className="border px-4 py-1 " />
              {days.map((day, index) => {
                return (
                  <th
                    key={index}
                    className="border px-4 font-medium py-1 uppercase "
                  >
                    {day}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {[
              "08:00-09:30",
              "09:40-11:10",
              "11:30-13:00",
              "13:10-14:40",
              "14:50-16:20",
              "16:30-18:00",
              "18:10-19:40",
              "19:50-21:20",
              "21:30-23:00",
            ].map((el, index) => (
              <tr key={index} className="">
                <td className="border text-center w-28 p-4">{el}</td>
                {days.map((day, index) => {
                  return (
                    <td
                      key={index}
                      className={`border w-52 font-medium  ${
                        huvaariState.find(
                          (hu) =>
                            hu.tsag.daysOfweek === day &&
                            hu.tsag.timeOfLesson === el &&
                            hu.lessonType === "Лекц"
                        ) && "bg-green-700 text-white"
                      } ${
                        huvaariState.find(
                          (hu) =>
                            hu.tsag.daysOfweek === day &&
                            hu.tsag.timeOfLesson === el &&
                            hu.lessonType === "Семинар"
                        ) && "bg-orange-600 text-white"
                      }`}
                    >
                      {huvaariState
                        .filter(
                          (fi) =>
                            fi.tsag.daysOfweek === day &&
                            fi.tsag.timeOfLesson === el
                        )
                        .map((item, index) => {
                          return (
                            <div key={index} className="text-xs text-center">
                              <p className="text-md">"{item.lesson_id.name}"</p>
                              <p>
                                {item.lessonType}, {item.tsag.classRoom}
                              </p>
                            </div>
                          );
                        })}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </div>
  );
};

export default Schedule;
