import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PrinterIcon } from "lucide-react";
import moment from "moment-timezone";
import React, { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useReactToPrint } from "react-to-print";
import { useAuth } from "../../components/Context/AuthContext";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TimePlanprint({
  tpOpen,
  settpOpen,
  timePlanState,
  calcnorm,
}) {
  const nowDate = moment().tz("Asia/Hovd").format("YYYY-MM-DD");
  const { user, teacherOne } = useAuth();

  const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
      <div className="p-4 max-w-[297mm] w-full mx-auto" ref={ref}>
        <div className=" flex flex-col justify-center items-center gap-2 mt-4">
          <img
            width="60"
            src="https://auth.num.edu.mn/oauth2/Image/num-logo.svg"
            alt=""
          />
          <h1 className="uppercase font-medium">{teacherOne?.school?.name}</h1>
          <h1 className="text-center uppercase">
            Профессор багшийн сургалтын ажлын төлөвлөгөө, гүйцэтгэл
          </h1>
          <div className="text-[12px] text-center">
            <b>Тэнхим: </b> {teacherOne?.department?.name} <b>Овог: </b>
            {teacherOne?.lastname} <b>Нэр: </b>
            {teacherOne?.firstname} / {teacherOne?.educationalLevel} /
            <b>Албан тушаал: </b> {teacherOne?.typeOfTeacher}
            <b>Гүйцэтгэх багц цаг: </b> {calcnorm(teacherOne?.typeOfTeacher)}
          </div>
        </div>
        {/* ------------------------- */}

        <table className="w-full text-center text-xs border border-black mt-4">
          <tr>
            <th
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            >
              №
            </th>
            <th
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            >
              Хичээлийн нэр
            </th>
            <th
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              Тэнхим
            </th>
            <th
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              Оюутны тоо
            </th>
            <th
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              Хичээлийн <br /> хэлбэр
            </th>
            <th
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              7 хоногт <br /> орох цаг
            </th>
            <th
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            >
              СТ.Кр
            </th>
            <th
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              Багшийн авах кр
            </th>
            <th
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              Нийт заасан цаг
            </th>
            <th
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              Багшийн <br /> авсан кредит
            </th>
            <th
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                width: 150,
                fontSize: 12,
              }}
            >
              Тайлбар
            </th>
          </tr>
          {timePlanState
            .filter((el) => el.yearSemister === 1)
            .map((el, index) => {
              return (
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      borderCollapse: "collapse",
                      border: "1px solid",
                      borderColor: "#000",
                      fontSize: 12,
                    }}
                  >
                    {index + 1}
                  </td>
                  <td
                    style={{
                      borderCollapse: "collapse",
                      border: "1px solid",
                      borderColor: "#000",
                      fontSize: 12,
                    }}
                  >
                    {el.lesson_id.name}
                  </td>
                  <td
                    style={{
                      borderCollapse: "collapse",
                      border: "1px solid",
                      borderColor: "#000",
                      fontSize: 12,
                    }}
                  >
                    {el.department_id.shortName}
                  </td>
                  <td
                    style={{
                      borderCollapse: "collapse",
                      border: "1px solid",
                      borderColor: "#000",
                      fontSize: 12,
                    }}
                  >
                    {el.countStud}
                  </td>
                  <td
                    style={{
                      borderCollapse: "collapse",
                      border: "1px solid",
                      borderColor: "#000",
                      fontSize: 12,
                    }}
                  >
                    {el.lessonType}
                  </td>
                  <td
                    style={{
                      borderCollapse: "collapse",
                      border: "1px solid",
                      borderColor: "#000",
                      fontSize: 12,
                    }}
                  >
                    {el.stTime}
                  </td>
                  <td
                    style={{
                      borderCollapse: "collapse",
                      border: "1px solid",
                      borderColor: "#000",
                      fontSize: 12,
                    }}
                  >
                    {el.stKr}
                  </td>
                  <td
                    style={{
                      borderCollapse: "collapse",
                      border: "1px solid",
                      borderColor: "#000",
                      fontSize: 12,
                    }}
                  >
                    {parseFloat(el.stKrBagsh).toFixed(2)}
                  </td>
                  <td
                    style={{
                      borderCollapse: "collapse",
                      border: "1px solid",
                      borderColor: "#000",
                      fontSize: 12,
                    }}
                  >
                    {el.bagshTime}
                  </td>
                  <td
                    style={{
                      borderCollapse: "collapse",
                      border: "1px solid",
                      borderColor: "#000",
                      fontSize: 12,
                    }}
                  >
                    {el.bagshKr}
                  </td>
                  <td
                    style={{
                      borderCollapse: "collapse",
                      border: "1px solid",
                      borderColor: "#000",
                      fontSize: 12,
                    }}
                  ></td>
                </tr>
              );
            })}
          <tr>
            <td
              colspan="3"
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            >
              <b>1-р улирлын дүн</b>
            </td>
            <td
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            >
              <b>
                {timePlanState
                  .filter((el) => el.yearSemister === 1)
                  .reduce((acc, item) => acc + item.countStud, 0)}
              </b>
            </td>
            <td
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            ></td>
            <td
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            >
              <b>
                {timePlanState
                  .filter((el) => el.yearSemister === 1)
                  .reduce((acc, item) => acc + item.stTime, 0)
                  .toFixed(2)}
              </b>
            </td>
            <td
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            >
              <b>
                {timePlanState
                  .filter((el) => el.yearSemister === 1)
                  .reduce((acc, item) => acc + item.stKr, 0)
                  .toFixed(2)}
              </b>
            </td>
            <td
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            >
              <b>
                {timePlanState
                  .filter((el) => el.yearSemister === 1)
                  .reduce((acc, item) => acc + item.stKrBagsh, 0)
                  .toFixed(2)}
              </b>
            </td>
            <td
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            >
              <b>
                {timePlanState
                  .filter((el) => el.yearSemister === 1)
                  .reduce((acc, item) => acc + item.bagshTime, 0)
                  .toFixed(2)}
              </b>
            </td>
            <td
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            >
              <b>
                {timePlanState
                  .filter((el) => el.yearSemister === 1)
                  .reduce((acc, item) => acc + item.bagshKr, 0)
                  .toFixed(2)}
              </b>
            </td>
            <td
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            ></td>
          </tr>
          <br />
          {timePlanState
            .filter((el) => el.yearSemister === 2)
            .map((el, index) => {
              return (
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      borderCollapse: "collapse",
                      border: "1px solid",
                      borderColor: "#000",
                      fontSize: 12,
                    }}
                  >
                    {index + 1}
                  </td>
                  <td
                    style={{
                      borderCollapse: "collapse",
                      border: "1px solid",
                      borderColor: "#000",
                      fontSize: 12,
                    }}
                  >
                    {el.lesson_id.name}
                  </td>
                  <td
                    style={{
                      borderCollapse: "collapse",
                      border: "1px solid",
                      borderColor: "#000",
                      fontSize: 12,
                    }}
                  >
                    {el.department_id.shortName}
                  </td>
                  <td
                    style={{
                      borderCollapse: "collapse",
                      border: "1px solid",
                      borderColor: "#000",
                      fontSize: 12,
                    }}
                  >
                    {el.countStud}
                  </td>
                  <td
                    style={{
                      borderCollapse: "collapse",
                      border: "1px solid",
                      borderColor: "#000",
                      fontSize: 12,
                    }}
                  >
                    {el.lessonType}
                  </td>
                  <td
                    style={{
                      borderCollapse: "collapse",
                      border: "1px solid",
                      borderColor: "#000",
                      fontSize: 12,
                    }}
                  >
                    {el.stTime}
                  </td>
                  <td
                    style={{
                      borderCollapse: "collapse",
                      border: "1px solid",
                      borderColor: "#000",
                      fontSize: 12,
                    }}
                  >
                    {el.stKr}
                  </td>
                  <td
                    style={{
                      borderCollapse: "collapse",
                      border: "1px solid",
                      borderColor: "#000",
                      fontSize: 12,
                    }}
                  >
                    {parseFloat(el.stKrBagsh).toFixed(2)}
                  </td>
                  <td
                    style={{
                      borderCollapse: "collapse",
                      border: "1px solid",
                      borderColor: "#000",
                      fontSize: 12,
                    }}
                  >
                    {el.bagshTime}
                  </td>
                  <td
                    style={{
                      borderCollapse: "collapse",
                      border: "1px solid",
                      borderColor: "#000",
                      fontSize: 12,
                    }}
                  >
                    {el.bagshKr}
                  </td>
                  <td
                    style={{
                      borderCollapse: "collapse",
                      border: "1px solid",
                      borderColor: "#000",
                      fontSize: 12,
                    }}
                  ></td>
                </tr>
              );
            })}
          <tr>
            <td
              colspan="3"
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            >
              <b>2-р улирлын дүн</b>
            </td>
            <td
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            >
              <b>
                {timePlanState
                  .filter((el) => el.yearSemister === 2)
                  .reduce((acc, item) => acc + item.countStud, 0)}
              </b>
            </td>
            <td
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            ></td>
            <td
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            >
              <b>
                {timePlanState
                  .filter((el) => el.yearSemister === 2)
                  .reduce((acc, item) => acc + item.stTime, 0)
                  .toFixed(2)}
              </b>
            </td>
            <td
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            >
              <b>
                {timePlanState
                  .filter((el) => el.yearSemister === 2)
                  .reduce((acc, item) => acc + item.stKr, 0)
                  .toFixed(2)}
              </b>
            </td>
            <td
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            >
              <b>
                {parseFloat(
                  timePlanState
                    .filter((el) => el.yearSemister === 2)
                    .reduce((acc, item) => acc + item.stKrBagsh, 0)
                ).toFixed(2)}
              </b>
            </td>
            <td
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            >
              <b>
                {timePlanState
                  .filter((el) => el.yearSemister === 2)
                  .reduce((acc, item) => acc + item.bagshTime, 0)
                  .toFixed(2)}
              </b>
            </td>
            <td
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            >
              <b>
                {timePlanState
                  .filter((el) => el.yearSemister === 2)
                  .reduce((acc, item) => acc + item.bagshKr, 0)
                  .toFixed(2)}
              </b>
            </td>
            <td
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            ></td>
          </tr>
          <br />
          <tr>
            <td
              colspan="3"
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            >
              <b>Жилийн дүн</b>
            </td>
            <td
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            >
              <b>
                {timePlanState.reduce((acc, item) => acc + item.countStud, 0)}
              </b>
            </td>
            <td
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            ></td>
            <td
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            >
              <b>
                {timePlanState
                  .reduce((acc, item) => acc + item.stTime, 0)
                  .toFixed(2)}
              </b>
            </td>
            <td
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            >
              <b>
                {timePlanState
                  .reduce((acc, item) => acc + item.stKr, 0)
                  .toFixed(2)}
              </b>
            </td>
            <td
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            >
              <b>
                {timePlanState
                  .reduce((acc, item) => acc + item.stKrBagsh, 0)
                  .toFixed(2)}
              </b>
            </td>
            <td
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            >
              <b>
                {timePlanState
                  .reduce((acc, item) => acc + item.bagshTime, 0)
                  .toFixed(2)}
              </b>
            </td>
            <td
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            >
              <b>
                {Number.parseFloat(
                  timePlanState.reduce((acc, item) => acc + item.bagshKr, 0)
                ).toFixed(2)}
              </b>
            </td>
            <td
              style={{
                borderCollapse: "collapse",
                border: "1px solid",
                borderColor: "#000",
                fontSize: 12,
              }}
            ></td>
          </tr>
        </table>
        <div className="text-xs my-4 flex flex-col gap-2">
          <p variant="caption">
            Гүйцэтгэлийг хянасан тэнхимийн эрхлэгч:
            ..................................................................{" "}
            {teacherOne?.department?.manager}
          </p>
          <p>
            Хянасан: Сургалтын оюутны хэлтэсийн мэргэжилтэн
            ...................................................................{" "}
          </p>

          <div className="flex flex-row justify-between w-full">
            <p>
              Гүйцэтгэсэн багш:
              .................................................................................................{" "}
              {teacherOne?.lastname.slice(0, 1)}.{teacherOne?.firstname} /{" "}
              {teacherOne?.educationalLevel} /
            </p>

            <b>
              {nowDate}
              {/* {moment().format("YYYY")} оны {moment().format("MM")} сарын{" "}
              {moment().format("DD")} өдөр */}
            </b>
          </div>
        </div>
        {/* ------------------------- */}
      </div>
    );
  });

  const componentRef = useRef(null);

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "AwesomeFileName",
  });

  return (
    <Dialog open={tpOpen} onOpenChange={() => settpOpen(false)}>
      <DialogContent className="w-full max-w-7xl h-[90%]">
        <ScrollArea className="">
          <ComponentToPrint ref={componentRef} />
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
  );
}
