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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

import {
  PlusCircle,
  Trash2Icon,
  Copy,
  PencilIcon,
  Lock,
  UserRoundPenIcon,
  ListChecks,
  MonitorSmartphone,
  ScrollText,
  Printer,
  NotebookPen,
  Plus,
  FileLineChartIcon,
  Download,
  FileText,
  ImageIcon,
  Eye,
} from "lucide-react";

import copy from "text-copy";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useAuth } from "../components/Context/AuthContext";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useCtx } from "../components/Context/MainContext";
import moment from "moment-timezone";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useReactToPrint } from "react-to-print";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
export default function Teacher() {
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
    deleteTeacher,
    teacherOne,
    setteacherOne,
    addSudalgaa,
    updateSudalgaa,
    deleteSudalgaa,
    device,
    contactState,
  } = useAuth();
  const { roleState, sudalgaa, sudAngilal, sudStatus, sudEduLevel } = useCtx();

  const [depOne, setDepOne] = useState({});
  const [eduLevel, setEduLevel] = useState("");
  const [sudState, setSudState] = useState({});
  useEffect(() => {
    if (checkRole(["department", "alba"], user?.rols)) {
      getDepTeachers(user?.department?._id);
    }
  }, []);
  const componentRef = useRef(null);

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Боловсролын мэдээлэл",
  });

  const TPrint = forwardRef((props, ref) => {
    return (
      <div className="p-8 max-w-[297mm] w-full overflow-auto mx-auto" ref={ref}>
        <div className="w-full">
          <img
            src="https://auth.num.edu.mn/oauth2/Image/num-logo.svg"
            alt="logo"
            className="w-20 mx-auto"
          />
          <p className="text-center uppercase font-medium mt-2 text-xs ">
            Монгол улсын их сургууль Баруун бүсийн сургууль
          </p>
          <div className="flex justify-between mt-2">
            <p>
              Багш, ажилтны боловсролын зэрэг, судалгааны ажлын чиглэлийн
              судалгаа / {eduLevel === "" ? "Бүгд" : eduLevel} /
            </p>
            <p>{moment().format("YYYY-MM-DD")}</p>
          </div>
        </div>
        <table className="border text-xs w-full mt-1">
          <tr>
            <th rowSpan={2} className="border p-1">
              №
            </th>
            <th rowSpan={2} className="border p-1">
              Нэр
            </th>
            <th rowSpan={2} className="border p-1">
              Регистрийн дугаар
            </th>
            <th rowSpan={2} className="border p-1">
              Албан тушаал
            </th>
            <th rowSpan={2} className="border p-1">
              Боловсролын зэрэг
            </th>
            <th colSpan={4} className="border p-1">
              Боловсролын зэрэг хамгаалсан улс, сургууль, сэдэв
            </th>
            <th rowSpan={2} className="border p-1">
              Төгссөн мэргэжил, чиглэл
            </th>
          </tr>
          <tr>
            <th className="border p-1">Хаана</th>
            <th className="border p-1">Сургуулийн нэр</th>
            <th className="border p-1">Огноо</th>
            <th className="border p-1">Хамгаалсан сэдэв</th>
          </tr>
          <tbody>
            {contactState
              // .filter((te) => te.role === "teacher")
              .filter((fil) => fil.educationalLevel?.includes(eduLevel))
              .map((item, index) => {
                return (
                  <tr className="border">
                    <td className="border p-1 text-center">{index + 1}</td>
                    <td className="border p-1">{item.firstname}</td>
                    <td className="border p-1">{item.regnum}</td>
                    <td className="border p-1">{item.typeOfTeacher}</td>
                    <td className="border p-1">{item.educationalLevel}</td>
                    {[0, 1, 2, 3].map((row, i) => {
                      return (
                        <td className="border p-1">
                          {item.education
                            ?.filter((fi) => fi.eduLevel.includes(eduLevel))
                            .map((el, index) => {
                              return (
                                <p className="border-b">
                                  {row === 0 && el.country + ", "}
                                  {row === 0 && el.city}
                                  {row === 1 && el.university}
                                  {row === 2 &&
                                    moment(el.endDate).format("YYYY")}
                                  {row === 3 && el.sedev}
                                </p>
                              );
                            })}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  });
  const SPrint = forwardRef((props, ref) => {
    return (
      <div className="p-8 max-w-[297mm] w-full overflow-auto mx-auto" ref={ref}>
        <div className="w-full">
          <img
            src="https://auth.num.edu.mn/oauth2/Image/num-logo.svg"
            alt="logo"
            className="w-20 mx-auto"
          />
          <p className="text-center uppercase font-medium mt-2 text-xs ">
            Монгол улсын их сургууль Баруун бүсийн сургууль
          </p>
          <div className="flex justify-between mt-2">
            <p>Багш, ажилтны шагналын судалгаа </p>
            <p>{moment().format("YYYY-MM-DD")}</p>
          </div>
        </div>
        <table className="border text-xs w-full mt-1">
          <tr>
            <th rowSpan={2} className="border p-1">
              №
            </th>
            <th rowSpan={2} className="border p-1">
              Нэр
            </th>

            <th colSpan={5} className="border p-1">
              Боловсролын зэрэг хамгаалсан улс, сургууль, сэдэв
            </th>
            <th rowSpan={2} className="border p-1">
              Ажилсан жил
            </th>
          </tr>
          <tr>
            <th className="border p-1">Шагналын нэр</th>
            <th className="border p-1">Огноо</th>
            <th className="border p-1">Тушаал</th>
            <th className="border p-1">Дугаар</th>
            <th className="border p-1">Төрөл</th>
          </tr>

          <tbody>
            {contactState.map((item, index) => {
              return (
                <tr className="border">
                  <td className="border p-1 text-center">{index + 1}</td>
                  <td className="border p-1 ">
                    <span className="font-semibold mr-2">
                      {" "}
                      {item.firstname}
                    </span>
                    {item.lastname}{" "}
                  </td>

                  {[0, 1, 2, 3, 4].map((row, i) => {
                    return (
                      <td className="border p-1">
                        {item.shagnal.map((el, index) => {
                          return (
                            <p className="mt-2 odd:font-bold">
                              {row === 0 && el.name}
                              {row === 1 && el.ognoo}
                              {row === 2 && el.tushaal}
                              {row === 3 && el.dugaar}
                              {row === 4 && el.type}
                            </p>
                          );
                        })}
                      </td>
                    );
                  })}
                  <td className="border p-1 text-center"></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  });
  const ChuluuPrint = forwardRef((props, ref) => {
    return (
      <div className="p-8 max-w-[297mm] w-full overflow-auto mx-auto" ref={ref}>
        <div className="w-full">
          <img
            src="https://auth.num.edu.mn/oauth2/Image/num-logo.svg"
            alt="logo"
            className="w-20 mx-auto"
          />
          <p className="text-center uppercase font-medium mt-2 text-xs ">
            Монгол улсын их сургууль Баруун бүсийн сургууль
          </p>
          <div className="flex justify-between mt-2">
            <p>Багш, ажилтны чөлөөний судалгаа</p>
            <p>{moment().format("YYYY-MM-DD")}</p>
          </div>
        </div>
        <table className="border text-xs w-full mt-1">
          <tr className="border">
            <th className="border p-1">№</th>
            <th className="border p-1">Овог нэр</th>
            <th className="border p-1">Чөлөөний төрөл</th>
            <th className="border p-1">Тушаалын дугаар</th>
            <th className="border p-1">Тушаалын огноо</th>
            <th className="border p-1">Эхлэх огноо</th>
            <th className="border p-1">Дуусах огноо</th>
            <th className="border p-1">Цалинтай өдрийн тоо</th>
            <th className="border p-1">Цалингүй өдрийн тоо</th>
            <th className="border p-1">Зорчсон улс, хот, аймаг, сумын нэр</th>
            <th className="border p-1">Олгосон зардал</th>
            <th className="border p-1">Тайлбар</th>
          </tr>

          <tbody>
            {sudalgaa.map((sud, index) => {
              return (
                <tr key={index} className="border">
                  <td className="border p-1">{index + 1}</td>
                  <td className="border p-1">
                    <span className="font-bold">{sud.firstname}</span>{" "}
                    {sud.lastname}
                  </td>
                  <td className="border p-1">{sud.turul}</td>
                  <td className="border p-1">{sud.tushaal_dugaar}</td>
                  <td className="border p-1">{sud.tushaal_date}</td>
                  <td className="border p-1">{sud.startDate}</td>
                  <td className="border p-1">{sud.endDate}</td>
                  <td className="border p-1">{sud.paidDay}</td>
                  <td className="border p-1"> {sud.unpaidDay}</td>
                  <td className="border p-1">{sud.country}</td>
                  <td className="border p-1">{sud.cost}</td>
                  <td className="border p-1">{sud.tailbar}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  });
  const SudalgaaPrint = forwardRef((props, ref) => {
    return (
      <div className="p-8 max-w-[297mm] w-full overflow-auto mx-auto" ref={ref}>
        <div className="w-full">
          <img
            src="https://auth.num.edu.mn/oauth2/Image/num-logo.svg"
            alt="logo"
            className="w-20 mx-auto"
          />
          <p className="text-center uppercase font-medium mt-2 text-xs ">
            Монгол улсын их сургууль Баруун бүсийн сургууль
          </p>
          {/* <div className="flex justify-between mt-2">
            <p>Багш, ажилтны чөлөөний судалгаа</p>
            <p>{moment().format("YYYY-MM-DD")}</p>
          </div> */}
        </div>
        <p className="text-center uppercase font-semibold">Сататус</p>
        <table className="border text-xs w-full mt-1">
          <tr className="border">
            <th className="border p-1">Нэр</th>
            <th className="border p-1">Тоо</th>
          </tr>

          <tbody>
            {sudStatus
              .sort((a, b) => (a.count > b.count ? -1 : 1))
              .map((sud, index) => {
                return (
                  <tr key={index} className="border">
                    <td className="border p-1 font-semibold">
                      {sud.groupField1}
                    </td>
                    <td className="border p-1 text-center">{sud.count}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <p className="text-center uppercase font-semibold">
          Албан тушаалын ангилал
        </p>
        <table className="border text-xs w-full mt-1">
          <tr className="border">
            <th className="border p-1">Нэр</th>
            <th className="border p-1">Тоо</th>
          </tr>

          <tbody>
            {sudAngilal
              .sort((a, b) => (a.count > b.count ? -1 : 1))
              .map((sud, index) => {
                return (
                  <tr key={index} className="border">
                    <td className="border p-1 font-semibold">
                      {sud.groupField1}
                    </td>
                    <td className="border p-1 text-center">{sud.count}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <p className="text-center uppercase font-semibold">Эрдмийн зэрэг</p>
        <table className="border text-xs w-full mt-1">
          <tr className="border">
            <th className="border p-1">Нэр</th>
            <th className="border p-1">Тоо</th>
          </tr>

          <tbody>
            {sudEduLevel
              .sort((a, b) => (a.count > b.count ? -1 : 1))
              .map((sud, index) => {
                return (
                  <tr key={index} className="border">
                    <td className="border p-1 font-semibold">
                      {sud.groupField1}
                    </td>
                    <td className="border p-1 text-center">{sud.count}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <p className="text-center uppercase font-semibold">Докторууд</p>
        <table className="border text-xs w-full mt-1">
          <tr className="border">
            <th className="border p-1">№</th>
            <th className="border p-1">Нэр</th>
            <th className="border p-1">Нас</th>
          </tr>
          <tbody>
            {contactState
              .filter((el) => el.educationalLevel === "Доктор")

              .sort((a, b) => (a.age > b.age ? -1 : 1))
              .map((sud, index) => {
                return (
                  <tr key={index} className="border">
                    <td className="border text-center">{index + 1}</td>
                    <td className=" p-1 font-semibold flex gap-1">
                      <span className="font-bold">{sud.firstname}</span>
                      {sud.firstname}
                    </td>
                    <td className="border p-1 text-center">{sud.age}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <p className="text-center uppercase font-semibold">Магистр</p>
        <table className="border text-xs w-full mt-1">
          <tr className="border">
            <th className="border p-1">№</th>
            <th className="border p-1">Нэр</th>
            <th className="border p-1">Нас</th>
          </tr>
          <tbody>
            {contactState
              .filter((el) => el.educationalLevel === "Магистр")
              .filter((el) => el.TypeOfEmployee === "Үндсэн багш")
              .sort((a, b) => (a.age > b.age ? -1 : 1))
              .map((sud, index) => {
                return (
                  <tr key={index} className="border">
                    <td className="border text-center">{index + 1}</td>
                    <td className=" p-1 font-semibold flex gap-1">
                      <span className="font-bold">{sud.firstname}</span>
                      {sud.firstname}
                    </td>
                    <td className="border p-1 text-center">{sud.age}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  });
  return (
    <div>
      <Sheet open={sheepOpen} onOpenChange={() => setSheetOpen(false)}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Дэлгэрэнгүй мэдээлэл</SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex flex-col space-y-2 ">
            {checkRole(["admin", "person", "department"], user?.rols) && (
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Тэнхим нэгж</Label>
                <Select
                  onValueChange={(value) =>
                    setteacherOne({ ...teacherOne, department: value })
                  }
                  value={teacherOne.department?._id}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Тэнхим нэгж" />
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
            <div className="flex gap-2">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>SiSi хаяг</Label>
                <Input
                  onChange={(e) =>
                    setteacherOne({ ...teacherOne, phone2: e.target.value })
                  }
                  value={teacherOne.phone2}
                  type="text"
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
                      {[
                        "Бакалавр",
                        "Магистр",
                        "Доктор",
                        "Бүрэн дунд боловсрол",
                        "Суурь боловсрол",
                        "Чадамжид суурилсан сургалт",
                        "Мэргэжлийн сургалт",
                        "Мэргэжлийн боловсрол",
                        "Техникийн боловсрол",
                        "Мэргэшүүлэх сургалт",
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
            <div className="flex gap-2">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Статус</Label>
                <Select
                  onValueChange={(value) =>
                    setteacherOne({ ...teacherOne, TypeOfEmployee: value })
                  }
                  value={teacherOne.TypeOfEmployee}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {[
                        "Үндсэн багш",
                        "Зөвлөх багш",
                        "Гэрээт багш",
                        "Цагийн багш",
                        "Үндсэн ажилтан",
                        "Гэрээт ажилтан",
                        "Түр ажлын байр",
                        "Туршилтын хугацаагаар",
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
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Албан тушаалын ангилал</Label>
              <Select
                onValueChange={(value) =>
                  setteacherOne({ ...teacherOne, isConsultant: value })
                }
                value={teacherOne.isConsultant}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Албан тушаалын ангилал" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {[
                      "Удирдах албан тушаал",
                      "Гүйцэтгэх ажилтан",
                      "Үйлчилгээний ажилтан",
                      "Багш",
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
              <Label>Албан тушаал</Label>
              <Select
                onValueChange={(value) =>
                  setteacherOne({ ...teacherOne, typeOfTeacher: value })
                }
                value={teacherOne.typeOfTeacher}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Албан тушаал" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {[
                      "Захирал",
                      "Дарга",
                      "Профессор багш",
                      "Дэд профессор багш",
                      "Ахлах багш",
                      "Багш",
                      "Дадлагажигч багш",
                      "Гэрээт багш",
                      "Цагийн багш",
                      "Программист",
                      "Мэргэжилтэн",
                      "Захирлын туслах",
                      "Ахлах мэргэжилтэн",
                      "Номын сангийн эрхлэгч",
                      "Номын сан хөмрөгийн эрхлэгч",
                      "Номын санч",
                      "Ном зүйч, каталогич",
                      "Номын санч",
                      "Ахлах нягтлан бодогч",
                      "Нягтлан бодогч",
                      "Нярав",
                      "Лицей нягтлан",
                      "Эмч",
                      "Оюутны байрны зохион байгуулагч",
                      "Цахилгаанчин",
                      "Мужаан",
                      "Сантехникч",
                      "Слесарь",
                      "Жолооч",
                      "Сахиул",
                      "Үйлчлэгч",
                      "Тэнхимийн туслах ажилтан",
                      "Лаборант",
                      "Өлгүүрчин",
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

            {checkRole(["teacher"], user?.rols) && (
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
                <Label htmlFor="lastname">
                  Ажилд томилогдсон тушаалын огноо
                </Label>
                <input
                  onChange={(e) =>
                    setteacherOne({
                      ...teacherOne,
                      work_date: e.target.value,
                    })
                  }
                  value={teacherOne.work_date}
                  type="date"
                  id="lastname"
                  className="w-full border p-1 rounded-md"
                  placeholder="Ажилд орсон огноо"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="lastname">
                  Ажилд томилогдсон тушаалын дугаар
                </Label>
                <Input
                  onChange={(e) =>
                    setteacherOne({
                      ...teacherOne,
                      work_dugaar: e.target.value,
                    })
                  }
                  value={teacherOne.work_dugaar}
                  type="text"
                  id="lastname"
                  placeholder="Тушаалын дугаар"
                />
              </div>
            </div>
            {/* {teacherOne.statusTeacher === "Тэтгэвэрт гарсан" && (
              <div className="flex gap-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label>Банкы нэр</Label>
                  <Select
                    onValueChange={(value) =>
                      setteacherOne({ ...teacherOne, bank: value })
                    }
                    value={teacherOne.bank}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Банк сонгох" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {["Хаан банк", "Голомт банк"].map((item, index) => {
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
                  <Label htmlFor="lastname">Дансны дугаар</Label>
                  <Input
                    onChange={(e) =>
                      setteacherOne({
                        ...teacherOne,
                        bank_dugaar: e.target.value,
                      })
                    }
                    value={teacherOne.bank_dugaar}
                    type="text"
                    id="lastname"
                    placeholder="Дансны дугаар"
                  />
                </div>
              </div>
            )} */}
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
                        "Чөлөө авсан",
                        "Туршилтын хугацаа",
                        "Жирэмсний амралттай",
                        "Хүүхэд асрах чөлөө",
                        "Бүтээлийн чөлөө",
                        "Ажлаас чөлөөлөгдсөн",
                        "Түр ажлын байр",
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
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Цаг бүртгэл</Label>
              <Select
                onValueChange={(value) =>
                  setteacherOne({ ...teacherOne, alba_id: value })
                }
                value={teacherOne.alba_id?._id}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Цаг бүртгэл" />
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
      <div className="flex flex-wrap gap-2 mt-4">
        {checkRole(["admin", "person"], user?.rols) && (
          <Select
            onValueChange={(value) => {
              setDepOne(value);
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
                  // .filter((el) => el.role === "department")
                  .sort((a, b) => (a.name > b.name ? 1 : -1))
                  .sort((a, b) => (a.role < b.role ? 1 : -1))
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
          <Button
            onClick={() => {
              setteacherOne({
                statusTeacher: "Ажиллаж байгаа",
                educationalLevel: "Бакалавр",
                gender: "Эрэгтэй",
                national: "Монгол",
                password: "1234",
                school: "5f79236c2e13c437e888fe21",
              });
              setSheetOpen(true);
            }}
            variant="outline"
            className="gap-1"
          >
            <PlusCircle className="size-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Багш
            </span>
          </Button>
          {checkRole(["admin", "person"], user?.rols) && (
            <Dialog>
              <DialogTrigger className="">
                <Button className="flex flex-row gap-2" variant="outline">
                  <Printer className="size-4" />
                  Боловсролын мэдээлэл
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-7xl max-h-[90%] overflow-auto">
                <DialogHeader className="">
                  <RadioGroup
                    className="flex gap-2s"
                    onValueChange={(value) => {
                      setEduLevel(value);
                    }}
                    value={eduLevel}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="" />
                      <Label>Бүгд</Label>
                    </div>
                    {["Бакалавр", "Магистр", "Доктор"].map((item, index) => {
                      return (
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={item} id={"r" + index + 1} />
                          <Label htmlFor={"r" + index + 1}>{item}</Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </DialogHeader>
                <ScrollArea>
                  <TPrint ref={componentRef} />
                </ScrollArea>
                <DialogFooter>
                  <Button
                    onClick={() => {
                      printFn();
                    }}
                    variant="outline"
                    className="gap-1"
                  >
                    <Printer className="size-4" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Боловсролын мэдээлэл
                    </span>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          {checkRole(["admin", "person"], user?.rols) && (
            <Dialog>
              <DialogTrigger className="">
                <Button className="flex flex-row gap-2" variant="outline">
                  <Printer className="size-4" />
                  Шагналын мэдээлэл
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-7xl max-h-[90%] overflow-auto">
                <DialogHeader className=""></DialogHeader>
                <ScrollArea>
                  <SPrint ref={componentRef} />
                </ScrollArea>
                <DialogFooter>
                  <Button
                    onClick={() => {
                      printFn();
                    }}
                    variant="outline"
                    className="gap-1"
                  >
                    <Printer className="size-4" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Хэвлэх{" "}
                    </span>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {checkRole(["admin", "person", "alba"], user?.rols) && (
            <Dialog>
              <DialogTrigger className="">
                <Button className="flex flex-row gap-2" variant="outline">
                  <Printer className="size-4" />
                  Чөлөөний мэдээлэл
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-7xl max-h-[90%] overflow-auto">
                <DialogHeader className=""></DialogHeader>
                <ScrollArea>
                  <ChuluuPrint ref={componentRef} />
                </ScrollArea>
                <DialogFooter>
                  <Button
                    onClick={() => {
                      printFn();
                    }}
                    variant="outline"
                    className="gap-1"
                  >
                    <Printer className="size-4" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      чөлөөний мэдээлэл
                    </span>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          {checkRole(["admin", "person", "manager", "alba"], user?.rols) && (
            <Dialog>
              <DialogTrigger className="">
                <Button className="flex flex-row gap-2" variant="outline">
                  <Printer className="size-4" />
                  Бусад мэдээлэл
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl max-h-[90%] overflow-auto">
                <DialogHeader className=""></DialogHeader>
                <ScrollArea>
                  <SudalgaaPrint ref={componentRef} />
                </ScrollArea>
                <DialogFooter>
                  <Button
                    onClick={() => {
                      printFn();
                    }}
                    variant="outline"
                    className="gap-1"
                  >
                    <Printer className="size-4" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Хэвлэх
                    </span>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      <Card className="mt-4 min-h-36">
        <CardHeader className="">
          <p className="font-medium">{depOne.name}</p>
        </CardHeader>
        <CardContent>
          {/* <div className="flex flex-wrap gap-4 my-4">
            {teacherState.map((item, index) => {
              return (
                <div
                  key={index}
                  className="relative h-56 w-44 rounded-lg bg-cover border"
                >
                  <img
                    src={`http://west.edu.mn:3000/upload/images/${item.imagePath}`}
                    alt="prof"
                    className="w-44 h-56 object-top object-cover rounded-lg"
                  />
                  <div className="text-center absolute -bottom-1 w-full bg-blue-600 text-white rounded-b-lg">
                    <p className="">{item.butenNer}</p>
                    <p className="text-xs ">{item.typeOfTeacher}</p>
                  </div>
                </div>
              );
            })}
          </div> */}

          <Table className="min-h-36 text-xs">
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="">Овог нэр</TableHead>
                <TableHead>SiSi хаяг</TableHead>
                <TableHead>NUM хаяг</TableHead>
                <TableHead>Утас</TableHead>
                <TableHead>Эрдмийн зэрэг</TableHead>
                <TableHead>Албан тушаалын ангилал</TableHead>
                <TableHead>Албан тушаал</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-left">Төлөв</TableHead>
                <TableHead className="sr-only">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teacherState
                .sort((a, b) => (a.butenNer > b.butenNer ? 1 : -1))
                .map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium text-left flex flex-row gap-2">
                      {item.firstname}
                      <p className="text-muted-foreground">{item.lastname}</p>
                    </TableCell>
                    <TableCell>{item.phone2}</TableCell>

                    <TableCell>
                      <button
                        onClick={() => {
                          toast.success("Хуулагдлаа");
                          copy(item.email);
                        }}
                      >
                        {item.email}
                      </button>
                    </TableCell>
                    <TableCell>{item.phone1}</TableCell>
                    <TableCell>{item.educationalLevel}</TableCell>
                    <TableCell>{item.isConsultant}</TableCell>
                    <TableCell>{item.typeOfTeacher}</TableCell>
                    <TableCell>{item.TypeOfEmployee}</TableCell>
                    <TableCell className="text-left">
                      <Badge
                        variant={
                          item.statusTeacher === "Ажиллаж байгаа"
                            ? "outline"
                            : "destructive"
                        }
                      >
                        {item.statusTeacher}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex justify-end gap-2">
                      {checkRole(["admin", "person"], user?.rols) && (
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
                                    <NotebookPen className="size-4 text-pink-600 " />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Судалгаанууд</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </DialogTrigger>
                          <DialogContent className="w-full px-4 max-h-[80%] max-w-7xl">
                            <DialogHeader>
                              <DialogTitle className="text-center">
                                Судалгаанууд{" "}
                              </DialogTitle>
                              <DialogDescription></DialogDescription>
                              <div>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline">
                                      <Plus />
                                      Судалгаа нэмэх{" "}
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Судалгаа нэмэх</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="jil">
                                          Судалгааны төрөл
                                        </Label>
                                        <Select
                                          onValueChange={(value) =>
                                            setSudState({
                                              ...sudState,
                                              sudalgaa_type: value,
                                            })
                                          }
                                          value={sudState.sudalgaa_type}
                                        >
                                          <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Судалгааны төрөл сонгох" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectGroup>
                                              {[
                                                "Чөлөө",
                                                "Тусламж, дэмжлэг",
                                              ].map((item, index) => {
                                                return (
                                                  <SelectItem
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

                                      {sudState.sudalgaa_type === "Чөлөө" && (
                                        <div className="space-y-2">
                                          <div>
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                              <Label htmlFor="jil">
                                                Чөлөөний төрөл
                                              </Label>
                                              <Select
                                                onValueChange={(value) =>
                                                  setSudState({
                                                    ...sudState,
                                                    turul: value,
                                                  })
                                                }
                                                value={sudState.turul}
                                              >
                                                <SelectTrigger className="w-full">
                                                  <SelectValue placeholder="Чөлөөний төрөл сонгох" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  <SelectGroup>
                                                    {[
                                                      "Бичигээр гаргасан хүсэлт",
                                                      "Жирэмсний амралт",
                                                      "Хүүхэд асрах",
                                                      "Мэргэжил дээшлүүлэх",
                                                      "Ар гэрийн гачигдал",
                                                      "Бүтээлийн чөлөө",
                                                      "Докторантурт суралцах",
                                                      "Сонгуульд нэр дэвших",
                                                      "Гэр бүлийн гишүүнээ эмчилгээнд авч явах",
                                                      "МУИС-д ажиллах",
                                                      "Гадаад улс руу ажлаар явах",
                                                      "ЭШ-ний хуралд оролцох",
                                                      "Нийслэл, аймгууд руу ажлын шугамаар явах",
                                                      "Олимпиадад оюутан удирдаж авч явах",
                                                      "Хагалгаанд орох",
                                                      "Өөрөө эмчилгээнд явах",
                                                      "Докторын жинхэн хамгаалалт",
                                                      "Докторын урдчилсан хамгаалалт",
                                                    ].map((item, index) => {
                                                      return (
                                                        <SelectItem
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
                                          </div>
                                          <div className="flex gap-2">
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                              <Label htmlFor="firstname">
                                                Тушаалын дугаар
                                              </Label>
                                              <Input
                                                onChange={(e) =>
                                                  setSudState({
                                                    ...sudState,
                                                    tushaal_dugaar:
                                                      e.target.value,
                                                  })
                                                }
                                                value={sudState.tushaal_dugaar}
                                                type="text"
                                                placeholder="Тушаалын дугаар"
                                              />
                                            </div>
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                              <Label htmlFor="firstname">
                                                Тушаалын огноо
                                              </Label>
                                              <Input
                                                onChange={(e) =>
                                                  setSudState({
                                                    ...sudState,
                                                    tushaal_date:
                                                      e.target.value,
                                                  })
                                                }
                                                value={sudState.tushaal_date}
                                                type="date"
                                                placeholder="Тушаалын дугаар"
                                              />
                                            </div>
                                          </div>
                                          <div className="flex gap-2">
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                              <Label>Эхлэх огноо</Label>
                                              <Input
                                                onChange={(e) =>
                                                  setSudState({
                                                    ...sudState,
                                                    startDate: e.target.value,
                                                  })
                                                }
                                                value={sudState.startDate}
                                                type="date"
                                                placeholder="Эхлэх огноо"
                                              />
                                            </div>
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                              <Label>Дуусах огноо</Label>
                                              <Input
                                                onChange={(e) =>
                                                  setSudState({
                                                    ...sudState,
                                                    endDate: e.target.value,
                                                  })
                                                }
                                                value={sudState.endDate}
                                                type="date"
                                                placeholder="Эхлэх огноо"
                                              />
                                            </div>
                                          </div>
                                          <div className="flex gap-2">
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                              <Label>Цалинтай өдийн тоо</Label>
                                              <Input
                                                onChange={(e) =>
                                                  setSudState({
                                                    ...sudState,
                                                    paidDay: e.target.value,
                                                  })
                                                }
                                                value={sudState.paidDay}
                                                type="number"
                                              />
                                            </div>
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                              <Label>Цалингүй өдийн тоо</Label>
                                              <Input
                                                onChange={(e) =>
                                                  setSudState({
                                                    ...sudState,
                                                    unpaidDay: e.target.value,
                                                  })
                                                }
                                                value={sudState.unpaidDay}
                                                type="number"
                                              />
                                            </div>
                                          </div>
                                          <div className="flex gap-2">
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                              <Label>
                                                Зорчсон улс, хот, аймаг, сумын
                                                нэр
                                              </Label>
                                              <Input
                                                onChange={(e) =>
                                                  setSudState({
                                                    ...sudState,
                                                    country: e.target.value,
                                                  })
                                                }
                                                value={sudState.country}
                                                type="text"
                                              />
                                            </div>
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                              <Label>Олгосон зардал</Label>
                                              <Input
                                                onChange={(e) =>
                                                  setSudState({
                                                    ...sudState,
                                                    cost: e.target.value,
                                                  })
                                                }
                                                value={sudState.cost}
                                                type="number"
                                              />
                                            </div>
                                          </div>
                                          <div>
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                              <Label>Дэлгэрэнгүй тайлбар</Label>
                                              <textarea
                                                className="border rounded p-1 h-28"
                                                onChange={(e) =>
                                                  setSudState({
                                                    ...sudState,
                                                    tailbar: e.target.value,
                                                  })
                                                }
                                                value={sudState.tailbar}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      )}

                                      {sudState.sudalgaa_type ===
                                        "Тусламж, дэмжлэг" && (
                                        <div className="space-y-2">
                                          <div className="grid w-full max-w-sm items-center gap-1.5">
                                            <Label htmlFor="jil">
                                              Тусламж, дэмжлэгийн төрөл
                                            </Label>
                                            <Select
                                              onValueChange={(value) =>
                                                setSudState({
                                                  ...sudState,
                                                  turul: value,
                                                })
                                              }
                                              value={sudState.turul}
                                            >
                                              <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Чөлөөний төрөл сонгох" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectGroup>
                                                  {["Түлшний", "Түрээсийн"].map(
                                                    (item, index) => {
                                                      return (
                                                        <SelectItem
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
                                          <div className="flex gap-2">
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                              <Label htmlFor="firstname">
                                                Огноо
                                              </Label>
                                              <Input
                                                onChange={(e) =>
                                                  setSudState({
                                                    ...sudState,
                                                    tushaal_date:
                                                      e.target.value,
                                                  })
                                                }
                                                value={sudState.tushaal_date}
                                                type="date"
                                                placeholder="Тушаалын дугаар"
                                              />
                                            </div>
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                              <Label>
                                                Олгосон зардал /төгрөгөөр/
                                              </Label>
                                              <Input
                                                onChange={(e) =>
                                                  setSudState({
                                                    ...sudState,
                                                    cost: e.target.value,
                                                  })
                                                }
                                                value={sudState.cost}
                                                type="number"
                                              />
                                            </div>
                                          </div>
                                          <div className="grid w-full max-w-sm items-center gap-1.5">
                                            <Label>Дэлгэрэнгүй тайлбар</Label>
                                            <textarea
                                              className="border rounded p-1 h-28"
                                              onChange={(e) =>
                                                setSudState({
                                                  ...sudState,
                                                  tailbar: e.target.value,
                                                })
                                              }
                                              value={sudState.tailbar}
                                            />
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                    <DialogFooter>
                                      <Button
                                        onClick={() => {
                                          addSudalgaa(
                                            item._id,
                                            sudState,
                                            item.department?._id
                                          );
                                        }}
                                      >
                                        Хадгалах
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </DialogHeader>

                            <Table className="text-xs w-full overflow-auto border">
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="">
                                    Чөлөөний төрөл
                                  </TableHead>
                                  <TableHead>Тушаалын дугаар</TableHead>
                                  <TableHead>Тушаалын огноо</TableHead>
                                  <TableHead>Эхлэх огноо</TableHead>
                                  <TableHead>Дуусах огноо</TableHead>
                                  <TableHead>Цалинтай өдрийн тоо</TableHead>
                                  <TableHead>Цалингүй өдрийн тоо</TableHead>
                                  <TableHead>
                                    Зорчсон улс, хот, аймаг, сумын нэр
                                  </TableHead>
                                  <TableHead>Олгосон зардал</TableHead>
                                  <TableHead>Тайлбар</TableHead>
                                  <TableHead></TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {item?.sudalgaa
                                  ?.filter(
                                    (el) => el.sudalgaa_type !== "Сургалт"
                                  )
                                  .map((sud, index) => {
                                    return (
                                      <TableRow key={index}>
                                        <TableCell>{sud.turul}</TableCell>
                                        <TableCell>
                                          {sud.tushaal_dugaar}
                                        </TableCell>
                                        <TableCell>
                                          {sud.tushaal_date}
                                        </TableCell>
                                        <TableCell>{sud.startDate}</TableCell>
                                        <TableCell>{sud.endDate}</TableCell>
                                        <TableCell>{sud.paidDay}</TableCell>
                                        <TableCell> {sud.unpaidDay}</TableCell>
                                        <TableCell>{sud.country}</TableCell>
                                        <TableCell>{sud.cost}</TableCell>
                                        <TableCell>{sud.tailbar}</TableCell>
                                        <TableCell>
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
                                                  <h1>
                                                    Устгахдаа итгэлтэй байна уу?
                                                  </h1>
                                                </DialogTitle>
                                              </DialogHeader>
                                              <div className="w-full flex justify-evenly mt-2 gap-2">
                                                <DialogTrigger>
                                                  <Button
                                                    className=""
                                                    onClick={() => {
                                                      deleteSudalgaa(
                                                        item._id,
                                                        {
                                                          _id: sud._id,
                                                        },
                                                        item.department?._id
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
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                              </TableBody>
                            </Table>
                          </DialogContent>
                        </Dialog>
                      )}
                      {/* {checkRole(["admin", "person"], user?.rols) && (
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
                                    <MonitorSmartphone className="size-4 text-emerald-600 " />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Төөхөөрөмж солих хүсэлт</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </DialogTrigger>
                          <DialogContent className="w-full px-4 max-h-[80%] max-w-7xl">
                            <DialogHeader>
                              <DialogTitle>
                                Төхөөрөмж өөрчлүүлэх хүсэлт
                              </DialogTitle>
                              <DialogDescription></DialogDescription>
                            </DialogHeader>
                            {checkRole(["admin", "person"], user?.rols) && (
                              <div>
                                <p>
                                  Шинэ төхөөрөмжийн хаяг:{" "}
                                  <span className="font-bold">
                                    {item.social1}{" "}
                                  </span>
                                </p>
                                <p>
                                  Одоо байгаа:{" "}
                                  <span className="font-bold">{item.mac} </span>
                                </p>
                                <Button
                                  className="mt-2"
                                  onClick={() => {
                                    updateTeacher({
                                      _id: item._id,
                                      mac: item.social1,
                                    });
                                  }}
                                >
                                  Өөрчлөх
                                </Button>
                              </div>
                            )}
                            <Table className="text-xs w-full overflow-auto">
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="">Огноо</TableHead>
                                  <TableHead>IP хаяг</TableHead>
                                  <TableHead>Төхөөрөмж</TableHead>
                                  <TableHead>Төхөөрөмжийн мэдээлэл</TableHead>
                                  <TableHead>Хандсан тоо</TableHead>
                                  <TableHead>Зөвшөөрөгдсөн эсэх</TableHead>
                                  <TableHead className="text-right"></TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {item?.loginHistory?.map((his, index) => {
                                  return (
                                    <TableRow key={index}>
                                      <TableCell className="">
                                        {moment(his.lastUsedAt).format(
                                          "YYYY-MM-DD HH:MM"
                                        )}
                                      </TableCell>
                                      <TableCell>{his.ipAddress}</TableCell>
                                      <TableCell>{his.deviceType}</TableCell>
                                      <TableCell>{his.deviceName}</TableCell>
                                      <TableCell>{his.accessCount}</TableCell>
                                      <TableCell>
                                        {his.deviceName === item.mac
                                          ? "Баталгаажсан"
                                          : "Баталгаажаагүй"}
                                      </TableCell>
                                      <TableCell>
                                        <Checkbox
                                          checked={
                                            his.deviceName === item.mac
                                              ? true
                                              : false
                                          }
                                          onCheckedChange={(value) => {
                                            // if (value) {
                                            //   updateTeacher({
                                            //     _id: item._id,
                                            //     mac: his.deviceName,
                                            //   });
                                            // }
                                          }}
                                        />
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </DialogContent>
                        </Dialog>
                      )} */}
                      {checkRole(
                        ["admin", "person", "department"],
                        user?.rols
                      ) && (
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
                                    <FileLineChartIcon className="size-4 text-orange-600 " />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Файлын сан</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </DialogTrigger>
                          <DialogContent className="w-full px-4 max-h-[80%] overflow-auto max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Файлын жагсаалт </DialogTitle>
                              <DialogDescription></DialogDescription>
                            </DialogHeader>

                            <table className="border text-xs w-full  mt-1">
                              <tr className="border">
                                <th className="border p-1">№</th>
                                <th className="border p-1">Файлын нэр</th>
                                <th className="border p-1">Файлын төрөл</th>
                                <th className="border p-1">Тайлбар</th>
                                <th className="border p-1">Тушаалын дугаар</th>
                              </tr>

                              <tbody>
                                {item?.fileSan?.map((item, index) => {
                                  return (
                                    <tr key={index} className="border">
                                      <td className="border p-1 text-center">
                                        {index + 1}
                                      </td>
                                      <td className=" p-1 flex items-center gap-2">
                                        {item.fileType === "image" ? (
                                          <ImageIcon className="size-4 text-blue-600" />
                                        ) : (
                                          <FileText className="size-4 text-blue-600" />
                                        )}
                                        {item.name} | {item.fileSize}
                                      </td>
                                      <td className="border p-1">
                                        {item.turul}
                                      </td>
                                      <td className="border p-1">
                                        {item.comment}
                                      </td>
                                      <td className=" p-1 flex gap-4 justify-center">
                                        <a
                                          target="_blank"
                                          href={`http://west.edu.mn:3000/upload/ajil/${item.name}`}
                                        >
                                          <Button
                                            className="size-7"
                                            variant="outline"
                                            size="icon"
                                          >
                                            <Eye className="text-blue-600" />
                                          </Button>
                                        </a>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </DialogContent>
                        </Dialog>
                      )}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Button
                              onClick={() => {
                                changePassUser(item._id, item.email);
                              }}
                              variant="outline"
                              size="icon"
                              className="flex gap-2 size-7"
                            >
                              <Lock className="size-4 text-purple-600 " />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Нууц үг солих</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
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
                      {checkRole(["admin", "person"], user?.rols) && (
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
                                <h1>Устгахдаа итгэлтsэй байна уу?</h1>
                              </DialogTitle>
                            </DialogHeader>
                            <div className="w-full flex justify-evenly mt-2 gap-2">
                              <DialogTrigger>
                                <Button
                                  className=""
                                  onClick={() => {
                                    deleteTeacher(
                                      item._id,
                                      item.department?._id
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
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
