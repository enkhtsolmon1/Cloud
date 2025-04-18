import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../components/Context/AuthContext";

import { CalendarFoldIcon, Fingerprint } from "lucide-react";
import TimelyChart from "../chart/TimelyChart";

const TimelyOne = () => {
  const { getTimely, timelyState, user, irlee, yavlaa, teacherOne, device } =
    useAuth();

  const nowDate = moment().tz("Asia/Hovd").format("YYYY-MM-DD");

  const [sar, setSar] = useState(new Date(nowDate).getMonth() + 1);
  const [jil, setJil] = useState(new Date(nowDate).getFullYear());

  const todayIrts = timelyState.find(
    (element) => element.ognoo === moment().tz("Asia/Hovd").format("YYYY-M-D")
  );

  useEffect(() => {
    getTimely(user?.id, sar, jil);
  }, []);

  return (
    <Card className="max-w-xs w-full select-none">
      <CardHeader>
        <CardTitle className="text-center flex gap-2 justify-center text-lg uppercase">
          <span>{nowDate.toString()}</span>
          <span className="capitalize">{todayIrts?.garig}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="w-full flex flex-row justify-around">
          <div className="text-center">
            <p className="text-gray-500 text-xs">Ирсэн цаг</p>
            <p className="font-semibold text-lg">
              {todayIrts ? todayIrts?.irsen : "--:--"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-xs">Явсан цаг</p>
            <p className="font-semibold text-lg">
              {todayIrts ? todayIrts?.yavsan : "--:--"}
            </p>
          </div>
        </div>
        {todayIrts?.irsen === "--:--" || !todayIrts ? (
          <div
            onClick={() => {
              irlee(
                teacherOne?._id,
                teacherOne?.role,
                teacherOne?.butenNer,
                teacherOne?.alba_id?._id,
                teacherOne?.alba_id?.name,
                sar,
                jil
              );
            }}
            className="flex flex-row bg-violet-600 p-4 cursor-pointer items-center justify-center uppercase hover:bg-violet-700 hover:text-white text-white gap-2 w-full mt-2 transition-all duration-300 rounded-lg"
          >
            <Fingerprint className="size-6" /> Ирлээ
          </div>
        ) : (
          <div
            onClick={() => {
              yavlaa(
                teacherOne?._id,
                teacherOne?.role,
                teacherOne?.butenNer,
                teacherOne?.alba_id?._id,
                teacherOne?.alba_id?.name,
                sar,
                jil
              );
            }}
            className="flex flex-row bg-violet-600 p-4 cursor-pointer items-center justify-center uppercase hover:bg-violet-700 hover:text-white text-white gap-2 w-full mt-2 transition-all duration-300 rounded-lg"
          >
            <Fingerprint className="size-7" /> Явлаа
          </div>
        )}
        <div className="w-full flex flex-row text-sm justify-between gap-2 mt-2">
          <Button
            variant="outline"
            className={`text-white ${
              todayIrts?.tuluv === "Хоцорсон"
                ? "bg-rose-600"
                : todayIrts?.tuluv === "Цагтаа ирсэн"
                ? "bg-emerald-600"
                : todayIrts?.tuluv === "Бүртгүүлэх"
                ? "bg-blue-600"
                : todayIrts?.tuluv === "Хэвийн"
                ? "bg-pink-600"
                : "bg-emerald-600"
            }`}
          >
            {todayIrts?.tuluv}
          </Button>
          <Sheet>
            <SheetTrigger className="w-full text-sm hover:bg-gray-200 duration-300 transition-all flex flex-row gap-2 uppercase justify-center items-center border py-1 px-2 rounded-lg">
              <CalendarFoldIcon className="size-4" /> Дэлгэрэнгүй
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Цаг бүртгэл дэлгэрэнгүй </SheetTitle>
                <div className="flex gap-2">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label>Он</Label>
                    <Select
                      onValueChange={(value) => {
                        getTimely(user?.id, sar, value);
                        setJil(value);
                      }}
                      value={jil}
                    >
                      <SelectTrigger className="w-full">
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
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label>Сар</Label>
                    <Select
                      onValueChange={(value) => {
                        getTimely(user?.id, value, jil);
                        setSar(value);
                      }}
                      value={sar}
                    >
                      <SelectTrigger className="w-full">
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
                  </div>
                </div>
              </SheetHeader>

              <ScrollArea className="w-full h-full mt-4">
                <Table className="">
                  <TableHeader>
                    <TableRow className="text-xs">
                      <TableHead className="">Өдөр</TableHead>
                      <TableHead>Ирсэн</TableHead>
                      <TableHead>Явсан</TableHead>
                      <TableHead className="text-right"> Хоцролт</TableHead>
                      <TableHead className="text-right">Төлөв</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timelyState
                      .sort((a, b) => a.udur - b.udur)
                      .map((item) => (
                        <TableRow key={item.id} className="text-xs">
                          <TableCell>
                            {item.sar}-{item.udur}
                          </TableCell>
                          <TableCell>{item.irsen} </TableCell>
                          <TableCell>{item.yavsan} </TableCell>
                          <TableCell className="text-center">
                            {item.hotsrolt}
                          </TableCell>
                          <TableCell
                            className={`text-right ${
                              item.tuluv === "Тооцов"
                                ? "text-emerald-600"
                                : item.tuluv === "Бүртгүүлэх"
                                ? "text-blue-600"
                                : ""
                            } `}
                          >
                            {item.tuluv}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </CardContent>
      <CardFooter>
        <TimelyChart />
      </CardFooter>
    </Card>
  );
};

export default TimelyOne;
