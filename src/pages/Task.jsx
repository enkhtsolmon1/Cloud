import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  PlusCircleIcon,
  CalendarIcon,
  Trash2Icon,
  PencilIcon,
  PrinterIcon,
  FolderTreeIcon,
} from "lucide-react";
import { useAuth } from "../components/Context/AuthContext";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import moment from "moment-timezone";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useCtx } from "../components/Context/MainContext";
import { useReactToPrint } from "react-to-print";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill CSS for styling
import { Link } from "react-router-dom";

const Tasks = () => {
  const {
    user,
    teacherOne,
    yearState,
    checkRole,
    getDepTeachers,
    depState,
    teacherState,
  } = useAuth();

  const {
    workState,
    ajilState,
    getAjil,
    getWork,
    getAjilTeacher,
    addAjil,
    updateAjil,
    deleteAjil,
    ajilOpen,
    setAjilOpen,
    workOpen,
    setWorkOpen,
    addWork,
    updateWork,
    deleteWork,
    addJob,
    updateJob,
    deleteJob,
    workOne,
    setWorkOne,
    uploadAjil,
    workCat,
    setworkCat,
  } = useCtx();
  useEffect(() => {
    if (checkRole(["teacher", "employee"], user?.rols)) {
      getAjilTeacher(user?.id);
    }
    if (checkRole(["department", "alba"], user?.rols)) {
      getDepTeachers(user?.department?._id);
    }
  }, []);

  const [data, setdata] = useState({});
  const [jobOne, setJobOne] = useState({});
  const componentRef = useRef(null);

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Цагийн бүртгэл хэвлэх",
  });

  const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
      <div className="p-8 max-w-[297mm] w-full overflow-auto mx-auto" ref={ref}>
        <div className="flex justify-between">
          <span>Батлав.{user?.department.name}</span>
          <p>
            <span>{user?.department.manager}</span>
          </p>
        </div>
        <div className="p-4 font-medium">
          <div className="uppercase text-center">
            МУИС-ийн Баруун бүсийн сургууль {user?.department.name} <br />
            {user?.lastname} {user?.firstname}ийн хийх ажлын төлөвлөгөө
          </div>
        </div>
        <div className="text-right italic w-full">
          2024-2025 оны хичээлийн жил
        </div>
        <table className="border w-full text-sm mt-2">
          <tr className="text-xs">
            <th className="border p-1">№</th>
            <th className="border p-1">Гүйцэтгэх ажил</th>
            <th className="border p-1">Тоо хэмжээ</th>
            <th className="border p-1">Оноо</th>
            <th className="border p-1">Багц цаг</th>
          </tr>
          {ajilState.ajil
            .sort((a, b) => {
              const [letterA, numberA] = a.dugaar?.split(".");
              const [letterB, numberB] = b.dugaar?.split(".");

              // Үсгээр эрэмбэлэх
              if (letterA < letterB) return -1;
              if (letterA > letterB) return 1;

              // Үсэг адил байвал тоогоор эрэмбэлэх
              return parseInt(numberA, 10) - parseInt(numberB, 10);
            })
            .map((item, index) => {
              return (
                <tr>
                  <td className="border p-1 text-center">{index + 1}</td>
                  <td className="border p-1">{item.title}</td>
                  <td className="border p-1">{item.hemjihNegj}</td>
                  <td className="border p-1">{item.onoo}</td>
                  <td className="border p-1">{item.bagtsTsag}</td>
                </tr>
              );
            })}
        </table>
      </div>
    );
  });
  const TPrint = React.forwardRef((props, ref) => {
    return (
      <div className="p-8 max-w-[297mm] w-full overflow-auto mx-auto" ref={ref}>
        <div className="w-full min-h-[297mm]">
          <img
            src="https://auth.num.edu.mn/oauth2/Image/num-logo.svg"
            alt="logo"
            className="w-28 mx-auto"
          />
          <p className="text-center uppercase font-medium mt-2 text-xl ">
            МУИС-ийн Баруун бүсийн сургууль
          </p>
          <p className="text-center uppercase font-medium mt-2 text-sm ">
            {user?.department.name}
          </p>
          <p className="text-center uppercase font-medium mt-56 text-2xl">
            БАГШИЙН АЖЛЫН ТАЙЛАН
          </p>
          <p className="text-center font-medium mt-2">
            (2023-2024 оны хичээлийн жилийн I, II улирал)
          </p>
          <div className="grid grid-cols-2 mx-auto w-full mt-14">
            <div className="mx-auto font-medium space-y-2">
              <p>ОВОГ НЭР:</p>
              <p>СУРГУУЛЬ:</p>
              <p>ТЭНХИМ:</p>
              <p>АЛБАН ТУШААЛ:</p>
              <p>ЗЭРЭГ ЦОЛ:</p>
              <p>АЖИЛЛАСАН ЖИЛ:</p>
            </div>
            <div className="mx-auto font-medium space-y-2">
              <p>
                {user?.lastname} {user?.firstname}
              </p>
              <p>МУИС-ийн Баруун бүсийн сургууль</p>
              <p>{user?.department.name}</p>
              <p>{teacherOne?.typeOfTeacher} </p>
              <p>{teacherOne?.educationalLevel} </p>
              <p></p>
            </div>
          </div>
          <p className="uppercase text-center font-medium mt-80">Ховд 2024</p>
        </div>
        <div className="space-y-4 ">
          {ajilState.ajil
            .sort((a, b) => {
              const [letterA, numberA] = a.dugaar?.split(".");
              const [letterB, numberB] = b.dugaar?.split(".");

              // Үсгээр эрэмбэлэх
              if (letterA < letterB) return -1;
              if (letterA > letterB) return 1;

              // Үсэг адил байвал тоогоор эрэмбэлэх
              return parseInt(numberA, 10) - parseInt(numberB, 10);
            })
            .map((item, index) => {
              return (
                <div className="w-full">
                  <p className="indent-4 text-blue-800 italic">
                    {item.dugaar} {item.title}
                  </p>
                  <p
                    className=" text-justify indent-4 w-full"
                    dangerouslySetInnerHTML={{ __html: item.tailbar }}
                  />
                  {/* <p className="text-justify indent-4">{item.tailbar}</p> */}
                </div>
              );
            })}
        </div>
      </div>
    );
  });

  const [ufile, setUfile] = useState({
    turul: "",
    comment: "",
  });

  const uploadFile = (files) => {
    const file = new FormData();
    file.append("file", files[0]);
    file.append("turul", ufile.turul);
    file.append("comment", ufile.comment);
    uploadAjil(file);
  };

  return (
    <Card>
      <Dialog open={ajilOpen} onOpenChange={setAjilOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Ажил үүсгэх</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid w-full items-center gap-1.5">
              <Label>Чиглэл</Label>
              <Dialog>
                <DialogTrigger className="w-full">
                  <p
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start border rounded-lg p-2 text-wrap text-justify font-normal",
                      !data && "text-muted-foreground"
                    )}
                  >
                    {data?.subJobName ? (
                      <p className="flex gap-2">
                        <span>
                          {data.dugaar} {data.subJobName} ({data.bagtsTsag}
                          кр), ({data.onoo} оноо), {data.hemjihNegj}
                        </span>
                      </p>
                    ) : (
                      <span>Чиглэл сонгох</span>
                    )}
                  </p>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90%] overflow-auto">
                  <DialogHeader></DialogHeader>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-10">
                      <AccordionTrigger className="uppercase">
                        Профессор, багш
                      </AccordionTrigger>
                      <AccordionContent>
                        <Accordion className="ml-8" type="single" collapsible>
                          {workCat?.slice(0, 4).map((item, index) => {
                            return (
                              <AccordionItem
                                key={index}
                                value={"item-".concat(index + 1)}
                              >
                                <AccordionTrigger>
                                  <p className="uppercase">{item}</p>{" "}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <Accordion
                                    type="single"
                                    className="space-y-2"
                                    collapsible
                                  >
                                    {workState
                                      .filter((fil) => fil.angilal === item)
                                      .sort((a, b) => {
                                        const [letterA, numberA] =
                                          a.dugaar?.split(".");
                                        const [letterB, numberB] =
                                          b.dugaar?.split(".");

                                        // Үсгээр эрэмбэлэх
                                        if (letterA < letterB) return -1;
                                        if (letterA > letterB) return 1;

                                        // Үсэг адил байвал тоогоор эрэмбэлэх
                                        return (
                                          parseInt(numberA, 10) -
                                          parseInt(numberB, 10)
                                        );
                                      })
                                      .map((item, index) => {
                                        return (
                                          <AccordionItem
                                            key={index}
                                            value={"item-".concat(index + 1)}
                                          >
                                            <AccordionTrigger className="p-1">
                                              <p className="text-xs flex gap-2 uppercase w-full">
                                                <span className="font-bold">
                                                  {item.dugaar}
                                                </span>
                                                {item.chiglel}
                                              </p>
                                            </AccordionTrigger>
                                            <AccordionContent className="pr-4 flex flex-col gap-2">
                                              {item.subjob.map((el, ind) => {
                                                return (
                                                  <TooltipProvider key={ind}>
                                                    <Tooltip>
                                                      <TooltipTrigger>
                                                        <div className="flex items-center jus space-x-2 ml-4 mt-1 text-left">
                                                          <Checkbox
                                                            onCheckedChange={(
                                                              value
                                                            ) => {
                                                              if (value) {
                                                                setdata({
                                                                  ...data,
                                                                  subJobName:
                                                                    el.subJobName,
                                                                  subJob_id:
                                                                    el._id,
                                                                  bagtsTsag:
                                                                    el.bagtsTsag,
                                                                  onoo: el.onoo,
                                                                  chiglel:
                                                                    item.chiglel,
                                                                  angilal:
                                                                    item.angilal,
                                                                  hemjihNegj:
                                                                    el.hemjihNegj,
                                                                  dugaar:
                                                                    el.dugaar,
                                                                });
                                                              }
                                                            }}
                                                            checked={
                                                              data.subJob_id ===
                                                              el._id
                                                                ? true
                                                                : false
                                                            }
                                                            id={el._id}
                                                            className="size-5"
                                                          />
                                                          <DialogTrigger className="text-left">
                                                            <label
                                                              htmlFor={el._id}
                                                              className="text-xs flex gap-2 uppercase items-center cursor-pointer"
                                                            >
                                                              <span className="font-bold">
                                                                {el.dugaar}
                                                              </span>
                                                              {el.subJobName} (
                                                              {el.bagtsTsag}
                                                              кр), ({
                                                                el.onoo
                                                              }{" "}
                                                              оноо),{" "}
                                                              {el.hemjihNegj}
                                                            </label>
                                                          </DialogTrigger>
                                                        </div>
                                                      </TooltipTrigger>
                                                      <TooltipContent className="max-w-2xl">
                                                        <p>{el.tailbar}</p>
                                                      </TooltipContent>
                                                    </Tooltip>
                                                  </TooltipProvider>
                                                );
                                              })}
                                            </AccordionContent>
                                          </AccordionItem>
                                        );
                                      })}
                                  </Accordion>
                                </AccordionContent>
                              </AccordionItem>
                            );
                          })}
                        </Accordion>
                      </AccordionContent>
                    </AccordionItem>
                    {workCat?.slice(4, 12).map((item, index) => {
                      return (
                        <AccordionItem
                          key={index}
                          value={"item-".concat(index + 1)}
                        >
                          <AccordionTrigger>
                            <p className="uppercase">{item}</p>{" "}
                          </AccordionTrigger>
                          <AccordionContent>
                            <Accordion
                              type="single"
                              className="space-y-2"
                              collapsible
                            >
                              {workState
                                .filter((fil) => fil.angilal === item)
                                .sort((a, b) => {
                                  const [letterA, numberA] =
                                    a.dugaar?.split(".");
                                  const [letterB, numberB] =
                                    b.dugaar?.split(".");

                                  // Үсгээр эрэмбэлэх
                                  if (letterA < letterB) return -1;
                                  if (letterA > letterB) return 1;

                                  // Үсэг адил байвал тоогоор эрэмбэлэх
                                  return (
                                    parseInt(numberA, 10) -
                                    parseInt(numberB, 10)
                                  );
                                })
                                .map((item, index) => {
                                  return (
                                    <AccordionItem
                                      key={index}
                                      value={"item-".concat(index + 1)}
                                    >
                                      <AccordionTrigger className="p-1">
                                        <p className="text-xs flex gap-2 uppercase w-full">
                                          <span className="font-bold">
                                            {item.dugaar}
                                          </span>
                                          {item.chiglel}
                                        </p>
                                      </AccordionTrigger>
                                      <AccordionContent className="pr-4 flex flex-col gap-2">
                                        {item.subjob.map((el, ind) => {
                                          return (
                                            <TooltipProvider key={ind}>
                                              <Tooltip>
                                                <TooltipTrigger>
                                                  <div className="flex items-center jus space-x-2 ml-4 mt-1 text-left">
                                                    <Checkbox
                                                      onCheckedChange={(
                                                        value
                                                      ) => {
                                                        if (value) {
                                                          setdata({
                                                            ...data,
                                                            subJobName:
                                                              el.subJobName,
                                                            subJob_id: el._id,
                                                            bagtsTsag:
                                                              el.bagtsTsag,
                                                            onoo: el.onoo,
                                                            chiglel:
                                                              item.chiglel,
                                                            angilal:
                                                              item.angilal,
                                                            hemjihNegj:
                                                              el.hemjihNegj,
                                                            dugaar: el.dugaar,
                                                          });
                                                        }
                                                      }}
                                                      checked={
                                                        data.subJob_id ===
                                                        el._id
                                                          ? true
                                                          : false
                                                      }
                                                      id={el._id}
                                                      className="size-5"
                                                    />
                                                    <DialogTrigger className="text-left">
                                                      <label
                                                        htmlFor={el._id}
                                                        className="text-xs flex gap-2 uppercase items-center cursor-pointer"
                                                      >
                                                        <span className="font-bold">
                                                          {el.dugaar}
                                                        </span>
                                                        {el.subJobName} (
                                                        {el.bagtsTsag}
                                                        кр), ({
                                                          el.onoo
                                                        } оноо), {el.hemjihNegj}
                                                      </label>
                                                    </DialogTrigger>
                                                  </div>
                                                </TooltipTrigger>
                                                <TooltipContent className="max-w-2xl">
                                                  <p>{el.tailbar}</p>
                                                </TooltipContent>
                                              </Tooltip>
                                            </TooltipProvider>
                                          );
                                        })}
                                      </AccordionContent>
                                    </AccordionItem>
                                  );
                                })}
                            </Accordion>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="jil">Нэр</Label>
              <Textarea
                onChange={(e) => setdata({ ...data, title: e.target.value })}
                value={data.title}
                type="text"
                id="title"
                className=""
                placeholder="Ажлын нэр"
              />
            </div>

            <div className="flex gap-2">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="jil">Хичээлийн жил</Label>
                <Select
                  onValueChange={(value) =>
                    setdata({ ...data, yearLesson: value })
                  }
                  value={data.yearLesson}
                >
                  <SelectTrigger className="">
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
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="jil">Улирал</Label>
                <Select
                  onValueChange={(value) =>
                    setdata({ ...data, semister: value })
                  }
                  value={data.semister}
                >
                  <SelectTrigger className="w-full">
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
            </div>
            <div className="flex gap-2">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="jil">Эхлэх дуусах огноо </Label>
                <Dialog>
                  <DialogTrigger className="w-full">
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !data && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {data?.startDate ? (
                        <p className="flex gap-2">
                          <span>{data.startDate}</span> ээс
                          <span>{data.endDate}</span>
                        </p>
                      ) : (
                        <span>Огноо сонгох</span>
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl">
                    <DialogHeader></DialogHeader>
                    <div className="flex w-auto mx-auto">
                      <div className="">
                        <span className="text-sm font-medium">Эхлэх огноо</span>
                        <Calendar
                          mode="single"
                          selected={new Date(data?.startDate)}
                          onSelect={(value) => {
                            setdata({
                              ...data,
                              startDate: moment(value).format("YYYY-MM-DD"),
                            });
                          }}
                        />
                      </div>
                      <div className="">
                        <span className="text-sm font-medium">
                          Дуусах огноо
                        </span>
                        <Calendar
                          mode="single"
                          selected={new Date(data?.endDate)}
                          onSelect={(value) => {
                            setdata({
                              ...data,
                              endDate: moment(value).format("YYYY-MM-DD"),
                            });
                          }}
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Төлөв</Label>
                <Select
                  onValueChange={(value) => setdata({ ...data, status: value })}
                  value={data.status}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Төлөв сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {[
                        "Төлөвлөсөн",
                        "Гүйцэтгэж байна",
                        "Биелсэн",
                        "Биелээгүй",
                      ].map((item, index) => {
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
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="jil">Файлын зам </Label>
              <Input
                onChange={(e) => setdata({ ...data, fileUrl: e.target.value })}
                value={data.fileUrl}
                type="text"
                id="title"
                className=""
                placeholder="Файлын зам"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="jil">Тайлбар</Label>
              <ReactQuill
                className=""
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }], // Header sizes
                    ["bold", "italic", "underline"], // Text styling
                    [{ list: "ordered" }, { list: "bullet" }], // Lists
                    ["link", "image"], // Link and image
                    ["clean"], // Remove formatting
                  ],
                }}
                theme="snow"
                value={data.tailbar}
                onChange={(value) => {
                  setdata({ ...data, tailbar: value });
                }}
              />
              {/* <Textarea
                onChange={(e) => setdata({ ...data, tailbar: e.target.value })}
                value={data.tailbar}
                className="min-h-96"
                placeholder="Ажлын тайлбар"
              /> */}
            </div>
            <Button
              onClick={() => {
                if (data._id) {
                  updateAjil(data);
                } else {
                  addAjil(data);
                }
              }}
              type="submit"
            >
              Хадгалах
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <CardHeader>
        <CardTitle className="flex justify-between">
          Ажлууд{" "}
          {checkRole(["admin", "person"], user?.rols) && (
            <Link to="/dashboard/chiglel">
              <Button variant="outline" className="gap-1">
                <FolderTreeIcon className="size-4" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap ">
                  Чиглэл сан
                </span>
              </Button>
            </Link>
          )}
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => {
              setAjilOpen(true);
              setdata({
                owner_id: teacherOne._id,
                owner_role: teacherOne.role,
                owner_name: teacherOne.firstname,
                office_id: teacherOne.department._id,
                office_name: teacherOne.department.name,
                office_role: "department",
                semister: 1,
                yearLesson: "2024-2025",
                status: "Төлөвлөсөн",
                bagtsTsag: 0,
                tags: [],
                isPublished: false,
                angilal: "",
                dugaar: "",
                chiglel: "",
                subJobName: "",
                title: "",
                tailbar: "",
                startDate: "",
                endDate: "",
              });
            }}
            variant="outline"
            className="gap-1"
          >
            <PlusCircleIcon className="size-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap ">
              Ажил үүсгэх
            </span>
          </Button>

          <Dialog>
            <DialogTrigger className="">
              <Button className="flex flex-row gap-2" variant="outline">
                <PrinterIcon className="size-4" />
                Тайлан хэвлэх
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[95%]">
              <DialogHeader></DialogHeader>
              <ScrollArea>
                <TPrint ref={componentRef} />
              </ScrollArea>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={printFn}
                  className="flex flex-row gap-2"
                >
                  <PrinterIcon className="size-4" />
                  Хэвлэх
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger className="">
              <Button className="flex flex-row gap-2" variant="outline">
                <PrinterIcon className="size-4" />
                Төлөвлөгөө хэвлэх
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[95%]">
              <DialogHeader></DialogHeader>
              <ScrollArea>
                <ComponentToPrint ref={componentRef} />
              </ScrollArea>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={printFn}
                  className="flex flex-row gap-2"
                >
                  <PrinterIcon className="size-4" />
                  Хэвлэх
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {checkRole(["admin", "person"], user?.rols) && (
            <Select
              onValueChange={(value) => {
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
                getAjilTeacher(value._id);
              }}
            >
              <SelectTrigger className="w-auto min-w-24">
                <SelectValue placeholder="Багш,ажилтан сонгох" />
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
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {user.role !== "teacher" && (
                <TableHead className="">Хариуцагч</TableHead>
              )}
              <TableHead className="">Ажлын нэр</TableHead>
              <TableHead className="">Оноо</TableHead>
              <TableHead>Эхлэх огноо</TableHead>
              <TableHead>Дуусах огноо</TableHead>
              <TableHead>Төлөв</TableHead>
              {checkRole(
                ["admin", "department", "manager", "alba"],
                user?.rols
              ) && <TableHead>Баталгаажуулах</TableHead>}
              <TableHead className="text-right">Үйлдэл</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ajilState.ajil.map((item) => (
              <TableRow key={item.id}>
                {user.role !== "teacher" && (
                  <TableCell className="">{item.owner_name}</TableCell>
                )}
                <TableCell className="">{item.title}</TableCell>
                <TableCell className="">{item.onoo}</TableCell>
                <TableCell>{item.startDate}</TableCell>
                <TableCell>{item.endDate}</TableCell>
                <TableCell>{item.status}</TableCell>
                {checkRole(
                  ["admin", "department", "manager", "alba"],
                  user?.rols
                ) && (
                  <TableCell>
                    <Switch
                      onCheckedChange={(value) =>
                        updateAjil({ _id: item._id, isPublished: value })
                      }
                      checked={item.isPublished}
                      id="airplane-mode"
                    />
                  </TableCell>
                )}
                <TableCell className="">
                  {user?.id === item.owner_id && (
                    <div className="flex justify-end gap-2">
                      <Button
                        onClick={() => {
                          setAjilOpen(true);
                          setdata(item);
                        }}
                        variant="outline"
                        size="icon"
                        className="flex gap-2 size-7"
                      >
                        <PencilIcon className="size-4  " />
                      </Button>
                      <Dialog>
                        <DialogTrigger>
                          <Button
                            variant="outline"
                            size="icon"
                            className="flex gap-2 size-7"
                          >
                            <Trash2Icon className="size-4 text-rose-600 " />
                          </Button>
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
                                  deleteAjil(item._id);
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
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Tasks;
