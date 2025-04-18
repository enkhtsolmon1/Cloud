import { Link, Outlet } from "react-router-dom";
import {
  AlertTriangle,
  Bell,
  BellRing,
  ChevronDown,
  ChevronsUpDown,
  Contact,
  FileClock,
  Info,
  Lock,
  LogOut,
  Mail,
  MonitorSmartphone,
  MoonIcon,
  Phone,
  QrCode,
  Send,
  SendIcon,
  SunIcon,
  UserPen,
  UserRoundPen,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { AppSidebar } from "./app-sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { useTheme } from "../Context/theme-provider";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";

export default function Layout() {
  const { setTheme, theme } = useTheme();
  const {
    user,
    logout,
    contactState,
    teacherOne,
    device,
    updateTeacher2,
    checkRole,
    notifState,
  } = useAuth();
  const [name, setname] = useState("");

  function isTodayBirthday(birthDateString) {
    const birthDate = new Date(birthDateString);
    const today = new Date();

    return (
      birthDate.getDate() === today.getDate() &&
      birthDate.getMonth() === today.getMonth()
    );
  }
  return (
    <SidebarProvider className="relative">
      <AppSidebar className="z-20" />
      <SidebarInset>
        <header className="flex sticky top-0 z-10 bg-white dark:bg-stone-900 h-16 shrink-0 items-center justify-between gap-2 border-b px-4 ">
          <div className="flex items-center gap-2 ">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <div className="flex gap-2">
            {/* {isTodayBirthday("2025-03-26") && (
              <div className="text-xl">HBT</div>
            )} */}
            {/* <div
              className="bg-indigo-600 cursor-pointer text-xs text-left px-2 flex justify-center items-center gap-2 rounded-lg text-white transition-all duration-500 hover:bg-indigo-700 hover:text-white"
              onClick={() => {}}
            >

              <MonitorSmartphone className="size-6" />
              <p className="flex gap-1 ">
                <span>Төхөөрөмж</span> <span className="">бүртгүүлэх</span>
              </p>
            </div> */}

            {/* <Button size="icon" onClick={() => {}} variant="outline">
              <QrCode />
            </Button> */}

            {/* {checkRole(
              ["admin", "employee", "teacher", "person"],
              user?.rols
            ) && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      onClick={() => {
                        updateTeacher2({
                          _id: teacherOne._id,
                          social1: device,
                        });
                      }}
                      variant="outline"
                      size="icon"
                      className="bg-blue-600 text-white hover:bg-blue-500 hover:text-white"
                    >
                      <Send className="transition-all duration-500 " />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Төхөөрөмж бүртгүүлэх</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )} */}

            <Button
              onClick={() => {
                theme === "dark" ? setTheme("light") : setTheme("dark");
              }}
              variant="outline"
              size="icon"
              className=""
            >
              {theme === "dark" ? (
                <MoonIcon className="animate-pulse" />
              ) : (
                <SunIcon className="animate-spin text-yellow-500" />
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative bg-yellow-300  text-neutral-900 hover:bg-yellow-300"
                >
                  <BellRing className="animate-pulse " />
                  <div className="absolute inline-flex items-center justify-center size-5 border text-xs text-white bg-pink-600 rounded-full -top-3 -end-2">
                    {notifState}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel>Мэдэгдлүүд </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {[1, 2, 3, 4, 5].map((item, index) => {
                  return (
                    <DropdownMenuItem key={index} className="cursor-pointer">
                      <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Info className="text-blue-600" />
                        {/* <AlertTriangle className="text-yellow-500" /> */}
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold">
                            Мэдэгдлийн нэр{" "}
                          </span>
                          <span className="text-xs">2025-02-02</span>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuSeparator />
                <Link to="notification">
                  <DropdownMenuItem className="cursor-pointer text-center text-blue-600 w-full font-medium">
                    Дэлгэрэнгүй
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex gap-2 border rounded-md px-2 items-center cursor-pointer">
                  {user?.butenNer}
                  <ChevronDown className="size-5" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal cursor-pointer ">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg bg-top bg-cover">
                      <AvatarImage
                        src={`http://west.edu.mn:3000/upload/images/${user.imagePath}`}
                        alt={user.butenNer}
                      />
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user.butenNer}
                      </span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="profile">
                  <DropdownMenuItem className="cursor-pointer">
                    <UserRoundPen className="size-6 text-purple-600" />
                    Хувийн мэдээлэл
                  </DropdownMenuItem>
                </Link>
                <Link to="change-password">
                  <DropdownMenuItem className="cursor-pointer ">
                    <Lock className="size-5 text-blue-600" />
                    Нууц үг солих
                  </DropdownMenuItem>
                </Link>
                <Link to="login-history">
                  <DropdownMenuItem className="cursor-pointer ">
                    <FileClock className="size-5 text-amber-600" />
                    Хандалтын түүх
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  className="cursor-pointer "
                  onClick={() => logout()}
                >
                  <LogOut className="size-5 text-rose-600" />
                  Гарах
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="m-4">
          <Outlet />
        </main>
        {checkRole(["admin", "employee", "teacher", "person"], user?.rols) && (
          <Sheet>
            <SheetTrigger className="fixed right-3 bottom-3 p-2 rounded-lg bg-blue-700 text-white">
              <Contact className="size-6" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-sm">
                  {/* Багш, ажилтны холбоо барих мэдээлэл */}
                  <p className="text-xs text-center">
                    {
                      contactState?.filter(
                        (fil) => fil.statusTeacher === "Ажиллаж байгаа"
                      ).length
                    }
                    -{contactState?.filter((el) => el.mac).length}
                  </p>
                </SheetTitle>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="name">Нэрээр хайх</Label>
                  <Input
                    onChange={(e) => {
                      setname(e.target.value.toLowerCase());
                    }}
                    type="text"
                    className="lowercase w-full"
                    id="name"
                    placeholder="Нэрээр хайх..."
                  />
                </div>
              </SheetHeader>
              <ScrollArea className="w-full h-full mt-4">
                {contactState
                  .filter((fil) => fil.statusTeacher === "Ажиллаж байгаа")
                  .filter((fi) => fi.firstname?.toLowerCase()?.includes(name))
                  .map((item, index) => {
                    return (
                      <div key={index} className="flex gap-2 mb-2 border-ys">
                        <img
                          src={`http://west.edu.mn:3000/upload/images/${item.imagePath}`}
                          alt="prof"
                          className="w-16 h-20 object-contain roundedf-full"
                        />
                        <div className="flex flex-col justify-evenly">
                          <p className="capitalize  font-manrope font-semibold  text-neutral-700 flex gap-1">
                            <span>{item.firstname}</span>
                            <span className="text-gray-500">
                              {item.lastname}
                            </span>
                          </p>
                          <p className="flex gap-1 items-center text-purple-800">
                            <Phone className="size-4 " />{" "}
                            <a href={`tel:${item.phone1}`}>
                              {item.phone1}
                              {/* {item.mac} */}
                            </a>
                          </p>
                          <p className="text-blue-900 flex gap-1 items-center">
                            <Mail className="size-4" />{" "}
                            <a href={`mailto:+${item.email}`}>{item.email}</a>
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </ScrollArea>
            </SheetContent>
          </Sheet>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
