"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Chore } from "@/database/types";
import { getRepetition, getWeekDay } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreVertical, Trash } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { deleteChore } from "@/actions/chores/deleteChore";
import React, { useState } from "react";
import EditChoreDialog from "@/components/dialogs/create-edit-chore/edit-chore";

const ChoresContent = ({ data }: { data: Chore[] }) => {
  const [choreEditingId, setChoreEntryEditingId] = useState<number | null>(
    null
  );

  return (
    <div className="w-full grid grid-rows-1 gap-4 grid-cols-1 px-4 max-w-[800px]">
      {data.map((chore) => (
        <div
          key={chore.id}
          className="w-full h-fit flex flex-col gap-5 dark:bg-neutral-900 p-4 rounded-sm border border-neutral-800 relative min-w-[500px]"
        >
          <EditChoreDialog
            isOpen={choreEditingId === chore.id}
            setIsOpen={() => setChoreEntryEditingId(null)}
            initialState={{
              ...chore,
              assignee: chore.assignee?.id || null,
            }}
          />

          <div className="w-fit h-fit flex items-center gap-3">
            <div className={"text-xl font-semibold h-fit"}>{chore.title}</div>

            <Badge
              className={twMerge(
                "w-fit h-6 font-semibold",
                chore.points < 4 && "dark:bg-green-500 dark:hover:bg-green-500",
                chore.points >= 4 &&
                  chore.points < 8 &&
                  "dark:bg-orange-500 dark:hover:bg-orange-500",
                chore.points >= 8 && "dark:bg-red-500 dark:hover:bg-red-500"
              )}
            >
              {chore.points} points
            </Badge>

            {chore.assignee && (
              <Badge
                variant={"secondary"}
                className={twMerge(
                  "w-fit h-6 font-semibold dark:hover:bg-neutral-800"
                )}
              >
                {chore.assignee.name}
              </Badge>
            )}
          </div>

          <div className={"flex flex-col gap-2 self-start"}>
            {chore.repetitions.map((repetition, index) => (
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
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sticky="always">
                <DropdownMenuItem
                  onClick={(e) => setChoreEntryEditingId(chore.id)}
                  className="flex items-center cursor-pointer h-8"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  <span className="leading-4 mt-[2px]">Edit</span>
                </DropdownMenuItem>
                <Separator className="my-1" />
                <DropdownMenuItem
                  onClick={() => deleteChore(chore.id)}
                  className="flex items-center cursor-pointer h-8"
                >
                  <Trash className="mr-2 h-4 w-4 stroke-red-500" />
                  <span className="leading-4 mt-[2px] text-red-500">
                    Delete
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChoresContent;
