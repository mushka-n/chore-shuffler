"use client";

import * as React from "react";
import { Chore } from "@/database/types";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface ChorePointsFormProps {
  chore: Chore;
  setChore: React.Dispatch<React.SetStateAction<Chore>>;
}

const ChorePointsForm = ({ chore, setChore }: ChorePointsFormProps) => {
  return (
    <div className="flex flex-col w-full items-start justify-start gap-2">
      <Label htmlFor="chore-title" className="text-md font-semibold ml-1">
        Points
      </Label>
      <div className="flex gap-2 w-full ">
        <div className="h-10 w-10 text-neutral-50 flex items-center justify-center text-lg font-bold">
          {chore.points}
        </div>
        <Slider
          defaultValue={[2]}
          max={10}
          step={1}
          className={"w-[200px]"}
          value={[chore.points]}
          onValueChange={(newPoints) =>
            setChore({ ...chore, points: newPoints[0] })
          }
        />
      </div>
    </div>
  );
};

export default ChorePointsForm;
