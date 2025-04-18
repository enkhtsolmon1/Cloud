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
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "../../components/Context/AuthContext";
import { useState } from "react";
import moment from "moment-timezone";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Download,
  Eye,
  FileText,
  FolderIcon,
  ImageIcon,
  Plus,
  PlusCircle,
  Trash2Icon,
  UserRoundPenIcon,
} from "lucide-react";
import { toast } from "sonner";
export default function Profile() {
  const {
    teacherOne,
    setteacherOne,
    addEduTeacher,
    updateEduTeacher,
    deleteEduTeacher,
    addShagnal,
    updateShagnal,
    deleteShagnal,
    shagnal,
    setShagnal,
    eduData,
    setEduData,
    sheepOpen,
    setSheetOpen,
    addSudalgaa,
    deleteSudalgaa,
    uploadTeacherFile,
    deleteTeacherFile,
  } = useAuth();

  const [sudState, setSudState] = useState({
    sudalgaa_type: "Сургалт",
  });

  const [ufile, setuFile] = useState({
    comment: "",
    file: {},
    turul: "",
  });

  const uploadFile = (files) => {
    const photo = new FormData();
    photo.append("file", files[0]);
    photo.append("turul", ufile.turul);
    photo.append("comment", ufile.comment);
    setuFile({ ...ufile, file: photo });
  };
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="">
        <TabsTrigger value="account">Хувийн мэдээлэл</TabsTrigger>
        <TabsTrigger value="edu">Боловсролын мэдлээлэл</TabsTrigger>
        <TabsTrigger value="shagnal">Шагналын мэдээлэл</TabsTrigger>
        <TabsTrigger value="chuluu">Мэргэжил дээшлүүлэлт</TabsTrigger>
        <TabsTrigger value="file">Файлын сан</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Хувийн мэдээлэл</CardTitle>
            <CardDescription>
              {/* Make changes to your account here. Click save when you're done. */}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <div className="space-y-1">
                <Label>Яс үндэс</Label>
                <Select
                  onValueChange={(value) => {
                    setteacherOne({ ...teacherOne, race: value });
                  }}
                  value={teacherOne?.race}
                >
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Яс үндэс сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Дөрвөд",
                      "Халх",
                      "Баяд",
                      "Захчин",
                      "Казах",
                      "Өөлд",
                      "Буриад",
                      "Дарьганга",
                      "Урианхай",
                      "Дархад",
                      "Торгууд",
                      "Хотгойд",
                      "Мянгад",
                      "Хотон",
                      "Үзэмчин",
                      "Барга",
                      "Харчин",
                      "Цахар",
                      "Хорчин",
                      "Уйгар",
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
              <div className="space-y-1">
                <Label>Ургийн овог</Label>
                <Input
                  disabled
                  onChange={(e) => {
                    setteacherOne({ ...teacherOne, surName: e.target.value });
                  }}
                  value={teacherOne.surName}
                />
              </div>
              <div className="space-y-1">
                <Label>Овог</Label>
                <Input
                  disabled
                  onChange={(e) => {
                    setteacherOne({ ...teacherOne, lastname: e.target.value });
                  }}
                  value={teacherOne.lastname}
                />
              </div>
              <div className="space-y-1">
                <Label>Нэр</Label>
                <Input
                  disabled
                  onChange={(e) => {
                    setteacherOne({ ...teacherOne, lastname: e.target.value });
                  }}
                  value={teacherOne.firstname}
                />
              </div>
              <div className="space-y-1">
                <Label>Регистрийн дугаар</Label>
                <Input
                  disabled
                  onChange={(e) => {
                    setteacherOne({ ...teacherOne, regnum: e.target.value });
                  }}
                  value={teacherOne.regnum}
                />
              </div>
              <div className="space-y-1">
                <Label>Төрсөн он, сар, өдөр</Label>
                <Input
                  disabled
                  onChange={(e) => {
                    setteacherOne({ ...teacherOne, regnum: e.target.value });
                  }}
                  value={teacherOne.regnum}
                />
              </div>
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  disabled
                  onChange={(e) => {
                    setteacherOne({ ...teacherOne, email: e.target.value });
                  }}
                  value={teacherOne.email}
                />
              </div>
              <div className="grid items-center gap-1.5">
                <Label> Боловсролын зэрэг</Label>
                <Select
                  onValueChange={(value) =>
                    setteacherOne({
                      ...teacherOne,
                      educationalLevel: value,
                    })
                  }
                  value={teacherOne.educationalLevel}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Боловсролын зэрэг" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {["Бакалавр", "Магистр", "Доктор"].map((item, index) => {
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
            </div>
          </CardContent>
          <CardFooter>
            <Button>Хадгалах</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="edu">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Боловсролын мэдэээлэл</CardTitle>
            {/* <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription> */}
          </CardHeader>
          <CardContent className="space-y-2">
            <Dialog open={sheepOpen} onOpenChange={setSheetOpen}>
              <DialogTrigger>
                <Button
                  onClick={() => {
                    setEduData({
                      country: "Монгол",
                      city: "",
                      university: "",
                      profession: "",
                      eduLevel: "Бакалавр",
                      startDate: 2025,
                      endDate: 2025,
                      tailbar: "",
                      dugaar: "",
                      chiglel: "",
                    });
                    setSheetOpen(true);
                  }}
                  variant="outline"
                  className="flex gap-2"
                >
                  <PlusCircle className="size-4  " />
                  Бүртгэх
                </Button>
              </DialogTrigger>
              <DialogContent className="flex flex-col">
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-2">
                  <div className="grid items-center gap-1.5">
                    <Label>Улс</Label>
                    <Select
                      onValueChange={(value) =>
                        setEduData({
                          ...eduData,
                          country: value,
                        })
                      }
                      value={eduData?.country}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Улс" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {["Монгол", "Хятад", "Орос", "Солонгос", "Япон"].map(
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
                  <div className="flex flex-col space-y-1.5">
                    <Label>Хот</Label>
                    <Input
                      onChange={(e) => {
                        setEduData({
                          ...eduData,
                          city: e.target.value,
                        });
                      }}
                      value={eduData?.city}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label>Сургуулийн нэр</Label>
                    <Input
                      onChange={(e) => {
                        setEduData({
                          ...eduData,
                          university: e.target.value,
                        });
                      }}
                      value={eduData?.university}
                    />
                  </div>
                  <div className="grid items-center gap-1.5">
                    <Label>Зэрэг</Label>
                    <Select
                      onValueChange={(value) =>
                        setEduData({
                          ...eduData,
                          eduLevel: value,
                        })
                      }
                      value={eduData?.eduLevel}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Боловсролын зэрэг" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {["Бакалавр", "Магистр", "Доктор"].map(
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
                  <div className="flex flex-col space-y-1.5">
                    <Label>Хамгаалсан сэдэв</Label>
                    <Input
                      onChange={(e) => {
                        setEduData({
                          ...eduData,
                          sedev: e.target.value,
                        });
                      }}
                      value={eduData?.sedev}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label>Элссэн огноо</Label>
                    <Input
                      type="number"
                      onChange={(e) => {
                        setEduData({
                          ...eduData,
                          startDate: e.target.value,
                        });
                      }}
                      value={eduData?.startDate}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label>Төгссөн огноо</Label>
                    <Input
                      type="number"
                      onChange={(e) => {
                        setEduData({
                          ...eduData,
                          endDate: e.target.value,
                        });
                      }}
                      value={eduData?.endDate}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label>Дипломны дугаар</Label>
                    <Input
                      onChange={(e) => {
                        setEduData({
                          ...eduData,
                          dugaar: e.target.value,
                        });
                      }}
                      value={eduData?.dugaar}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label>Төгссөн мэргэжил, чиглэл</Label>
                    <Input
                      onChange={(e) => {
                        setEduData({
                          ...eduData,
                          chiglel: e.target.value,
                        });
                      }}
                      value={eduData?.chiglel}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label>Тайлбар</Label>
                    <Input
                      onChange={(e) => {
                        setEduData({
                          ...eduData,
                          tailbar: e.target.value,
                        });
                      }}
                      value={eduData?.tailbar}
                    />
                  </div>
                  <Button
                    onClick={() => {
                      if (eduData._id) {
                        updateEduTeacher(teacherOne._id, eduData);
                      } else {
                        addEduTeacher(teacherOne._id, eduData);
                      }
                    }}
                  >
                    Хадгалах
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Table className="mt-4 text-xs">
              <TableHeader>
                <TableRow>
                  <TableHead>Хаана</TableHead>
                  <TableHead>Сургуулын нэр</TableHead>
                  <TableHead>Зэрэг</TableHead>
                  <TableHead>Сэдэв</TableHead>
                  <TableHead>Огноо</TableHead>
                  <TableHead>Дипломны дугаар</TableHead>
                  <TableHead>Төгссөн мэргэжил, чиглэл</TableHead>
                  <TableHead>Тайлбар</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teacherOne?.education?.map((el, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        {el.country}, {el.city}
                      </TableCell>
                      <TableCell>{el.university}</TableCell>
                      <TableCell>{el.eduLevel}</TableCell>
                      <TableCell>{el.sedev}</TableCell>
                      <TableCell>
                        {el.startDate} - {el.endDate}
                      </TableCell>
                      <TableCell>{el.dugaar}</TableCell>
                      <TableCell>{el.chiglel}</TableCell>
                      <TableCell>{el.tailbar}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          onClick={() => {
                            setEduData(el);
                            setSheetOpen(true);
                          }}
                          variant="outline"
                          size="icon"
                          className="flex gap-2 size-7"
                        >
                          <UserRoundPenIcon className="size-4 text-blue-600 " />
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
                                    deleteEduTeacher(teacherOne?._id, {
                                      _id: el._id,
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
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="shagnal">
        <Card>
          <CardHeader>
            <CardTitle>Шагналын мэдээлэл</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Dialog open={sheepOpen} onOpenChange={setSheetOpen}>
              <DialogTrigger>
                <Button
                  onClick={() => {
                    setEduData({
                      country: "Монгол",
                      city: "",
                      university: "",
                      profession: "",
                      eduLevel: "Бакалавр",
                      startDate: 2025,
                      endDate: 2025,
                      tailbar: "",
                      dugaar: "",
                      chiglel: "",
                    });
                    setSheetOpen(true);
                  }}
                  variant="outline"
                  className="flex gap-2"
                >
                  <PlusCircle className="size-4  " />
                  Бүртгэх
                </Button>
              </DialogTrigger>
              <DialogContent className="flex flex-col">
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-2 ">
                  <div className="flex flex-col space-y-1.5 col-span-2">
                    <Label>Шагналын нэр</Label>
                    <Input
                      onChange={(e) => {
                        setShagnal({
                          ...shagnal,
                          name: e.target.value,
                        });
                      }}
                      value={shagnal.name}
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label>Он</Label>
                    <Input
                      onChange={(e) => {
                        setShagnal({
                          ...shagnal,
                          ognoo: e.target.value,
                        });
                      }}
                      value={shagnal.ognoo}
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label>Тушаал</Label>
                    <Input
                      onChange={(e) => {
                        setShagnal({
                          ...shagnal,
                          tushaal: e.target.value,
                        });
                      }}
                      value={shagnal.tushaal}
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label>Дугаар</Label>
                    <Input
                      onChange={(e) => {
                        setShagnal({
                          ...shagnal,
                          dugaar: e.target.value,
                        });
                      }}
                      value={shagnal.dugaar}
                    />
                  </div>
                  <div className="grid items-center gap-1.5">
                    <Label>Шагналын төрөл</Label>
                    <Select
                      onValueChange={(value) =>
                        setShagnal({
                          ...shagnal,
                          type: value,
                        })
                      }
                      value={teacherOne.type}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Шагналын төрөл" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {[
                            "Төрийн дээд",
                            "Системийн",
                            "Аймгийн",
                            "Сургуулийн",
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

                  <div className="flex flex-col space-y-1.5 col-span-2">
                    <Label>Тайлбар</Label>
                    <Input
                      onChange={(e) => {
                        setShagnal({
                          ...shagnal,
                          tailbar: e.target.value,
                        });
                      }}
                      value={shagnal.tailbar}
                    />
                  </div>

                  <Button
                    className="col-span-2 ml-auto"
                    onClick={() => {
                      if (shagnal._id) {
                        updateShagnal(teacherOne._id, shagnal);
                      } else {
                        addShagnal(teacherOne._id, shagnal);
                      }
                    }}
                  >
                    Хадгалах
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>Шагналын нэр</TableHead>
                  <TableHead>Огноо</TableHead>
                  <TableHead>Тушаал</TableHead>
                  <TableHead>Дугаар</TableHead>
                  <TableHead>Төрөл</TableHead>
                  <TableHead>Тайлбар</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teacherOne?.shagnal?.map((el, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{el.name}</TableCell>
                      <TableCell>{el.ognoo}</TableCell>
                      <TableCell>{el.tushaal}</TableCell>
                      <TableCell>{el.dugaar}</TableCell>
                      <TableCell>{el.type}</TableCell>
                      <TableCell>{el.tailbar}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          onClick={() => {
                            setShagnal(el);
                            setSheetOpen(true);
                          }}
                          variant="outline"
                          size="icon"
                          className="flex gap-2 size-7"
                        >
                          <UserRoundPenIcon className="size-4 text-blue-600 " />
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
                                    deleteShagnal(teacherOne?._id, {
                                      _id: el._id,
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
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="chuluu">
        <Card>
          <CardHeader>
            <CardDescription></CardDescription>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  <PlusCircle />
                  Сургалт
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Сургалт нэмэх</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label>Зорчсон улс, хот</Label>
                        <Input
                          onChange={(e) =>
                            setSudState({
                              ...sudState,
                              country: e.target.value,
                            })
                          }
                          value={sudState.country}
                          type="text"
                        />
                      </div>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label>Огноо</Label>
                        <Input
                          onChange={(e) =>
                            setSudState({
                              ...sudState,
                              surgalt_date: e.target.value,
                            })
                          }
                          value={sudState.surgalt_date}
                          type="date"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label>Сургалтын нэр</Label>
                        <Input
                          onChange={(e) =>
                            setSudState({
                              ...sudState,
                              surgalt_name: e.target.value,
                            })
                          }
                          value={sudState.surgalt_name}
                          type="text"
                        />
                      </div>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label>Сургалтын зорилго, чиглэл</Label>
                        <Input
                          onChange={(e) =>
                            setSudState({
                              ...sudState,
                              surgalt_zorilgo: e.target.value,
                            })
                          }
                          value={sudState.surgalt_zorilgo}
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label>Дэлгэрэнгүй тайлбар</Label>
                      <textarea
                        className="border rounded p-1 h-28"
                        onChange={(e) =>
                          setSudState({
                            ...sudState,
                            tailbar: e.target.value,
                          })
                        }
                        value={sudState.tailbar}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogTrigger>
                    <Button
                      onClick={() => {
                        addSudalgaa(teacherOne?._id, sudState);
                      }}
                    >
                      Хадгалах
                    </Button>
                  </DialogTrigger>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-center font-semibold uppercase">
              Мэргэжил дээшлүүлсэн байдал{" "}
            </p>
            <table className="border text-xs w-full  mt-1">
              <tr className="border">
                <th className="border p-1">№</th>
                <th className="border p-1">Огноо</th>
                <th className="border p-1">Зорчсон улс, хот</th>
                <th className="border p-1">Сургалтын нэр</th>
                <th className="border p-1">Сургалтын зорилго, чиглэл</th>
                <th className="border p-1">Тайлбар</th>
              </tr>

              <tbody>
                {teacherOne?.sudalgaa
                  ?.filter((el) => el.sudalgaa_type === "Сургалт")
                  .map((sud, index) => {
                    return (
                      <tr key={index} className="border">
                        <td className="border p-1">{index + 1}</td>
                        <td className="border p-1">{sud.surgalt_date}</td>
                        <td className="border p-1">{sud.country}</td>
                        <td className="border p-1">{sud.surgalt_name}</td>
                        <td className="border p-1">{sud.surgalt_zorilgo}</td>
                        <td className="border p-1">{sud.tailbar}</td>
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
                                  <h1>Устгахдаа итгэлтэй байна уу?</h1>
                                </DialogTitle>
                              </DialogHeader>
                              <div className="w-full flex justify-evenly mt-2 gap-2">
                                <DialogTrigger>
                                  <Button
                                    className=""
                                    onClick={() => {
                                      deleteSudalgaa(teacherOne._id, {
                                        _id: sud._id,
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
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {/* <p className="text-center font-semibold uppercase">
              Чөлөөний мэдээлэл
            </p>
            <table className="border text-xs w-full  mt-1">
              <tr className="border">
                <th className="border p-1">№</th>
                <th className="border p-1">Чөлөөний төрөл</th>
                <th className="border p-1">Тушаалын дугаар</th>
                <th className="border p-1">Тушаалын огноо</th>
                <th className="border p-1">Эхлэх огноо</th>
                <th className="border p-1">Дуусах огноо</th>
                <th className="border p-1">Цалинтай өдрийн тоо</th>
                <th className="border p-1">Цалингүй өдрийн тоо</th>
                <th className="border p-1">
                  Зорчсон улс, хот, аймаг, сумын нэр
                </th>
                <th className="border p-1">Олгосон зардал</th>
                <th className="border p-1">Тайлбар</th>
              </tr>

              <tbody>
                {teacherOne?.sudalgaa
                  ?.filter((el) => el.sudalgaa_type === "Чөлөө")
                  .map((sud, index) => {
                    return (
                      <tr key={index} className="border">
                        <td className="border p-1">{index + 1}</td>

                        <td className="border p-1">{sud.turul}</td>
                        <td className="border p-1">{sud.tushaal_dugaar}</td>
                        <td className="border p-1">{sud.tushaal_date}</td>
                        <td className="border p-1">{sud.startDate}</td>
                        <td className="border p-1">{sud.endDate}</td>
                        <td className="border p-1">{sud.paidDay}</td>
                        <td className="border p-1">{sud.unpaidDay}</td>
                        <td className="border p-1">{sud.country}</td>
                        <td className="border p-1">{sud.cost}</td>
                        <td className="border p-1">{sud.tailbar}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table> */}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="file">
        <Card>
          <CardHeader>
            <CardTitle>Файлын сан</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="w-full flex items-end gap-2">
              <div className="flex flex-col space-y-1.5 col-span-2">
                <Label>Файлын төрөл</Label>
                <Select
                  onValueChange={(value) =>
                    setuFile({ ...ufile, turul: value })
                  }
                  value={ufile.turul}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {["Аттестатчилал", "Дипломын хуулбар"].map(
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
              <div className="flex flex-col space-y-1.5 col-span-2">
                <Label>Тайлбар</Label>
                <Input
                  onChange={(e) => {
                    setuFile({ ...ufile, comment: e.target.value });
                  }}
                  value={ufile.comment}
                />
              </div>
              <div className="flex flex-col space-y-1.5 col-span-2">
                <Label>Файл</Label>
                <Input
                  id=""
                  onChange={(e) => {
                    uploadFile(e.target.files);
                  }}
                  type="file"
                />
              </div>
              <div className="flex flex-col space-y-1.5 col-span-2">
                <Label></Label>
                <Button
                  onClick={() => {
                    // uploadTeacherFile(teacherOne._id, ufile);
                    toast.warning("Файл оруулах үйлдэл түр хаагдсан.");
                  }}
                  variant="outline"
                >
                  Хадгалах
                </Button>
              </div>
            </div>
            <p>Файлын жагсаалт</p>
            <table className="border text-xs w-full  mt-1">
              <tr className="border">
                <th className="border p-1">№</th>
                <th className="border p-1">Файлын нэр</th>
                <th className="border p-1">Файлын төрөл</th>
                <th className="border p-1">Тайлбар</th>
                <th className="border p-1">Тушаалын дугаар</th>
              </tr>
              <tbody>
                {teacherOne?.fileSan?.map((item, index) => {
                  return (
                    <tr key={index} className="border">
                      <td className="border p-1 text-center">{index + 1}</td>
                      <td className=" p-1 flex items-center gap-2">
                        {item.fileType === "image" ? (
                          <ImageIcon className="size-4 text-blue-600" />
                        ) : (
                          <FileText className="size-4 text-blue-600" />
                        )}
                        {item.name} | {item.fileSize}
                      </td>
                      <td className="border p-1">{item.turul}</td>
                      <td className="border p-1">{item.comment}</td>
                      <td className=" p-1 flex gap-4 justify-center">
                        <a
                          target="_blank"
                          href={`http://west.edu.mn:3000/upload/ajil/${item.name}`}
                        >
                          <Button
                            className="size-7"
                            variant="outline"
                            size="icon"
                          >
                            <Download className="text-blue-600" />
                          </Button>
                        </a>
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
                                    deleteTeacherFile(teacherOne._id, item);
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
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
