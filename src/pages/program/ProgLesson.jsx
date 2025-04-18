import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  Table,
  TableBody,
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
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "react-router";
import { Checkbox } from "@/components/ui/checkbox";

import { useCtx } from "../../components/Context/MainContext";
import { PenIcon, Trash2Icon } from "lucide-react";

const ProgLesson = () => {
  let { id } = useParams();

  const {
    getProgPlan,
    progPlanState,
    getProgram,
    programOne,
    setProgramOne,
    updateProgPlan,
    deleteLessonProg,
  } = useCtx();

  useEffect(() => {
    getProgram(id);
    getProgPlan(id);
  }, []);
  const [songolt, setsongolt] = useState(true);
  return (
    <Card className="text">
      <CardHeader>
        <CardTitle className="text-center">
          <div className="flex flex-wrap gap-4">
            <p>
              <b>Хөтөлбөрийн нэр:</b> {programOne.name}
            </p>
            <p>
              <b>Хөтөлбөрийн индекс:</b> {programOne.ndx}
            </p>
            <p>
              <b>Мэргэжил :</b> {programOne.mergejil}
            </p>
            <p>
              <b>Боловсролын түвшин:</b> {programOne.EduLevel}
            </p>

            <p>
              <b>Сургалтын хэлбэр:</b> {programOne.form}
            </p>
            <p>
              <b>Суралцах хугацаа:</b> {programOne.learningTime}
            </p>
            <p>
              <b>Нийт багц цаг:</b> {programOne.kreditAll}
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <Table className="h-full max-h-96">
            <TableHeader>
              <TableRow>
                <TableHead>№</TableHead>
                <TableHead>Индекс</TableHead>
                <TableHead>Хичээлийн нэр</TableHead>
                <TableHead>Багц цаг</TableHead>
                <TableHead>Сургалтын цаг</TableHead>
                <TableHead>Ул-Хич-7хо</TableHead>
                <TableHead>Хичээлийн төрөл</TableHead>
                <TableHead>Хичээлийн хэлбэр</TableHead>
                <TableHead>Судлах төрөл</TableHead>
                <TableHead>Шинжлэх ухааны төрөл</TableHead>
                <TableHead>Хичээл сонголтод оруулах </TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {progPlanState
                .sort((a, b) => (a.isNotChoose < b.isNotChoose ? 1 : -1))
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger className="text-white  w-32 rounded-lg ml-2 border bg-blue-600">
                          {row.lessonInstruction[0]?.countStud} -{" "}
                          {row.students?.length} сонгсон
                        </DialogTrigger>
                        <DialogContent className="max-h-[90%] overflow-auto">
                          <DialogHeader>
                            <DialogTitle className="text-center">
                              {row.lesson_id?.name} <br />
                              Сонгсон оюутны жагсаалт
                            </DialogTitle>
                          </DialogHeader>

                          <table className="text-left border text-xs">
                            <tr>
                              <th className="border p-1">№</th>
                              <th className="border p-1">Нэр</th>
                              <th className="border p-1">Анги</th>
                              <th className="border p-1"></th>
                            </tr>
                            <tbody>
                              {row.students?.map((st, index) => {
                                return (
                                  <tr className="">
                                    <td className="border text-center">
                                      {index + 1}
                                    </td>
                                    <td className="p-1 border">
                                      {st.firstName} {st.lastName}
                                    </td>
                                    <td className="p-1 border">
                                      {st.className}
                                    </td>
                                    <td>
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
                                                  deleteLessonProg(
                                                    row._id,
                                                    {
                                                      _id: st?._id,
                                                    },
                                                    id
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
                                                variant="outline"
                                                size="sm"
                                              >
                                                Үгүй
                                              </Button>
                                            </DialogTrigger>
                                          </div>
                                        </DialogContent>
                                      </Dialog>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell>{row.programLesson_id.lessonNdx}</TableCell>
                    <TableCell>{row.lesson_id?.name}</TableCell>
                    <TableCell>{row.programLesson_id.credit} кр</TableCell>
                    <TableCell>{row.timeStudy}</TableCell>
                    <TableCell>
                      {row.chooseSeminar} /{row.weekStuty}/
                    </TableCell>
                    <TableCell>
                      {row.programLesson_id.lessonClassification}
                    </TableCell>
                    <TableCell>{row.programLesson_id.lessonType}</TableCell>
                    <TableCell>{row.typeStudy}</TableCell>
                    <TableCell>{row.typeScience}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          onCheckedChange={(value) => {
                            updateProgPlan({
                              _id: row._id,
                              isNotChoose: value,
                            });
                          }}
                          checked={row.isNotChoose}
                          id={row._id}
                        />
                        <label
                          htmlFor={row._id}
                          className="text-sm  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {row.isNotChoose ? "Тийм" : "Үгүй"}
                        </label>
                      </div>
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Button
                              onClick={() => {}}
                              variant="outline"
                              size="icon"
                              className="flex gap-2 size-7"
                            >
                              <PenIcon className="size-4 text-blue-600 " />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Багшийн мэдээлэл засварлах</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
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
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ProgLesson;
