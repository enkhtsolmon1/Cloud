import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "../Context/AuthContext";
import moment from "moment-timezone";
import { BadgeCheck } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const LoginHistory = () => {
  const { teacherOne } = useAuth();
  console.log("🚀 ~ LoginHistory ~ teacherOne:", teacherOne);
  return (
    <Card>
      <CardHeader>
        <CardTitle> Хандалтын түүх </CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="text-xs">
          <TableHeader>
            <TableRow>
              <TableHead className="">Огноо</TableHead>
              <TableHead>IP хаяг</TableHead>
              <TableHead>Төхөөрөмж</TableHead>
              <TableHead>Төхөөрөмжийн мэдээлэл</TableHead>
              <TableHead>Хандсан тоо</TableHead>
              <TableHead>Зөвшөөрөгдсөн эсэх</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teacherOne?.loginHistory?.map((item, index) => {
              return (
                <TableRow>
                  <TableCell className="">
                    {moment(item.lastUsedAt).format("YYYY-MM-DD HH:MM")}
                  </TableCell>
                  <TableCell>{item.ipAddress}</TableCell>
                  <TableCell>{item.deviceType}</TableCell>
                  <TableCell>{item.deviceName}</TableCell>
                  <TableCell>{item.accessCount}</TableCell>
                  <TableCell>
                    {item.deviceName === teacherOne.mac
                      ? "Баталгаажсан"
                      : "Баталгаажаагүй"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LoginHistory;
