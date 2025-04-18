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

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusCircle, PenIcon, PencilIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useAuth } from "../components/Context/AuthContext";
import { Label } from "@/components/ui/label";

const lesson = [
  { name: "Байгалийн ухааны чиглэл", dugaar: "А1" },
  {
    name: "Хүмүүнлэгийн ухааны чиглэл",
    dugaar: "А2",
  },

  { name: "Нийгмийн ухааны чиглэл", dugaar: "А3" },
  {
    name: "Иргэний боловсролын чиглэл",
    dugaar: "А4",
  },
  {
    name: "Судалгаа шинжилгээний арга зүйн чиглэл",
    dugaar: "А5",
  },
  {
    name: "Яриа, бичгийн ур чадварын чиглэл",
    dugaar: "А6",
  },
  {
    name: "Англи хэл, бусад хэлний чиглэл",
    dugaar: "А7",
  },
  {
    name: "Биеийн тамирын, эрүүл ахуйн чиглэл",
    dugaar: "А8",
  },
  {
    name: "Гамшгаас хамгаалах менежментийн чиглэл",
    dugaar: "А9",
  },
];

export default function Classes() {
  const {
    user,
    depState,
    classState,
    getDepClass,
    checkRole,
    sheepOpen,
    setSheetOpen,
    addClass,
    updateClass,
    addChooselesson,
    deleteChooselesson,
    classOne,
    setClassOne,
  } = useAuth();

  const [depOne, setDepOne] = useState({});
  const [data, setdata] = useState({
    chooseOfKredit: 3,
    dugaar: "",
    name: "",
  });

  useEffect(() => {
    if (checkRole(["department"], user?.rols)) {
      getDepClass(user?.department.id);
    }
  }, []);
  console.log(classState);
  return (
    <div>
      <Sheet open={sheepOpen} onOpenChange={() => setSheetOpen(false)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Дэлгэрэнгүй мэдээлэл</SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex flex-col space-y-2">
            <div className="flex gap-2">
              {/* <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="jil">Хөтөлбөр</Label>
                <Select
                  onValueChange={(value) =>
                    setClassOne({ ...classOne, national: value })
                  }
                  value={classOne.national}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Хөтөлбөр" />
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
              </div> */}
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="jil">Боловсролын түвшин</Label>
                <Select
                  onValueChange={(value) =>
                    setClassOne({ ...classOne, EduLevel: value })
                  }
                  value={classOne.EduLevel}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Боловсролын түвшин" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      { name: "Суурь", value: "C" },
                      { name: "Бакалавр", value: "D" },
                      { name: "Магистр", value: "E" },
                      { name: "Доктор", value: "F" },
                    ].map((item, index) => {
                      return (
                        <SelectItem key={index} value={item.value}>
                          {item.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="lastname">Ангий нэр</Label>
              <Input
                onChange={(e) =>
                  setClassOne({ ...classOne, name: e.target.value })
                }
                value={classOne.name}
                type="text"
                id="lastname"
                placeholder="Ангийн нэр"
              />
            </div>
            <div className="flex gap-2">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="kurs_id">Курс</Label>
                <Input
                  onChange={(e) =>
                    setClassOne({ ...classOne, kurs_id: e.target.value })
                  }
                  value={classOne.kurs_id}
                  type="number"
                  id="kurs_id"
                  placeholder="Курс"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="Элссэн жил">Элссэн жил</Label>
                <Input
                  onChange={(e) =>
                    setClassOne({ ...classOne, StartDate: e.target.value })
                  }
                  value={classOne.StartDate}
                  type="number"
                  id="Элссэн жил"
                  placeholder="Элссэн жил"
                />
              </div>
            </div>

            <Button
              onClick={() => {
                if (classOne._id) {
                  updateClass(classOne);
                } else {
                  addClass(classOne);
                }
              }}
              className="mt-2 mb-8"
              variant=""
            >
              Хадгалах
            </Button>
            <div>----------------------------------------------------</div>
            {checkRole(["admin", "department", "manager"], user?.rols) && (
              <div className="space-y-2">
                <div className="grid w-full max-w-sm items-center gap-1.5 ">
                  <Label htmlFor="lesson">Хичээлийн нэр</Label>
                  <Select
                    onValueChange={(value) => {
                      setdata({
                        ...data,
                        name: lesson[value].name,
                        dugaar: lesson[value].dugaar,
                      });
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Хичээлийн нэр" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {lesson.map((item, index) => {
                          return (
                            <SelectItem key={index} value={index}>
                              {item.dugaar} {item.name}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="kurs_id">Кредит</Label>
                  <Input
                    onChange={(e) =>
                      setdata({
                        ...data,
                        chooseOfKredit: e.target.value,
                      })
                    }
                    value={data.chooseOfKredit}
                    type="number"
                    id="kurs_id"
                    placeholder="Кредит"
                  />
                </div>

                <Button
                  onClick={() => {
                    addChooselesson(
                      classOne.department_id._id,
                      classOne._id,
                      data
                    );
                  }}
                  variant=""
                  className=""
                >
                  Нэмэх
                </Button>
              </div>
            )}
            <div>----------------------------------------------------</div>
            <div className="flex flex-col gap-2">
              {classOne.chooseOfScience?.map((el, index) => {
                return (
                  <div
                    key={index}
                    className="text-xs flex justify-between items-center"
                  >
                    <p>
                      -{el.dugaar} {el.name} - / {el.chooseOfKredit}кр /
                    </p>
                    <Button
                      onClick={() => {
                        deleteChooselesson(
                          classOne.department_id._id,
                          classOne._id,
                          el
                        );
                      }}
                      className=""
                    >
                      Устгах
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex flex-col md:flex-row gap-2 mt-4">
        {checkRole(["admin", "manager", "director"], user?.rols) && (
          <Select
            onValueChange={(value) => {
              setDepOne(value);
              getDepClass(value.id);
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
              Анги
            </span>
          </Button>
        </div>
      </div>
      <Card className="mt-4 ">
        <CardHeader className="">
          <p className="font-medium">{depOne.name}</p>
        </CardHeader>

        <CardContent>
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead className="">Ангийн нэр</TableHead>
                <TableHead>Хөтөлбөр</TableHead>
                <TableHead>Түвшин </TableHead>
                <TableHead className="text-left">Огноо </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classState?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.ner}</TableCell>
                  <TableCell>{item.program.name}</TableCell>
                  <TableCell className="">
                    {item.EduLevel === "C" && "Суурь"}
                    {item.EduLevel === "D" && "Бакалавр"}
                    {item.EduLevel === "E" && "Магистр"}
                    {item.EduLevel === "F" && "Доктор"}
                  </TableCell>
                  <TableCell>{item.StartDate}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setClassOne(item);
                        setSheetOpen(true);
                      }}
                      size="icon"
                      variant="outline"
                    >
                      <PencilIcon className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/* <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell className="text-left">$2,500.00</TableCell>
              </TableRow>
            </TableFooter> */}
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
