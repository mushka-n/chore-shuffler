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

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Repetition } from "@/database/types";
import { getRepetition, getWeekDay } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Plus, Trash } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface RepetitionsFormProps {
  repetitions: ({ key: number } & Repetition)[];
  setRepetitions: React.Dispatch<
    React.SetStateAction<({ key: number } & Repetition)[]>
  >;
}

const RepetitionsForm = ({
  repetitions,
  setRepetitions,
}: RepetitionsFormProps) => {
  const onAddRepetition = () => {
    const newRepetition = { key: Date.now(), weekdays: [], frequency: 0 };
    setRepetitions((prev) => [...prev, newRepetition]);
  };

  const onDeleteRepetition = (key: number) => {
    setRepetitions((prev) =>
      prev.filter((repetition) => repetition.key !== key)
    );
  };

  const onEditRepetitionWeekdays = (key: number, weekdays: string[]) => {
    setRepetitions((prev) =>
      prev.map((repetition) =>
        repetition.key === key
          ? {
              ...repetition,
              weekdays: weekdays.map((weekday) => +weekday).sort(),
            }
          : repetition
      )
    );
  };

  const onEditRepetitionFrequency = (key: number, frequency: string) => {
    setRepetitions((prev) =>
      prev.map((repetition) =>
        repetition.key === key
          ? { ...repetition, frequency: +frequency }
          : repetition
      )
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-md font-semibold ml-1">Repetitions</div>

      {repetitions.map(({ key, weekdays, frequency }) => (
        <div key={key} className="flex gap-2">
          <div className="flex gap-2  items-center justify-center self-center">
            <Select
              onValueChange={(newFrequency) =>
                onEditRepetitionFrequency(key, newFrequency)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[1, 2, 4].map((f) => (
                    <SelectItem key={f} value={`${f}`}>
                      {getRepetition(f)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <span className="text-md mx-2">on</span>

            <ToggleGroup
              type="multiple"
              variant={"outline"}
              className="gap-0"
              value={weekdays.map((weekday) => `${weekday}`)}
              onValueChange={(newWeekdays: string[]) =>
                onEditRepetitionWeekdays(key, newWeekdays)
              }
            >
              {[1, 2, 3, 4, 5, 6, 7].map((weeekday) => (
                <ToggleGroupItem
                  key={weeekday}
                  value={`${weeekday}`}
                  className={twMerge(
                    "rounded-none border-r-0",
                    weeekday === 1 &&
                      "rounded-l-md border-l-1 border-t-1 border-b-1",
                    weeekday === 7 && "rounded-r-md border-r-1"
                  )}
                >
                  {getWeekDay(weeekday)[0]}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <Button
            onClick={() => onDeleteRepetition(key)}
            variant="ghost"
            size="icon"
            disabled={repetitions.length === 1}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <Button
        onClick={onAddRepetition}
        variant="link"
        className="w-fit flex gap-2"
      >
        <Plus className="h-4 w-4" /> Add a repetition
      </Button>
    </div>
  );
};

export default RepetitionsForm;
