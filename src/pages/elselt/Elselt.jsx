import React, { forwardRef, useEffect, useRef, useState } from "react";
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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import moment from "moment";
import { PlusCircle, Printer, Trash2Icon } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { useCtx } from "../../components/Context/MainContext";
import { useAuth } from "../../components/Context/AuthContext";

const Elselt = () => {
  const { getElselt, elseltState } = useCtx();
  const { yearState } = useAuth();
  const [year, setYear] = useState("2025-2026");

  useEffect(() => {
    getElselt(year);
  }, []);

  const componentRef = useRef(null);

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Ахмадын судалгаа",
  });
  const TPrint = forwardRef((props, ref) => {
    return (
      <div className="p-2 w-full overflow-auto mx-auto" ref={ref}>
        <div className="w-full">
          <img
            src="https://auth.num.edu.mn/oauth2/Image/num-logo.svg"
            alt="logo"
            className="w-20 mx-auto"
          />
          <p className="text-center uppercase font-medium mt-2 text-xs ">
            Монгол улсын их сургууль Баруун бүсийн сургууль
          </p>
        </div>
        <table className="border text-xs w-full mt-1 text-left">
          <tr className="border">
            <th className="border">№</th>
            <th className="border">Баталгаажуулах</th>
            <th className="border">Овог, нэр</th>
            <th className="border">Email, Утас</th>
            <th className="border">ЭЕШ дугаар</th>
            <th className="border">Сургууль</th>
            <th className="border">Хөтөлбөр</th>
            <th className="border">Тайлбар</th>
          </tr>
          <tbody className="">
            {elseltState?.map((row, index) => (
              <tr className="border" key={index}>
                <td className="border">{index + 1}</td>
                <td className="border">
                  {row.status} <br />
                  {moment(row.updatedAt).format("yyyy-MM-DD HH:mm")}
                </td>
                <td className="border">
                  <b>{row.fname}</b> {row.lname}
                </td>
                <td className="border">
                  {row.email} <br /> {row.phone}
                </td>
                {/* <TableCell>{row.gender}</TableCell> */}
                <td className="border">
                  {row.pupil_id} <br />
                  <b>{row.year}</b>
                </td>
                <td className="border">
                  {row.examloc} <br /> {row.surguuli}
                </td>
                <td className="border">
                  {row.program ? (
                    <>
                      <p style={{ color: "#195EC8", fontSize: 12 }}>
                        {row.program?.name}
                      </p>
                      {row.program?.EduLevel}
                    </>
                  ) : (
                    <p style={{ color: "#BD122D", fontSize: 12 }}>
                      Хөтөлбөр сонгоогүй
                    </p>
                  )}
                </td>
                <td className="border">
                  {row.comment}
                  <br />
                  {row?.pathFile && (
                    <a
                      target="_blank"
                      href={`http://west.edu.mn:3000/upload/programfiles/${row?.pathFile}`}
                    >
                      Хавсралт файл татах
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  });
  const [searchTerm, setSearchTerm] = useState("");
  console.log("🚀 ~ Elselt ~ searchTerm:", searchTerm);

  const filteredData = elseltState.filter((item) =>
    Object.values(item).some((value) =>
      String(value || "") // null, undefined → ""
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );
  const grouped = Object.values(
    elseltState.reduce((acc, curr) => {
      const city = curr.examloc;
      if (!acc[city]) {
        acc[city] = {
          city,
          users: [],
          count: 0,
        };
      }
      acc[city].users.push(curr);
      acc[city].count++;
      return acc;
    }, {})
  );
  const grouped2 = Object.values(
    elseltState.reduce((acc, curr) => {
      const city = curr.program ? curr.program?.name : "Хөтөлбөр сонгоогүй";
      if (!acc[city]) {
        acc[city] = {
          city,
          users: [],
          count: 0,
        };
      }
      acc[city].users.push(curr);
      acc[city].count++;
      return acc;
    }, {})
  );
  console.log("🚀 ~ Elselt ~ grouped2:", elseltState);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center uppercase">
          Нийт элсэгчид - {elseltState.length}{" "}
        </CardTitle>
        <div>
          <Select
            onValueChange={(value) => {
              setYear(value);
              getElselt(value);
            }}
            value={year}
          >
            <SelectTrigger className="w-auto">
              <SelectValue placeholder="Хичээлийн жил сонгох" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
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
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="niit" className="w-auto">
          <TabsList>
            <TabsTrigger value="niit">Нийт элсэгчид</TabsTrigger>
            <TabsTrigger value="aimag">Аймгаар</TabsTrigger>
            <TabsTrigger value="program">Хөтөлбөрөөр</TabsTrigger>
          </TabsList>
          <TabsContent value="niit">
            <div className="ml-auto flex items-center gap-2">
              <Input
                type="text"
                placeholder="Хайх..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="my-4 w-auto"
              />
              <Dialog>
                <DialogTrigger className="">
                  <Button className="flex flex-row gap-2" variant="outline">
                    <Printer className="size-4" />
                    Хэвлэх
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-7xl max-h-[90%] overflow-auto">
                  <DialogHeader className=""></DialogHeader>
                  <TPrint ref={componentRef} />
                  <DialogFooter className="sticky bottom-0 ">
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
              <p>
                Баталгаажсан элсэгчид:{" "}
                <span className="font-bold">
                  {
                    elseltState.filter((item) => item.status === "Баталгаажсан")
                      .length
                  }
                </span>
              </p>
            </div>
            <Card className="p-2 w-full">
              <Table className="w-full   text-xs overflow-auto">
                <TableHeader>
                  <TableRow>
                    <TableCell>№</TableCell>
                    <TableCell>Баталгаажуулах</TableCell>
                    <TableCell>Төлөв</TableCell>
                    <TableCell>Овог, нэр</TableCell>
                    <TableCell>Email, Утас</TableCell>
                    <TableCell>ЭЕШ дугаар</TableCell>
                    <TableCell>Сургууль</TableCell>
                    <TableCell>Хөтөлбөр</TableCell>
                    <TableCell>Тайлбар</TableCell>
                    <TableCell>Үйлдэл</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.status}</TableCell>

                      <TableCell>
                        {moment(row.updatedAt).format("yyyy-MM-DD HH:mm")}
                      </TableCell>
                      <TableCell>
                        <b>{row.fname}</b> {row.lname}
                      </TableCell>

                      <TableCell>
                        {row.email} <br /> {row.phone}
                      </TableCell>
                      {/* <TableCell>{row.gender}</TableCell> */}
                      <TableCell>
                        {row.pupil_id} <br />
                        <b>{row.year}</b>
                      </TableCell>

                      <TableCell>
                        <div>
                          {row.examloc} <br />
                          {row.surguuli}
                        </div>
                      </TableCell>
                      <TableCell>
                        {row.program ? (
                          <>
                            <p style={{ color: "#195EC8", fontSize: 12 }}>
                              {row.program?.name}
                            </p>
                            {row.program?.EduLevel}
                          </>
                        ) : (
                          <p style={{ color: "#BD122D", fontSize: 12 }}>
                            Хөтөлбөр сонгоогүй
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        {row.comment}
                        <br />
                        {row?.pathFile && (
                          <a
                            target="_blank"
                            href={`http://west.edu.mn:3000/upload/programfiles/${row?.pathFile}`}
                          >
                            Хавсралт файл татах
                          </a>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
          <TabsContent value="aimag">
            <div className="flex flex-col gap-1 max-w-xs">
              {grouped.map((group, index) => {
                return (
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        className="bg-blue-600 hover:bg-blue-500 w-full justify-between text-white"
                        vatiant="outline"
                        size="sm"
                      >
                        <span>{group.city}</span>
                        <span className="bg-white text-blue-600 rounded-full px-2 py-0.5">
                          {group.count}
                        </span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90%] w-full max-w-7xl overflow-auto">
                      <DialogHeader>
                        <DialogTitle>
                          {" "}
                          {group.city} - {group.count}
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                      <table className="border text-xs w-full mt-1 text-left">
                        <tr className="border">
                          <th className="border">№</th>
                          <th className="border">Баталгаажуулах</th>
                          <th className="border">Овог, нэр</th>
                          <th className="border">Email, Утас</th>
                          <th className="border">ЭЕШ дугаар</th>
                          <th className="border">Сургууль</th>
                          <th className="border">Хөтөлбөр</th>
                          <th className="border">Тайлбар</th>
                        </tr>
                        <tbody className="">
                          {group?.users?.map((row, index) => (
                            <tr className="border" key={index}>
                              <td className="border">{index + 1}</td>
                              <td className="border">
                                {row.status} <br />
                                {moment(row.updatedAt).format(
                                  "yyyy-MM-DD HH:mm"
                                )}
                              </td>
                              <td className="border">
                                <b>{row.fname}</b> {row.lname}
                              </td>
                              <td className="border">
                                {row.email} <br /> {row.phone}
                              </td>
                              {/* <TableCell>{row.gender}</TableCell> */}
                              <td className="border">
                                {row.pupil_id} <br />
                                <b>{row.year}</b>
                              </td>
                              <td className="border">
                                {row.examloc} <br /> {row.surguuli}
                              </td>
                              <td className="border">
                                {row.program ? (
                                  <>
                                    <p
                                      style={{ color: "#195EC8", fontSize: 12 }}
                                    >
                                      {row.program?.name}
                                    </p>
                                    {row.program?.EduLevel}
                                  </>
                                ) : (
                                  <p style={{ color: "#BD122D", fontSize: 12 }}>
                                    Хөтөлбөр сонгоогүй
                                  </p>
                                )}
                              </td>
                              <td className="border">
                                {row.comment}
                                <br />
                                {row?.pathFile && (
                                  <a
                                    target="_blank"
                                    href={`http://west.edu.mn:3000/upload/programfiles/${row?.pathFile}`}
                                  >
                                    Хавсралт файл татах
                                  </a>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </DialogContent>
                  </Dialog>
                );
              })}
            </div>
          </TabsContent>
          <TabsContent value="program">
            <div className="flex flex-col gap-1 max-w-xs">
              {grouped2.map((group, index) => {
                return (
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        className="bg-blue-600 hover:bg-blue-500 w-full justify-between text-white"
                        vatiant="outline"
                        size="sm"
                      >
                        <span>{group.city}</span>
                        <span className="bg-white text-blue-600 rounded-full px-2 py-0.5">
                          {group.count}
                        </span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90%] w-full max-w-7xl overflow-auto">
                      <DialogHeader>
                        <DialogTitle>
                          {" "}
                          {group.city} - {group.count}
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                      <table className="border text-xs w-full mt-1 text-left">
                        <tr className="border">
                          <th className="border">№</th>
                          <th className="border">Баталгаажуулах</th>
                          <th className="border">Овог, нэр</th>
                          <th className="border">Email, Утас</th>
                          <th className="border">ЭЕШ дугаар</th>
                          <th className="border">Сургууль</th>
                          <th className="border">Хөтөлбөр</th>
                          <th className="border">Тайлбар</th>
                        </tr>
                        <tbody className="">
                          {group?.users?.map((row, index) => (
                            <tr className="border" key={index}>
                              <td className="border">{index + 1}</td>
                              <td className="border">
                                {row.status} <br />
                                {moment(row.updatedAt).format(
                                  "yyyy-MM-DD HH:mm"
                                )}
                              </td>
                              <td className="border">
                                <b>{row.fname}</b> {row.lname}
                              </td>
                              <td className="border">
                                {row.email} <br /> {row.phone}
                              </td>
                              {/* <TableCell>{row.gender}</TableCell> */}
                              <td className="border">
                                {row.pupil_id} <br />
                                <b>{row.year}</b>
                              </td>
                              <td className="border">
                                {row.examloc} <br /> {row.surguuli}
                              </td>
                              <td className="border">
                                {row.program ? (
                                  <>
                                    <p
                                      style={{ color: "#195EC8", fontSize: 12 }}
                                    >
                                      {row.program?.name}
                                    </p>
                                    {row.program?.EduLevel}
                                  </>
                                ) : (
                                  <p style={{ color: "#BD122D", fontSize: 12 }}>
                                    Хөтөлбөр сонгоогүй
                                  </p>
                                )}
                              </td>
                              <td className="border">
                                {row.comment}
                                <br />
                                {row?.pathFile && (
                                  <a
                                    target="_blank"
                                    href={`http://west.edu.mn:3000/upload/programfiles/${row?.pathFile}`}
                                  >
                                    Хавсралт файл татах
                                  </a>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </DialogContent>
                  </Dialog>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Elselt;
