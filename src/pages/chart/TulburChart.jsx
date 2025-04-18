import React, { useEffect } from "react";
import { useCtx } from "../../components/Context/MainContext";
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const TulburChart = () => {
  const { getTulbur, getTulburDep, tulburSate, tulburDepSate } = useCtx();
  console.log("🚀 ~ TulburChart ~ tulburSate:", tulburSate);
  useEffect(() => {
    getTulbur();
  }, []);
  function formatMoney(num) {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center uppercase">
          Төлбөрийн дэлгэрэнгүй тайлан
        </CardTitle>
        {/* <div>
          Нийт төлөх: {formatMoney(tulburDepSate.niitTulbulZohih)} ₮,{" "}
          Нийт төлсөн: {formatMoney(tulburDepSate.niitTulsun)} ₮,{" "}
          Нийт үлдэгдэл: {formatMoney(tulburDepSate.niitUldegdel)} ₮
        </div> */}
      </CardHeader>
      <CardContent>
        <Table className="text-xs">
          <TableHeader>
            <TableRow>
              <TableCell></TableCell>
              <TableCell
                className="text-center font-bold bg-blue-600 text-white border-r border-white"
                colSpan={3}
              >
                1-р курс
              </TableCell>
              <TableCell
                className="text-center font-bold bg-blue-600 text-white border-r border-white"
                colSpan={3}
              >
                2-р курс
              </TableCell>
              <TableCell
                className="text-center font-bold bg-blue-600 text-white border-r border-white"
                colSpan={3}
              >
                3-р курс
              </TableCell>
              <TableCell
                className="text-center font-bold bg-blue-600 text-white border-r border-white"
                colSpan={3}
              >
                4-р курс
              </TableCell>
              <TableCell
                className="text-center font-bold bg-blue-600 text-white border-r border-white"
                colSpan={3}
              >
                Нийт
              </TableCell>
            </TableRow>
            <TableRow className="font-bold">
              <TableCell>Тэнхимийн нэр</TableCell>
              <TableCell>Төлөх</TableCell>
              <TableCell>Төлсөн</TableCell>
              <TableCell>Үлдэгдэл</TableCell>
              <TableCell>Төлөх</TableCell>
              <TableCell>Төлсөн</TableCell>
              <TableCell>Үлдэгдэл</TableCell>
              <TableCell>Төлөх</TableCell>
              <TableCell>Төлсөн</TableCell>
              <TableCell>Үлдэгдэл</TableCell>
              <TableCell>Төлөх</TableCell>
              <TableCell>Төлсөн</TableCell>
              <TableCell>Үлдэгдэл</TableCell>
              <TableCell>Төлөх</TableCell>
              <TableCell>Төлсөн</TableCell>
              <TableCell>Үлдэгдэл</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tulburSate.content.map((row, index) => (
              <TableRow
                className="odd:bg-gray-100 odd:dark:text-black"
                key={index}
              >
                <TableCell className="font-semibold">
                  {row.department_name}
                </TableCell>
                <TableCell>{formatMoney(row.tulvulZohihStud1)}</TableCell>
                <TableCell>{formatMoney(row.tulsun1)}</TableCell>
                <TableCell>{formatMoney(row.uld1)}</TableCell>
                <TableCell>{formatMoney(row.tulvulZohihStud2)}</TableCell>
                <TableCell>{formatMoney(row.tulsun2)}</TableCell>
                <TableCell>{formatMoney(row.uld2)}</TableCell>
                <TableCell>{formatMoney(row.tulvulZohihStud3)}</TableCell>
                <TableCell>{formatMoney(row.tulsun3)}</TableCell>
                <TableCell>{formatMoney(row.uld3)}</TableCell>
                <TableCell>{formatMoney(row.tulvulZohihStud4)}</TableCell>
                <TableCell>{formatMoney(row.tulsun4)}</TableCell>
                <TableCell>{formatMoney(row.uld4)}</TableCell>
                <TableCell>{formatMoney(row.niitTulbulZohih)}</TableCell>
                <TableCell>{formatMoney(row.niitTulsun)}</TableCell>
                <TableCell>{formatMoney(row.niitUldegdel)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TulburChart;
