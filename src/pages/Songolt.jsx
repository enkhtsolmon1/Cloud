import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useCtx } from "../components/Context/MainContext";
import { useAuth } from "../components/Context/AuthContext";
import { useEffect, useState } from "react";
import SongoltTimer from "../components/others/SongoltTimer";

export default function Songolt() {
  const { user, studentOne } = useAuth();
  const {
    chooseLessonState,
    getChooseLesson,
    addLessonProg,
    deleteLessonProg,
  } = useCtx();

  useEffect(() => {
    getChooseLesson(user?._id);
  }, []);
  const [isCooldown, setIsCooldown] = useState(true);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Хичээл сонголт</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <SongoltTimer isCooldown={isCooldown} setIsCooldown={setIsCooldown} />
        {isCooldown && (
          <div className="">
            {chooseLessonState
              .sort((a, b) => (a.dugaar > b.dugaar ? 1 : -1))
              .map((item, index) => (
                <div className="border-b p-4" key={index}>
                  <p className="text-center font-bold uppercase">
                    {item.dugaar} {item.name} -{" "}
                    <span className="text-red-600">
                      {" "}
                      {item.chooseOfKredit}кр Сонгох{" "}
                    </span>
                  </p>
                  <div className="space-y-2 mt-2">
                    {item.programPlanLessons.map((lesson, index) => (
                      <div
                        className="flex justify-between pl-2 items-center odd:bg-gray-200 odd:dark:text-black"
                        key={index}
                      >
                        <div className="flex flex-col md:flex-row text-xs md:text-sm">
                          <div>
                            <span className="font-bold">{index + 1}</span>.{" "}
                            {lesson.lesson_id?.name}{" "}
                            <span className="font-bold">
                              - {lesson.programLesson_id?.credit}кр
                            </span>
                          </div>
                          <Dialog>
                            <DialogTrigger className="text-white w-32 rounded-lg ml-2 border bg-blue-600">
                              {lesson.lessonInstruction[0]?.countStud} -{" "}
                              {lesson.students?.length} сонгсон
                            </DialogTrigger>
                            <DialogContent className="max-h-[85%] overflow-auto">
                              <DialogHeader>
                                <DialogTitle>
                                  Сонгсон оюутны жагсаалт
                                </DialogTitle>
                              </DialogHeader>

                              <table className="text-left border text-xs  h-full">
                                <tr>
                                  <th className="border p-1">Нэр</th>
                                  <th className="border p-1">Анги</th>
                                </tr>
                                <tbody>
                                  {lesson.students?.map((st, index) => {
                                    return (
                                      <tr className="">
                                        <td className="p-1 border">
                                          {st.firstName} {st.lastName}
                                        </td>
                                        <td className="p-1 border">
                                          {st.className}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </DialogContent>
                          </Dialog>
                        </div>
                        {lesson.students?.find((el) => el._id === user?._id) ? (
                          <button
                            onClick={() => {
                              deleteLessonProg(lesson._id, {
                                _id: user?._id,
                              });
                            }}
                            className="bg-rose-600 hover:bg-rose-700 text-xs md:text-sm px-4 py-1 rounded text-white"
                            variant="outline"
                          >
                            Цуцлах
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              addLessonProg(lesson._id, {
                                _id: studentOne?._id,
                                lastName: studentOne.lastName,
                                firstName: studentOne?.firstName,
                                className:
                                  studentOne?.class_id?.name +
                                  "-" +
                                  studentOne?.class_id?.kurs_id,
                                teacher_id: "5fd10e0040c6872550acb148",
                                teacherFullName: "Буяндэлгэр",
                              });
                            }}
                            className="bg-green-600 hover:bg-green-700 text-xs md:text-sm px-4 py-1 rounded text-white"
                            variant="outline"
                          >
                            Сонгох
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
