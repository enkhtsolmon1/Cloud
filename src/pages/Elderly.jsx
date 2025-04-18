import React, { forwardRef, useRef, useState } from "react";
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
import { useCtx } from "../components/Context/MainContext";
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

import { PlusCircle, Printer, Trash2Icon } from "lucide-react";
import { useReactToPrint } from "react-to-print";

const Elderly = () => {
  const { employeeState, addEmp, deleteEmp } = useCtx();
  const [employOne, setEmployOne] = useState({
    lastname: "",
    firstname: "",
    regnum: "",
    email: "",
    password: "",
    role: "employee",
    phone1: "",
    bank: "",
    bank_dugaar: "",
    tetgever_date: "",
    tetgever_dugaar: "",
  });
  const componentRef = useRef(null);

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Ахмадын судалгаа",
  });
  const TPrint = forwardRef((props, ref) => {
    return (
      <div className="p-2 max-w-[297mm] w-full overflow-auto mx-auto" ref={ref}>
        <div className="w-full">
          <img
            src="https://auth.num.edu.mn/oauth2/Image/num-logo.svg"
            alt="logo"
            className="w-20 mx-auto"
          />
          <p className="text-center uppercase font-medium mt-2 text-xs ">
            Монгол улсын их сургууль Баруун бүсийн сургууль
          </p>
          <div className="flex justify-between mt-2 ">
            <p> Ахмадын судалгаа</p>
          </div>
        </div>
        <table className="border text-xs w-full mt-1">
          <tr>
            <th className="border p-1">№</th>
            <th className="border p-1">Овог нэр</th>
            <th className="border p-1">Нас</th>
            <th className="border p-1">Регистрийн дугаар</th>
            <th className="border p-1">Утас</th>
            <th className="border p-1">Банк</th>
            <th className="border p-1">Дансны дугаар</th>
            <th className="border p-1">Тушаалын огноо</th>
            <th className="border p-1">Тушаалын дугаар</th>
          </tr>
          <tbody className="text-center">
            {employeeState.map((item, index) => {
              return (
                <tr className="border">
                  <td className="border p-1 text-center">{index + 1}</td>
                  <td className="border p-1 text-left">
                    <span className="font-bold">{item.firstname}</span>{" "}
                    {item.lastname}
                  </td>
                  <td className="border p-1">{item.age}</td>
                  <td className="border p-1">{item.regnum}</td>
                  <td className="border p-1">{item.phone1}</td>
                  <td className="border p-1">{item.bank} </td>
                  <td className="border p-1">{item.bank_dugaar}</td>
                  <td className="border p-1">{item.tetgever_date} </td>
                  <td>{item.tetgever_dugaar}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Ахмадуудын судалгаа</CardTitle>
        <div className="ml-auto flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEmployOne({});
                  //   setSheetOpen(true);
                }}
                variant="outline"
                className="gap-1"
              >
                <PlusCircle className="size-4" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Бүртгэх
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Ахмадын мэдээлэл</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Эцэг эхийн нэр
                  </Label>
                  <Input
                    onChange={(e) =>
                      setEmployOne({ ...employOne, lastname: e.target.value })
                    }
                    value={employOne.lastname}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Нэр
                  </Label>
                  <Input
                    onChange={(e) =>
                      setEmployOne({ ...employOne, firstname: e.target.value })
                    }
                    value={employOne.firstname}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Регистрийн дугаар
                  </Label>
                  <Input
                    onChange={(e) =>
                      setEmployOne({ ...employOne, regnum: e.target.value })
                    }
                    value={employOne.regnum}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Утасны дугаар
                  </Label>
                  <Input
                    onChange={(e) =>
                      setEmployOne({ ...employOne, phone1: e.target.value })
                    }
                    value={employOne.phone1}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Email
                  </Label>
                  <Input
                    onChange={(e) =>
                      setEmployOne({ ...employOne, email: e.target.value })
                    }
                    value={employOne.email}
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
                      setEmployOne({
                        ...employOne,
                        tetgever_date: e.target.value,
                      })
                    }
                    value={employOne.tetgever_date}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Тушаалын дугаар
                  </Label>
                  <Input
                    onChange={(e) =>
                      setEmployOne({
                        ...employOne,
                        tetgever_dugaar: e.target.value,
                      })
                    }
                    value={employOne.tetgever_dugaar}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Банк
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setEmployOne({ ...employOne, bank: value })
                    }
                    value={employOne.bank}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Банк сонгох" />
                    </SelectTrigger>
                    <SelectContent className="">
                      <SelectGroup>
                        {["Хаан", "Голомт", "Төрийн", "Хас"].map(
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
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Дансны дугаар
                  </Label>
                  <Input
                    type="number"
                    onChange={(e) =>
                      setEmployOne({
                        ...employOne,
                        bank_dugaar: e.target.value,
                      })
                    }
                    value={employOne.bank_dugaar}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogTrigger>
                  <Button
                    onClick={() => {
                      addEmp(employOne);
                    }}
                  >
                    Хадгалах
                  </Button>
                </DialogTrigger>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
        </div>
      </CardHeader>
      <CardContent>
        <Table className="w-full overflow-auto">
          <TableHeader>
            <TableRow>
              <TableHead>№</TableHead>
              <TableHead>Овог нэр</TableHead>
              <TableHead>Нас</TableHead>
              <TableHead>Регистрийн дугаар</TableHead>
              <TableHead>Дансны дугаар</TableHead>
              <TableHead>Утасны дугаар</TableHead>
              <TableHead>Тушаалын огноо</TableHead>
              <TableHead>Тушаалын дугаар</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employeeState.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {item.firstname}
                    <span className="text-gray-400 ml-1">{item.lastname}</span>
                  </TableCell>
                  <TableCell>{item.age}</TableCell>
                  <TableCell>{item.regnum}</TableCell>
                  <TableCell>
                    <span className="font-bold">{item.bank}:</span>{" "}
                    {item.bank_dugaar}
                  </TableCell>
                  <TableCell>{item.phone1}</TableCell>
                  <TableCell> {item.tetgever_date}</TableCell>
                  <TableCell>{item.tetgever_dugaar}</TableCell>
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
                            <h1>Устгахдаа итгэлтэй байна уу?</h1>
                          </DialogTitle>
                        </DialogHeader>
                        <div className="w-full flex justify-evenly mt-2 gap-2">
                          <DialogTrigger>
                            <Button
                              className=""
                              onClick={() => {
                                deleteEmp(item.id);
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
      </CardContent>
    </Card>
  );
};

export default Elderly;
