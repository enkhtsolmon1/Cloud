import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment-timezone";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TimelyChart() {
  const nowDate = moment().tz("Asia/Hovd").format("YYYY-M-D");

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://west.edu.mn:3000/api/v1/timely?ognoo=${nowDate}&limit=500`)
      .then((response) => {
        setChartData(response.data.timely);
      })
      .catch((error) => {
        console.error("Алдаа гарлаа:", error);
      });
  }, []);

  var teach = {};
  var techData = chartData.reduce(function (r, o) {
    var key = o.tuluv;
    if (!teach[key]) {
      teach[key] = Object.assign({
        name: o.tuluv,
        count: 1,
        teachers: [{ ...o }],
      });
      r.push(teach[key]);
    } else {
      teach[key].count += 1;
      teach[key].teachers.push(o);
    }
    return r;
  }, []);
  function formatMinutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  }
  return (
    <div className="flex flex-wrap justify-center gap-2 w-full">
      {techData.map((el, index) => {
        return (
          <Dialog>
            <DialogTrigger>
              <div
                key={index}
                className={`p-2 text-center  border cursor-pointer text-white rounded-lg flex flex-col items-center ${
                  el.name === "Хоцорсон"
                    ? "bg-rose-600"
                    : el.name === "Цагтаа ирсэн"
                    ? "bg-emerald-600"
                    : el.name === "Бүртгүүлэх"
                    ? "bg-blue-600"
                    : el.name === "Хэвийн"
                    ? "bg-pink-600"
                    : "bg-emerald-600"
                }`}
              >
                <p className="text-lg">{el.count}</p>
                <p className="uppercase text-[10px]">
                  {el.name === "Бүртгүүлэх" ? "Бүргүүлээгүй" : el.name}
                </p>
              </div>
            </DialogTrigger>
            <DialogContent className="h-full max-h-[80%]">
              <Table className="overflow-auto w-full">
                <TableHeader>
                  <TableRow className="text-xs">
                    <TableHead className="">Нэр</TableHead>
                    <TableHead>Ирсэн</TableHead>
                    <TableHead>Явсан</TableHead>
                    <TableHead className="text-right">Тасалсан цаг</TableHead>
                    <TableHead className="">Төлөв</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {el.teachers
                    ?.sort((a, b) => a.udur - b.udur)
                    .map((item) => (
                      <TableRow key={item.id} className="text-xs">
                        <TableCell>{item.owner_name}</TableCell>
                        <TableCell>{item.irsen} </TableCell>
                        <TableCell>{item.yavsan} </TableCell>
                        <TableCell className="text-center">
                          {formatMinutesToTime(item.hotsrolt)}
                        </TableCell>
                        <TableCell>{item.tuluv}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
}
