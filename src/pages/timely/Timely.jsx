import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import React, { useEffect, useRef, useState } from "react";
import moment, { months } from "moment-timezone";
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  LoaderCircle,
  PrinterIcon,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "../../components/Context/AuthContext";

import { useReactToPrint } from "react-to-print";

import { useCtx } from "../../components/Context/MainContext";
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
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
// import TimePicker from "./TimePicker";

const Timely = () => {
  const componentRef = useRef(null);

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Цагийн бүртгэл хэвлэх",
  });

  const nowDate = moment().tz("Asia/Hovd").format("YYYY-MM-DD");
  const startDate = moment()
    .tz("Asia/Hovd")
    .startOf("month")
    .format("YYYY-MM-DD");

  const {
    albaState,
    depState,
    user,
    teacherState,
    getTimely,
    timelyState,
    editTimely,
    getDepTeachers,
    checkRole,
    addTimely,
  } = useAuth();
  const { employeeState, tReportState, getFindTimely, loading } = useCtx();

  const [data, setdata] = useState({});
  console.log(data);
  const [sar, setSar] = useState(new Date(nowDate).getMonth() + 1);
  const [jil, setJil] = useState(new Date(nowDate).getFullYear());
  const [userOne, setuserOne] = useState({});
  const [date, setDate] = React.useState({
    from: startDate,
    to: nowDate,
  });
  console.log(userOne);
  const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
      <div className="p-4 max-w-[297mm] w-full overflow-auto mx-auto" ref={ref}>
        <div className="w-full">
          <p className="text-center uppercase font-medium">
            МУИС-ийн Баруун бүсийн сургууль
          </p>
          <p className="text-center uppercase font-medium">
            Ажлын цагийн тооцоо
          </p>
          <p className="text-xs text-right uppercase">{data.name} </p>
          <span className="text-xs">
            {date.from} - {date.to}
          </span>
        </div>
        <table className="border border-collapse w-full mt-1">
          <tbody className="text-xs text-center ">
            <tr className="font-semibold">
              <td className="border p-1" rowSpan={4}></td>
              <td className="border p-1" rowSpan={4}>
                Овог нэр
              </td>
              <td
                className="border p-1 [writing-mode:vertical-rl] rotate-180"
                rowSpan={4}
              >
                Хуанлийн өдөр
              </td>
              <td
                className="border p-1 [writing-mode:vertical-rl] rotate-180"
                rowSpan={4}
              >
                Амралтын өдөр
              </td>
              <td
                className="border p-1 [writing-mode:vertical-rl] rotate-180"
                rowSpan={4}
              >
                Ээлжийн амралтын хүн өдөр
              </td>
              <td className="border p-1" rowSpan={2} colSpan={2}>
                Ажиллавал <br />
                зохих
              </td>
              <td className="border p-1" colSpan={7}>
                Ажилласан
              </td>
              <td className="border p-1" colSpan={12}>
                Ажиллаагүй
              </td>
            </tr>
            {/* row-2 */}
            <tr className="font-semibold">
              <td className="border p-1" colSpan={2}>
                Бүгд
              </td>
              <td className="border p-1">Үүнээс</td>
              <td className="border p-1" colSpan={4}>
                Илүү цаг
              </td>
              <td className="border p-1" colSpan={2} rowSpan={2}>
                Бүгд
              </td>
              <td className="border p-1" colSpan={11}>
                үүнээс
              </td>
            </tr>
            {/* row-3 */}
            <tr className="font-semibold">
              <td
                className="border p-1 [writing-mode:vertical-rl] rotate-180"
                rowSpan={2}
              >
                Өдөр
              </td>
              <td
                className="border p-1 [writing-mode:vertical-rl] rotate-180"
                rowSpan={2}
              >
                Цаг
              </td>
              <td
                className="border p-1 [writing-mode:vertical-rl] rotate-180"
                rowSpan={2}
              >
                Өдөр
              </td>
              <td
                className="border p-1 [writing-mode:vertical-rl] rotate-180"
                rowSpan={2}
              >
                Цаг
              </td>
              <td
                className="border p-1 [writing-mode:vertical-rl] rotate-180"
                rowSpan={2}
              >
                Шөнө ажилласан
              </td>
              <td
                className="border p-1 [writing-mode:vertical-rl] rotate-180"
                rowSpan={2}
              >
                Бүгд
              </td>
              <td
                className="border p-1 [writing-mode:vertical-rl] rotate-180"
                rowSpan={2}
              >
                Амралт, баяр ёслол
              </td>
              <td
                className="border p-1 [writing-mode:vertical-rl] rotate-180"
                rowSpan={2}
              >
                Хийсэнээр цалинжих
              </td>
              <td
                className="border p-1 [writing-mode:vertical-rl] rotate-180"
                rowSpan={2}
              >
                цагаар цалинжих
              </td>
              <td
                className="border p-1 [writing-mode:vertical-rl] rotate-180"
                colSpan={2}
              >
                Өвчтэй
              </td>
              <td
                className="border p-1 [writing-mode:vertical-rl] rotate-180"
                colSpan={2}
              >
                Цалинтай чөлөө
              </td>
              <td
                className="border p-1 [writing-mode:vertical-rl] rotate-180"
                colSpan={2}
              >
                Цалингүй чөлөө
              </td>
              <td className="border p-1" colSpan={2}>
                Тасалсан
              </td>
              <td
                className="border p-1 [writing-mode:vertical-rl] rotate-180"
                rowSpan={2}
              >
                Хөнгөлөлттэй цаг
              </td>
            </tr>
            {/* row-4 */}
            <tr className="font-semibold">
              <td className="border p-1 [writing-mode:vertical-rl] rotate-180">
                Өдөр
              </td>
              <td className="border p-1 [writing-mode:vertical-rl] rotate-180">
                Цаг
              </td>
              <td className="border p-1 [writing-mode:vertical-rl] rotate-180">
                Өдөр
              </td>
              <td className="border p-1 [writing-mode:vertical-rl] rotate-180">
                Цаг
              </td>
              <td className="border p-1 [writing-mode:vertical-rl] rotate-180">
                Өдөр
              </td>
              <td className="border p-1 [writing-mode:vertical-rl] rotate-180">
                Цаг
              </td>
              <td className="border p-1 [writing-mode:vertical-rl] rotate-180">
                Өдөр
              </td>
              <td className="border p-1 [writing-mode:vertical-rl] rotate-180">
                Цаг
              </td>
              <td className="border p-1 [writing-mode:vertical-rl] rotate-180">
                өдөр
              </td>
              <td className="border p-1 [writing-mode:vertical-rl] rotate-180">
                Цаг
              </td>
            </tr>
            {!loading ? (
              tReportState?.content?.map((el, index) => {
                return (
                  <tr key={index}>
                    <td className="border p-1">{index + 1}</td>
                    <td className="border p-1 text-left ">{el.owner_name}</td>
                    <td className="border p-1">{el.info.huanli_udur}</td>
                    <td className="border p-1">{el.info?.weekend}</td>
                    <td className="border p-1">0</td>
                    <td className="border p-1">{el.info?.workDay}</td>
                    <td className="border p-1">{el.info?.workTime}</td>
                    <td className="border p-1">{el.info?.WorkedDay}</td>
                    <td className="border p-1">{el.info.WorkedTime}</td>
                    <td className="border p-1">0</td>
                    <td className="border p-1">0</td>
                    <td className="border p-1">0</td>
                    <td className="border p-1">0</td>
                    <td className="border p-1">0</td>
                    <td className="border p-1">{el.info?.noWorkedDay}</td>
                    <td className="border p-1">{el.info?.noWorkedTime}</td>
                    <td className="border p-1">{el.info?.tuluvUvchtei}</td>
                    <td className="border p-1">{el.info?.uvchteiTime}</td>
                    <td className="border p-1">
                      {el.info?.tuluvTsalintaiChuluu}
                    </td>
                    <td className="border p-1">
                      {el.info?.tsalintaiChuluuTime}
                    </td>
                    <td className="border p-1">{el.info.tuluvChuluutei}</td>
                    <td className="border p-1">{el.info?.chuluuteiTime}</td>
                    <td className="border p-1">{el.info?.tuluvTasalsan}</td>
                    <td className="border p-1">{el.info?.tasalsanTime}</td>
                    <td className="border p-1"></td>
                  </tr>
                );
              })
            ) : (
              <tr className="text-center">
                <td colSpan={30} className="border p-8">
                  <LoaderCircle className="animate-spin mb-4 size-6 mx-auto" />
                  Цагийн тооцоо татаж байна.Түр хүлээнэ үү...
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <footer className="mt-4 text-xs space-y-2">
          <p>
            Тооцоо гаргасан ........................... {"Б.Нордод"}
            {/* {checkRole(["alba", "department"], user?.rols) && user?.department?.manager} */}
            {/* {user?.role === "person" && (
              <span>
                {data?.darga}
                {data?.manager}
              </span>
            )} */}
          </p>
          <p>
            Хянасан .............................................{" "}
            {/* {data?.role === "department" ? "Э.Наранхүү" : data?.manager}{" "} */}
            {data?.manager}
            {/* {user?.role === "department" && "Э.Наранхүү"}
            {user?.role === "alba" && "Ц.Пүрэвсүрэн"} */}
          </p>
        </footer>
      </div>
    );
  });
  useEffect(() => {
    if (checkRole(["department", "alba"], user?.rols)) {
      getDepTeachers(user?.department?._id);
    }
    // getDepTeachers(user?.id);
  }, []);

  return (
    <div className="">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Цаг бүртгэл</CardTitle>
        </CardHeader>
        <CardContent className="">
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
            <Select
              onValueChange={(value) => {
                setuserOne(value);
                getTimely(value._id, sar, jil);
              }}
            >
              <SelectTrigger className="w-auto min-w-24">
                <SelectValue placeholder="Багш,ажилтан сонгох" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Багш,ажилтан</SelectLabel>
                  {teacherState
                    // .filter((fi) => fi.statusTeacher === "Ажиллаж байгаа")
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

            <Select
              onValueChange={(value) => {
                setJil(value);
                getTimely(userOne._id, sar, value);
              }}
              value={jil}
            >
              <SelectTrigger className="w-auto">
                <SelectValue placeholder="Он" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[2025, 2024, 2023].map((item, index) => {
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
                setSar(value);
                getTimely(user._id, value, jil);
              }}
              value={sar}
            >
              <SelectTrigger className="w-auto">
                <SelectValue placeholder="Сар" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
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
            <Button
              onClick={() => {
                addTimely({
                  sar,
                  office_role: userOne?.department?.role,
                  office_id: userOne.alba_id?._id,
                  office_name: userOne?.alba_id?.name,
                  owner_role: userOne.role,
                  owner_id: userOne._id,
                  owner_name: userOne.butenNer,
                  jil,
                });
              }}
            >
              Татах
            </Button>

            {/* ================================= */}
            <Dialog className="w-full">
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    getFindTimely(
                      checkRole(["admin", "person"], user?.rols)
                        ? data.id
                        : user?.department._id,
                      date.from,
                      date.to
                    );
                    // getFindTimely(user?.id, date.from, date.to);
                  }}
                  variant="outline"
                  className="flex flex-row gap-2"
                >
                  <PrinterIcon className="size-4" />
                  Ажлын цагийн тооцоо
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-7xl  h-[95%]">
                <DialogHeader>
                  <div className="flex flex-wrap justify-start items-center gap-2">
                    {checkRole(["admin", "person"], user?.rols) && (
                      <Select
                        onValueChange={(value) => {
                          getFindTimely(value._id, date.from, date.to);
                          setdata(value);
                        }}
                      >
                        <SelectTrigger className="w-auto">
                          <SelectValue placeholder="Алба, нэгж сонгох" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Алба, нэгж</SelectLabel>
                            {albaState.concat(depState).map((item, index) => {
                              return (
                                <SelectItem key={index} value={item}>
                                  {item.name}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                    <Dialog>
                      <DialogTrigger className="">
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon />
                          {date?.from ? (
                            <p className="flex gap-2">
                              <span>{date.from}</span> ээс
                              <span>{date.to}</span>
                            </p>
                          ) : (
                            <span>Огноо сонгох</span>
                          )}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-xl">
                        <DialogHeader></DialogHeader>
                        {/* <Calendar
                          initialFocus
                          mode="range"
                          selected={date}
                          onSelect={(value) => {
                            setDate({
                              from: moment(value.from)
                                .tz("Asia/Hovd")
                                .format("YYYY-MM-DD"),
                              to: moment(value.to)
                                .tz("Asia/Hovd")
                                .format("YYYY-MM-DD"),
                            });
                          }}
                          numberOfMonths={2}
                        /> */}
                        <div className="flex w-auto mx-auto">
                          <div className="">
                            <span className="text-sm font-medium">
                              Эхлэх огноо
                            </span>
                            <Calendar
                              mode="single"
                              selected={new Date(date?.from)}
                              onSelect={(value) => {
                                setDate({
                                  ...date,
                                  from: moment(value).format("YYYY-MM-DD"),
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
                              selected={new Date(date?.to)}
                              onSelect={(value) => {
                                setDate({
                                  ...date,
                                  to: moment(value).format("YYYY-MM-DD"),
                                });
                              }}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogTrigger>
                            <Button
                              variant="outline"
                              onClick={() => {
                                getFindTimely(
                                  checkRole(["admin", "person"], user?.rols)
                                    ? data.id
                                    : user?.department._id,
                                  date.from,
                                  date.to
                                );
                              }}
                              className="flex flex-row gap-2"
                            >
                              <Search className="size-4" />
                              Хайх
                            </Button>
                          </DialogTrigger>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* <DialogTitle>Ажлын цагийн тооцоо</DialogTitle> */}
                </DialogHeader>
                <ComponentToPrint ref={componentRef} />
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Өдөр</TableHead>
                <TableHead className="">Ирсэн | Явсан</TableHead>
                <TableHead className="">Төлөв</TableHead>
                <TableHead className="text-right">Үйлдэл</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timelyState
                .sort((a, b) => a.udur - b.udur)
                .map((row) => (
                  <TableRow key={row._id}>
                    <TableCell className="">
                      {row.sar}-{row.udur} <br />
                      <b>{row.garig}</b>
                    </TableCell>
                    <TableCell className="flex gap-4">
                      <p>
                        <span className="text-gray-500">{row.ireh}</span> <br />{" "}
                        <b>{row.irsen}</b>
                      </p>
                      |
                      <p>
                        <span className="text-gray-500">{row.yavah}</span>{" "}
                        <br /> <b>{row.yavsan}</b>
                      </p>
                    </TableCell>

                    <TableCell className="">
                      {checkRole(["admin", "person"], user?.rols) ? (
                        <Select
                          onValueChange={(value) => {
                            editTimely({
                              _id: row._id,
                              tuluv: value,
                              owner_id: row.owner_id,
                              jil: row.jil,
                              sar: row.sar,
                              ognoo: row.ognoo,
                            });
                          }}
                          className="mx-auto"
                          value={row.tuluv}
                        >
                          <SelectTrigger className="w-auto">
                            <SelectValue placeholder="Select a fruit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {[
                                "Тооцов",
                                "Цалинтай чөлөө",
                                "Чөлөөтэй",
                                "Өвчтэй",
                                "Тасалсан",
                                "Бүртгүүлэх",
                                // "Тасалсан",
                                // "Жирэмсний амралттай",
                                "Хоцорсон",
                                "Хэвийн",
                                "Цагтаа ирсэн",
                              ].map((el, index) => {
                                return (
                                  <SelectItem
                                    disabled={[
                                      "Хоцорсон",
                                      "Хэвийн",
                                      "Цагтаа ирсэн",
                                    ].includes(el)}
                                    key={index}
                                    value={el}
                                  >
                                    {el}
                                  </SelectItem>
                                );
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p>{row.tuluv}</p>
                      )}
                    </TableCell>
                    <TableCell className="flex justify-end gap-2">
                      <input
                        id="timePicker"
                        type="time"
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={row.ireh}
                        onChange={(e) => {
                          editTimely({
                            _id: row._id,
                            ireh: e.target.value,
                            owner_id: row.owner_id,
                            sar: row.sar,
                            jil: row.jil,
                          });
                        }}
                        step="900" // 15-minute intervals
                      />
                      <input
                        id="timePicker"
                        type="time"
                        className="border cursor-pointer border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                        value={row.yavah}
                        onChange={(e) => {
                          editTimely({
                            _id: row._id,
                            yavah: e.target.value,
                            owner_id: row.owner_id,
                            sar: row.sar,
                            jil: row.jil,
                          });
                        }}
                        step="900" // 15-minute intervals
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Timely;
