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
  Plus,
  QrCode,
  QrCodeIcon,
  Star,
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
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCtx } from "../../components/Context/MainContext";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";
import copy from "text-copy";

const SudalgaaOne = () => {
  let { sudid } = useParams();

  useEffect(() => {
    getSudalgaaOne(sudid);
    getAsuulga();
  }, []);

  const { getAsuulga, asuulgaState, getSudalgaaOne, sudalgaaOneState } =
    useCtx();
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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 py-8 font-manrope px-4 select-none">
      <div className="max-w-2xl mx-auto  space-y-2">
        <div className="w-full border border-t-8 bg-white dark:bg-gray-900 border-blue-600 rounded-lg p-6 space-y-4">
          <p className="font-semibold text-center text-xl uppercase">
            {sudalgaaOneState?.name}
          </p>
          <p className="text-justify indent-8">
            {sudalgaaOneState?.description}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex flex-col text-sm">
              <p>
                <b>Огноо:</b> {sudalgaaOneState?.yearLesson}-{" "}
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
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              value={`http://clouduni.west.edu.mn/dashboard/sudalgaa/${sudalgaaOneState?._id}`}
            />
            <Button
              onClick={() => {
                toast({
                  description: "Cудалгааны холбоос хуулагдлаа.",
                  className:
                    "bg-emerald-600 text-white max-w-xs mx-auto text-center",
                });
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
                />{" "}
              </PopoverContent>
            </Popover>
          </div>
        </div>
        {sudalgaaOneState?.listAsuulga?.map((item, index) => {
          return (
            <div
              key={index}
              className="w-full border rounded-lg p-6 space-y-4 bg-white dark:bg-gray-900"
            >
              <div className="flex gap-2 justify-between">
                <p className="font-medium">
                  {" "}
                  {index + 1}. {item?.asuulga_id?.question}
                </p>
                <p className="text-xs">{item?.asuulga_id?.asuulgaType}</p>
              </div>
              {/* Сонголттой хүснэгт */}
              {item?.asuulga_id?.asuulgaType === "Нэг сонголттой хүснэгт" && (
                <div className="">
                  <table className="w-full">
                    <thead>
                      <tr className="">
                        <td className="text-left"></td>
                        {item?.asuulga_id?.options?.map((option, ind1) => (
                          <td key={ind1} className="text-xs p-2 text-center">
                            {option.value}
                          </td>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {item?.asuulga_id?.selections.map((sel, ind2) => (
                        <tr
                          key={ind2}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <td className="p-2 text-xs md:text-sm">
                            {sel.selection}
                          </td>
                          {item?.asuulga_id?.options.map((option, ind3) => (
                            <td key={ind3} className=" text-center">
                              <input
                                type="radio"
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {/* Нэг сонголттой */}
              {item?.asuulga_id?.asuulgaType === "Нэг сонголттой" && (
                <div className="space-y-3">
                  {item?.asuulga_id?.selections?.map((row, ind5) => {
                    return (
                      <div key={ind5} className="flex gap-2 items-center">
                        <input
                          type="radio"
                          name={item?.asuulga_id?._id}
                          // checked={responses[sel._id] === option.score}
                          onChange={() => {
                            console.log(row.selection);
                          }}
                          className="size-5 text-blue-600 cursor-pointer focus:ring-blue-500"
                        />
                        <p>{row.selection}</p>
                      </div>
                    );
                  })}
                </div>
              )}
              {item?.asuulga_id?.asuulgaType === "Олон сонголттой хүснэгт" && (
                <div className="space-y-3">
                  {item?.asuulga_id?.selections?.map((row, ind6) => {
                    return (
                      <div key={ind6} className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          // checked={responses[sel._id] === option.score}
                          onChange={() => {
                            console.log(row.selection);
                          }}
                          className="size-5 text-blue-600 cursor-pointer focus:ring-blue-500"
                        />
                        <p>{row.selection}</p>
                      </div>
                    );
                  })}
                </div>
              )}
              {/*  */}
              {item?.asuulga_id?.asuulgaType === "Нээлттэй хариулт" && (
                <div className="space-y-3">
                  <Input className="" placeHolder="Таны хариулт..." />
                </div>
              )}
              {item?.asuulga_id?.asuulgaType === "Сонголттой цэс" && (
                <div className="space-y-3">
                  <Select>
                    <SelectTrigger className="w-auto">
                      <SelectValue placeholder="Сонгох" />
                    </SelectTrigger>
                    <SelectContent>
                      {item?.asuulga_id?.selections?.map((row, ind7) => {
                        return (
                          <SelectItem key={ind7} value={row.selection}>
                            {row.selection}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {item?.asuulga_id?.asuulgaType === "Эрэмбэтэй үнэлгээ" && (
                <div className="flex flex-col items-center">
                  {item?.asuulga_id?.options?.map((row, ind8) => {
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
                                variant={`${
                                  3 >= ind9 + 1 ? "outline" : "secondry"
                                }`}
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
              {item?.asuulga_id?.asuulgaType === "Шугаман үнэлгээ" && (
                <div className="flex justify-center text-sm items-end gap-6">
                  <p>{item?.asuulga_id?.options[0]?.value}</p>
                  <div className="flex gap-4 ">
                    {Array.from(
                      { length: item?.asuulga_id?.options[1]?.score },
                      (row, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <p>{index + 1}</p>
                          <input
                            type="radio"
                            name={item?.asuulga_id?._id}
                            // checked={responses[sel._id] === option.score}
                            onChange={() => {}}
                            className="size-5 text-blue-600 cursor-pointer focus:ring-blue-500"
                          />
                        </div>
                      )
                    )}
                  </div>
                  <p>{item?.asuulga_id?.options[1]?.value}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SudalgaaOne;
