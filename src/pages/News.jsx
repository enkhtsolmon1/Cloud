import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import React, { useEffect, useState } from "react";
import { useCtx } from "../components/Context/MainContext";

import moment from "moment-timezone";

import Editor from "../components/Editor/Editor";

import { PlusCircle, PencilIcon, Trash2Icon } from "lucide-react";

import { useAuth } from "../components/Context/AuthContext";
// import DemoEditor from "../components/Editor/DemoEditor";

const News = () => {
  const {
    newsState,
    getCatNews,
    getCat,
    catState,
    addNews,
    updateNews,
    deleteNews,
    getArchiv,
    archiv,
    getNewsOgnoo,
  } = useCtx();

  const { user } = useAuth();

  const [data, setdata] = useState({
    category_id: "609e1c74d23b7a15b8092e8d",
  });
  // console.log("🚀 ~ News ~ data:", data);

  const [ognoo, setOgnoo] = useState({});
  useEffect(() => {
    // getCatNews("609e1c74d23b7a15b8092e8d");
    getArchiv();
    getCat();
  }, []);

  const [open, setOpen] = useState(false);
  const [dopen, setdOpen] = useState(false);

  return (
    <div>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent className="max-w-6xl min-h-96">
          <DialogHeader className="sticky top-0">
            <DialogTitle>Мэдээний дэлгэрэнгүй</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-2 ">
            <ScrollArea className="h-full col-span-2 flex justify-center border rounded-xl shadow-sm p-4">
              <Editor
                onChange={(e) => {
                  setdata((prev) => ({
                    ...prev,
                    blocks: e,
                  }));
                }}
                data={{ blocks: data.blocks }}
              />
            </ScrollArea>

            <Card className="p-4 flex flex-col gap-4">
              <Select
                onValueChange={(value) =>
                  setdata({ ...data, category_id: value })
                }
                value={data.category_id?._id || data.category_id}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Ангилал сонгох" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Мэдээний ангилалууд</SelectLabel>
                    {catState.map((item, index) => {
                      return (
                        <SelectItem
                          key={index}
                          className="cursor-pointer"
                          value={item._id}
                        >
                          {item.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {(data.category_id?._id || data.category_id) ===
                "67e0fbf41fc02b5dae10f95a" && (
                <Select
                  value={data.tusul_ner}
                  onValueChange={(value) =>
                    setdata({ ...data, tusul_ner: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Төсөл сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {[
                        "Melinc",
                        "Moneul",
                        "3L4MOHS",
                        "Secnet",
                        "Interact",
                        "mlrn",
                        "Urgent",
                        "Intense",
                      ].map((item, index) => {
                        return (
                          <SelectItem
                            key={index}
                            className="cursor-pointer"
                            value={item}
                          >
                            {item}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
              <Textarea
                value={data.title}
                onChange={(e) => setdata({ ...data, title: e.target.value })}
                className="min-h-28"
                placeholder="Мэдээний гарчиг..."
              />

              {/* <div class="flex flex-col items-center justify-center p-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 transition">
                <img
                  src="http://west.edu.mn:3000/upload/programfiles/west.jpg"
                  alt=""
                />
                <label
                  for="imageUpload"
                  class="flex flex-col items-center cursor-pointer"
                >
                  <span class="text-sm font-medium text-gray-500">
                    Зураг оруулах бол товшино уу
                  </span>
                  <span class="text-xs text-gray-400 mt-1">
                    PNG, JPG, GIF 4MB-аас ихгүй
                  </span>
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  class="hidden"
                  accept="image/*"
                />
              </div> */}
              <div className="flex gap-2"></div>
            </Card>
          </div>
          <DialogFooter className="">
            <Button
              onClick={() => {
                if (data._id) {
                  updateNews(data);
                } else {
                  addNews(data);
                }
              }}
              variant=""
            >
              Хадгалах
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Select onValueChange={(value) => getCatNews(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Сонгох" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Мэдээний ангилалууд</SelectLabel>
              {catState.map((item, index) => {
                return (
                  <SelectItem
                    key={index}
                    className="cursor-pointer"
                    value={item._id}
                  >
                    {item.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          onClick={() => {
            setdata({
              category_id: {
                name: "Мэдээ",
                _id: "609e1c74d23b7a15b8092e8d",
              },
              department_id: user?.department._id,
              author_id: user?._id,
              status: "Нийтлэгдсэн",
              blocks: [],
            });
            setOpen(true);
          }}
          variant="outline"
          className="gap-1"
        >
          <PlusCircle className="size-4" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap ">
            Мэдээ
          </span>
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <Select
            onValueChange={(value) => {
              setOgnoo(value);
              getNewsOgnoo(value.on, value.sar);
            }}
            value={ognoo}
          >
            <SelectTrigger className="w-auto min-w-24">
              <SelectValue placeholder="Огноо сонгох" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Архив</SelectLabel>
                {archiv.map((item, index) => {
                  return (
                    <SelectItem
                      key={index}
                      className="cursor-pointer"
                      value={item}
                    >
                      {item.on} оны {item.sar} сар
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* <DemoEditor /> */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Гарчиг</TableHead>
            <TableHead>Огноо</TableHead>
            <TableHead>Төлөв</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {newsState.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell className="text-xs font-medium truncate max-w-36 capitalize">
                  {item.title}
                </TableCell>
                <TableCell>
                  {moment(item.created_at).format("YYYY-MM-DD HH:mm")}
                </TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.category_id?.name}</TableCell>
                <TableCell>{item.author_id?.butenNer}</TableCell>
                <TableCell className="text-right flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="flex gap-2 size-7"
                    onClick={() => {
                      setdata(item);
                      setOpen(true);
                    }}
                  >
                    <PencilIcon className="size-4 " />
                  </Button>
                  <Popover open={dopen === item._id}>
                    <PopoverTrigger>
                      <Button
                        variant="outline"
                        size="icon"
                        className="flex gap-2 size-7"
                        onClick={() => setdOpen(item._id)}
                      >
                        <Trash2Icon className="size-4 text-red-600 " />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col gap-2">
                      <span className="text-center">
                        Та энэ мэдээг устгахдаа итгэлтэй байна уу?
                      </span>
                      <div className="flex justify-end gap-4">
                        <Button
                          className=""
                          onClick={() => deleteNews(item._id)}
                        >
                          Тийм
                        </Button>
                        <button
                          asChild
                          onClick={() => setdOpen(false)}
                          variant="outline"
                        >
                          Үгүй
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default News;
