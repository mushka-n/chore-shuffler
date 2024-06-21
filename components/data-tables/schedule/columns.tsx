import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScheduleFullEntry } from "@/app/api/schedule/route";
import { getRepetition, getWeekDay } from "@/lib/utils";

export const ScheduleColumns: ColumnDef<ScheduleFullEntry>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "chore",
    accessorFn: (scheduleEntry) => scheduleEntry.chore.title,
    header: "Chore",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("chore")}</div>
    ),
  },
  {
    id: "weekday",
    accessorKey: "weekday",
    header: "Weekday",
    cell: ({ row }) => (
      <div className="capitalize">{getWeekDay(row.getValue("weekday"))}</div>
    ),
  },
  {
    id: "repetition",
    accessorKey: "repetition",
    header: "Repetition",
    cell: ({ row }) => (
      <div className="capitalize">
        {getRepetition(row.getValue("repetition"))}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    minSize: 64,
    maxSize: 64,
    size: 64,
    cell: ({ row }) => {
      const scheduleEntry = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer dark:focus:bg-red-900">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
