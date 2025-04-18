import React, { forwardRef, useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useAuth } from "../../components/Context/AuthContext";
import { useCtx } from "../../components/Context/MainContext";
import moment from "moment-timezone";
import { Printer, PrinterIcon } from "lucide-react";
import { useReactToPrint } from "react-to-print";

const Dun = () => {
  const { user, depState, classState, getDepClass, checkRole } = useAuth();
  const {
    getClassYear,
    dunYearLesson,
    setDunYearLesson,
    getClassDun,
    getClassDun2,
    getStudentDun,
    dunState,
    dunState2,
    setDunState,
    getClassGolch,
    golchState,
  } = useCtx();

  var stud2 = {};
  var studPlan = dunState2
    .filter((el) => el.student_id?.outlook === "Суралцаж байгаа")
    .reduce(function (r, o) {
      var key = o.student_id?._id;
      if (!stud2[key]) {
        stud2[key] = Object.assign({
          _id: o.student_id._id,
          fname: o.student_id.firstName,
          lname: o.student_id.lastName,
          regnum: o.student_id.regnum,
          dun: [{ ...o }],
        });
        r.push(stud2[key]);
      } else {
        stud2[key].dun.push(o);
      }
      return r;
    }, []);
  var less = {};
  var lessons = dunState2
    .filter((el) => el.student_id?.outlook === "Суралцаж байгаа")
    .reduce(function (r, o) {
      var key = o.programPlan_id._id;
      if (!less[key]) {
        less[key] = Object.assign({
          pid: o.programPlan_id._id,
          lessonName: o.lesson_id.name,
          id: o.lesson_id._id,
          credit: o.programLesson_id.credit,
          lessonNdx: o.programLesson_id.lessonNdx,
          dun: [{ ...o }],
        });
        r.push(less[key]);
      } else {
        less[key].dun.push(o);
      }
      return r;
    }, []);

  const [classid, setClassid] = useState({});
  const [year, setYear] = useState("");
  const [semister, setSemister] = useState(1);
  var stud = {};
  var result = dunState.reduce(function (r, o) {
    var key = o.lesson_id.name;
    if (!stud[key]) {
      stud[key] = Object.assign({
        name: o.lesson_id.name,
        timeStudy: o.programPlan_id.timeStudy,
        lessonNdx: o.programLesson_id.lessonNdx,
        yname: o.yearLesson,
        kr: o.programLesson_id.credit,
        chooseSeminar: o.programPlan_id.chooseSeminar,
        sumkr: o.programLesson_id.credit,
        sumScore: o.score * o.programLesson_id.credit,
        sumPoint: o.point * o.programLesson_id.credit,
        student: [{ ...o }],
      });
      r.push(stud[key]);
    } else {
      stud[key].student.push(o);
      stud[key].sumkr += o.programLesson_id.credit;
      stud[key].sumScore += o.score * o.programLesson_id.credit;
      stud[key].sumPoint += o.point * o.programLesson_id.credit;
    }
    return r;
  }, []);
  const componentRef = useRef(null);

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Дүнгийн мэдээлэл",
  });
  useEffect(() => {
    if (checkRole(["Student"], user?.rols)) {
      getStudentDun(user?._id);
    }
  }, []);

  const TPrint = forwardRef((props, ref) => {
    return (
      <div className="p-8 max-w-[297mm] w-full overflow-auto mx-auto" ref={ref}>
        {classid?.name}-{year}-1
        <table className="border text-sm w-full">
          <tr>
            <th className="border">№</th>
            <th className="border">Нэр</th>
            <th className="border">Дүн</th>
            <th className="border">Голч</th>
            <th className="border">Хичээлийн тоо</th>
            <th className="border">Нийт кр</th>
          </tr>
          <tbody>
            {golchState.map((el, index) => {
              return (
                <tr className="border text-center">
                  <td className="border">{index + 1}</td>
                  <td className="border text-left">
                    <span className="font-medium">{el.firstName}</span>{" "}
                    <span className="text-gray-600">{el.lastName}</span>
                  </td>
                  <td className="border">{el.averageScore}</td>
                  <td className="border">{el.gpa}</td>
                  <td className="border">{el.subjectsCount}</td>
                  <td className="border">{el.totalCredits}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  });
  const DunPrint = forwardRef((props, ref) => {
    return (
      <div className="p-2 w-full overflow-auto mx-auto" ref={ref}>
        {classid?.ner}
        <table className="w-full text-xs border">
          <tr className="border p-1">
            <th colSpan={2}>№</th>
            {lessons
              .sort((a, b) => (a.lessonName > b.lessonName ? 1 : -1))
              .map((el, index) => {
                return <td className="border p-1">{index + 1}</td>;
              })}
          </tr>
          <tr className="border p-1 text-center">
            <th className="border p-1" colSpan={2}>
              Кредит
            </th>

            {lessons
              .sort((a, b) => (a.lessonName > b.lessonName ? 1 : -1))
              .map((el, index) => {
                return <td className="border p-1">{el.credit}</td>;
              })}
          </tr>
          <tr className="border p-1">
            <th className="border p-1">№</th>
            <th className="border p-1">
              Овог, нэр <br />
              Хичээлийн нэр{" "}
            </th>
            {lessons
              .sort((a, b) => (a.lessonName > b.lessonName ? 1 : -1))
              .map((el, index) => {
                return (
                  <td className="border p-1 [writing-mode:vertical-rl] rotate-180">
                    {el.lessonName}
                  </td>
                );
              })}
          </tr>
          <tr className="border p-1">
            <th className="border p-1" colSpan={2}>
              Индекс
            </th>

            {lessons
              .sort((a, b) => (a.lessonName > b.lessonName ? 1 : -1))
              .map((el, index) => {
                return (
                  <td className="border p-1 [writing-mode:vertical-rl] rotate-180 ">
                    {el.lessonNdx}
                  </td>
                );
              })}
          </tr>
          {studPlan.map((el, index) => {
            return (
              <tr className="border p-1">
                <td className="border p-1">{index + 1}</td>
                <td className="border p-1">
                  <b> {el.fname}</b> {el.lname}
                </td>
                {lessons
                  .sort((a, b) => (a.lessonName > b.lessonName ? 1 : -1))
                  .map((row, index) => {
                    return (
                      <td className="border p-1">
                        {row.dun?.findIndex(
                          (e) => e.student_id?._id === el._id
                        ) !== -1
                          ? row.dun[
                              row.dun.findIndex(
                                (elm) => elm.student_id?._id === el._id
                              )
                            ].score
                          : ""}
                      </td>
                    );
                  })}
                <td className="border p-1 font-semibold">
                  {el.dun.reduce(
                    (acc, item) => acc + item.programLesson_id?.credit,
                    0
                  )}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Дүнгийн мэдээлэл</CardTitle>
        <div className="flex flex-wrap gap-2">
          {checkRole(
            ["admin", "manager", "director", "teacher"],
            user?.rols
          ) && (
            <Select
              onValueChange={(value) => {
                getDepClass(value);
              }}
            >
              <SelectTrigger className="w-auto">
                <SelectValue placeholder="Тэнхим сонгох" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Тэнхимүүд</SelectLabel>
                  {depState
                    .filter((el) => el.role === "department")
                    .map((dep, index) => {
                      return (
                        <SelectItem
                          className="cursor-pointer"
                          key={index}
                          value={dep.id}
                        >
                          {dep.name}
                        </SelectItem>
                      );
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          {!checkRole(["Student"], user?.rols) && (
            <Select
              onValueChange={(value) => {
                getClassDun2(value._id);
                setYear("");
                setDunState([]);
                setClassid(value);
                getClassYear(value._id);
              }}
            >
              <SelectTrigger className="w-auto">
                <SelectValue placeholder="Анги сонгох" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Ангиууд</SelectLabel>
                  {classState
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                    .map((item, index) => {
                      return (
                        <SelectItem
                          className="cursor-pointer"
                          key={index}
                          value={item}
                        >
                          {item.name} - {item.kurs_id}
                        </SelectItem>
                      );
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          {!checkRole(["Student"], user?.rols) && (
            <Select
              value={year}
              onValueChange={(value) => {
                setYear(value);
                getClassDun(classid._id, value);
                getClassGolch(classid._id, value, 1);
              }}
            >
              <SelectTrigger className="w-auto">
                <SelectValue placeholder="Хичээлийн жил сонгох" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Хичээлийн жил сонгох</SelectLabel>
                  {dunYearLesson.map((item, index) => {
                    return (
                      <SelectItem
                        className="cursor-pointer"
                        key={index}
                        value={item._id?.yearLesson}
                      >
                        {item._id?.yearLesson}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          {/* <Select
            value={year}
            onValueChange={(value) => {
              setYear(value);
              getClassDun(classid._id, value);
              getClassGolch(classid._id, value, 1);
            }}
          >
            <SelectTrigger className="w-auto">
              <SelectValue placeholder="Хичээлийн жил сонгох" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Хичээлийн жил сонгох</SelectLabel>
                {dunYearLesson.map((item, index) => {
                  return (
                    <SelectItem
                      className="cursor-pointer"
                      key={index}
                      value={item._id?.yearLesson}
                    >
                      {item._id?.yearLesson}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select> */}

          {golchState.length > 0 && (
            <Dialog>
              <DialogTrigger>
                <Button
                  onClick={() => {}}
                  variant="outline"
                  className="flex flex-row gap-2"
                >
                  <PrinterIcon className="size-4" />
                  Дүнгийн голч хэвлэх
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90%] h-full">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Дүнгийн голч
                  </DialogTitle>
                  <Button
                    onClick={() => {
                      printFn();
                    }}
                    variant="outline"
                    className="gap-1 w-36"
                  >
                    <Printer className="size-4" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Хэвлэх
                    </span>
                  </Button>
                </DialogHeader>

                <TPrint ref={componentRef} />
              </DialogContent>
            </Dialog>
          )}
          <Dialog>
            <DialogTrigger>
              <Button
                onClick={() => {}}
                variant="outline"
                className="flex flex-row gap-2"
              >
                <PrinterIcon className="size-4" />
                Дүнгийн хавтгай татах
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90%] w-auto min-w-96 max-w-[90%] min-h-96">
              <DialogHeader>
                <DialogTitle className="text-center">Дүнгийн голч</DialogTitle>
                <Button
                  onClick={() => {
                    printFn();
                  }}
                  variant="outline"
                  className="gap-1 w-36"
                >
                  <Printer className="size-4" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Хэвлэх
                  </span>
                </Button>
              </DialogHeader>

              <DunPrint ref={componentRef} />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {checkRole(["Student"], user?.rols) && (
          <Table className="text-xs">
            <TableHeader>
              <TableRow>
                <TableHead>№</TableHead>
                <TableHead>Хичээлийн нэр</TableHead>
                <TableHead>Хичээлийн жил</TableHead>
                <TableHead>O1</TableHead>
                <TableHead>O2</TableHead>
                <TableHead>O3</TableHead>
                <TableHead>Дүн</TableHead>
                <TableHead>Үнэлгээ</TableHead>
                <TableHead>Оноо</TableHead>
                <TableHead>Төлөв</TableHead>
                <TableHead>Багш</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dunState.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-semibold">
                      {row.lesson_id?.name}
                    </TableCell>
                    <TableCell>{row.yearLesson}</TableCell>
                    <TableCell>{row.o1}</TableCell>
                    <TableCell>{row.o2}</TableCell>
                    <TableCell>{row.o3}</TableCell>
                    <TableCell>
                      <b>{row.score}</b>
                    </TableCell>
                    <TableCell>{row.assessment}</TableCell>
                    <TableCell>
                      {" "}
                      <span className="font-bold">{row.point}</span> кр{" "}
                    </TableCell>
                    {/* <TableCell>
                          {row.yearLesson}-{row.semister}
                        </TableCell> */}
                    <TableCell>{row.statusScore} </TableCell>
                    <TableCell>
                      {row.teacher_id?.lastname?.slice(0, 1)}.
                      {row.teacher_id?.firstname}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}

        {!checkRole(["Student"], user?.rols) &&
          result.map((item, index) => {
            return (
              <div key={index} className="mt-2">
                <p className="text-center font-medium uppercase">{item.name}</p>
                <Table className="border text-xs">
                  <TableHeader>
                    <TableRow>
                      <TableHead>№</TableHead>
                      <TableHead>Овог нэр</TableHead>
                      <TableHead>O1</TableHead>
                      <TableHead>O2</TableHead>
                      <TableHead>O3</TableHead>
                      <TableHead>Дүн</TableHead>
                      <TableHead>Үнэлгээ</TableHead>
                      <TableHead>Оноо</TableHead>
                      <TableHead>Төлөв</TableHead>
                      <TableHead>Багш</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {item.student?.map((row, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell className="flex gap-2">
                            <span className="font-medium">
                              {row.student_id?.firstName}
                            </span>
                            <span>{row.student_id?.lastName}</span>
                          </TableCell>
                          <TableCell>{row.o1}</TableCell>
                          <TableCell>{row.o2}</TableCell>
                          <TableCell>{row.o3}</TableCell>
                          <TableCell>
                            <b>{row.score}</b>
                          </TableCell>
                          <TableCell>{row.assessment}</TableCell>
                          <TableCell>{row.point}</TableCell>
                          {/* <TableCell>
                          {row.yearLesson}-{row.semister}
                        </TableCell> */}
                          <TableCell>{row.statusScore}</TableCell>
                          <TableCell>
                            {row.teacher_id?.lastname?.slice(0, 1)}.
                            {row.teacher_id?.firstname}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
};

export default Dun;
