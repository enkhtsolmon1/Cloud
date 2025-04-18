import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  XAxis,
  LabelList,
} from "recharts";

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
import { useEffect, useState } from "react";
import axios from "axios";
// const chartData = [
//   { browser: "Гомдол", visitors: 2, fill: "var(--color-chrome)" },
//   { browser: "Санал", visitors: 2, fill: "var(--color-safari)" },
//   { browser: "Хүсэлт", visitors: 6, fill: "var(--color-firefox)" },
//   { browser: "Талархал", visitors: 1, fill: "var(--color-edge)" },
// ];

const chartConfig = {
  _id: {
    label: "Тоо",
  },
  Гомдол: {
    label: "Гомдол",
    color: "hsl(var(--chart-6))",
  },
  Санал: {
    label: "Санал",
    color: "hsl(var(--chart-2))",
  },
  Хүсэлт: {
    label: "Хүсэлт",
    color: "hsl(var(--chart-7))",
  },
  Талархал: {
    label: "Талархал",
    color: "hsl(var(--chart-7))",
  },
};

export default function FeedChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get("http://west.edu.mn:3000/api/v1/feedback/st/type")
      .then((response) => {
        setChartData(
          response.data.findGroups.map((item) => ({
            ...item,
            fill: `var(--color-${item._id})`,
          }))
        );
      })
      .catch((error) => {
        console.error("Алдаа гарлаа:", error);
      });
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle> Санал, хүсэлт, өргөдөл, гомдол, талархал</CardTitle>
      </CardHeader>
      <CardContent className="mt-2">
        <ChartContainer config={chartConfig}>
          <BarChart
            margin={{
              top: 20,
            }}
            accessibilityLayer
            data={chartData}
          >
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey="_id"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" radius={4}>
              <LabelList position="top" className="" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
