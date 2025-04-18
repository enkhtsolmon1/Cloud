import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DialogDescription,
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
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Calendar,
  Calendar1Icon,
  CircleCheck,
  Eye,
  Mail,
  Phone,
  PlusCircle,
  PrinterIcon,
  Send,
  Trash,
  Trash2Icon,
} from "lucide-react";
import { useCtx } from "../components/Context/MainContext";
import { useAuth } from "../components/Context/AuthContext";
import { useEffect } from "react";
import moment from "moment";
import { useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Separator } from "@/components/ui/separator";
export default function Feed() {
  const {
    getFeeds,
    getUserFeeds,
    addFeedback,
    updateFeedBack,
    deleteFeedBack,
    feedState,
    setFeedState,
    addCommentFeed,
    updateCommentFeed,
    deleteCommentFeed,
  } = useCtx();

  const { user, checkRole, studentOne, teacherOne, depState } = useAuth();

  useEffect(() => {
    if (checkRole(["person", "admin", "teacher", "employee"], user?.rols)) {
      getFeeds();
    } else {
      getUserFeeds(user?._id);
    }
  }, []);

  const [data, setdata] = useState({
    office_id: checkRole(["Student"], user?.rols)
      ? studentOne?.department_id?._id
      : user?.department?._id,
    office_name: checkRole(["Student"], user?.rols)
      ? studentOne?.department_id?.name
      : user?.department?.name,
    owner_role: checkRole(["Student"], user?.rols) ? "Оюутан" : "Багш",
    owner_id: user?._id,
    owner_name: user?.butenNer,
    department_id: "632054c98408a9b6b3e1a7ab",
    department_name: "Захиргаа",
    phone: user?.phone1 ? user?.phone1 : "00000000",
    email: user?.email,
    channel: "clouduni",
    status: "Хүлээн авсан",
    type: "",
    content: "",
  });
  const componentRef = React.useRef(null);

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Санал хүсэлт хэвлэх",
  });
  const [commData, setcommData] = useState("");
  const TPrint = React.forwardRef((props, ref) => {
    return (
      <div className="p-8 max-w-[297mm] w-full overflow-auto mx-auto" ref={ref}>
        <div className="w-full">
          <img
            src="https://auth.num.edu.mn/oauth2/Image/num-logo.svg"
            alt="logo"
            className="w-28 mx-auto"
          />
          <p className="text-center uppercase font-medium mt-2 text-lg ">
            МУИС-ийн Баруун бүсийн сургууль
          </p>
        </div>
        <div className="space-y-4  mt-8">
          {feedState.map((item, index) => {
            return (
              <div key={index} className="w-full">
                <p className=" font-medium">
                  {item.type} {moment(item.createdAt).format("YYYY-MM-DD")}
                </p>
                <p className="text-justify p-4 rounded-lg">{item.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  const steps = [
    "Хүлээн авсан",
    "Хариуцсан нэгжид шилжүүлсэн",
    "Хянаж байгаа",
    "Шийдвэрлэсэн",
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle></CardTitle>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger>
              <Button className="flex flex-row gap-2" variant="outline">
                <PlusCircle className="size-4" />
                Санал, хүсэлт
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Санал, хүсэлт, өргөдөл, гомдол, талархал илгээх
                </DialogTitle>
                {/* <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription> */}
              </DialogHeader>

              <div className="grid w-full items-center gap-4">
                <div className="flex gap-2 w-full">
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label htmlFor="framework">Төрөл сонгох</Label>
                    <Select
                      onValueChange={(value) => {
                        setdata({ ...data, type: value });
                      }}
                    >
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Төрөл сонгох" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {[
                          "Өргөдөл",
                          "Гомдол",
                          "Санал",
                          "Зөвлөмж",
                          "Хүсэлт",
                          "Талархал",
                        ].map((item, index) => {
                          return (
                            <SelectItem key={index} value={item}>
                              {item}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label htmlFor="framework">
                      Санал, хүсэлт гаргаж буй газар
                    </Label>
                    <Select
                      onValueChange={(value) => {
                        setdata({
                          ...data,
                          department_id: value._id,
                          department_name: value.name,
                        });
                      }}
                    >
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Тэнхим нэгж сонгох" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {depState.map((item, index) => {
                          return (
                            <SelectItem key={index} value={item}>
                              {item.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Тайлбар дэлгэрэнгүй</Label>
                  <Textarea
                    onChange={(e) => {
                      setdata({ ...data, content: e.target.value });
                    }}
                    value={data.content}
                    className="h-36"
                    id="name"
                    placeholder="Тайлбар дэлгэрэнгүй бичих"
                  />
                </div>
                <div className="flex justify-between">
                  <div></div>
                  <Dialog>
                    <DialogTrigger>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Button
                              variant="outline"
                              className="bg-blue-600 text-white hover:bg-blue-500 hover:text-white"
                            >
                              <Send className="transition-all duration-500 " />{" "}
                              Илгээх
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Устгах</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </DialogTrigger>
                    <DialogContent className="max-w-xs">
                      <DialogHeader className="mt-4">
                        <DialogTitle>
                          <h1>Илгээх хүсэлтийг баталгаажуулах</h1>
                        </DialogTitle>
                      </DialogHeader>
                      <div className="w-full flex justify-evenly mt-2 gap-2">
                        <DialogTrigger>
                          <Button
                            className=""
                            onClick={() => {
                              addFeedback(
                                data,
                                checkRole(["admin", "person"], user?.rols)
                              );
                              setdata({ ...data, content: "" });
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
              </div>
            </DialogContent>
          </Dialog>
          {checkRole(["admin", "person"], user?.rols) && (
            <Dialog>
              <DialogTrigger className="">
                <Button className="flex flex-row gap-2" variant="outline">
                  <PrinterIcon className="size-4" />
                  Тайлан хэвлэх
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl h-[95%]">
                <DialogHeader></DialogHeader>
                <ScrollArea>
                  <TPrint ref={componentRef} />
                </ScrollArea>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={printFn}
                    className="flex flex-row gap-2"
                  >
                    <PrinterIcon className="size-4" />
                    Хэвлэх
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}{" "}
        </div>
      </CardHeader>
      <CardContent className="">
        {feedState.map((item, i) => {
          return (
            <Card key={i} className="flex flex-col p-4 gap-1 mt-8">
              <p
                className={`uppercase  font-medium text-sm  ${
                  item.type === "Гомдол"
                    ? "text-rose-600"
                    : item.type === "Хүсэлт"
                    ? "text-purple-600"
                    : item.type === "Санал"
                    ? "text-blue-600"
                    : item.type === "Талархал"
                    ? "text-green-600"
                    : "text-purple-600"
                }`}
              >
                {item.type} №{item.dugaar}
              </p>
              <div className="flex items-center text-blue-600 gap-1 text-sm">
                <Calendar className="size-4" />
                {moment(item.createdAt).format("YYYY-MM-DD HH:MM")}
              </div>
              <div className="w-full text-justify rounded italic font-nunito">
                {item.content}
              </div>
              <div className="flex items-center justify-between mt-2 gap-4 w-full">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex gap-1 text-sm items-center w-full"
                  >
                    {index <= steps.indexOf(item.status) && (
                      <CircleCheck className="size-4 text-emerald-600" />
                    )}
                    <div
                      className={`font-medium ${
                        index <= steps.indexOf(item.status)
                          ? "text-emerald-600"
                          : "text-gray-600"
                      }`}
                    >
                      {step}
                    </div>
                  </div>
                ))}
              </div>
              <Separator />

              <div>
                {item.comments?.map((comm, index) => {
                  return (
                    <div className="mt-4 flex justify-between items-center border-b">
                      <div>
                        <p className="flex gap-2 uppercase text-xs">
                          {checkRole(["admin", "person"], user?.rols) && (
                            <span className="font-semibold">
                              {comm.butenNer}
                            </span>
                          )}
                          <span className="text-gray-600">
                            {moment(comm.createdAt).format("YYYY-MM-DD HH:MM")}
                          </span>
                        </p>
                        <p className="ml-8 text-sm ">{comm.comment}</p>
                      </div>
                      {checkRole(["admin", "person"], user?.rols) && (
                        <Dialog>
                          <DialogTrigger>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="flex gap-2 size-7 ml-auto"
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
                                    deleteCommentFeed(item._id, comm);
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
                  );
                })}
              </div>

              <div className="flex gap-2 items-end ml-auto mt-4">
                {checkRole(["admin", "person"], user?.rols) && (
                  <div className="flex flex-col space-y-1.5 w-96">
                    <Label htmlFor="framework">Төрөл сонгох</Label>
                    <Select
                      value={item.status}
                      onValueChange={(value) => {
                        updateFeedBack(
                          {
                            _id: item._id,
                            status: value,
                          },
                          true
                        );
                      }}
                    >
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Төрөл сонгох" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {[
                          "Хүлээн авсан",
                          "Хариуцсан нэгжид шилжүүлсэн",
                          "Хянаж байгаа",
                          "Шийдвэрлэсэн",
                        ].map((item, index) => {
                          return (
                            <SelectItem key={index} value={item}>
                              {item}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label htmlFor="framework">Тайлбар</Label>
                  <Input
                    onChange={(e) => {
                      setcommData(e.target.value);
                    }}
                    value={commData}
                  />
                </div>
                <Button
                  onClick={() => {
                    addCommentFeed(item._id, {
                      department_id: item.department_id,
                      department_name: item.department_name,
                      status: item.status,
                      comment: commData,
                      owner_id: user?._id,
                      butenNer: user?.butenNer,
                    });
                    setcommData("");
                  }}
                  className="ml-auto"
                >
                  Хариу илгээх
                </Button>
              </div>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
}
