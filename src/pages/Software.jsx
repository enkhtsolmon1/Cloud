import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../components/ui/button";
import { Download } from "lucide-react";
const Software = () => {
  return (
    <div>
      <CardHeader className="text-center uppercase">
        Хэрэгтэй прогамууд
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {[
            {
              name: "Windows 11",
              photo:
                "https://www.tat.mn/resource/tat/image/2022/09/13/9wgslw3ia4m5rnca/windows_11_s.jpg",
              url: "https://software.download.prss.microsoft.com/dbazure/Win11_24H2_English_x64.iso?t=b9608f7f-e297-4c53-a2d4-8eb6d0544583&P1=1734704345&P2=601&P3=2&P4=0cv7huK5tA0UkgCfIy6SsYkVOXuqnxDzd1C5c8QAVv4SqiGEu6LHlwsCvM6m8bsqEH9%2b5FJXYLy2fAZZ2D11nxccVpSl2pS72bIMhmJIhuNJX8YZQCgWxaMvZUkjF%2f%2fDL%2ftXhAlUliLTvE%2fImnXAkNCFRkm7%2baqPaXJ2N7WA7RJ0AM3TAfJ52rUyeIDrGeTVo66BUTiok%2bsvtTUrO0xRx%2f%2fHyofesjZVlvynfsFW8NedcvTHjazYbHHmpG1AKTBDBzCQwqCFpPzX4fpJ%2bCfFOAo%2fDQgenB%2bxR7W5ke7MdTtmd%2bmjLHYoVi9PJk%2bthkCj5bSj67Mj5B%2fS8s3fY4bfgw%3d%3d",
            },
            {
              name: "Windows 10",
              photo:
                "https://www.tat.mn/resource/tat/image/2024/11/15/8iu2k03sl8cugrb4/Windows10_m.jpg",
              url: "",
            },
            {
              name: "Windows 7 64bit PRO",
              photo:
                "https://www.tat.mn/resource/efile/image/2019/04/30/dv1zun9lc06hqvfa/hqdefault_s.jpg",
              url: "",
            },
            {
              name: "Office 2019",
              photo: "",
              url: "",
            },
            {
              name: "PhotoShop 2021",
              photo:
                "https://www.tat.mn/resource/tat/image/2024/11/16/5m9yygyae50829dg/5_750x_m_m.jpg",
              url: "",
            },
            {
              name: "Windows 10-11 Office 2016-2021 ACTIVATOR",
              photo:
                "https://www.tat.mn/resource/tat/image/2022/03/27/1madr5mrgxry5vf8/activator_s.png",
              url: "",
            },
            {
              name: "Устсан Файлыг сэргээгч программ",
              photo:
                "https://www.tat.mn/resource/efile/image/2020/01/09/wixce156d724pgz5/Wise-Data-Recovery-4.01-1_s.png",
              url: "",
            },
            {
              name: "Могул фонт",
              photo:
                "https://www.tat.mn/resource/efile/image/2017/11/28/ypvfdrrc3hj7jvi0/Mogul%20Fonts_s.jpg",
              url: "",
            },
            {
              name: "Password тайлдаг программ",
              photo:
                "https://www.tat.mn/resource/efile/image/2019/12/18/figkt495u37p5bhx/s-l300_s.jpg",
              url: "",
            },
          ].map((item, index) => {
            return (
              <Card key={index} className="p-2 text-center">
                {/* <CardHeader className="text-center">{item.name}</CardHeader> */}
                <p className="w-full font-medium text-xs text-center">
                  {item.name}
                </p>
                <img
                  src={item.photo}
                  alt=""
                  className="mx-auto h-24 object-cover rounded-lg mt-2"
                />
                {/* <a target="_blank" href={item.url}> */}
                <Button variant="outline" className="h-8 gap-1 mt-2 w-full">
                  <Download className="size-4" />
                  <span className="">Татах</span>
                </Button>
                {/* </a> */}
              </Card>
            );
          })}
        </div>
      </CardContent>
    </div>
  );
};

export default Software;
