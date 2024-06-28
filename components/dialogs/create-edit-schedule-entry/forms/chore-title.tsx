"use client";

import * as React from "react";
import { Chore } from "@/database/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ChoreTitleFormProps {
  chore: Chore;
  setChore: React.Dispatch<React.SetStateAction<Chore>>;
}

const ChoreTitleForm = ({ chore, setChore }: ChoreTitleFormProps) => {
  return (
    <div className="flex flex-col w-[320px] items-start justify-start gap-2">
      <Label htmlFor="chore-title" className="text-md font-semibold ml-1">
        Title
      </Label>
      <Input
        className="w-full"
        id="chore-title"
        type="text"
        placeholder="Enter chore title"
        value={chore.title}
        onChange={(e) => setChore({ ...chore, title: e.target.value })}
      />
    </div>
  );
};

export default ChoreTitleForm;
