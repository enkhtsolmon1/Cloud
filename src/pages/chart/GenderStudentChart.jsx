import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

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

const chartConfig = {
  Эрэгтэй: {
    label: "Эрэгтэй",
    color: "hsl(var(--chart-7))",
  },
  Эмэгтэй: {
    label: "Эмэгтэй",
    color: "hsl(var(--chart-6))",
  },
};
export default function GenderStudentChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://west.edu.mn:3000/api/v1/statistics/students?groupField1=gender"
      )
      .then((res) => {
        const transformed = res.data?.students?.reduce(
          (acc, { count, groupField1 }) => {
            acc[groupField1] = count;
            acc.sum += count; // Нийт дүнг нэмэх
            return acc;
          },
          { gender: "Хүйс", sum: 0 } // Эхний утгуудыг заах
        );
        setChartData([transformed]);
      })
      .catch((error) => {
        console.error("Алдаа гарлаа:", error);
      });
  }, []);

  return (
    <Card className="h-60">
      <CardHeader>
        <CardTitle className="uppercase">
          Нийт оюутны тоо: <span>{chartData[0]?.sum}</span>
        </CardTitle>
        <CardDescription>Хүйсийн харьцаа</CardDescription>
      </CardHeader>
      <CardContent className="">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square">
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {chartData[0]?.sum}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Нийт оюутны тоо
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="Эрэгтэй"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-Эрэгтэй)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="Эмэгтэй"
              fill="var(--color-Эмэгтэй)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
