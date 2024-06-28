"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScheduleFullEntry, SelectSchedule } from "@/database/types";
import { getRepetition, getWeekDay } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreVertical, Trash } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { deleteScheduleEntry } from "@/actions/schedule/deleteScheduleEntry";
import React, { useState } from "react";
import CreateEditScheduleEntryDialog from "@/components/dialogs/create-edit-schedule-entry";

const ScheduleTable = ({ data }: { data: ScheduleFullEntry[] }) => {
  const [scheduleEntryEditingId, setScheduleEntryEditingId] = useState<
    number | null
  >(null);

  return (
    <div className="w-full grid grid-rows-1 gap-4 grid-cols-1 mt-2 min-[1200px]:grid-cols-2 min-[1800px]:grid-cols-3">
      {data.map((scheduleEntry) => (
        <div
          key={scheduleEntry.id}
          className="w-full h-fit flex flex-col gap-5 dark:bg-neutral-900 p-4 rounded-md border border-neutral-800 relative min-w-[500px]"
        >
          <CreateEditScheduleEntryDialog
            isEdit
            isOpen={scheduleEntryEditingId === scheduleEntry.id}
            setIsOpen={() => setScheduleEntryEditingId(null)}
            initialData={{
              ...scheduleEntry,
              assignee: scheduleEntry.assignee?.id || null,
            }}
          />

          <div className="w-fit h-fit flex items-center gap-3">
            <div className={"text-xl font-semibold h-fit"}>
              {scheduleEntry.chore.title}
            </div>

            <Badge
              className={twMerge(
                "w-fit h-6 font-semibold",
                scheduleEntry.chore.points < 4 &&
                  "dark:bg-green-500 dark:hover:bg-green-500",
                scheduleEntry.chore.points >= 4 &&
                  scheduleEntry.chore.points < 8 &&
                  "dark:bg-orange-500 dark:hover:bg-orange-500",
                scheduleEntry.chore.points >= 8 &&
                  "dark:bg-red-500 dark:hover:bg-red-500"
              )}
            >
              {scheduleEntry.chore.points} points
            </Badge>

            {scheduleEntry.assignee && (
              <Badge
                variant={"secondary"}
                className={twMerge(
                  "w-fit h-6 font-semibold dark:hover:bg-neutral-800"
                )}
              >
                {scheduleEntry.assignee.name}
              </Badge>
            )}
          </div>

          <div className={"flex flex-col gap-2 self-start"}>
            {scheduleEntry.repetitions.map((repetition, index) => (
              <div
                key={index}
                className="flex gap-4 items-center justify-start"
              >
                <div className="w-fit h-10 flex items-center justify-start font-medium text-sm py-2 px-4 rounded border border-neutral-800">
                  {getRepetition(repetition.frequency)}
                </div>

                <span className="text-sm">on</span>

                <div className="flex">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div
                      key={day}
                      className={twMerge(
                        "w-10 h-10 border border-neutral-800 border-y-1 border-x-0 bg-neutral-900 flex items-center justify-center font-medium text-sm",
                        day === 1 && "rounded-l-md border-x-1 border-r-0",
                        day === 7 && "rounded-r-md border-x-1 border-l-0",
                        repetition.weekdays.includes(day) &&
                          "bg-neutral-800 text-white"
                      )}
                    >
                      {getWeekDay(day)[0]}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="absolute top-4 right-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(e) => setScheduleEntryEditingId(scheduleEntry.id)}
                  className="flex items-center cursor-pointer h-8"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  <span className="leading-4 mt-[2px]">Edit</span>
                </DropdownMenuItem>
                <Separator className="my-1" />
                <DropdownMenuItem
                  onClick={() => deleteScheduleEntry(scheduleEntry.id)}
                  className="flex items-center cursor-pointer h-8"
                >
                  <Trash className="mr-2 h-4 w-4 " />
                  <span className="leading-4 mt-[2px] ">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleTable;
