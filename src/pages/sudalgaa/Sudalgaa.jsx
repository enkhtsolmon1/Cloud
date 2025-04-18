import React, { useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCtx } from "../../components/Context/MainContext";
import {
  ChevronRight,
  Edit,
  Edit3,
  PenLine,
  PlusCircle,
  SaveIcon,
  Trash2Icon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "../../components/Context/AuthContext";
import Asuulga from "./Asuulga";

const Sudalgaa = () => {
  useEffect(() => {
    getSudalgaa(user?._id);
  }, []);
  const { yearState, user } = useAuth();
  const {
    getAsuulga,
    asuulgaState,
    getSudalgaa,
    sudalgaaState,
    sudalgaaOneState,
    setSudalgaaOneState,
    addSudalgaa,
    updateSudalgaa,
    deleteSudalgaa,
  } = useCtx();

  return (
    <Tabs defaultValue="sudalgaa" className="w-full">
      <TabsList>
        <TabsTrigger value="sudalgaa">Судалгаа</TabsTrigger>
        <TabsTrigger value="asuulga">Асуулга</TabsTrigger>
      </TabsList>
      <TabsContent value="sudalgaa">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-center">Судалгааны жагсаалт</CardTitle>
          </CardHeader>

          <CardContent>
            <Dialog>
              <DialogTrigger>
                <Button
                  onClick={() => {
                    setSudalgaaOneState({
                      school_id: "5f79236c2e13c437e888fe21",
                      department_id: user?.department?._id,
                      teacher_id: user?._id,
                      yearLesson: "2024-2025",
                      semister: 2,
                      typeSurvey: "Суралцаж буй оюутны санал асуулга",
                      kurs: [],
                      isActive: false,
                      startDate: "",
                      endDate: "",
                      listAsuulga: [],
                      section: "",
                    });
                  }}
                  className=""
                  variant="outline"
                >
                  <PlusCircle /> Судалгаа үүсгэх
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
                <DialogTrigger>
                  <Button
                    onClick={() => {
                      addSudalgaa(sudalgaaOneState);
                    }}
                    className="ml-auto"
                    variant="outline"
                  >
                    <SaveIcon /> Хадгалах
                  </Button>
                </DialogTrigger>
              </DialogContent>
            </Dialog>

            <Table className="mt-2">
              <TableHeader>
                <TableRow>
                  <TableHead>№</TableHead>
                  <TableHead>Судалгааны нэр</TableHead>
                  <TableHead>Огноо</TableHead>
                  <TableHead>Эхлэх огноо</TableHead>
                  <TableHead>Дуусах огноо</TableHead>
                  <TableHead>Идвэхтэй эсэх</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sudalgaaState.map((sud, index) => {
                  return (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{sud.name}</TableCell>
                      <TableCell>
                        {sud.yearLesson} - {sud.semister}-р ул
                      </TableCell>
                      <TableCell>{sud.startDate}</TableCell>
                      <TableCell>{sud.endDate}</TableCell>
                      <TableCell>
                        <Switch
                          onCheckedChange={
                            (value) => {}
                            // updateAjil({ _id: item._id, isPublished: value })
                          }
                          checked={sud.isActive}
                        />
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Link to={`${sud._id}`}>
                          <Button
                            variant="outline"
                            size="icon"
                            className="flex gap-2 "
                          >
                            <Edit3 className="size-4 text-blue-600 " />
                          </Button>
                        </Link>
                        <Dialog>
                          <DialogTrigger>
                            <Button
                              variant="outline"
                              size="icon"
                              className="flex gap-2"
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
                                    deleteSudalgaa(sud._id);
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
      </TabsContent>
      <TabsContent value="asuulga">
        <Asuulga />
      </TabsContent>
    </Tabs>
  );
};

export default Sudalgaa;
