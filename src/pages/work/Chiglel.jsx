import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Checkbox } from "@/components/ui/checkbox";
import { useCtx } from "../../components/Context/MainContext";
import { Trash2Icon } from "lucide-react";

const Chiglel = () => {
  const {
    workState,
    ajilState,
    getAjil,
    getWork,
    getAjilTeacher,
    addAjil,
    updateAjil,
    deleteAjil,
    ajilOpen,
    setAjilOpen,
    workOpen,
    setWorkOpen,
    addWork,
    updateWork,
    deleteWork,
    addJob,
    updateJob,
    deleteJob,
    workOne,
    setWorkOne,
    jobOne,
    setJobOne,
    workCat,
    setworkCat,
  } = useCtx();
  console.log("🚀 ~ Chiglel ~ jobOne:", jobOne);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Чиглэл дэлгэрэнгүй</CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="grid grid-cols-3  gap-4 ">
          <Accordion className="w-full col-span-2 " type="single" collapsible>
            <AccordionItem value="item-10">
              <AccordionTrigger className="uppercase font-bold">
                Профессор, багш
              </AccordionTrigger>
              <AccordionContent>
                <Accordion className="ml-8 " type="single" collapslible>
                  {workCat?.slice(0, 4).map((item, index) => {
                    return (
                      <AccordionItem
                        key={index}
                        value={"item-".concat(index + 1)}
                      >
                        <AccordionTrigger>
                          <p className="font-bold uppercase">{item}</p>
                        </AccordionTrigger>
                        <AccordionContent>
                          <Accordion
                            type="single"
                            className="space-y-2"
                            collapsible
                          >
                            {workState
                              .filter((fil) => fil.angilal === item)
                              .sort((a, b) => {
                                const [letterA, numberA] = a.dugaar?.split(".");
                                const [letterB, numberB] = b.dugaar?.split(".");
                                // Үсгээр эрэмбэлэх
                                if (letterA < letterB) return -1;
                                if (letterA > letterB) return 1;
                                // Үсэг адил байвал тоогоор эрэмбэлэх
                                return (
                                  parseInt(numberA, 10) - parseInt(numberB, 10)
                                );
                              })
                              .map((item, index) => {
                                return (
                                  <AccordionItem
                                    key={index}
                                    value={"item-".concat(index + 1)}
                                  >
                                    <AccordionTrigger className="p-2">
                                      <p
                                        onClick={() => {
                                          setWorkOne(item);
                                          setJobOne({
                                            subJobName: "",
                                            onoo: 0,
                                            bagtsTsag: "",
                                            hemjihNegj: "",
                                          });
                                        }}
                                        className="text uppercase flex gap-2 w-full cursor-pointer"
                                      >
                                        <p className="font-bold">
                                          {item.dugaar}
                                        </p>{" "}
                                        {item.chiglel}
                                      </p>
                                    </AccordionTrigger>

                                    <AccordionContent className="pr-4 flex flex-col gap-2">
                                      {item.subjob.map((el, ind) => {
                                        return (
                                          <TooltipProvider key={ind}>
                                            <Tooltip>
                                              <TooltipTrigger>
                                                <div className="flex items-center space-x-2 ml-4 mt-1 text-left">
                                                  <Checkbox
                                                    className="size-5"
                                                    onCheckedChange={(
                                                      value
                                                    ) => {
                                                      if (value) {
                                                        setJobOne(el);
                                                        setWorkOne(item);
                                                      } else {
                                                        setJobOne({});
                                                        setWorkOne({});
                                                      }
                                                    }}
                                                    checked={
                                                      jobOne?._id === el._id
                                                        ? true
                                                        : false
                                                    }
                                                    id={el._id}
                                                  />
                                                  <label
                                                    htmlFor={el._id}
                                                    className="text uppercase flex items-center gap-2 w-full cursor-pointer"
                                                  >
                                                    <p className="font-bold">
                                                      {el.dugaar}
                                                    </p>
                                                    {el.subJobName} (
                                                    {el.bagtsTsag}
                                                    кр), ({el.onoo} оноо),{" "}
                                                    {el.hemjihNegj}
                                                  </label>
                                                </div>
                                              </TooltipTrigger>
                                              <TooltipContent className="max-w-2xl">
                                                <p>{el.tailbar}</p>
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>
                                        );
                                      })}
                                    </AccordionContent>
                                  </AccordionItem>
                                );
                              })}
                          </Accordion>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
            {workCat?.slice(4, 12).map((item, index) => {
              return (
                <AccordionItem key={index} value={"item-".concat(index + 1)}>
                  <AccordionTrigger>
                    <p className="font-bold uppercase">{item}</p>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Accordion type="single" className="space-y-2" collapsible>
                      {workState
                        .filter((fil) => fil.angilal === item)
                        .sort((a, b) => {
                          const [letterA, numberA] = a.dugaar?.split(".");
                          const [letterB, numberB] = b.dugaar?.split(".");
                          // Үсгээр эрэмбэлэх
                          if (letterA < letterB) return -1;
                          if (letterA > letterB) return 1;
                          // Үсэг адил байвал тоогоор эрэмбэлэх
                          return parseInt(numberA, 10) - parseInt(numberB, 10);
                        })
                        .map((item, index) => {
                          return (
                            <AccordionItem
                              key={index}
                              value={"item-".concat(index + 1)}
                            >
                              <AccordionTrigger className="p-2">
                                <p
                                  onClick={() => {
                                    setWorkOne(item);
                                    setJobOne({
                                      subJobName: "",
                                      onoo: 0,
                                      bagtsTsag: "",
                                      hemjihNegj: "",
                                    });
                                  }}
                                  className="text uppercase flex gap-2 w-full cursor-pointer"
                                >
                                  <p className="font-bold">{item.dugaar}</p>{" "}
                                  {item.chiglel}
                                </p>
                              </AccordionTrigger>

                              <AccordionContent className="pr-4 flex flex-col gap-2">
                                {item.subjob.map((el, ind) => {
                                  return (
                                    <TooltipProvider key={ind}>
                                      <Tooltip>
                                        <TooltipTrigger>
                                          <div className="flex items-center space-x-2 ml-4 mt-1 text-left">
                                            <Checkbox
                                              className="size-5"
                                              onCheckedChange={(value) => {
                                                if (value) {
                                                  setJobOne(el);
                                                  setWorkOne(item);
                                                } else {
                                                  setJobOne({});
                                                  setWorkOne({});
                                                }
                                              }}
                                              checked={
                                                jobOne?._id === el._id
                                                  ? true
                                                  : false
                                              }
                                              id={el._id}
                                            />
                                            <label
                                              htmlFor={el._id}
                                              className="text uppercase flex items-center gap-2 w-full cursor-pointer"
                                            >
                                              <p className="font-bold">
                                                {el.dugaar}
                                              </p>
                                              {el.subJobName} ({el.bagtsTsag}
                                              кр), ({el.onoo} оноо),{" "}
                                              {el.hemjihNegj}
                                            </label>
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent className="max-w-2xl">
                                          <p>{el.tailbar}</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  );
                                })}
                              </AccordionContent>
                            </AccordionItem>
                          );
                        })}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
          <div className="col-span-1 space-y-2">
            <div className="border p-4 rounded-lg space-y-2">
              <div className="flex gap-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="jil">Ангилал</Label>
                  <Select
                    onValueChange={(value) =>
                      setWorkOne({ ...workOne, angilal: value })
                    }
                    value={workOne.angilal}
                  >
                    <SelectTrigger className="truncate">
                      <SelectValue placeholder="Ангилал сонгох" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {workCat.map((item, index) => {
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
                <div className="grid max-w-sm items-center gap-1.5">
                  <Label htmlFor="jil">Дугаар</Label>
                  <Input
                    onChange={(e) =>
                      setWorkOne({ ...workOne, dugaar: e.target.value })
                    }
                    value={workOne.dugaar}
                    type="text"
                    id="title"
                    className=""
                    placeholder="Дугаар"
                  />
                </div>
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="jil">Чиглэл</Label>
                <Input
                  onChange={(e) =>
                    setWorkOne({ ...workOne, chiglel: e.target.value })
                  }
                  value={workOne.chiglel}
                  type="text"
                  id="title"
                  className=""
                  placeholder="Чиглэл"
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="jil">Тайлбар</Label>
                {/* <ReactQuill
                  className=""
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }], // Header sizes
                      ["bold", "italic", "underline"], // Text styling
                      [{ list: "ordered" }, { list: "bullet" }], // Lists
                      ["link", "image"], // Link and image
                      ["clean"], // Remove formatting
                    ],
                  }}
                  theme="snow"
                  value={workOne.tailbar}
                  onChange={(value) => {
                    setWorkOne({ ...workOne, tailbar: value });
                  }}
                /> */}

                <Textarea
                  onChange={(e) =>
                    setWorkOne({ ...workOne, tailbar: e.target.value })
                  }
                  value={workOne.tailbar}
                  className="min-h-36"
                  placeholder="Чиглэлийн тайлбар"
                />
              </div>
              <div className="flex justify-between items-center">
                <Button
                  onClick={() => {
                    if (workOne._id) {
                      updateWork(workOne);
                    } else {
                      addWork(workOne);
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Чиглэл хадгалах
                </Button>
                {workOne._id && (
                  <Dialog className="">
                    <DialogTrigger>
                      <Button variant="" size="" className="flex gap-2">
                        <Trash2Icon className="size-4 text-white" />
                        Устгах
                      </Button>
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
                              deleteWork(workOne._id);
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
              </div>
            </div>
            {workOne._id && (
              <div className="flex flex-col space-y-3 border p-4 rounded-lg">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="jil">Нэр</Label>
                  <Input
                    onChange={(e) =>
                      setJobOne({ ...jobOne, subJobName: e.target.value })
                    }
                    value={jobOne?.subJobName}
                    type="text"
                    id="title"
                    className=""
                    placeholder="Нэр"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="jil">Хэмжих нэгж</Label>
                    <Select
                      onValueChange={(value) =>
                        setJobOne({ ...jobOne, hemjihNegj: value })
                      }
                      value={jobOne?.hemjihNegj}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Хэмжих нэгж сонгох" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {[
                            "1 арга хэмжээ",
                            "1 баримт бичиг",
                            "1 докторант",
                            "1 илтгэл",
                            "1 магистрант",
                            "1 нийтлэл",
                            "1 нэвтрүүлэг",
                            "1 өгүүлэл",
                            "1 сурах бичиг",
                            "1 удаа",
                            "1 улиралд",
                            "1 х.х",
                            "1 хичээл",
                            "1 хичээлийн жил",
                            "1 хурал",
                            "1 цаг",
                            "1 шагнал",
                            "1 хөтөлбөр",
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
                    <Label htmlFor="jil">Багц цаг</Label>
                    <Input
                      onChange={(e) =>
                        setJobOne({ ...jobOne, bagtsTsag: e.target.value })
                      }
                      value={jobOne?.bagtsTsag}
                      type="text"
                      id="title"
                      className=""
                      placeholder="Багц цаг"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="jil">Оноо</Label>
                    <Input
                      onChange={(e) =>
                        setJobOne({ ...jobOne, onoo: e.target.value })
                      }
                      value={jobOne?.onoo}
                      type="text"
                      id="title"
                      className=""
                      placeholder="Оноо"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="jil">Дугаар</Label>
                    <Input
                      onChange={(e) =>
                        setJobOne({ ...jobOne, dugaar: e.target.value })
                      }
                      value={jobOne?.dugaar}
                      type="text"
                      id="title"
                      className=""
                      placeholder="Дугаар"
                    />
                  </div>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="jil">Тайлбар</Label>
                  <Textarea
                    onChange={(e) =>
                      setJobOne({ ...jobOne, tailbar: e.target.value })
                    }
                    value={jobOne?.tailbar}
                    className="min-h-36"
                    placeholder="Тайлбар"
                  />
                </div>
                <div className="flex justify-between gap-2 w-full">
                  <Button
                    onClick={() => {
                      if (jobOne?._id) {
                        updateJob(workOne._id, jobOne);
                      } else {
                        addJob(workOne._id, jobOne);
                      }
                      //   setJobOne({});
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Халгалах
                  </Button>
                  {jobOne?._id && (
                    <Dialog>
                      <DialogTrigger>
                        <Button variant="" size="" className="flex gap-2">
                          <Trash2Icon className="size-4 text-white" />
                          Устгах
                        </Button>
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
                                deleteJob(workOne._id, { _id: jobOne?._id });
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
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chiglel;
