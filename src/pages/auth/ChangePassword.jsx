import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "../../components/Context/AuthContext";

export default function ChangePassword() {
  const { changePassTeacher, user, changePasswordStudent, checkRole } =
    useAuth();
  const [data, setdata] = useState({
    email: user?.email,
    password: "",
    newpassword: "",
    newpassword1: "",
  });
  return (
    <Card className="w-full md:max-w-xs">
      <CardHeader>
        <CardTitle className="text-2xl">Нууц үг солих</CardTitle>
        {/* <CardDescription>
            Enter your email below to login to your account
          </CardDescription> */}
      </CardHeader>
      <CardContent className="">
        <div className="flex flex-col gap-4">
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Хуучин нууц үг</Label>
            </div>
            <Input
              onChange={(e) => {
                setdata({ ...data, password: e.target.value });
              }}
              id="password"
              type="password"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Шинэ нууц үг</Label>
            </div>
            <Input
              onChange={(e) => {
                setdata({ ...data, newpassword: e.target.value });
              }}
              id="password"
              type="password"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Шинэ нууц үг давтах</Label>
            </div>
            <Input
              onChange={(e) => {
                setdata({ ...data, newpassword1: e.target.value });
              }}
              id="password"
              type="password"
              required
            />
          </div>
          <Button
            onClick={() => {
              if (checkRole(["Student"], user?.rols)) {
                changePasswordStudent(data);
              } else {
                changePassTeacher(data);
              }
            }}
            className="w-full"
          >
            Нууц үг солих
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
