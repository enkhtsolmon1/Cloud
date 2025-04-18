import { forwardRef, useEffect, useRef, useState } from "react";
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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BadgeDollarSign,
  Download,
  GitCompareArrows,
  Lock,
  PlusCircle,
  Printer,
  PrinterCheck,
  RotateCw,
  Trash2Icon,
  UserRoundPenIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import copy from "text-copy";

import { useAuth } from "../components/Context/AuthContext";
import { toast } from "../hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useReactToPrint } from "react-to-print";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ExcelFile, ExcelColumn, ExcelSheet } from "react-excel-exporter";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import moment from "moment";
import QRCode from "qrcode";

import { useCtx } from "../components/Context/MainContext";

export default function Student() {
  const {
    user,
    depState,
    classState,
    getDepClass,
    getStudents,
    studentState,
    changePassStudent,
    checkRole,
    addTulbur,
    deleteTulbur,
    getClassTulbur,
    classTulburState,
    sheepOpen,
    setSheetOpen,
    studentOne,
    setStudentOne,
    updateStudent,
    getStudentGolch,
    studentGolch,
  } = useAuth();
  console.log("🚀 ~ Student ~ studentOne:", studentOne);

  const { getAllstudents, allStudent, addressState } = useCtx();
  console.log("🚀 ~ Student ~ addressState:", addressState);

  const [golchData, setGolchData] = useState(null);

  const [classOne, setclassOne] = useState({});
  console.log(addressState.find((ai) => ai.aimagCity === "Увс")?.soumDistrict);
  useEffect(() => {
    if (checkRole(["department"], user?.rols)) {
      getDepClass(user?.department?._id);
    }
  }, []);

  const componentRef = useRef(null);

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Боловсролын мэдээлэл",
  });

  function formatMoney(num) {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  const [tulburOne, setTulburOne] = useState({
    kurs: 1,
    type: "Хувиараа",
    tulsunDun: 0,
    tulsunOgnoo: "",
    tailbar: "",
  });

  const [chuluudata, setchuluudata] = useState({
    startDate: "",
    endDate: "",
  });
  const [qr, setQr] = useState("");
  const [todType, setTodType] = useState("tod");
  const [golchType, setGolchType] = useState(false);

  const TPrint = forwardRef((props, ref) => {
    return (
      <div className="p-8 max-w-[297mm] w-full overflow-auto mx-auto" ref={ref}>
        <div className="w-full">
          {/* <img
            src="https://auth.num.edu.mn/oauth2/Image/num-logo.svg"
            alt="logo"
            className="w-20 mx-auto"
          />
          <p className="text-center uppercase font-medium mt-2 text-xs ">
            Монгол улсын их сургууль Баруун бүсийн сургууль
          </p> */}
          <div className="text-center font-medium uppercase text-sm">
            <p>{classOne?.department_id?.name}</p>
            <p>{classOne?.ner}</p>
          </div>
        </div>
        <table className="border text-xs w-full mt-1">
          <tr className="border">
            <th className="border p-1">№</th>
            <th className="border p-1">Овог нэр</th>
            <th className="border p-1">NUM хаяг</th>
            <th className="border p-1">Регистр</th>
            <th className="border p-1">Утас</th>
          </tr>

          <tbody>
            {studentState.map((sud, index) => {
              return (
                <tr key={index} className="border ">
                  <td className="border p-1">{index + 1}</td>
                  <td className="border p-1">
                    <span className="font-medium">{sud.firstName}</span>{" "}
                    {sud.lastName}
                  </td>
                  <td className="border p-1">{sud.loginName}</td>
                  <td className="border p-1">{sud.regnum}</td>
                  <td className="border p-1">{sud.phone1}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  });

  const TulburPrint = forwardRef((props, ref) => {
    return (
      <div className="p-4 w-full mx-auto" ref={ref}>
        <p className="text-center uppercase font-medium">{classOne?.ner}</p>
        <p className="text-center uppercase">Төлбөрийн дэлгэрэнгүй мэдээлэл</p>

        <table className="w-full border text-sm mt-4">
          <tr className="border p-1">
            <th className="border p-1" rowSpan={2}>
              №
            </th>
            <th className="border p-1" rowSpan={2}>
              Нэр
            </th>
            <th className="border p-1" rowSpan={2}>
              Num хаяг
            </th>
            <th className="border p-1" colSpan={3}>
              Курс-1
            </th>
            <th className="border p-1" colSpan={3}>
              Курс-2
            </th>
            <th className="border p-1" colSpan={3}>
              Курс-3
            </th>
            <th className="border p-1" colSpan={3}>
              Курс-4
            </th>
            <th className="border p-1" colSpan={3}>
              Нийт
            </th>
            {/* <th className="border p-1" rowSpan={2}>
              Төлөв
            </th>
            <th className="border p-1" rowSpan={2}>
              Гарын үсэг
            </th> */}
          </tr>
          <tr className="border p-1">
            <th className="border p-1">Төлөх</th>
            <th className="border p-1">Төлсөн</th>
            <th className="border p-1">Үлдэгдэл</th>
            <th className="border p-1">Төлөх</th>
            <th className="border p-1">Төлсөн</th>
            <th className="border p-1">Үлдэгдэл</th>
            <th className="border p-1">Төлөх</th>
            <th className="border p-1">Төлсөн</th>
            <th className="border p-1">Үлдэгдэл</th>
            <th className="border p-1">Төлөх</th>
            <th className="border p-1">Төлсөн</th>
            <th className="border p-1">Үлдэгдэл</th>
            <th className="border p-1">Төлөх</th>
            <th className="border p-1">Төлсөн</th>
            <th className="border p-1">Үлдэгдэл</th>
            {/* <th className="border p-1">Үлдэгдэл</th> */}
          </tr>
          <tbody>
            {classTulburState.content?.map((item, index) => {
              return (
                <tr className="border">
                  <td className="border p-1">{index + 1}</td>
                  <td className="border p-1">
                    <span className="font-medium">{item.firstName}</span>{" "}
                    {item.lastName}
                  </td>
                  <td className="border p-1">{item.loginName}</td>
                  <td className="border p-1">
                    {formatMoney(item.tulbulZohih_kurs1)}
                  </td>
                  <td className="border p-1">
                    {formatMoney(item.sumTulsunStud_kurs1)}
                  </td>
                  <td className="border p-1">{formatMoney(item.uld_kurs1)}</td>
                  <td className="border p-1">
                    {formatMoney(item.tulbulZohih_kurs2)}
                  </td>
                  <td className="border p-1">
                    {formatMoney(item.sumTulsunStud_kurs2)}
                  </td>
                  <td className="border p-1">{formatMoney(item.uld_kurs2)}</td>
                  <td className="border p-1">
                    {formatMoney(item.tulbulZohih_kurs3)}
                  </td>
                  <td className="border p-1">
                    {formatMoney(item.sumTulsunStud_kurs3)}
                  </td>
                  <td className="border p-1">{formatMoney(item.uld_kurs3)}</td>
                  <td className="border p-1">
                    {formatMoney(item.tulbulZohih_kurs4)}
                  </td>
                  <td className="border p-1">
                    {formatMoney(item.sumTulsunStud_kurs4)}
                  </td>
                  <td className="border p-1">{formatMoney(item.uld_kurs4)}</td>
                  <td className="border p-1">{formatMoney(item.niitTuluh)}</td>
                  <td className="border p-1">{formatMoney(item.niitTulsun)}</td>
                  <td className="border p-1">
                    {formatMoney(item.niitUldegdel)}
                  </td>
                  {/* <td className="border p-1">{item.outlook}</td> */}
                  {/* <td className="border p-1"></td> */}
                </tr>
              );
            })}
            <tr className="border font-medium">
              <td colSpan={3} className="border p-1 text-center">
                Нийт
              </td>
              <td className="border p-1">
                {formatMoney(classTulburState.angTulbur1)}
              </td>
              <td className="border p-1">
                {formatMoney(classTulburState.angTulsun1)}
              </td>
              <td className="border p-1">
                {formatMoney(classTulburState.angUld1)}
              </td>
              <td className="border p-1">
                {formatMoney(classTulburState.angTulbur2)}
              </td>
              <td className="border p-1">
                {formatMoney(classTulburState.angTulsun2)}
              </td>
              <td className="border p-1">
                {formatMoney(classTulburState.angUld2)}
              </td>
              <td className="border p-1">
                {formatMoney(classTulburState.angTulbur3)}
              </td>
              <td className="border p-1">
                {formatMoney(classTulburState.angTulsun3)}
              </td>
              <td className="border p-1">
                {formatMoney(classTulburState.angUld3)}
              </td>
              <td className="border p-1">
                {formatMoney(classTulburState.angTulbur4)}
              </td>
              <td className="border p-1">
                {formatMoney(classTulburState.angTulsun4)}
              </td>
              <td className="border p-1">
                {formatMoney(classTulburState.angUld4)}
              </td>
              <td className="border p-1">
                {formatMoney(classTulburState.angTulbulZohih)}
              </td>
              <td className="border p-1">
                {formatMoney(classTulburState.angTulsun)}
              </td>
              <td className="border p-1">
                {formatMoney(classTulburState.angUldegdel)}
              </td>
              {/* <td className="border p-1">{item.outlook}</td> */}
              {/* <td className="border p-1"></td> */}
            </tr>
          </tbody>
        </table>
      </div>
    );
  });
  const TodPrint = forwardRef((props, ref) => {
    return (
      <div className="p-8 w-full font-manrope" ref={ref}>
        {todType === "tod" && (
          <div>
            <div style={{ textAlign: "center" }}>
              <div className="ml-24 text-[#012C63]">
                <img
                  width={60}
                  src="http://www.west.edu.mn:3000/upload/programfiles/numlogo1.png"
                  alt="logo"
                  className="mx-auto"
                />
                <div className="text-lg uppercase  -space-y-2">
                  <p className="">Монгол улсын их сургууль</p>
                  <p className="font-semibold"> баруун бүсийн сургууль</p>
                </div>
                <p className="text-xs">
                  84153 Ховд аймаг, Жаргалант сум, Жаргалан баг <br /> Утас:
                  77006901, 70432500 <br /> И-мэйл: khovd@num.edu.mn
                </p>
              </div>
              <p className="uppercase text-lg mt-8">Тодорхойлолт</p>

              <div className="px-8 mt-8 text-justify indent-16">
                <b>{props.data?.lastName} </b> овогтой{" "}
                <b>{props.data?.firstName} </b> нь МУИС-ийн Баруун бүсийн
                сургуулийн <b>{props.data.class_id?.ner}</b> түвшиний оюутан мөн
                болно.
              </div>
              <p className="mt-20 text-sm uppercase flex gap-2 justify-around">
                <span>
                  Сургалт, оюутны <br /> хэлтсийн дарга
                </span>
                <span>Доктор Э.Наранхүү</span>
              </p>
            </div>
            {/* <br /> <img width="120px" src={props.src} alt="qrcode" /> */}
          </div>
        )}
        {todType === "golch" && (
          <div>
            <div className="font-manrope" style={{ textAlign: "center" }}>
              <div className="ml-24 text-[#012C63]">
                <img
                  width={60}
                  src="http://www.west.edu.mn:3000/upload/programfiles/numlogo1.png"
                  alt="logo"
                  className="mx-auto"
                />
                <div className="text-lg uppercase  -space-y-2">
                  <p className="">Монгол улсын их сургууль</p>
                  <p className="font-semibold"> баруун бүсийн сургууль</p>
                </div>
                <p className="text-xs">
                  84153 Ховд аймаг, Жаргалант сум, Жаргалан баг <br /> Утас:
                  77006901, 70432500 <br /> И-мэйл: khovd@num.edu.mn
                </p>
              </div>
              <p className="uppercase  mt-4">Тодорхойлолт</p>
              {!golchType ? (
                <div className="px-8 ml-16 mt-4 text-justify indent-16">
                  МУИС-ийн Баруун бүсийн сургуулийн <b>{classOne?.ner} </b>{" "}
                  түвшний оюутан <b>{props.data?.lastName} </b> овогтой{" "}
                  <b>{props.data?.firstName} </b> нь{" "}
                  <b>{golchData?.yearLesson}</b> хичээлийн жилийн{" "}
                  <b>{golchData?.semister}</b>-р улиралд{" "}
                  <b> {golchData?.golchOnoo}</b> голч дүнтэй суралцсан нь үнэн
                  болно.
                </div>
              ) : (
                <div>
                  <div className="px-8 ml-16 mt-4 text-justify indent-16">
                    МУИС-ийн Баруун бүсийн сургуулийн <b>{classOne?.ner} </b>{" "}
                    түвшний оюутан <b>{props.data?.lastName} </b> овогтой{" "}
                    <b>{props.data?.firstName} </b> нь{" "}
                    <b>{golchData?.yearLesson}</b> хичээлийн жилийн{" "}
                    <b>{golchData?.semister}</b> -р улиралд дараах хичээлүүдийг
                    судалж байгаа нь үнэн болно.
                  </div>

                  <table className="w-[70%] mx-auto border text-xs mt-4">
                    <tr className="border p-1">
                      <th className="border p-1">№</th>
                      <th className="border p-1 text-left">Хичээлийн нэр</th>
                      <th className="border p-1">Кредит </th>
                    </tr>
                    {golchData?.hicheel.map((el, index) => {
                      return (
                        <tr>
                          <td className="border p-1">{index + 1}</td>
                          <td className="border p-1 text-left">
                            {el.lessonName}
                          </td>
                          <td className="border p-1">{el.credit}</td>
                        </tr>
                      );
                    })}
                    <tr className="border p-1">
                      <th className="border p-1"></th>
                      <th className="border p-1 text-left">Нийт</th>
                      <th className="border p-1">
                        {golchData?.hicheel?.reduce(
                          (total, currentValue) =>
                            (total = total + currentValue.credit),
                          0
                        )}
                      </th>
                    </tr>
                  </table>
                </div>
              )}
              <p className="mt-24 text-sm uppercase flex gap-2 justify-around items-center">
                <span>
                  Сургалт, оюутны <br /> хэлтсийн дарга
                </span>
                <span>Доктор Э.Наранхүү</span>
              </p>
            </div>
            {/* <br /> <img width="120px" src={props.src} alt="qrcode" /> */}
          </div>
        )}
        {todType === "chuluu" && (
          <div>
            <div className="font-manrope" style={{ textAlign: "center" }}>
              <div className="ml-24 text-[#012C63]">
                <img
                  width={60}
                  src="http://www.west.edu.mn:3000/upload/programfiles/numlogo1.png"
                  alt="logo"
                  className="mx-auto"
                />
                <div className="text-lg uppercase  -space-y-2">
                  <p className="">Монгол улсын их сургууль</p>
                  <p className="font-semibold"> баруун бүсийн сургууль</p>
                </div>
                <p className="text-xs">
                  84153 Ховд аймаг, Жаргалант сум, Жаргалан баг <br /> Утас:
                  77006901, 70432500 <br /> И-мэйл: khovd@num.edu.mn
                </p>
              </div>
              <p className="uppercase text-lg mt-8">Чөлөөний хуудас</p>

              <div className="px-8 mt-8 text-justify indent-16 ">
                МУИС-ийн Баруун бүсийн сургуулийн <b>{classOne?.ner} </b>{" "}
                түвшний оюутан <b>{props.data?.lastName} </b> овогтой{" "}
                <b>{props.data?.firstName}д </b>{" "}
                {new Date(chuluudata.startDate)?.getMonth() + 1} сарын{" "}
                {new Date(chuluudata.startDate)?.getDate()}-с{" "}
                {new Date(chuluudata.endDate)?.getMonth() + 1} сарын{" "}
                {new Date(chuluudata.endDate)?.getDate()} –ны/ний хооронд{" "}
                {(new Date(chuluudata.startDate) -
                  new Date(chuluudata.endDate)) /
                  (1000 * 60 * 60 * 24)}{" "}
                өдрийн чөлөө олгов.
              </div>
              <p className="mt-20 text-sm uppercase flex gap-2 justify-around">
                <span>
                  Сургалт, оюутны <br /> хэлтсийн дарга
                </span>
                <span>Доктор Э.Наранхүү</span>
              </p>
            </div>
            {/* <br /> <img width="120px" src={props.src} alt="qrcode" /> */}
          </div>
        )}
        <img src={qr} alt="qrcode" className="mt-4 ml-16 w-24" />
      </div>
    );
  });

  return (
    <div>
      <Dialog open={sheepOpen} onOpenChange={() => setSheetOpen(false)}>
        <DialogContent className="max-w-[90%] w-auto ">
          <DialogHeader>
            {/* <DialogTitle>Дэлгэрэнгүй мэдээлэл</DialogTitle> */}
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 px-6 w-full mt-6">
            {/* <div className="flex flex-col row-span-3 max-w-36 justify-start gap-1">
              <img
                htmlFor="profile"
                className="w-full mx-auto rounded-lg"
                src={`http://west.edu.mn:3000/upload/images/${studentOne.image}`}
              />
              <label
                htmlFor="uploadFile1"
                className="flex bg-gray-800 hover:bg-gray-700 text-white text-sm px-2 py-1 outline-none rounded w-max cursor-pointer mx-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 mr-2 fill-white inline"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                    data-original="#000000"
                  />
                  <path
                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                    data-original="#000000"
                  />
                </svg>
                Зураг солих
                <input
                  onChange={(e) => {
                    // uploadImage(e.target.files);
                  }}
                  type="file"
                  id="uploadFile1"
                  className="hidden"
                />
              </label>
            </div> */}

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="jil">Иргэншил</Label>
              <Select
                onValueChange={(value) =>
                  setStudentOne({ ...studentOne, national: value })
                }
                value={studentOne.national}
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
                  setStudentOne({ ...studentOne, race: value })
                }
                value={studentOne.race}
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
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="lastname">Ургийн овог</Label>
              <Input
                onChange={(e) =>
                  setStudentOne({ ...studentOne, surname: e.target.value })
                }
                value={studentOne.surname}
                type="text"
                id="lastname"
                placeholder="Ургийн овог"
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="lastname">Овог</Label>
              <Input
                onChange={(e) =>
                  setStudentOne({ ...studentOne, lastName: e.target.value })
                }
                value={studentOne.lastName}
                type="text"
                id="lastname"
                placeholder="Овог"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="firstname">Нэр</Label>
              <Input
                onChange={(e) =>
                  setStudentOne({ ...studentOne, firstName: e.target.value })
                }
                value={studentOne.firstName}
                type="text"
                id="lastname"
                placeholder="Нэр"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="regnum">Регистрийн дугаар</Label>
              <Input
                onChange={(e) =>
                  setStudentOne({ ...studentOne, regnum: e.target.value })
                }
                value={studentOne.regnum}
                type="text"
                id="regnum"
                placeholder="Регистрийн дугаар"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">NUM Хаяг</Label>
              <Input
                onChange={(e) =>
                  setStudentOne({ ...studentOne, loginName: e.target.value })
                }
                value={studentOne.loginName}
                type="text"
                id="email"
                placeholder="Email"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Утас</Label>
              <Input
                onChange={(e) =>
                  setStudentOne({ ...studentOne, phone1: e.target.value })
                }
                value={studentOne.phone1}
                type="number"
                placeholder="Утас"
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Email</Label>
              <Input
                onChange={(e) =>
                  setStudentOne({ ...studentOne, email: e.target.value })
                }
                value={studentOne.email}
                type="text"
                placeholder="Email"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="jil">Хүйс</Label>
              <Select
                onValueChange={(value) =>
                  setStudentOne({ ...studentOne, gender: value })
                }
                value={studentOne.gender}
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
              <Label>Курс</Label>
              <Input
                onChange={(e) =>
                  setStudentOne({ ...studentOne, kurs: e.target.value })
                }
                value={studentOne.kurs}
                type="number"
                placeholder="Курс"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Төлөв</Label>
              <Select
                onValueChange={(value) =>
                  setStudentOne({ ...studentOne, outlook: value })
                }
                value={studentOne?.outlook}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Хүйс" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {[
                      "Суралцаж байгаа",
                      "Түр түдгэлзүүлсэн",
                      "Чөлөөтэй байгаа",
                      "Төгссөн",
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
              <Label htmlFor="jil">Аймаг</Label>
              <Select
                onValueChange={(value) =>
                  setStudentOne({
                    ...studentOne,
                    address1: { ...studentOne?.address1, city: value },
                  })
                }
                value={studentOne.address1?.city}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {addressState.map((item, index) => {
                      return (
                        <SelectItem key={index} value={item.aimagCity}>
                          {item.aimagCity}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="jil">Сум</Label>
              <Select
                onValueChange={(value) =>
                  setStudentOne({
                    ...studentOne,
                    address1: { ...studentOne.address1, soum: value },
                  })
                }
                value={studentOne?.address1?.soum}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {addressState
                      ?.find((ai) => ai.aimagCity === studentOne.address1?.city)
                      ?.soumDistrict?.map((item, index) => {
                        return (
                          <SelectItem key={index} value={item.name}>
                            {item?.name}
                          </SelectItem>
                        );
                      })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={() => {
              updateStudent(studentOne);
            }}
            className="mt-2 ml-auto"
            variant=""
          >
            Хадгалах
          </Button>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col md:flex-row gap-2 mt-4">
        {checkRole(
          ["admin", "manager", "director", "teacher", "finance"],
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
        )}
        <Select
          onValueChange={(value) => {
            setclassOne(value);
            getStudents(value._id);
            getClassTulbur(value._id);
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
        <div className="ml-auto flex items-center gap-2">
          {checkRole(["admin", "person", "department"], user?.rols) && (
            <Button variant="outline" className="gap-1">
              <PlusCircle className="size-4" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap ">
                Оюутан
              </span>
            </Button>
          )}
          {checkRole(
            ["admin", "person", "manager", "director", "finance", "department"],
            user?.rols
          ) && (
            <Dialog>
              <DialogTrigger className="">
                <Button className="flex flex-row gap-2" variant="outline">
                  <Printer className="size-4" />
                  Хэвлэх
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-7xl max-h-[90%] overflow-auto">
                <DialogHeader className=""></DialogHeader>
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
                      Хэвлэх
                    </span>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          {checkRole(
            ["admin", "person", "manager", "director", "finance"],
            user?.rols
          ) && (
            <Dialog>
              <DialogTrigger className="">
                <Button className="flex flex-row gap-2" variant="outline">
                  <Printer className="size-4" />
                  Төлбөрийн мэдээлэл хэвлэх
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[80%] max-h-[90%] overflow-auto">
                <DialogHeader className=""></DialogHeader>
                <TulburPrint ref={componentRef} />
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
          {checkRole(
            ["admin", "person", "manager", "director", "finance"],
            user?.rols
          ) && (
            <div className="flex">
              {allStudent.success && (
                <ExcelFile
                  element={
                    <Button
                      className="bg-green-600 text-white"
                      variant="outline"
                    >
                      <Download className="" />
                      Excel татах
                    </Button>
                  }
                  filename="Оюутны дэлэгэрэнгүй мэдээлэл"
                >
                  <ExcelSheet name="Colors" data={allStudent?.students}>
                    <ExcelColumn label="Овог" value="lastName" />
                    <ExcelColumn label="Нэр" value="firstName" />
                    <ExcelColumn label="Регистр" value="regnum" />
                    <ExcelColumn label="NUM хаяг" value="loginName" />
                    <ExcelColumn label="Утас" value="phone1" />
                    <ExcelColumn
                      label="Анги"
                      value={(el) => el.class_id?.ner}
                    />
                    <ExcelColumn
                      label="Аймаг"
                      value={(el) => el.address1?.city}
                    />
                    <ExcelColumn
                      label="Сум"
                      value={(el) => el.address1?.soum}
                    />
                    <ExcelColumn
                      label="1-курс төлбөр"
                      value={(el) => formatMoney(el.tulburStud?.amount1)}
                    />
                    <ExcelColumn
                      label="1-курс төлсөн"
                      value={(el) =>
                        formatMoney(
                          el.tulbur
                            ?.filter((fi) => fi.kurs === 1)
                            ?.reduce(
                              (total, currentValue) =>
                                (total = total + currentValue.tulsunDun),
                              0
                            )
                        )
                      }
                    />
                    <ExcelColumn
                      label="1-курс үлд"
                      value={(el) =>
                        formatMoney(
                          el.tulburStud?.amount1 -
                            el.tulbur
                              ?.filter((fi) => fi.kurs === 1)
                              ?.reduce(
                                (total, currentValue) =>
                                  (total = total + currentValue.tulsunDun),
                                0
                              )
                        )
                      }
                    />
                    {/* 2 kurs */}
                    <ExcelColumn
                      label="2-курс төлбөр"
                      value={(el) => el.tulburStud?.amount2}
                    />
                    <ExcelColumn
                      label="2-курс төлсөн"
                      value={(el) =>
                        formatMoney(
                          el.tulbur
                            ?.filter((fi) => fi.kurs === 2)
                            ?.reduce(
                              (total, currentValue) =>
                                (total = total + currentValue.tulsunDun),
                              0
                            )
                        )
                      }
                    />
                    <ExcelColumn
                      label="2-курс үлд"
                      value={(el) =>
                        formatMoney(
                          el.tulburStud?.amount2 -
                            el.tulbur
                              ?.filter((fi) => fi.kurs === 2)
                              ?.reduce(
                                (total, currentValue) =>
                                  (total = total + currentValue.tulsunDun),
                                0
                              )
                        )
                      }
                    />
                    {/* 3 kurs */}
                    <ExcelColumn
                      label="3-курс төлбөр"
                      value={(el) => el.tulburStud?.amount3}
                    />
                    <ExcelColumn
                      label="3-курс төлсөн"
                      value={(el) =>
                        formatMoney(
                          el.tulbur
                            ?.filter((fi) => fi.kurs === 3)
                            ?.reduce(
                              (total, currentValue) =>
                                (total = total + currentValue.tulsunDun),
                              0
                            )
                        )
                      }
                    />
                    <ExcelColumn
                      label="3-курс үлд"
                      value={(el) =>
                        formatMoney(
                          el.tulburStud?.amount3 -
                            el.tulbur
                              ?.filter((fi) => fi.kurs === 3)
                              ?.reduce(
                                (total, currentValue) =>
                                  (total = total + currentValue.tulsunDun),
                                0
                              )
                        )
                      }
                    />
                    {/* 4 kurs */}
                    <ExcelColumn
                      label="4-курс төлбөр"
                      value={(el) => el.tulburStud?.amount4}
                    />
                    <ExcelColumn
                      label="4-курс төлсөн"
                      value={(el) =>
                        formatMoney(
                          el.tulbur
                            ?.filter((fi) => fi.kurs === 4)
                            ?.reduce(
                              (total, currentValue) =>
                                (total = total + currentValue.tulsunDun),
                              0
                            )
                        )
                      }
                    />
                    <ExcelColumn
                      label="4-курс үлд"
                      value={(el) =>
                        formatMoney(
                          el.tulburStud?.amount4 -
                            el.tulbur
                              ?.filter((fi) => fi.kurs === 4)
                              ?.reduce(
                                (total, currentValue) =>
                                  (total = total + currentValue.tulsunDun),
                                0
                              )
                        )
                      }
                    />
                  </ExcelSheet>
                </ExcelFile>
              )}

              {allStudent.loading ? (
                <Button
                  disabled={true}
                  className="bg-green-600 hover:bg-green-600 text-white"
                  size="icon"
                  variant=""
                >
                  <RotateCw className="animate-spin" />
                </Button>
              ) : (
                <Popover>
                  <PopoverTrigger>
                    <Button
                      className="bg-green-600 hover:bg-green-600 text-white"
                      size="icon"
                      variant=""
                    >
                      <Download className="" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <p className="text-xs text-center uppercase">
                      Оюутны дэлгэрэнгүй мэдээллийг татахад итгэлтэй байна уу?
                    </p>
                    <div className="flex gap-4 justify-end mt-4">
                      <Button
                        onClick={() => {
                          getAllstudents();
                        }}
                        className="bg-green-600 hover:bg-green-600 hover:text-white text-white"
                        size="sm"
                        variant="outline"
                      >
                        Тийм
                      </Button>
                      <Button
                        onClick={() => {
                          // getAllstudents();
                        }}
                        className=""
                        size="sm"
                        variant=""
                      >
                        Үгүй
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          )}
        </div>
      </div>
      <Card className="mt-4">
        <Table className="max-h-96">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="">Овог нэр</TableHead>
              <TableHead>Регистр</TableHead>
              <TableHead>NUM хаяг</TableHead>
              <TableHead>Утас</TableHead>
              <TableHead>Хаяг</TableHead>
              <TableHead>Төлбөр</TableHead>
              <TableHead>Төлсөн</TableHead>
              <TableHead>Үлдэгдэл</TableHead>
              <TableHead className="text-left">Төлөв</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentState.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium text-left flex flex-row gap-2">
                  {student.firstName}
                  <p className="text-muted-foreground">{student.lastName}</p>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => {
                      toast({
                        description: "Хуулагдлаа",
                        className:
                          "bg-green-600 text-white max-w-xs mx-auto text-center",
                      });
                      copy(student.regnum);
                    }}
                  >
                    {student.regnum}
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => {
                      toast({
                        description: "Хуулагдлаа",
                        className:
                          "bg-green-600 text-white max-w-xs mx-auto text-center",
                      });
                      copy(student.loginName);
                    }}
                  >
                    {student.loginName}
                  </button>
                </TableCell>
                <TableCell>{student.phone1}</TableCell>
                <TableCell>
                  {student.address1?.city}, {student.address1?.soum}
                </TableCell>
                <TableCell>
                  {student.kurs === 1 &&
                    formatMoney(student.tulburStud?.amount1)}
                  {student.kurs === 2 &&
                    formatMoney(student.tulburStud?.amount2)}
                  {student.kurs === 3 &&
                    formatMoney(student.tulburStud?.amount3)}
                  {student.kurs === 4 &&
                    formatMoney(student.tulburStud?.amount4)}
                  {student.kurs === 5 &&
                    formatMoney(student.tulburStud?.amount5)}
                </TableCell>
                <TableCell>
                  {student.tulburStud && (
                    <>
                      {formatMoney(
                        student.tulbur
                          .filter((meal) => meal.kurs === student.kurs)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.tulsunDun),
                            0
                          )
                      )}
                    </>
                  )}
                </TableCell>
                <TableCell>
                  {student.tulburStud && (
                    <>
                      {student.kurs === 1 &&
                        formatMoney(
                          student.tulburStud.amount1 -
                            student.tulbur
                              .filter((meal) => meal.kurs === student.kurs)
                              .reduce(
                                (total, currentValue) =>
                                  (total = total + currentValue.tulsunDun),
                                0
                              )
                        )}
                      {student.kurs === 2 &&
                        formatMoney(
                          student.tulburStud.amount2 -
                            student.tulbur
                              .filter((meal) => meal.kurs === student.kurs)
                              .reduce(
                                (total, currentValue) =>
                                  (total = total + currentValue.tulsunDun),
                                0
                              )
                        )}
                      {student.kurs === 3 &&
                        formatMoney(
                          student.tulburStud.amount3 -
                            student.tulbur
                              .filter((meal) => meal.kurs === student.kurs)
                              .reduce(
                                (total, currentValue) =>
                                  (total = total + currentValue.tulsunDun),
                                0
                              )
                        )}
                      {student.kurs === 4 &&
                        formatMoney(
                          student.tulburStud.amount4 -
                            student.tulbur
                              .filter((meal) => meal.kurs === student.kurs)
                              .reduce(
                                (total, currentValue) =>
                                  (total = total + currentValue.tulsunDun),
                                0
                              )
                        )}
                      {student.kurs === 5 &&
                        formatMoney(
                          student.tulburStud.amount5 -
                            student.tulbur
                              .filter((meal) => meal.kurs === student.kurs)
                              .reduce(
                                (total, currentValue) =>
                                  (total = total + currentValue.tulsunDun),
                                0
                              )
                        )}
                    </>
                  )}
                </TableCell>
                <TableCell className="text-left">
                  <Badge
                    variant={
                      student?.outlook === "Суралцаж байгаа"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {student.outlook}
                  </Badge>
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  {checkRole(["admin", "finance"], user?.rols) && (
                    <Dialog>
                      <DialogTrigger>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Button
                                onClick={() => setStudentOne(student)}
                                variant="outline"
                                size="icon"
                                className="flex gap-2 size-7"
                              >
                                <BadgeDollarSign className="size-4 text-green-600 " />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Төлбөрийн мэдээлэл</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </DialogTrigger>
                      <DialogContent className="max-w-6xl font-nunito">
                        <DialogHeader>
                          <DialogTitle className="text-center text-sm space-y-1">
                            <p className="uppercase">
                              {student?.class_id?.ner}
                            </p>
                            <p className="uppercase">
                              {student.firstName} {student.lastName}
                            </p>
                          </DialogTitle>
                        </DialogHeader>
                        <div className="flex gap-2 border p-3 rounded-lg">
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label>Курс-1</Label>
                            <Input
                              onChange={(e) =>
                                setStudentOne({
                                  ...studentOne,
                                  tulburStud: {
                                    ...studentOne?.tulburStud,
                                    amount1: e.target.value,
                                  },
                                })
                              }
                              value={studentOne?.tulburStud?.amount1}
                              type="number"
                            />
                          </div>
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label>Курс-2</Label>
                            <Input
                              onChange={(e) =>
                                setStudentOne({
                                  ...studentOne,
                                  tulburStud: {
                                    ...studentOne?.tulburStud,
                                    amount2: e.target.value,
                                  },
                                })
                              }
                              value={studentOne?.tulburStud?.amount2}
                              type="number"
                            />
                          </div>
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label>Курс-3</Label>
                            <Input
                              onChange={(e) =>
                                setStudentOne({
                                  ...studentOne,
                                  tulburStud: {
                                    ...studentOne?.tulburStud,
                                    amount3: e.target.value,
                                  },
                                })
                              }
                              value={studentOne?.tulburStud?.amount3}
                              type="number"
                            />
                          </div>{" "}
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label>Курс-4</Label>
                            <Input
                              onChange={(e) =>
                                setStudentOne({
                                  ...studentOne,
                                  tulburStud: {
                                    ...studentOne?.tulburStud,
                                    amount4: e.target.value,
                                  },
                                })
                              }
                              value={studentOne?.tulburStud?.amount4}
                              type="number"
                            />
                          </div>
                          {checkRole(
                            ["admin", "finance", "department"],
                            user?.rols
                          ) && (
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                              <Label></Label>
                              <Button
                                onClick={() => {
                                  updateStudent(studentOne);
                                }}
                                className="mt-2"
                                variant=""
                              >
                                Хадгалах
                              </Button>
                            </div>
                          )}
                        </div>
                        {checkRole(["admin", "finance"], user?.rols) && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="gap-1 ml-auto"
                              >
                                <PlusCircle className="size-4" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap ">
                                  Төлбөр нэмэх
                                </span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-sm">
                              <DialogHeader>
                                <DialogTitle>Төлбөрийн мэдээлэл</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-2 p-2">
                                <div className="grid grid-cols-4  items-center gap-4">
                                  <Label className="text-right">Курс</Label>
                                  <Select
                                    onValueChange={(value) =>
                                      setTulburOne({
                                        ...tulburOne,
                                        kurs: value,
                                      })
                                    }
                                    value={tulburOne.kurs}
                                    className="w-full"
                                  >
                                    <SelectTrigger className="">
                                      <SelectValue placeholder="Курс" />
                                    </SelectTrigger>
                                    <SelectContent className="">
                                      <SelectGroup className="">
                                        {[1, 2, 3, 4, 5].map((item, index) => {
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
                                <div className="grid grid-cols-4  items-center gap-4">
                                  <Label className="text-right">Төрөл</Label>
                                  <Select
                                    onValueChange={(value) =>
                                      setTulburOne({
                                        ...tulburOne,
                                        type: value,
                                      })
                                    }
                                    value={tulburOne.type}
                                  >
                                    <SelectTrigger className="col-span-3 text-right">
                                      <SelectValue placeholder="Төрөл сонгох..." />
                                    </SelectTrigger>
                                    <SelectContent className="">
                                      <SelectGroup className="">
                                        {[
                                          "Хувиараа",
                                          "Хөнглөлт, Урамшуулал",
                                          "Төрийн сан",
                                          "Оюутан хөгжлийн зээл",
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

                                <div className="grid grid-cols-4  items-center gap-4">
                                  <Label className="text-right">
                                    Төлсөн дүн
                                  </Label>
                                  <Input
                                    onChange={(e) => {
                                      setTulburOne({
                                        ...tulburOne,
                                        tulsunDun: e.target.value,
                                      });
                                    }}
                                    type="number"
                                    value={tulburOne.tulsunDun}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="name" className="text-right">
                                    Тушаалын огноо
                                  </Label>
                                  <Input
                                    type="date"
                                    onChange={(e) =>
                                      setTulburOne({
                                        ...tulburOne,
                                        tulsunOgnoo: e.target.value,
                                      })
                                    }
                                    value={tulburOne.tulsunOgnoo}
                                    className="col-span-3"
                                  />
                                </div>

                                <div className="grid grid-cols-4  items-center gap-4">
                                  <Label className="text-right">Тайлбар</Label>
                                  <Textarea
                                    onChange={(e) => {
                                      setTulburOne({
                                        ...tulburOne,
                                        tailbar: e.target.value,
                                      });
                                    }}
                                    type="number"
                                    value={tulburOne.tailbar}
                                    className="col-span-3"
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <DialogTrigger>
                                  <Button
                                    onClick={() => {
                                      addTulbur(
                                        student._id,
                                        student?.class_id?._id,
                                        tulburOne
                                      );
                                    }}
                                  >
                                    Хадгалах
                                  </Button>
                                </DialogTrigger>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
                        <Table className="border ">
                          <TableHeader>
                            <TableRow>
                              <TableHead>Курс</TableHead>
                              <TableHead>Төрөл</TableHead>
                              <TableHead>Дүн</TableHead>
                              <TableHead>Огноо</TableHead>
                              <TableHead>Тайлбар</TableHead>
                              <TableHead></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {student?.tulbur?.map((tulb, index) => {
                              return (
                                <TableRow
                                  key={index}
                                  className="odd:bg-gray-100"
                                >
                                  <TableCell>{tulb.kurs} -р курс</TableCell>
                                  <TableCell>{tulb.type}</TableCell>
                                  <TableCell>
                                    {formatMoney(tulb.tulsunDun)}
                                  </TableCell>
                                  <TableCell>
                                    {moment(tulb.tulsunOgnoo).format(
                                      "YYYY-MM-DD HH:MM"
                                    )}
                                  </TableCell>
                                  <TableCell>{tulb.tailbar}</TableCell>
                                  <TableCell>
                                    {checkRole(
                                      ["admin", "finance"],
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
                                            <DialogTitle className="text-xs text-center mt-4">
                                              {formatMoney(tulb.tulsunDun)}{" "}
                                              дүнтэй сургалтын төлбарийн
                                              мэлээлэл устгахдаа итгэлтэй байна
                                              уу?
                                            </DialogTitle>
                                          </DialogHeader>
                                          <div className="w-full flex justify-evenly mt-2 gap-2">
                                            <DialogTrigger>
                                              <Button
                                                className=""
                                                onClick={() => {
                                                  deleteTulbur(
                                                    student._id,
                                                    student.class_id?._id,
                                                    tulb._id
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
                              );
                            })}
                          </TableBody>
                        </Table>
                      </DialogContent>
                    </Dialog>
                  )}
                  {checkRole(
                    ["admin", "person", "manager", "director"],
                    user?.rols
                  ) && (
                    <Dialog>
                      <DialogTrigger className="">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Button
                                onClick={() => {
                                  getStudentGolch(student._id);
                                  QRCode.toDataURL(
                                    `http://west.edu.mn/description/${student._id}`
                                  ).then(setQr);
                                }}
                                variant="outline"
                                size="icon"
                                className="flex gap-2 size-7"
                              >
                                <PrinterCheck className="size-4 text-orange-600 " />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Тодорхойлолт, чөлөөний хуудас хэвлэх</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90%] overflow-auto">
                        <DialogHeader className="">
                          {/* <p className="uppercase font-medium text-center">
                            {student.firstName} {student.lastName}
                          </p>
                          <p className="text-center uppercase">
                            {student.class_id?.ner}
                          </p> */}
                        </DialogHeader>
                        <RadioGroup
                          className=""
                          onValueChange={(value) => {
                            setTodType(value);
                          }}
                          value={todType}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="tod" />
                            <Label htmlFor="option-one">
                              Сурч буй тодорхойлот
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="golch" />
                            <Label htmlFor="golch">
                              Голч дүнгийн тодорхойлолт
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="chuluu" />
                            <Label htmlFor="option-two">Чөлөөний хуудас</Label>
                          </div>
                        </RadioGroup>
                        {todType === "golch" && (
                          <div className="flex gap-2  items-center">
                            <Select
                              onValueChange={(value) => setGolchData(value)}
                            >
                              <SelectTrigger className="w-auto">
                                <SelectValue placeholder="Хичээлийн жил сонгох " />
                              </SelectTrigger>
                              <SelectContent>
                                {studentGolch?.map((item, index) => {
                                  return (
                                    <SelectItem key={index} value={item}>
                                      {item.yearLesson} хичээлийн жил{" "}
                                      {item.semister}-р улирал
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>

                            <div className="flex items-center space-x-2">
                              <Checkbox
                                onCheckedChange={(value) => {
                                  setGolchType(value);
                                }}
                                checked={golchType}
                                className="size-6"
                                id="terms2"
                              />
                              <label
                                htmlFor="terms2"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Хичээлээр{" "}
                              </label>
                            </div>
                          </div>
                        )}
                        {todType === "chuluu" && (
                          <div className="flex flex-col max-w-sm gap-2">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Эхлэх огноо
                              </Label>
                              <Input
                                type="date"
                                onChange={(e) =>
                                  setchuluudata({
                                    ...chuluudata,
                                    startDate: e.target.value,
                                  })
                                }
                                value={chuluudata.startDate}
                                className="col-span-3 "
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Дуусах огноо
                              </Label>
                              <Input
                                type="date"
                                onChange={(e) =>
                                  setchuluudata({
                                    ...chuluudata,
                                    endDate: e.target.value,
                                  })
                                }
                                value={chuluudata.endDate}
                                className="col-span-3 "
                              />
                            </div>
                          </div>
                        )}

                        <ScrollArea>
                          <TodPrint ref={componentRef} data={student} />
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

                  {checkRole(
                    ["department", "admin", "director"],
                    user?.rols
                  ) && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            onClick={() => {
                              changePassStudent(student._id, student.email);
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
                  )}
                  {checkRole(["admin", "director"], user?.rols) && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            onClick={() => {}}
                            variant="outline"
                            size="icon"
                            className="flex gap-2 size-7"
                          >
                            <GitCompareArrows className="size-4 text-pink-600 " />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Анги хооронл шилжүүлэх</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {checkRole(
                    ["department", "admin", "director"],
                    user?.rols
                  ) && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            onClick={() => {
                              setStudentOne(student);
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
                          <p>Оюутны мэдээлэл засварлах</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {checkRole(["department", "admin"], user?.rols) && (
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
                    </Dialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
