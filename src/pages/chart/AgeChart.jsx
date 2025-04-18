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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import axios from "axios";
// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ];
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

export default function AgeChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get("http://west.edu.mn:3000/api/v1/teachers/statusCountAge")
      .then((res) => {
        setChartData(res.data.data);
      })
      .catch((error) => {
        console.error("Алдаа гарлаа:", error);
      });
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center uppercase">Насны ангилал</CardTitle>
      </CardHeader>
      <CardContent className="w-96">
        <CardTitle>Багш</CardTitle>

        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData.filter((item) => item.hasOwnProperty("Багш"))}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Багш"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            {/* <ChartLegend content={<ChartLegendContent />} /> */}
            <Bar
              dataKey="Эрэгтэй"
              fill="var(--color-Эрэгтэй)"
              stackId="a"
              radius={[0, 0, 4, 4]}
            >
              {/* <LabelList
                position="center"
                offset={12}
                className="fill-white"
                fontSize={12}
              /> */}
            </Bar>
            <Bar
              dataKey="Эмэгтэй"
              fill="var(--color-Эмэгтэй)"
              stackId="a"
              radius={[4, 4, 0, 0]}
            >
              {/* <LabelList
                position="center"
                offset={12}
                className="fill-white"
                fontSize={12}
              /> */}
            </Bar>
          </BarChart>
        </ChartContainer>
        <CardTitle>Ажилтан</CardTitle>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData.filter((item) => item.hasOwnProperty("Ажилтан"))}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Ажилтан"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            {/* <ChartLegend content={<ChartLegendContent />} /> */}
            <Bar
              dataKey="Эрэгтэй"
              fill="var(--color-Эрэгтэй)"
              stackId="a"
              radius={[0, 0, 4, 4]}
            >
              {/* <LabelList
                position="center"
                offset={12}
                className="fill-white"
                fontSize={12}
              /> */}
            </Bar>
            <Bar
              dataKey="Эмэгтэй"
              fill="var(--color-Эмэгтэй)"
              stackId="a"
              radius={[4, 4, 0, 0]}
            >
              {/* <LabelList
                position="center"
                offset={12}
                className="fill-white"
                fontSize={12}
              /> */}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
