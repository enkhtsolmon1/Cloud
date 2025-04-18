import { FilePlus2, FileText } from "lucide-react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

import { PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/Context/AuthContext";
import { Label } from "@/components/ui/label";
import { useCtx } from "@/components/Context/MainContext";
import ProgLesson from "./ProgLesson";
import { Link } from "react-router-dom";

export default function Program() {
  const {
    user,
    checkRole,
    depState,
    getDepTeachers,
    teacherState,
    changePassUser,
    addRole,
    removeRole,
    sheepOpen,
    setSheetOpen,
    addTeacher,
    updateTeacher,
    teacherOne,
    setteacherOne,
  } = useAuth();
  const { roleState, programState, getPrograms, getProgPlan } = useCtx();
  const [depOne, setDepOne] = useState({});

  useEffect(() => {
    if (checkRole(["department"], user?.rols)) {
      getPrograms(user?.department?._id);
    }
  }, []);
  const [lessonOpen, setLessonOpen] = useState(false);
  return (
    <div className="">
      {lessonOpen && <ProgLesson setLessonOpen={setLessonOpen} />}
      <Sheet open={sheepOpen} onOpenChange={() => setSheetOpen(false)}>
        <SheetContent className="overflow-y-auto w-[600px]">
          <SheetHeader>
            <SheetTitle>Дэлгэрэнгүй мэдээлэл</SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex flex-col space-y-2 ">
            {checkRole(["admin"], user?.rols) && (
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Тэнхим нэгж</Label>
                <Select
                  onValueChange={(value) =>
                    setteacherOne({ ...teacherOne, department: value })
                  }
                  value={teacherOne.department?._id}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Төлөв" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {depState.map((item, index) => {
                        return (
                          <SelectItem key={index} value={item._id}>
                            {item.name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="flex gap-2">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="jil">Иргэншил</Label>
                <Select
                  onValueChange={(value) =>
                    setteacherOne({ ...teacherOne, national: value })
                  }
                  value={teacherOne.national}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Иргэншил" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {["Монгол", "Хятад", "Орос", "Солонгос", "Япон"].map(
                        (item, index) => {
                          return (
                            <SelectItem key={index} value={item}>
                              {item}
                            </SelectItem>
                          );
                        }
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="jil">Яс үндэс</Label>
                <Select
                  onValueChange={(value) =>
                    setteacherOne({ ...teacherOne, race: value })
                  }
                  value={teacherOne.race}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Яс үндэс" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Дөрвөд",
                      "Халх",
                      "Казах",
                      "Баяд",
                      "Захчин",
                      "Тува",
                      "Хотон",
                      "Өөлд",
                      "Буриад",
                      "Дарьганга",
                      "Урианхай",
                      "Дархад",
                      "Торгууд",
                      "Хотгойд",
                      "Мянгад",
                    ].map((item, index) => {
                      return (
                        <SelectItem key={index} value={item}>
                          {item}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="lastname">Ургийн овог</Label>
                <Input
                  onChange={(e) =>
                    setteacherOne({ ...teacherOne, surName: e.target.value })
                  }
                  value={teacherOne.surName}
                  type="text"
                  id="lastname"
                  placeholder="Ургийн овог"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="regnum">Регистрийн дугаар</Label>
                <Input
                  onChange={(e) =>
                    setteacherOne({ ...teacherOne, regnum: e.target.value })
                  }
                  value={teacherOne.regnum}
                  type="text"
                  id="regnum"
                  placeholder="Регистрийн дугаар"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="lastname">Овог</Label>
                <Input
                  onChange={(e) =>
                    setteacherOne({ ...teacherOne, lastname: e.target.value })
                  }
                  value={teacherOne.lastname}
                  type="text"
                  id="lastname"
                  placeholder="Овог"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="firstname">Нэр</Label>
                <Input
                  onChange={(e) =>
                    setteacherOne({ ...teacherOne, firstname: e.target.value })
                  }
                  value={teacherOne.firstname}
                  type="text"
                  id="lastname"
                  placeholder="Нэр"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Email</Label>
                <Input
                  onChange={(e) =>
                    setteacherOne({ ...teacherOne, email: e.target.value })
                  }
                  value={teacherOne.email}
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Утас</Label>
                <Input
                  onChange={(e) =>
                    setteacherOne({ ...teacherOne, phone1: e.target.value })
                  }
                  value={teacherOne.phone1}
                  type="number"
                  placeholder="Утас"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Хүйс</Label>
                <Select
                  onValueChange={(value) =>
                    setteacherOne({ ...teacherOne, gender: value })
                  }
                  value={teacherOne.gender}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Хүйс" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {["Эрэгтэй", "Эмэгтэй"].map((item, index) => {
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
                <Label>Боловсролын зэрэг</Label>
                <Select
                  onValueChange={(value) =>
                    setteacherOne({ ...teacherOne, educationalLevel: value })
                  }
                  value={teacherOne.educationalLevel}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Боловсролын зэрэг" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {["Бакалавр", "Магистр", "Доктор"].map((item, index) => {
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
            {teacherOne.role === "teacher" && (
              <div className="flex gap-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label>Багшийн төрөл</Label>
                  <Select
                    onValueChange={(value) =>
                      setteacherOne({ ...teacherOne, typeOfTeacher: value })
                    }
                    value={teacherOne.typeOfTeacher}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Багшийн төрөл" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {[
                          "Дадлагажигч багш",
                          "Багш",
                          "Ахлах багш",
                          "Дэд профессор багш",
                          "Профессор багш",
                          "Цагийн багш",
                          "Гэрээт багш",
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
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label>Бүтэн/Цагийн</Label>
                  <Select
                    onValueChange={(value) =>
                      setteacherOne({ ...teacherOne, workload: value })
                    }
                    value={teacherOne.workload}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Бүтэн/Цагийн" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {["Цагийн багш", "Бүтэн цагийн багш"].map(
                          (item, index) => {
                            return (
                              <SelectItem key={index} value={item}>
                                {item}
                              </SelectItem>
                            );
                          }
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            {teacherOne.role === "teacher" && (
              <div className="grid grid-cols-2 gap-2">
                <div className="flex gap-2  items-center">
                  <Switch
                    onCheckedChange={(value) =>
                      setteacherOne({
                        ...teacherOne,
                        isManager: value,
                      })
                    }
                    checked={teacherOne.isManager}
                    id="airplane-mode"
                  />
                  <Label htmlFor="airplane-mode">Эрхлэгч эсэх</Label>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label>Зөвлөх багш</Label>
                  <Select
                    onValueChange={(value) =>
                      setteacherOne({ ...teacherOne, isConsultant: value })
                    }
                    value={teacherOne.isConsultant}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Зөвлөх/Удирдагч багш" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {["Тийм", "Үгүй"].map((item, index) => {
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
            )}
            <div className="flex gap-2">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Төлөв</Label>
                <Select
                  onValueChange={(value) =>
                    setteacherOne({ ...teacherOne, statusTeacher: value })
                  }
                  value={teacherOne.statusTeacher}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Төлөв" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {[
                        "Ажиллаж байгаа",
                        "Түр зогсоосон",
                        "Чөлөө авсан",
                        "Туршилтын хугацаа",
                        "Идэвхгүй",
                        "Тэтгэвэрт гарсан",
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
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Цаг бүртгэл</Label>
                <Select
                  onValueChange={(value) =>
                    setteacherOne({ ...teacherOne, alba_id: value })
                  }
                  value={teacherOne.alba_id}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Төлөв" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {depState.map((item, index) => {
                        return (
                          <SelectItem key={index} value={item._id}>
                            {item.name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <img
              htmlFor="upload-cover"
              className="w-2/3 mx-auto rounded-lg"
              src={`http://west.edu.mn:3000/upload/images/${teacherOne.imagePath}`}
            />
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Зураг солих</Label>
              <Input
                onChange={(e) => {
                  // uploadImage(e.target.files);
                }}
                accept="image/*"
                id="picture"
                type="file"
              />
            </div>
            <Button
              onClick={() => {
                if (teacherOne._id) {
                  updateTeacher(teacherOne);
                } else {
                  addTeacher(teacherOne);
                }
              }}
              className="mt-2"
              variant=""
            >
              Хадгалах
            </Button>
          </div>
          {checkRole(["admin"], user?.rols) && (
            <div className="flex flex-wrap justify-start gap-2 m-4">
              {roleState.map((el, index) => {
                return (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      onCheckedChange={(value) => {
                        if (value) {
                          addRole(
                            teacherOne._id,
                            el._id,
                            teacherOne.department._id
                          );
                        } else {
                          removeRole(
                            teacherOne._id,
                            el._id,
                            teacherOne.department._id
                          );
                        }
                        setSheetOpen(false);
                      }}
                      checked={checkRole(
                        [el._id],
                        teacherOne?.roles?.map((item) => item._id)
                      )}
                      id={el._id}
                    />
                    <label
                      htmlFor={el._id}
                      className="text-sm lowercase font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {el.name}
                    </label>
                  </div>
                );
              })}
            </div>
          )}
        </SheetContent>
      </Sheet>

      <div className="flex flex-col md:flex-row gap-2 mt-4">
        {checkRole(["admin", "manager", "person"], user?.rols) && (
          <Select
            onValueChange={(value) => {
              setDepOne(value);
              getPrograms(value.id);
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
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" className="gap-1">
            <PlusCircle className="size-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Хөтөлбөр
            </span>
          </Button>
        </div>
      </div>
      <Card className="mt-4">
        {/* <CardHeader className="">
            <p className="font-medium">{depOne.name}</p>
          </CardHeader> */}

        <Table className="">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>№</TableHead>
              <TableHead>Нэр</TableHead>
              <TableHead>Түвшин</TableHead>
              <TableHead className="text-left">Төлөв</TableHead>
              <TableHead className="text-left">Элсэлт авах</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programState
              ?.sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="">{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.EduLevel}</TableCell>
                  <TableCell className="text-left">
                    <Badge
                      variant={
                        item.isStatus === "Баталгаажсан"
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {item.isStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        onCheckedChange={(value) => {
                          // if (value) {
                          // } else {
                          // }
                        }}
                        checked={item.isElselt === "1" ? true : false}
                        id={item._id}
                      />
                      <label
                        htmlFor={item._id}
                        className="text-sm  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item.isElselt === "1" ? "Тийм" : "Үгүй"}
                      </label>
                    </div>
                  </TableCell>
                  <TableCell className="flex justify-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Link
                            to={item._id}
                            variant="outline"
                            size="icon"
                            className="flex gap-2"
                          >
                            <FileText className="size-6 text-blue-600 " />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Хөтөлбөрийн хичээлүүд</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {/* <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            onClick={() => {
                              setteacherOne(item);
                              setSheetOpen(true);
                            }}
                            variant="outline"
                            size="icon"
                            className="flex gap-2 size-7"
                          >
                            <UserRoundPenIcon className="size-4 text-blue-600 " />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Багшийн мэдээлэл засварлах</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
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
                                // deleteAjil(item._id);
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
                    </Dialog> */}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
