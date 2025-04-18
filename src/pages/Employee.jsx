import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  PlusCircle,
  Trash2Icon,
  UserRoundPenIcon,
  DownloadIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { useCtx } from "../components/Context/MainContext";

export default function Employee() {
  const { employeeState } = useCtx();

  return (
    <div>
      {/* <div className="flex flex-col md:flex-row gap-2 mt-4">
        {user?.role !== "department" && (
          <Select
            onValueChange={(value) => {
              setDepOne(value);
              getDepTeachers(value.id);
            }}
          >
            <SelectTrigger className="w-auto">
              <SelectValue placeholder="Тэнхим сонгох" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Тэнхимүүд</SelectLabel>
                {depState
                  .sort((a, b) => (a.name > b.name ? 1 : -1))
                  .map((dep, index) => {
                    return (
                      <SelectItem
                        className="cursor-pointer"
                        key={index}
                        value={dep}
                      >
                        {dep.name}
                      </SelectItem>
                    );
                  })}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" className="gap-1">
            <PlusCircle className="size-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Багш
            </span>
          </Button>
        </div>
      </div> */}

      <Table className="max-h-96">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="">№</TableHead>
            <TableHead className="">Овог нэр</TableHead>
            <TableHead>NUM хаяг</TableHead>
            <TableHead>Утас</TableHead>
            <TableHead className="text-left">Төлөв</TableHead>
            <TableHead className="sr-only">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employeeState
            .sort((a, b) => (a.butenNer > b.butenNer ? 1 : -1))
            .map((item, index) => (
              <TableRow key={index}>
                <TableCell className="">{index + 1}</TableCell>
                <TableCell className="font-medium ">{item.butenNer}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone1}</TableCell>
                <TableCell className="text-left">
                  <Badge
                    variant={
                      item.statusEmployee === "Ажиллаж байгаа"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {item.statusEmployee}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <DropdownMenu className="">
                    <DropdownMenuTrigger asChild>
                      <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                        className="size-6 "
                      >
                        <MoreHorizontal className="size-5" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="cursor-pointer flex flex-row gap-2 ">
                        <UserRoundPenIcon className="h-4 w-4 text-blue-600" />
                        <span className="">Засах</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer flex flex-row gap-2 ">
                        <Trash2Icon className="h-4 w-4 text-rose-600" />
                        <span className="">Устгах</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        {/* <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell className="text-left">$2,500.00</TableCell>
              </TableRow>
            </TableFooter> */}
      </Table>
    </div>
  );
}
