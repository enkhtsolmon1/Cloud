import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCtx } from "../../components/Context/MainContext";
import {
  ChevronRight,
  Pencil,
  PencilIcon,
  Plus,
  PlusCircle,
  SaveIcon,
  Trash2Icon,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import { useAuth } from "../../components/Context/AuthContext";

const Asuulga = () => {
  useEffect(() => {
    getAsuulga(user?._id);
  }, []);
  const { user } = useAuth();
  const {
    getAsuulga,
    asuulgaState,
    asuulgaOne,
    setAsuulgaOne,
    getAsuulgaOne,
    addAsuulga,
    updateAsuulga,
    deleteAsuulga,
    asuulgaOpen,
    setAsuulgaOpen,
    addSelection,
    updateSelection,
    deleteSelection,
    addOption,
    updateOption,
    deleteOption,
  } = useCtx();

  console.log("🚀 ~ Sudalgaa ~ sudalgaaState:", asuulgaOne);

  const [selectionState, setSelectionState] = useState({ selection: "" });

  const [optionState, setOptionState] = useState({ value: "", score: 1 });

  return (
    <Card className="">
      <Dialog open={asuulgaOpen} onOpenChange={setAsuulgaOpen}>
        <DialogContent className="max-w-4xl w-auto">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 ">
            <div className="flex gap-2 w-full">
              <div className="flex flex-col w-full space-y-1.5">
                <Label>Асуулт</Label>
                <Input
                  placeholder="Асуулт оруулна уу..."
                  onChange={(e) => {
                    setAsuulgaOne({
                      ...asuulgaOne,
                      question: e.target.value,
                    });
                  }}
                  value={asuulgaOne?.question}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Төрөл</Label>
                <Select
                  onValueChange={(value) => {
                    updateAsuulga({ _id: asuulgaOne?._id, asuulgaType: value });
                    setAsuulgaOne({
                      ...asuulgaOne,
                      asuulgaType: value,
                    });
                  }}
                  value={asuulgaOne?.asuulgaType}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Төрөл" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Нэг сонголттой",
                      "Олон сонголттой",
                      "Нээлттэй хариулт",
                      "Нэг сонголттой хүснэгт",
                      "Олон сонголттой хүснэгт",
                      "Эрэмбэтэй үнэлгээ",
                      "Шугаман үнэлгээ",
                    ].map((el, index) => {
                      return (
                        <SelectItem key={index} value={el}>
                          {el}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Тайлбар</Label>
              <Textarea
                onChange={(e) => {
                  setAsuulgaOne({
                    ...asuulgaOne,
                    description: e.target.value,
                  });
                }}
                placeholder="Тайлбар..."
                value={asuulgaOne?.description}
              />
            </div>
            {!["Нээлттэй хариулт"].includes(asuulgaOne?.asuulgaType) && (
              <div className="w-full border rounded-lg p-4 space-y-4 bg-white dark:bg-gray-900">
                <Dialog>
                  <DialogTrigger>
                    <Button
                      onClick={() => {
                        setOptionState({ value: "", score: 1 });
                        setSelectionState({ selection: "" });
                      }}
                      className="ml-auto "
                      variant="outline"
                      size="sm"
                    >
                      <PlusCircle />
                      Сонголт нэмэх
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader></DialogHeader>
                    <Label>Сонголт</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        "Нэг сонголттой",
                        "Олон сонголттой",
                        "Нэг сонголттой хүснэгт",
                        "Олон сонголттой хүснэгт",
                      ].includes(asuulgaOne?.asuulgaType) && (
                        <div className="flex flex-col gap-2 border rounded-lg p-4">
                          <p>Мөр</p>
                          <div className="flex gap-2 ">
                            <Input
                              onChange={(e) => {
                                setSelectionState({
                                  ...selectionState,
                                  selection: e.target.value,
                                });
                              }}
                              value={selectionState?.selection}
                              placeholder="Сонголт"
                              className=""
                            />
                            <Button
                              onClick={() => {
                                if (selectionState?._id) {
                                  updateSelection(
                                    asuulgaOne?._id,
                                    selectionState
                                  );
                                } else {
                                  addSelection(asuulgaOne?._id, selectionState);
                                }
                                setOptionState({ value: "", score: 1 });
                                setSelectionState({ selection: "" });
                              }}
                              size="icon"
                              variant="outline"
                              className="flex px-4 gap-2 ml-auto"
                            >
                              <SaveIcon className="size-4  " />
                            </Button>
                          </div>

                          {asuulgaOne?.selections?.map((row, ind1) => {
                            return (
                              <div
                                key={ind1}
                                className="flex gap-2 items-center"
                              >
                                <Input value={row?.selection} className="" />
                                <div className="flex gap-1 items-center">
                                  <Button
                                    onClick={() => {
                                      setSelectionState(row);
                                    }}
                                    className=""
                                    variant="outline"
                                    size="icon"
                                  >
                                    <Pencil />
                                  </Button>

                                  <Button
                                    onClick={() => {
                                      deleteSelection(asuulgaOne?._id, {
                                        _id: row?._id,
                                      });
                                    }}
                                    className=""
                                    variant="outline"
                                    size="icon"
                                  >
                                    <X />
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {[
                        "Шугаман үнэлгээ",
                        "Эрэмбэтэй үнэлгээ",
                        "Нэг сонголттой хүснэгт",
                        "Олон сонголттой хүснэгт",
                      ].includes(asuulgaOne?.asuulgaType) && (
                        <div className="flex flex-col gap-2 border rounded-lg p-4">
                          <p>Багна</p>
                          <div className="flex gap-2 ">
                            {asuulgaOne?.asuulgaType === "Эрэмбэтэй үнэлгээ" ? (
                              <Select
                                onValueChange={(value) => {
                                  setOptionState({
                                    ...optionState,
                                    value,
                                  });
                                }}
                                value={optionState?.value}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="" />
                                </SelectTrigger>
                                <SelectContent>
                                  {["⭐", "👍", "♥️"].map((row, ind2) => {
                                    return (
                                      <SelectItem key={ind2} value={row}>
                                        {row}
                                      </SelectItem>
                                    );
                                  })}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input
                                onChange={(e) => {
                                  setOptionState({
                                    ...optionState,
                                    value: e.target.value,
                                  });
                                }}
                                value={optionState?.value}
                                placeholder="Сонголт"
                                className="w-auto"
                              />
                            )}
                            <Input
                              onChange={(e) => {
                                setOptionState({
                                  ...optionState,
                                  score: e.target.value,
                                });
                              }}
                              value={optionState?.score}
                              placeholder="Оноо"
                              className=""
                              type="number"
                            />

                            <Button
                              onClick={() => {
                                if (optionState?._id) {
                                  updateOption(asuulgaOne?._id, optionState);
                                } else {
                                  addOption(asuulgaOne?._id, optionState);
                                }
                                setOptionState({ value: "", score: 1 });
                                setSelectionState({ selection: "" });
                              }}
                              size="icon"
                              variant="outline"
                              className="flex px-4 gap-2 ml-auto"
                            >
                              <SaveIcon className="size-4  " />
                            </Button>
                          </div>

                          {asuulgaOne?.options?.map((row, ind3) => {
                            return (
                              <div
                                key={ind3}
                                className="flex gap-2 items-center"
                              >
                                <div className="w-full">
                                  <Input
                                    value={row?.value}
                                    className="w-auto"
                                  />
                                </div>
                                <Input value={row?.score} className="" />
                                <div className="flex gap-1 items-center">
                                  <Button
                                    onClick={() => {
                                      setOptionState(row);
                                    }}
                                    className=""
                                    variant="outline"
                                    size="icon"
                                  >
                                    <Pencil />
                                  </Button>

                                  <Button
                                    onClick={() => {
                                      deleteOption(asuulgaOne?._id, {
                                        _id: row?._id,
                                      });
                                    }}
                                    className=""
                                    variant="outline"
                                    size="icon"
                                  >
                                    <X />
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                {["Нэг сонголттой", "Олон сонголттой"].includes(
                  asuulgaOne?.asuulgaType
                ) && (
                  <div className="space-y-2">
                    {asuulgaOne?.selections?.map((row, ind4) => {
                      return (
                        <div key={ind4} className="flex gap-2 items-center">
                          <Input
                            name={asuulgaOne?._id}
                            // value={row?._id}
                            type={
                              asuulgaOne?.asuulgaType === "Нэг сонголттой"
                                ? "radio"
                                : "checkbox"
                            }
                            className="size-7 text-blue-600 cursor-pointer focus:ring-blue-500"
                          />

                          <Input value={row?.selection} className="" />
                          <div className="flex gap-1 items-center">
                            <Dialog>
                              <DialogTrigger>
                                <Button
                                  onClick={() => {
                                    setSelectionState(row);
                                  }}
                                  className=""
                                  variant="outline"
                                  size="icon"
                                >
                                  <Pencil />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader></DialogHeader>
                                <Label>Сонголт</Label>
                                <Input
                                  onChange={(e) => {
                                    setSelectionState({
                                      ...selectionState,
                                      selection: e.target.value,
                                    });
                                  }}
                                  value={selectionState?.selection}
                                  placeholder="Сонголт оруулна уу..."
                                  className=""
                                />
                                <DialogTrigger>
                                  <Button
                                    onClick={() => {
                                      updateSelection(
                                        asuulgaOne?._id,
                                        selectionState
                                      );
                                    }}
                                    variant="outline"
                                    className="flex gap-2 ml-auto"
                                  >
                                    <SaveIcon className="size-4  " />
                                    Хадгалах
                                  </Button>
                                </DialogTrigger>
                              </DialogContent>
                            </Dialog>

                            <Button
                              onClick={() => {
                                deleteSelection(asuulgaOne?._id, {
                                  _id: row?._id,
                                });
                              }}
                              className=""
                              variant="outline"
                              size="icon"
                            >
                              <X />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {["Нэг сонголттой хүснэгт", "Олон сонголттой хүснэгт"].includes(
                  asuulgaOne?.asuulgaType
                ) && (
                  <div>
                    <table className="w-full">
                      <thead>
                        <tr className="">
                          <td className="text-left"></td>
                          {asuulgaOne?.options?.map((option, ind5) => (
                            <td key={ind5} className="text-xs p-2 text-center">
                              {option.value}
                            </td>
                          ))}
                          <td></td>
                        </tr>
                      </thead>
                      <tbody>
                        {asuulgaOne?.selections.map((sel, ind6) => (
                          <tr
                            key={ind6}
                            className="hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <td className="p-2 text-xs md:text-sm">
                              {sel.selection}
                            </td>
                            {asuulgaOne?.options.map((option, ind7) => (
                              <td key={ind7} className=" text-center">
                                <input
                                  type={
                                    asuulgaOne?.asuulgaType ===
                                    "Нэг сонголттой хүснэгт"
                                      ? "radio"
                                      : "checkbox"
                                  }
                                  name={sel._id}
                                  value={option.score}
                                  // checked={responses[sel._id] === option.score}
                                  onChange={() => {
                                    console.log(sel.selection, option.score);
                                  }}
                                  className="size-5 text-blue-600 cursor-pointer focus:ring-blue-500"
                                />
                              </td>
                            ))}
                            <td></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {/* 💕 ♥️, 👍 💗 ⭐*/}
                {["Эрэмбэтэй үнэлгээ"].includes(asuulgaOne?.asuulgaType) && (
                  <div className="flex flex-col items-center">
                    {asuulgaOne?.options?.map((row, ind8) => {
                      return (
                        <div
                          key={ind8}
                          className="flex gap-6 justify-center w-full"
                        >
                          {[...Array(row.score)].map((opt, ind9) => {
                            return (
                              <div
                                key={ind9}
                                className="flex flex-col justify-center items-center"
                              >
                                {ind9 + 1}
                                <Button
                                  className="text-xl"
                                  size="icon"
                                  variant="outline"
                                  value={row.selection}
                                >
                                  {row.value}
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                )}
                {/* Шугман */}
                {["Шугаман үнэлгээ"].includes(asuulgaOne?.asuulgaType) && (
                  <div className="flex justify-center text-sm items-end gap-6">
                    <p>{asuulgaOne?.options[0]?.value}</p>
                    <div className="flex gap-4 ">
                      {Array.from(
                        { length: asuulgaOne?.options[1]?.score },
                        (row, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center"
                          >
                            <p>{index + 1}</p>
                            <input
                              type="radio"
                              name={asuulgaOne?._id}
                              // checked={responses[sel._id] === option.score}
                              onChange={() => {
                                console.log(index + 1);
                              }}
                              className="size-5 text-blue-600 cursor-pointer focus:ring-blue-500"
                            />
                          </div>
                        )
                      )}
                    </div>
                    <p>{asuulgaOne?.options[1]?.value}</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <Button
            onClick={() => {
              updateAsuulga(asuulgaOne);
            }}
            variant="outline"
            className="flex gap-2 ml-auto"
          >
            <SaveIcon className="size-4" />
            Хадгалах
          </Button>
        </DialogContent>
      </Dialog>

      <CardHeader>
        <CardTitle>Асуулгын жагсаалт</CardTitle>
        <Button
          onClick={() => {
            addAsuulga({
              school_id: "5f79236c2e13c437e888fe21",
              department_id: user?.department?._id,
              teacher_id: user?._id,
              asuulgaType: "Нэг сонголттой",
              angilal: "Ерөнхий мэдээлэл",
              question: " ",
              description: "",
              options: [],
              selections: [],
            });
          }}
          variant="outline"
          className="flex gap-2 ml-auto"
        >
          <PlusCircle className="size-4  " />
          Асуулга
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>№</TableHead>
              <TableHead>Асуулт</TableHead>
              <TableHead>Төрөл</TableHead>
              <TableHead>Ангилал</TableHead>
              <TableHead>Огноо</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {asuulgaState.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.question}</TableCell>
                  <TableCell>{item.asuulgaType}</TableCell>
                  <TableCell>{item.angilal}</TableCell>
                  <TableCell>
                    {moment(item.createdAt).format("YYYY-MM-DD HH:MM")}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      onClick={() => {
                        setAsuulgaOne(item);
                        setAsuulgaOpen(true);
                      }}
                      variant="outline"
                      size="icon"
                      className="flex gap-2 size-7"
                    >
                      <PencilIcon className=" text-blue-600 " />
                    </Button>
                    <Dialog>
                      <DialogTrigger>
                        <Button
                          variant="outline"
                          size="icon"
                          className="flex gap-2 size-7"
                        >
                          <Trash2Icon className="size-4 text-rose-600 " />
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
                                deleteAsuulga(item._id);
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

export default Asuulga;
