import React from "react";
import { useCtx } from "../../components/Context/MainContext";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const StudentSudalgaa = () => {
  const { getSudalgaaStudent, sudalgaaStudent } = useCtx();
  console.log("🚀 ~ StudentSudalgaa ~ sudalgaaStudent:", sudalgaaStudent);
  useEffect(() => {
    getSudalgaaStudent();
  }, []);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Судалгааны жагсаалт</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        {sudalgaaStudent?.sudalgaa?.name}
        <Tabs
          // defaultValue={sudalgaaStudent?.listTeachers[0]?._id}
          className="mt-2"
        >
          <TabsList className="flex flex-wrap gap-2 max-w-max justify-start h-auto">
            {sudalgaaStudent?.listTeachers?.map((item, index) => {
              return (
                <TabsTrigger
                  key={index}
                  className="border flex flex-col"
                  value={item._id}
                >
                  <p>{item.teacher_id?.butenNer}</p>
                  <p className="text-xs">Монгол хэл</p>
                </TabsTrigger>
              );
            })}
          </TabsList>
          {sudalgaaStudent?.listTeachers?.map((item, index) => {
            return (
              <TabsContent value={item._id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{item.teacher_id?.butenNer}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {sudalgaaStudent.sudalgaa?.listAsuulga?.map(
                      (asuulga, aindex) => {
                        return (
                          <div key={aindex}>
                            <p>{asuulga._id}</p>
                          </div>
                        );
                      }
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StudentSudalgaa;
