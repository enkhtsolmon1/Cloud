import React, { useEffect, useRef } from "react";
import ComingSoon from "../../components/others/ComingSoon";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Copy,
  CopyIcon,
  Download,
  Link2,
  Minus,
  Pen,
  PenLine,
  Plus,
  PlusCircle,
  QrCode,
  QrCodeIcon,
  Save,
  SaveIcon,
  Star,
  Trash,
  Trash2,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCtx } from "../../components/Context/MainContext";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";
import copy from "text-copy";
import { useAuth } from "../../components/Context/AuthContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import DragList from "./DragList";

const SudalgaaOne = () => {
  let { sudid } = useParams();
  useEffect(() => {
    getSudalgaaOne(sudid);
    // getAsuulga();
  }, []);

  const {
    getAsuulga,
    asuulgaState,
    getSudalgaaOne,
    updateSudalgaa,
    sudalgaaOneState,
    addSudalgaaAsuulga,
    updateSudalgaaAsuulga,
    deleteSudalgaaAsuulga,
    setSudalgaaOneState,
  } = useCtx();
  const { yearState } = useAuth();

  console.log("🚀 ~ SudalgaaOne ~ sudalgaaOneState:", sudalgaaOneState);

  const qrCodeRef = useRef(null);

  const downloadQRCode = () => {
    htmlToImage
      .toPng(qrCodeRef.current)
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "qr-code.png";
        link.click();
      })
      .catch(function (error) {
        console.error("Error generating QR code:", error);
      });
  };

  // const [names, setNames] = useState(initialNames);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(sudalgaaOneState?.listAsuulga);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log(items);
    // setSudalgaaOneState((prev) => ({ ...prev, listAsuulga: items }));
    updateSudalgaa({ ...sudalgaaOneState, listAsuulga: items });
    // setSudalgaaOneState({ ...sudalgaaOneState, listAsuulga: items });
  };

  return (
    <div className="min-h-screen relative bg-gray-100 dark:bg-gray-800 py-8 font-manrope px-4 select-none">
      <div className="max-w-2xl mx-auto  space-y-2">
        <div className="w-full border border-t-8 bg-white space-y-2 dark:bg-gray-900 border-blue-600 rounded-lg p-6">
          <p className="font-semibold text-center text-xl uppercase">
            {sudalgaaOneState?.name}
          </p>
          <p className="text-center">{sudalgaaOneState?.typeSurvey}</p>

          <p className="text-justify indent-8 my-4 border border-dashed p-2 text-sm">
            {sudalgaaOneState?.description}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex flex-col text-sm gap-2">
              <p>
                <b>Огноо:</b> {sudalgaaOneState?.yearLesson} -{" "}
                {sudalgaaOneState?.semister} улирал
              </p>
              <p>
                <b>Эхлэх огноо:</b> {sudalgaaOneState?.startDate}
              </p>
              <p className="">
                <b>Дуусах огноо:</b> {sudalgaaOneState?.endDate}
              </p>
              <p className="">
                <b>Асуулгын тоо:</b> {sudalgaaOneState?.listAsuulga?.length}
              </p>
              <div className="flex gap-2">
                <b>Хамрагдах курсууд:</b>
                {sudalgaaOneState?.kurs.map((ku, index) => {
                  return (
                    <p className="font-bold text-teal-600" key={index}>
                      {ku}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              value={`http://clouduni.west.edu.mn/dashboard/sudalgaa/${sudalgaaOneState?._id}`}
            />
            <Button
              onClick={() => {
                toast.success("Cудалгааны холбоос хуулагдлаа.");
                copy(
                  `http://clouduni.west.edu.mn/dashboard/sudalgaa/${sudalgaaOneState?._id}`
                );
              }}
              size="icon"
              variant="outline"
              className="px-3"
            >
              <CopyIcon className="" />
            </Button>
            <Popover>
              <PopoverTrigger>
                <Button
                  onClick={() => {}}
                  size="sm"
                  variant="outline"
                  className="rounded"
                >
                  <QrCodeIcon />
                  QR
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto">
                <QRCode
                  value={`http://clouduni.west.edu.mn/dashboard/sudalgaa/${sudalgaaOneState?._id}`}
                  className="mx-auto size-36 bg-white text-black"
                  ref={qrCodeRef}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex justify-between">
            <Dialog>
              <DialogTrigger>
                <Button
                  onClick={() => {
                    getAsuulga(user?._id);
                  }}
                  className=""
                  variant="outline"
                >
                  <PlusCircle /> Асуулга нэмэх
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90%] overflow-auto">
                <DialogHeader>
                  <DialogTitle>Асуулгын жагсаалт</DialogTitle>
                </DialogHeader>
                <div className="text-sm">
                  {asuulgaState.map((item, index) => {
                    return (
                      <div className="flex justify-between items-center border-b p-2">
                        <div className="">
                          <p>{item.question} </p>
                          <p className="text-teal-600 text-xs">
                            {item.asuulgaType}
                          </p>
                        </div>
                        <Button
                          onClick={() => {
                            addSudalgaaAsuulga(sudalgaaOneState?._id, {
                              asuulga_id: item._id,
                              dugaar: sudalgaaOneState?.listAsuulga.length + 1,
                              section: item.angilal,
                              isRequired: true,
                            });
                          }}
                          size="icon"
                          className="size-7"
                          variant="outline"
                        >
                          <Plus />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </DialogContent>
            </Dialog>
            <div>
              <Dialog>
                <DialogTrigger>
                  <Button
                    onClick={() => {
                      // getAsuulga();
                    }}
                    className=""
                    variant="outline"
                    size="icon"
                  >
                    <PenLine />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90%] w-full overflow-auto">
                  <DialogHeader>
                    <DialogTitle className="text-center">
                      Судалгааны дэлгэрэнгүй мэдээлэл
                    </DialogTitle>
                  </DialogHeader>
                  <div className="w-full space-y-4">
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Судалгааны нэр</Label>
                      <Input
                        onChange={(e) => {
                          setSudalgaaOneState({
                            ...sudalgaaOneState,
                            name: e.target.value,
                          });
                        }}
                        value={sudalgaaOneState?.name}
                        className="w-full"
                        type="text"
                      />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Судалгааны төрөл</Label>
                      <Input
                        onChange={(e) => {
                          setSudalgaaOneState({
                            ...sudalgaaOneState,
                            typeSurvey: e.target.value,
                          });
                        }}
                        value={sudalgaaOneState?.typeSurvey}
                        className="w-full"
                        type="text"
                      />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Судалгааны тайлбар</Label>
                      <Textarea
                        onChange={(e) => {
                          setSudalgaaOneState({
                            ...sudalgaaOneState,
                            description: e.target.value,
                          });
                        }}
                        value={sudalgaaOneState?.description}
                        className="w-full min-h-24"
                        type="text"
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Хичээлийн жил</Label>
                        <Select
                          onValueChange={(value) => {
                            setSudalgaaOneState({
                              ...sudalgaaOneState,
                              yearLesson: value,
                            });
                          }}
                          value={sudalgaaOneState?.yearLesson}
                        >
                          <SelectTrigger className="">
                            <SelectValue placeholder="Төрөл" />
                          </SelectTrigger>
                          <SelectContent>
                            {yearState.map((el, index) => {
                              return (
                                <SelectItem key={index} value={el}>
                                  {el}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Улирал</Label>
                        <Select
                          onValueChange={(value) => {
                            setSudalgaaOneState({
                              ...sudalgaaOneState,
                              semister: value,
                            });
                          }}
                          value={sudalgaaOneState?.semister}
                        >
                          <SelectTrigger className="">
                            <SelectValue placeholder="Төрөл" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2].map((el, index) => {
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
                    <div className="flex gap-2">
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Эхлэх огноо</Label>
                        <Input
                          onChange={(e) => {
                            setSudalgaaOneState({
                              ...sudalgaaOneState,
                              startDate: e.target.value,
                            });
                          }}
                          value={sudalgaaOneState?.startDate}
                          className="w-full"
                          type="date"
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Дуусах огноо</Label>
                        <Input
                          onChange={(e) => {
                            setSudalgaaOneState({
                              ...sudalgaaOneState,
                              endDate: e.target.value,
                            });
                          }}
                          value={sudalgaaOneState?.endDate}
                          className="w-full"
                          type="date"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Идвэхтэй эсэх</Label>
                        <Switch
                          checked={sudalgaaOneState?.isActive}
                          onCheckedChange={(value) => {
                            setSudalgaaOneState({
                              ...sudalgaaOneState,
                              isActive: value,
                            });
                          }}
                          id="airplane-mode"
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Курс</Label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((ku) => {
                            return (
                              <Button
                                onClick={() => {
                                  if (sudalgaaOneState?.kurs.includes(ku)) {
                                    // Байгаа бол устгана
                                    setSudalgaaOneState({
                                      ...sudalgaaOneState,
                                      kurs: sudalgaaOneState?.kurs.filter(
                                        (k) => k !== ku
                                      ),
                                    });
                                  } else {
                                    // Байхгүй бол нэмнэ
                                    setSudalgaaOneState({
                                      ...sudalgaaOneState,
                                      kurs: [...sudalgaaOneState?.kurs, ku],
                                    });
                                  }
                                }}
                                className=""
                                variant={
                                  sudalgaaOneState?.kurs.includes(ku)
                                    ? ""
                                    : "outline"
                                }
                                size="icon"
                              >
                                {ku}
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      updateSudalgaa(sudalgaaOneState);
                    }}
                    className="ml-auto"
                    variant="outline"
                  >
                    <SaveIcon /> Хадгалах
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="names">
            {(provided) => (
              <ul
                className="bg-gray-100 rounded "
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {sudalgaaOneState?.listAsuulga.map((item, index) => (
                  <Draggable
                    key={item._id}
                    draggableId={item._id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        className="p-2 mb-2 bg-white rounded shadow cursor-move"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p>{item.asuulga_id?.question}</p>
                            <p className="text-xs text-rose-600">
                              {item.asuulga_id?.asuulgaType}
                            </p>
                          </div>
                          <Dialog>
                            <DialogTrigger>
                              <Button
                                variant="outline"
                                size="icon"
                                className="flex gap-2 size-7"
                              >
                                <Trash2 className="size-4 text-rose-600 " />
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
                                      deleteSudalgaaAsuulga(
                                        sudalgaaOneState?._id,
                                        {
                                          _id: item._id,
                                        }
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
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        {/* {sudalgaaOneState?.listAsuulga
          ?.sort((a, b) => (a.dugaar > b.dugaar ? 1 : -1))
          .map((item, index) => {
            return (
              <div
                key={index}
                className="w-full flex justify-between items-center border rounded-lg p-4 space-y-4 bg-white dark:bg-gray-900"
              >
                <div className="flex flex-col">
                  <Input
                    className="max-w-14"
                    type="number"
                    value={item.dugaar}
                    onChange={(e) => {
                      updateSudalgaaAsuulga(sudalgaaOneState?._id, {
                        _id: item._id,
                        dugaar: e.target.value,
                      });
                    }}
                  />
                  <p className="font-medium">{item?.asuulga_id?.question}</p>
                  <p className="text-xs text-teal-600">
                    {item?.asuulga_id?.asuulgaType}
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger>
                    <Button
                      variant="outline"
                      size="icon"
                      className="flex gap-2 size-7"
                    >
                      <Trash2 className="size-4 text-rose-600 " />
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
                            deleteSudalgaaAsuulga(sudalgaaOneState?._id, {
                              _id: item._id,
                            });
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
              </div>
            );
          })} */}
      </div>
    </div>
  );
};

export default SudalgaaOne;
