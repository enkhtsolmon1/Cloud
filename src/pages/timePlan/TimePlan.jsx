import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  CalendarPlus,
  ClipboardPlusIcon,
  PencilIcon,
  PlusCircle,
  PrinterIcon,
  RefreshCwIcon,
  Trash,
  Trash2Icon,
  UserMinus,
  UserPlus,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import TimePlanprint from "./TimePlanPrint";
import { useAuth } from "../../components/Context/AuthContext";
import { useCtx } from "../../components/Context/MainContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import moment from "moment-timezone";

const TimePlan = () => {
  const {
    user,
    teacherOne,
    yearState,
    checkRole,
    depState,
    teacherState,
    getDepTeachers,
    getDepClass,
    classState,
    getStudents,
    studentState,
  } = useAuth();
  const {
    timePlanState,
    getTimePlanTeacher,
    getTimeReportPlan,
    timeReportState,
    addReport,
    updateReport,
    deleteReport,
    getTimePlanStudent,
    timeplanStud,
    addStudentPlan,
    deleteStudentPlan,
    addHuvaari,
    deleteHuvaari,
  } = useCtx();
  const [data, setdata] = useState({
    on: "2024-2025",
    teacher: {},
    department: {},
  });
  const [on, setOn] = useState("2024-2025");
  const nowDate = moment().tz("Asia/Hovd").format("YYYY-MM-DD");

  useEffect(() => {
    if (checkRole(["teacher"], user?.rols)) {
      getTimePlanTeacher(user?.department._id, user?.id, on);
    }
    if (checkRole(["department"], user?.rols)) {
      getDepTeachers(user?.department._id);
    }
  }, []);

  const calcnorm = (type) => {
    var norm = 0;
    if (type === "Багш") {
      norm = 16;
    } else if (type === "Дадлагажигч багш") {
      norm = 13;
    } else if (type === "Ахлах багш") {
      norm = 15;
    } else if (type === "Дэд профессор багш") {
      norm = 13;
    } else if (type === "Профессор багш") {
      norm = 12;
    }
    return norm;
  };

  const [tpOpen, settpOpen] = useState(false);
  const [sedevOpen, setSedevOpen] = useState(false);
  const [sopen, setSopen] = useState(false);
  const [tData, settData] = useState({});
  const [sedevState, setSedevState] = useState({
    timePlan_id: "",
    lessonDate: nowDate,
    lessonSubject: "",
    lessonTime: 2,
    status: "Шивсэн",
    comment: "",
  });
  const [huvaariState, setHuvaariState] = useState({});
  return (
    <Card>
      <Dialog open={sopen} onOpenChange={() => setSopen(false)}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <div className="grid gap-2 p-2">
            <div className="grid grid-cols-4   items-center gap-4">
              <Label className="text-right">Сэдэв</Label>
              <Input
                className="col-span-3"
                onChange={(e) => {
                  setSedevState({
                    ...sedevState,
                    lessonSubject: e.target.value,
                  });
                }}
                value={sedevState.lessonSubject}
                type="text"
                placeholder="Сэдэв"
              />
            </div>
            <div className="grid grid-cols-4   items-center gap-4">
              <Label className="text-right">Огноо</Label>
              <Input
                className="col-span-3"
                onChange={(e) => {
                  setSedevState({
                    ...sedevState,
                    lessonDate: e.target.value,
                  });
                }}
                value={sedevState.lessonDate}
                type="date"
                placeholder="Огноо"
              />
            </div>
            <div className="grid grid-cols-4   items-center gap-4">
              <Label className="text-right">Цаг</Label>
              <Input
                className="col-span-3"
                onChange={(e) => {
                  setSedevState({
                    ...sedevState,
                    lessonTime: e.target.value,
                  });
                }}
                value={sedevState.lessonTime}
                type="number"
                placeholder="Хичээлийн цаг"
              />
            </div>
            <div className="grid grid-cols-4   items-center gap-4">
              <Label className="text-right">Тайлбар</Label>
              <Input
                className="col-span-3"
                onChange={(e) => {
                  setSedevState({
                    ...sedevState,
                    comment: e.target.value,
                  });
                }}
                value={sedevState.comment}
                type="text"
                placeholder="Тайлбар"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogTrigger>
              <Button
                onClick={() => {
                  if (sedevState._id) {
                    updateReport(
                      sedevState,
                      user?.department._id,
                      user?.id,
                      on
                    );
                  } else {
                    addReport(sedevState, user?.department._id, user?.id, on);
                  }
                }}
              >
                Хадгалах
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={sedevOpen} onOpenChange={() => setSedevOpen(false)}>
        <DialogContent className="max-w-4xl max-h-[80%]  overflow-auto ">
          <DialogHeader>
            <DialogTitle className="text-center">
              <span className="font-medium">{tData.lesson_id?.name}</span>
            </DialogTitle>
            <Tabs defaultValue="account" className="w-full">
              <TabsList>
                <TabsTrigger value="account">Сэдэв</TabsTrigger>
                <TabsTrigger value="huvaari">Хичээлийн хуваарь</TabsTrigger>
                <TabsTrigger value="student">Оюутан</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 justify-center">
                    <span className="">
                      {tData.programPlan_id?.chooseSeminar} ул. ({" "}
                      {tData.programLesson_id?.lessonNdx} ){" "}
                      {tData.programLesson_id?.credit} кр, ({" "}
                      {tData.programPlan_id?.timeStudy} )
                    </span>
                    <span>{tData.countStud} оюутан </span>
                    <span> / {tData.lessonType} / </span>
                  </div>
                  {checkRole(["teacher"], user?.rols) && (
                    <Button
                      onClick={() => {
                        setSopen(true);
                        setSedevState({
                          ...sedevState,
                          lessonDate: nowDate,
                          lessonSubject: "",
                          lessonTime: 2,
                          status: "Шивсэн",
                          comment: "",
                          _id: null,
                        });
                      }}
                      variant="outline"
                      className="gap-1 ml-auto"
                    >
                      <PlusCircle className="size-4" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap ">
                        Сэдэв нэмэх
                      </span>
                    </Button>
                  )}
                </div>
                <table className="text-xs w-full mt-4">
                  <tr>
                    <th className="p-1 border">№</th>
                    <th className="p-1 border">Огноо</th>
                    <th className="p-1 border">Сэдэв</th>
                    <th className="p-1 border">Цаг</th>
                    <th className="p-1 border">Тайлбар</th>
                    <th className="p-1 border"></th>
                  </tr>
                  <tbody>
                    {timeReportState
                      .sort((a, b) => (a.lessonDate < b.lessonDate ? -1 : 1))
                      .map((item, index) => {
                        return (
                          <tr>
                            <td className="p-1 border text-center">
                              {index + 1}
                            </td>
                            <td className="p-1 border">{item.lessonDate}</td>
                            <td className="p-1 border">{item.lessonSubject}</td>
                            <td className="p-1 border text-center">
                              {item.lessonTime}
                            </td>
                            <td className="p-1 border text-center">
                              {item.comment}
                            </td>
                            {checkRole(["teacher"], user?.rols) && (
                              <td className="p-1 border text-center flex gap-1 justify-end">
                                <Button
                                  onClick={() => {
                                    setSopen(true);
                                    setSedevState({
                                      ...item,
                                      timePlan_id: item.timePlan_id?._id,
                                    });
                                  }}
                                  variant="outline"
                                  size="icon"
                                  className="flex gap-2 size-7"
                                >
                                  <PencilIcon className="size-4 text-blue-600 " />
                                </Button>
                                <Dialog>
                                  <DialogTrigger>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger>
                                          <Button
                                            variant="outline"
                                            size="icon"
                                            className="flex gap-2 size-7"
                                          >
                                            <Trash2Icon className="size-4 text-rose-600 " />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Устгах</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-xs">
                                    <DialogHeader>
                                      <DialogTitle>
                                        <h1>Устгахдаа итгэлтэй байна уу?</h1>
                                      </DialogTitle>
                                    </DialogHeader>
                                    <div className="w-full flex justify-evenly mt-2 gap-2">
                                      <DialogTrigger>
                                        <Button
                                          className=""
                                          onClick={() => {
                                            deleteReport(
                                              item._id,
                                              item.timePlan_id?._id,
                                              user?.department._id,
                                              user?.id,
                                              on
                                            );
                                          }}
                                          variant="destructive"
                                          size="sm"
                                        >
                                          Тийм
                                        </Button>
                                      </DialogTrigger>
                                      <DialogTrigger>
                                        <Button
                                          className=""
                                          onClick={() => {}}
                                          variant="outline"
                                          size="sm"
                                        >
                                          Үгүй
                                        </Button>
                                      </DialogTrigger>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </TabsContent>
              <TabsContent value="huvaari">
                <div className="w-full">
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        onClick={() => {}}
                        variant="outline"
                        className="gap-1 ml-auto"
                      >
                        <CalendarPlus className="size-4" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap ">
                          Хуваарь нэмэх
                        </span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle></DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-2 p-2">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Тэгш, Сондгой</Label>
                          <Select
                            onValueChange={(value) => {
                              setHuvaariState({
                                ...huvaariState,
                                evenOdd: value,
                              });
                            }}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {["Долоо хоног бүр", "Тэгш", "Сондгой"].map(
                                  (item, index) => {
                                    return (
                                      <SelectItem
                                        className="cursor-pointer"
                                        key={index}
                                        value={item}
                                      >
                                        {item}
                                      </SelectItem>
                                    );
                                  }
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Гариг</Label>
                          <Select
                            onValueChange={(value) => {
                              setHuvaariState({
                                ...huvaariState,
                                daysOfweek: value,
                              });
                            }}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {[
                                  "Даваа",
                                  "Мягмар",
                                  "Лхагва",
                                  "Пүрэв",
                                  "Баасан",
                                  "Бямба",
                                  "Ням",
                                ].map((item, index) => {
                                  return (
                                    <SelectItem
                                      className="cursor-pointer"
                                      key={index}
                                      value={item}
                                    >
                                      {item}
                                    </SelectItem>
                                  );
                                })}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Цаг</Label>
                          <Select
                            onValueChange={(value) => {
                              setHuvaariState({
                                ...huvaariState,
                                timeOfLesson: value,
                              });
                            }}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
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
                                ].map((item, index) => {
                                  return (
                                    <SelectItem
                                      className="cursor-pointer"
                                      key={index}
                                      value={item}
                                    >
                                      {item}
                                    </SelectItem>
                                  );
                                })}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-4   items-center gap-4">
                          <Label className="text-right">Өрөө №</Label>
                          <Input
                            className="col-span-3"
                            onChange={(e) => {
                              setHuvaariState({
                                ...huvaariState,
                                classRoom: e.target.value,
                              });
                            }}
                            value={huvaariState.classRoom}
                            type="text"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogTrigger>
                          <Button
                            onClick={() => {
                              addHuvaari(tData._id, huvaariState, on);
                            }}
                          >
                            Хадгалах
                          </Button>
                        </DialogTrigger>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <table className="text-xs w-full mt-4">
                  <tr>
                    <th className="p-1 border">№</th>
                    <th className="p-1 border">Тэгш/Сондгой долоо хоног</th>
                    <th className="p-1 border">Гариг</th>
                    <th className="p-1 border">Цаг</th>
                    <th className="p-1 border">Өрөөний дугаар</th>
                    <th className="p-1 border"></th>
                  </tr>
                  <tbody>
                    {tData?.huvaari?.map((item, index) => {
                      return (
                        <tr>
                          <td className="p-1 border text-center">
                            {index + 1}
                          </td>
                          <td className="p-1 border">{item.evenOdd}</td>
                          <td className="p-1 border">{item.daysOfweek}</td>
                          <td className="p-1 border text-center">
                            {item.lessonTime}
                          </td>
                          <td className="p-1 border text-center">
                            {item.classRoom}
                          </td>
                          <td className="p-1 border text-center flex gap-1 justify-end">
                            {checkRole(["teacher"], user?.rols) && (
                              <Dialog>
                                <DialogTrigger>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <Button
                                          variant="outline"
                                          size="icon"
                                          className="flex gap-2 size-7"
                                        >
                                          <Trash2Icon className="size-4 text-rose-600 " />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Устгах</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </DialogTrigger>
                                <DialogContent className="max-w-xs">
                                  <DialogHeader>
                                    <DialogTitle>
                                      <h1>Устгахдаа итгэлтэй байна уу?</h1>
                                    </DialogTitle>
                                  </DialogHeader>
                                  <div className="w-full flex justify-evenly mt-2 gap-2">
                                    <DialogTrigger>
                                      <Button
                                        className=""
                                        onClick={() => {
                                          deleteHuvaari(
                                            tData?._id,
                                            { _id: item._id },
                                            on
                                          );
                                        }}
                                        variant="destructive"
                                        size="sm"
                                      >
                                        Тийм
                                      </Button>
                                    </DialogTrigger>
                                    <DialogTrigger>
                                      <Button
                                        className=""
                                        onClick={() => {}}
                                        variant="outline"
                                        size="sm"
                                      >
                                        Үгүй
                                      </Button>
                                    </DialogTrigger>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </TabsContent>
              <TabsContent value="student">
                <div className="flex flex-wrap gap-2">
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
                          .sort((a, b) => (a.name > b.name ? 1 : -1))
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

                  <Select
                    onValueChange={(value) => {
                      getStudents(value._id);
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
                </div>
                <div className="w-full grid-cols-2 grid gap-4 mt-4">
                  <div className="border p-2 rounded-lg max-h-[500px] overflow-auto">
                    <h1 className="text-center font-semibold text-sm">
                      Оюутны тоо {studentState.length}
                    </h1>
                    {studentState
                      .filter((el) => el.outlook === "Суралцаж байгаа")
                      .map(
                        (el, index) =>
                          timeplanStud.map((x) => x._id).indexOf(el._id) ===
                            -1 && (
                            <div className="flex justify-between items-center border-b p-1 text-xs">
                              <div className="flex flex-col">
                                <p className="font-semibold flex gap-2">
                                  <span className="">{el?.firstName}</span>
                                  <span className="text-gray-600">
                                    {el?.lastName}
                                  </span>
                                </p>
                                {/* <p className="text-gray-700 ">
                                {item.class_id?.ner}
                              </p> */}
                              </div>
                              <Button
                                onClick={() => {
                                  addStudentPlan(tData._id, {
                                    stud_id: el._id,
                                  });
                                }}
                                className="size-7 bg-blue-600 text-white hover:bg-blue-600 hover:text-white"
                                variant="outline"
                                size="icon"
                              >
                                <UserPlus className="size-4" />
                              </Button>
                            </div>
                          )
                      )}
                  </div>
                  <div className="border p-2 rounded-lg max-h-[500px] overflow-auto">
                    <h1 className="text-center font-semibold text-sm">
                      Оюутны тоо {timeplanStud.length}
                    </h1>
                    {timeplanStud.map((item, index) => {
                      return (
                        <div className="flex justify-between items-center border-b p-1 text-xs">
                          <div className="flex flex-col">
                            <p className="font-semibold flex gap-2">
                              <span className="">{item?.firstName}</span>
                              <span className="text-gray-600">
                                {item?.lastName}
                              </span>
                            </p>
                            <p className="text-gray-700 ">
                              {item.class_id?.ner}
                            </p>
                          </div>
                          <Button
                            onClick={() => {
                              deleteStudentPlan(tData._id, {
                                stud_id: item._id,
                              });
                            }}
                            className="size-6"
                            variant=""
                            size="icon"
                          >
                            <UserMinus className="size-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <TimePlanprint
        tpOpen={tpOpen}
        settpOpen={settpOpen}
        timePlanState={timePlanState}
        calcnorm={calcnorm}
      />
      <CardHeader>
        <CardTitle className="text-center">
          Профессор багшийн сургалтын ажлын төлөвлөгөө, гүйцэтгэл
        </CardTitle>
        <div className="text-[12px] text-center">
          <b>Тэнхим: </b> {teacherOne?.department?.name} <b>Овог: </b>
          {teacherOne?.lastname} <b>Нэр: </b>
          {teacherOne?.firstname} / {teacherOne?.educationalLevel} /{" "}
          <b>Албан тушаал: </b> {teacherOne?.typeOfTeacher}{" "}
          <b>Гүйцэтгэх багц цаг: </b> {calcnorm(teacherOne?.typeOfTeacher)}
        </div>
      </CardHeader>

      <CardContent>
        <div className="w-auto flex flex-wrap gap-2 items-center">
          {checkRole(
            ["admin", "person", "manager", "director", "alba"],
            user?.rols
          ) && (
            <Select
              onValueChange={(value) => {
                setdata({ ...data, department: value });
                getDepTeachers(value.id);
              }}
            >
              <SelectTrigger className="w-auto">
                <SelectValue placeholder="Тэнхим сонгох" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Тэнхимүүд</SelectLabel>
                  {depState
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                    .map((dep, index) => {
                      return (
                        <SelectItem
                          className="cursor-pointer"
                          key={index}
                          value={dep}
                        >
                          {dep.name}
                        </SelectItem>
                      );
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          {checkRole(["admin", "person", "department", "alba"], user?.rols) && (
            <Select
              onValueChange={(value) => {
                setdata({ ...data, teacher: value });
                // console.log(value);
                getTimePlanTeacher(value.department?._id, value._id, on);
              }}
            >
              <SelectTrigger className="w-auto min-w-24">
                <SelectValue placeholder="Багш сонгох" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Багш,ажилтан</SelectLabel>
                  {teacherState
                    .sort((a, b) => (a.firstname > b.firstname ? 1 : -1))
                    .map((item, index) => {
                      return (
                        <SelectItem
                          className="cursor-pointer"
                          key={index}
                          value={item}
                        >
                          {item.firstname} {item.lastname}
                        </SelectItem>
                      );
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}

          <Select
            defaultValue={on}
            onValueChange={(value) => {
              setOn(value);
              setdata({ ...data, on: value });
              if (checkRole(["teacher"], user?.rols)) {
                getTimePlanTeacher(user?.department._id, user?.id, on);
              } else {
                getTimePlanTeacher(
                  data?.department?._id,
                  data?.teacher?._id,
                  value
                );
              }
            }}
          >
            <SelectTrigger className="w-auto">
              <SelectValue placeholder="Хичээлийн жил сонгох" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {yearState.map((item) => {
                  return <SelectItem value={item}>{item}</SelectItem>;
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => settpOpen(true)}
            className="flex flex-row gap-2"
          >
            <PrinterIcon className="size-4" />
            Хэвлэх
          </Button>
        </div>
        <Table className="mt-4 text-xs">
          <TableHeader>
            <TableRow>
              <TableHead className="">Хичээлийн нэр</TableHead>
              <TableHead>Оюутан</TableHead>
              <TableHead>Хэлбэр</TableHead>
              <TableHead className="text-center">
                7 хоногт <br /> орох цаг
              </TableHead>
              <TableHead>СТ.Кр</TableHead>
              <TableHead>Авах кр</TableHead>
              <TableHead>Заасан цаг</TableHead>
              <TableHead>Авсан кредит</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          {[1, 2].map((uliral, index) => {
            return (
              <>
                <TableBody>
                  {timePlanState
                    .filter((el) => el.yearSemister === uliral)
                    .map((item) => (
                      <TableRow key={item.item}>
                        <TableCell className="">
                          {item.lesson_id?.name}
                          <br />
                          <div className="text-blue-600  text-[12px]">
                            {item.programPlan_id.chooseSeminar} ул. ({" "}
                            {item.programLesson_id.lessonNdx} ){" "}
                            {item.programLesson_id.credit} кр, ({" "}
                            {item.programPlan_id.timeStudy} )
                          </div>
                        </TableCell>
                        <TableCell>{item.countStud}</TableCell>
                        <TableCell>{item.lessonType}</TableCell>
                        <TableCell className="text-center">
                          {item.stTime} цаг
                        </TableCell>
                        <TableCell>{item.stKr} кр</TableCell>
                        <TableCell>
                          {Number.parseFloat(item.stKrBagsh).toFixed(2)} кр
                        </TableCell>
                        <TableCell>{item.bagshTime} цаг</TableCell>
                        <TableCell>
                          {Number.parseFloat(item.bagshKr).toFixed(2)} кр
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            onClick={() => {
                              setSedevState({
                                ...sedevState,
                                timePlan_id: item._id,
                              });
                              settData(item);
                              getTimeReportPlan(item._id);
                              getTimePlanStudent(item._id);
                              setSedevOpen(true);
                            }}
                            variant="outline"
                            size="icon"
                          >
                            <ClipboardPlusIcon className="size-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
                <TableRow className="bg-blue-600  text-white hover:bg-blue-600">
                  <TableCell className="text-center uppercase">
                    <b> {uliral}-р улирал</b>
                  </TableCell>
                  <TableCell>
                    <b>
                      {timePlanState
                        .filter((el) => el.yearSemister === uliral)
                        .reduce((acc, item) => acc + item.countStud, 0)}
                    </b>{" "}
                    оюутан
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-center">
                    <b>
                      {timePlanState
                        .filter((el) => el.yearSemister === uliral)
                        .reduce((acc, item) => acc + item.stTime, 0)}{" "}
                      цаг
                    </b>
                  </TableCell>
                  <TableCell>
                    <b>
                      {timePlanState
                        .filter((el) => el.yearSemister === uliral)
                        .reduce((acc, item) => acc + item.stKr, 0)}{" "}
                      кр
                    </b>
                  </TableCell>
                  <TableCell>
                    <b>
                      {Number.parseFloat(
                        timePlanState
                          .filter((el) => el.yearSemister === uliral)
                          .reduce((acc, item) => acc + item.stKrBagsh, 0)
                      ).toFixed(2)}{" "}
                      кр
                    </b>
                  </TableCell>
                  <TableCell>
                    <b>
                      {timePlanState
                        .filter((el) => el.yearSemister === uliral)
                        .reduce((acc, item) => acc + item.bagshTime, 0)}{" "}
                      цаг
                    </b>
                  </TableCell>
                  <TableCell>
                    <b>
                      {Number.parseFloat(
                        timePlanState
                          .filter((el) => el.yearSemister === uliral)
                          .reduce((acc, item) => acc + item.bagshKr, 0)
                      ).toFixed(2)}
                      кр
                    </b>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </>
            );
          })}
        </Table>
      </CardContent>
    </Card>
  );
};

export default TimePlan;
