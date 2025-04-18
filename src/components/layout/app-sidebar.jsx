import {
  Gauge,
  Users,
  CalendarDays,
  Newspaper,
  ListCheck,
  Users2Icon,
  UsersRoundIcon,
  FileCheck2,
  LinkIcon,
  Building2Icon,
  ShapesIcon,
  BookCheckIcon,
  CalendarDaysIcon,
  BookOpenCheck,
  BookOpenText,
  MessagesSquare,
  ListChecks,
  SpellCheck,
  Database,
  CircleDollarSign,
  ChartPie,
  FileQuestion,
  ContactRound,
} from "lucide-react";

import { NavMain } from "./nav-main";

// import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "../Context/AuthContext";

export function AppSidebar({ ...props }) {
  const { user } = useAuth();
  const data = [
    {
      name: "Эхлэл",
      href: "",
      icon: Gauge,
      roles: [
        "admin",
        "manager",
        "director",
        "alba",
        "department",
        "teacher",
        "employee",
        "Student",
        "finance",
        "person",
        "mediaperson",
      ],
    },
    {
      name: "Инфографик",
      href: "info",
      icon: ChartPie,
      roles: ["admin", "person"],
    },
    {
      name: "Тэнхим",
      href: "department",
      icon: Building2Icon,
      roles: ["admin"],
    },
    {
      name: "Анги",
      href: "classes",
      icon: ShapesIcon,
      roles: ["admin", "director", "department"],
    },
    {
      name: "Багш, ажилтан",
      href: "teacher",
      icon: UsersRoundIcon,
      roles: ["admin", "department", "director", "manager", "person", "alba"],
    },
    {
      name: "Ахмадууд",
      href: "elderly",
      icon: Users2Icon,
      roles: ["admin", "person"],
    },
    {
      name: "Оюутан",
      href: "student",
      icon: Users,
      roles: [
        "admin",
        "department",
        "director",
        "manager",
        "teacher",
        "finance",
      ],
    },
    {
      name: "Элсэлт",
      href: "elselt",
      icon: ContactRound,
      roles: ["admin", "manager", "person", "elselt", "director"],
    },
    {
      name: "Төгсөгчид",
      href: "tugsugch",
      icon: Users,
      roles: ["admin", "department", "director", "manager", "person"],
    },
    {
      name: "Дүн",
      href: "dun",
      icon: SpellCheck,
      roles: [
        "admin",
        "manager",
        "director",
        "department",
        "teacher",
        "Student",
      ],
    },

    {
      name: "Төлбөр",
      href: "tulbur",
      icon: CircleDollarSign,
      roles: ["admin", "manager", "finance", "person"],
    },
    {
      name: "Хөтөлбөр",
      href: "program",
      icon: BookOpenText,
      roles: ["admin", "manager"],
    },
    {
      name: "Хичээл сонголт ",
      href: "chooselesson",
      icon: BookOpenCheck,
      roles: ["Student"],
    },
    {
      name: "Санал, хүсэлт",
      href: "feed",
      icon: MessagesSquare,
      roles: ["admin", "employee", "Student", "teacher", "person"],
    },
    {
      name: " `A` цагийн гүйцэтгэл",
      href: "timeplan",
      icon: BookCheckIcon,
      roles: ["admin", "teacher", "department", "manager"],
    },
    {
      name: "Хичээлийн хуваарь",
      href: "schedule",
      icon: CalendarDaysIcon,
      roles: ["admin", "teacher", "Student", "department", "manager"],
    },
    {
      name: "Мэдээ",
      href: "news",
      icon: Newspaper,
      roles: ["admin", "mediaperson", "person"],
    },
    {
      name: "Ажил",
      href: "task",
      icon: ListCheck,
      roles: ["admin", "department", "manager", "teacher", "employee"],
    },
    {
      name: "Цаг бүртгэл",
      href: "attendance",
      icon: CalendarDays,
      roles: ["admin", "department", "alba", "person"],
    },
    {
      name: "Тойрох хуудас",
      href: "toiroh",
      icon: FileCheck2,
      roles: ["admin", "teacher", "employee", "Student"],
    },
    {
      name: "Мэдээллийн сан",
      href: "database",
      icon: Database,
      roles: ["teacher", "employee"],
    },
    // {
    //   name: "Асуулга сан",
    //   href: "asuulga",
    //   icon: FileQuestion,
    //   roles: ["admin", "person", "teacher", "manager"],
    // },
    {
      name: "Судалгаа сан",
      href: "sudalgaa",
      icon: ListChecks,
      roles: ["admin", "teacher", "person", "manager"],
    },
    {
      name: "Судалгаа",
      href: "research",
      icon: ListChecks,
      roles: ["teacher", "employee", "Student"],
    },
    // {
    //   name: "Хэрэгтэй програмууд",
    //   href: "software",
    //   icon: FileCheck2,
    //   roles: ["admin", "teacher", "employee", "person"],
    // },
    {
      name: "Хуучин CloudUni",
      href: `http://cloud.west.edu.mn/tlogin/${user?.token}`,
      icon: LinkIcon,
      roles: [
        "admin",
        "manager",
        "director",
        "alba",
        "department",
        "teacher",
        "employee",
        "Student",
        "finance",
        "person",
        "mediaperson",
      ],
      target: true,
    },
    {
      name: "E-Surgalt",
      href: `http://e-surgalt.west.edu.mn/tlogin/${user?.token}`,
      icon: LinkIcon,
      roles: ["admin", "teacher", "Student"],
      target: true,
    },
  ];
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>{/* <TeamSwitcher teams={data.teams} /> */}</SidebarHeader>
      <SidebarContent>
        <NavMain data={data} user={user} />
      </SidebarContent>
      <SidebarFooter>{/* <NavUser /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
