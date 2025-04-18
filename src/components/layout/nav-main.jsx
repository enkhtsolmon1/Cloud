import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function NavMain({ data, user }) {
  let location = useLocation();

  const [current, setcurrent] = useState("");
  // console.log("🚀 ~ NavMain ~ current:", current);

  useEffect(() => {
    setcurrent(location?.pathname);
  }, []);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <img
          src="http://west.edu.mn:3000/upload/programfiles/CloudUni.png"
          alt="logo"
          className="h-12 mx-auto"
        />
      </SidebarGroupLabel>
      <SidebarMenu className="mt-4">
        {/* <SidebarMenuItem>
          <SidebarMenuButton>Main menu</SidebarMenuButton>
          <SidebarMenuSub>
            <SidebarMenuSubItem className="flex w-full bg-gradient-to-r from-purple-600 to-blue-400 rounded-lg text-white justify-start items-center">
              <SidebarMenuSubButton className="">
                <Home className="size-4 " />
                menu1
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </SidebarMenuItem> */}

        {data
          ?.filter((el) => el.roles?.some((role) => user?.rols.includes(role)))
          .map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                onClick={() => setcurrent(`/dashboard/${item.href}`)}
                className={`p-4 transition-all duration-300 hover:bg-gradient-to-r from-purple-600 to-blue-400 hover:text-white active:bg-blue-600 active:text-white ${
                  `/dashboard/${item.href}` === current
                    ? "bg-gradient-to-r from-purple-600 to-blue-400 text-white"
                    : ""
                }`}
                asChild
                // isActive={item.href === current}
              >
                <Link
                  target={item.target && "_blank"}
                  className="flex flex-row gap-4 items-end"
                  to={item.href}
                >
                  <item.icon />
                  <span className="text-[14px] font-bold">{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
