"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectChore } from "@/database/types";
import { getRepetition, getWeekDay } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const CreateScheduleEntryForm = ({
  chores,
  onCreateScheduleEntry,
}: {
  chores: SelectChore[];
  onCreateScheduleEntry: (
    choreId: number | null,
    weekday: number | null,
    repetition: number | null
  ) => void;
}) => {
  const [choreId, setChoreId] = React.useState<number | null>(null);
  const [weekday, setWeekday] = React.useState<number | null>(null);
  const [repetition, setRepetition] = React.useState<number | null>(null);

  return (
    <div className="flex gap-4 text-sm items-center justify-center bg-neutral-900 p-4 rounded">
      <Select onValueChange={(newChoreId) => setChoreId(+newChoreId)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a chore" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {chores.map((chore) => (
              <SelectItem key={chore.id} value={`${chore.id}`}>
                {chore.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <span>on</span>

      <Select onValueChange={(newWeekday) => setWeekday(+newWeekday)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a weekday" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {[1, 2, 3, 4, 5, 6, 7].map((weekday) => (
              <SelectItem key={weekday} value={`${weekday}`}>
                {getWeekDay(weekday)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={(newRepetition) => setRepetition(+newRepetition)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a repetition" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {[1, 2, 4].map((repetition) => (
              <SelectItem key={repetition} value={`${repetition}`}>
                {getRepetition(repetition)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button
        variant={"secondary"}
        onClick={() => onCreateScheduleEntry(choreId, weekday, repetition)}
      >
        Create
      </Button>
    </div>
  );
};

export default CreateScheduleEntryForm;
