import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCtx } from "../../components/Context/MainContext";

// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
// ];

const chartConfig = {
  орой: {
    label: "тоо",
    color: "hsl(var(--chart-2))",
  },
  өдөр: {
    label: "өдөр",
    color: "hsl(var(--chart-7))",
  },
  эчнээ: {
    label: "эчнээ",
    color: "hsl(var(--chart-6))",
  },
};

export default function KursChart() {
  const { studentStatistic } = useCtx();
  console.log("🚀 ~ KursChart ~ studentStatistic:", studentStatistic);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://west.edu.mn:3000/api/v1/statistics/students?groupField1=kurs"
      )
      .then((response) => {
        setChartData(response.data.students);
      })
      .catch((error) => {
        console.error("Алдаа гарлаа:", error);
      });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">
          Бакалавр Нийт оюутны тоо:{" "}
          <span>{studentStatistic?.eduLevelCounts?.Бакалавр}</span>
        </CardTitle>
        <CardDescription>Идвэхтэй суралцаж буй оюутны тоо</CardDescription>
      </CardHeader>
      {studentStatistic && (
        <CardContent className="">
          <div className="space-y-2 mt-2">
            <h1 className="text-center">Өдөр</h1>
            {studentStatistic?.data?.Бакалавр?.Өдөр?.length > 0 && (
              <ChartContainer config={chartConfig}>
                <BarChart
                  accessibilityLayer
                  data={studentStatistic?.data?.Бакалавр?.Өдөр}
                  margin={{
                    top: 20,
                  }}
                >
                  <CartesianGrid vertical={false} horizontal={false} />
                  <XAxis
                    dataKey="kurs"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value + "-р курс"}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="count" fill="var(--color-өдөр)" radius={4}>
                    <LabelList position="top" offset={12} fontSize={12} />
                  </Bar>
                </BarChart>
              </ChartContainer>
            )}
          </div>
          <div className="space-y-2 mt-2">
            <h1 className="text-center">Орой</h1>
            {studentStatistic?.data?.Бакалавр?.Орой?.length > 0 && (
              <ChartContainer config={chartConfig}>
                <BarChart
                  accessibilityLayer
                  data={studentStatistic?.data?.Бакалавр?.Орой}
                  margin={{
                    top: 20,
                  }}
                >
                  <CartesianGrid vertical={false} horizontal={false} />
                  <XAxis
                    dataKey="kurs"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    className=""
                    tickFormatter={(value) => value + "-р Курс"}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="count" fill="var(--color-орой)" radius={4}>
                    <LabelList position="top" fontSize={12} />
                  </Bar>
                </BarChart>
              </ChartContainer>
            )}
          </div>
          <div className="space-y-2 mt-2">
            <h1 className="text-center">Эчнээ</h1>
            {studentStatistic?.data?.Бакалавр?.Эчнээ?.length > 0 && (
              <ChartContainer config={chartConfig}>
                <BarChart
                  accessibilityLayer
                  data={studentStatistic?.data?.Бакалавр?.Эчнээ}
                  margin={{
                    top: 20,
                  }}
                >
                  <CartesianGrid vertical={false} horizontal={false} />
                  <XAxis
                    dataKey="kurs"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    className=""
                    tickFormatter={(value) => value + "-р Курс"}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="count" fill="var(--color-эчнээ)" radius={4}>
                    <LabelList position="top" fontSize={12} />
                  </Bar>
                </BarChart>
              </ChartContainer>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
