"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface ChorePointsFormProps {
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
}

const ChorePointsForm = ({ points, setPoints }: ChorePointsFormProps) => {
  return (
    <div className="flex flex-col w-full items-start justify-start gap-2">
      <Label htmlFor="chore-title" className="text-md font-semibold ml-1">
        Points
      </Label>
      <div className="flex gap-2 w-full ">
        <div className="h-10 w-10 text-neutral-50 flex items-center justify-center text-lg font-bold">
          {points}
        </div>
        <Slider
          defaultValue={[2]}
          max={10}
          step={1}
          className={"w-[200px]"}
          value={[points]}
          onValueChange={(newPoints) => setPoints(newPoints[0])}
        />
      </div>
    </div>
  );
};

export default ChorePointsForm;
