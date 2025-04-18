import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Folder, FolderOpen } from "lucide-react";

const Database = () => {
  return (
    <Card className="">
      <CardHeader></CardHeader>
      <CardContent>
        {[
          {
            title: "2024-2025 оны элсэлт, шилжилт , төгсөлтийн тушаалууд",
            subs: [
              {
                title:
                  "2024.10.14 A496 Бакалаврын өдрийн хөтөлбөрт намрын элсэлтийн тушаал Орон нутаг",
                link: "https://drive.google.com/file/d/1_MNgECnRSlut-lykWXzenfsIttMnjnyV/preview",
              },
              {
                title: "2024.10.14 А-503 эчнээ",
                link: "https://drive.google.com/file/d/1F3QnOrkAhxM4sFNLH1OiRWIrFgksk63a/preview",
              },
              {
                title: "2024.10.31 A-546 иргэн",
                link: "https://drive.google.com/file/d/1VycOhfv8_r_qmb5IDbAYSvdEA8v4FKMe/preview",
              },
              {
                title: "Салбар сургуулийн шилжилтийн тушаал 2024.11.1.01 А.555",
                link: "https://drive.google.com/file/d/1Pp1VTn2FJrvRPYs-9SaT5vuNt-oepRpM/preview",
              },
            ],
          },
          {
            title: "МУИС-ийн хөдөлмөрийн дотоод журам",
            subs: [
              {
                title: "Шинэ багш ажилд авах тухай",
                link: "https://drive.google.com/file/d/1IgIiK7pwlMRHnOmLyAWq__8Gqrs13qkg/preview",
              },
              {
                title: "Шинэ ажилтан ажилд авах тухай",
                link: "https://drive.google.com/file/d/1rvfcX4BDVCKE4fW4wQ0gZ1NERbgnjc4h/preview",
              },
              {
                title: "Чөлөө, томилолт",
                link: "https://drive.google.com/file/d/1VbGjOpgw0GaMQDPQl5GwIWZDN2E1ySkB/preview",
              },
              {
                title: "Хөдөлмөрийн гэрээ байгуулах, дуусгавар болгох",
                link: "https://drive.google.com/file/d/155V3BcVs_9geR3i43Xzhvs-Qm9iBrlt1/preview",
              },
              {
                title: "Цалин хөлс, нийгмийн хамгаалал, шагнал, урамшуулал",
                link: "https://drive.google.com/file/d/1Zxazh-85f9k_stm71teYP5jg0V9jJYA5/preview",
              },
              {
                title: "Хөдөлмөрийн аюулгүй байдал, эрүүл ахуй",
                link: "https://drive.google.com/file/d/1P3ye5QfZBMp3SXF-Kz2FZNC8yYciSlT8/preview",
              },
              {
                title: "Хөдөлмөрийн сахилгын зөрчил, хүлээлгэх хариуцлага",
                link: "https://drive.google.com/file/d/1q4VjBGRDV-Qf6MstRpkvstx_HIkFXifL/preview",
              },
              {
                title: "Ажил, амралтын цаг",
                link: "https://drive.google.com/file/d/1--eV-F3DYiPfdVMd3J_7KRHB3fW-doE9/preview",
              },
              {
                title: "Хичээл нөхөх хуваарь, батлагдсан загвар",
                link: "https://drive.google.com/file/d/1eg0MFatiqQ-fSMznEL14oLFjhyI0ah5n/preview",
              },
            ],
          },
          {
            title: "МУИС-ийн хөдөлмөрийн гэрээ",
            subs: [
              {
                title: "Хөдөлмөрийн гэрээ-багш",
                link: "https://drive.google.com/file/d/1xm9AECFw77DAOdtOE0S4TxOQBNv3i6ob/preview",
              },
              {
                title: "Хөдөлмөрийн гэрээ-ажилтан",
                link: "https://drive.google.com/file/d/1MRzB3Sp4BlUR2yb2X-ISJ-X_fE9xHIEQ/preview",
              },
            ],
          },
        ].map((item, index) => {
          return (
            <div key={index} className="space-y-2  mb-6">
              <p className="text-center uppercase font-medium">{item.title}</p>
              <div className="space-y-2">
                {item.subs.map((el, i) => {
                  return (
                    <div className="flex justify-between gap-2 px-4">
                      <FolderOpen className="text-pink-600" />{" "}
                      <p className="border-b w-full mr-2 text-gray-800">
                        {el.title}{" "}
                      </p>
                      <Dialog>
                        <DialogTrigger>
                          <Button size="sm" className="bg-blue-600 rounded-sm">
                            Үзэх
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl  h-[90%]">
                          <iframe
                            src={el.link}
                            className="w-full h-full mt-4"
                          ></iframe>
                        </DialogContent>
                      </Dialog>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default Database;
