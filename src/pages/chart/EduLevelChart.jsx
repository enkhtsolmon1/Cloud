import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import axios from "axios";
import { useEffect, useState } from "react";

export default function EduLevelChart() {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    axios
      .get(
        "http://west.edu.mn:3000/api/v1/statistics/teachers?groupField1=educationalLevel"
      )
      .then((res) => {
        setChartData(res.data);
      })
      .catch((error) => {
        console.error("Алдаа гарлаа:", error);
      });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase ">
          Багш, ажилтны боловсролын байдал
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xs">
        {chartData.teachers
          ?.sort((a, b) => (a.count > b.count ? -1 : 1))
          .map((item, index) => {
            return (
              <div className="flex odd:bg-gray-600 odd:text-white text-gray-900 dark:text-white justify-between gap-16 px-2 rounded">
                <span>{item.groupField1}</span>
                <span>{item.count}</span>{" "}
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
}
