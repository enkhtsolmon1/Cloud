import React, { useState } from "react";
import { useAuth } from "../components/Context/AuthContext";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Pencil, PencilLine, Trash2Icon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
const Department = () => {
  const { depState, getDepartment, updateDep, sheepOpen, setSheetOpen } =
    useAuth();
  const [data, setdata] = useState({
    name: "",
    name_eng: "",
    manager: "",
  });

  return (
    <Card>
      <Dialog open={sheepOpen} onOpenChange={() => setSheetOpen(false)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Дэлгэрэнгүй мэдээлэл</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Тэнхимйн нэр
              </Label>
              <Input
                onChange={(e) =>
                  setdata({
                    ...data,
                    name: e.target.value,
                  })
                }
                value={data.name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Англи нэр
              </Label>
              <Input
                onChange={(e) =>
                  setdata({
                    ...data,
                    name_eng: e.target.value,
                  })
                }
                value={data.name_eng}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Эрхлэгч
              </Label>
              <Input
                onChange={(e) =>
                  setdata({
                    ...data,
                    manager: e.target.value,
                  })
                }
                value={data.manager}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogTrigger>
              <Button
                onClick={() => {
                  updateDep(data);
                }}
              >
                Хадгалах
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <CardHeader>
        <CardTitle>Тэнхимүүд</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="w-full overflow-auto">
          <TableHeader>
            <TableRow>
              <TableHead>№</TableHead>
              <TableHead>Нэр</TableHead>
              <TableHead>Англи нэр</TableHead>
              <TableHead>Эрхлэгч</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {depState.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.name_eng}</TableCell>
                  <TableCell>{item.manager}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      onClick={() => {
                        setdata(item);
                        setSheetOpen(true);
                      }}
                      variant="outline"
                      size="icon"
                      className="flex gap-2 size-7"
                    >
                      <Pencil className="size-4 text-blue-600 " />
                    </Button>
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
                                // deleteEmp(item.id);
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

export default Department;
