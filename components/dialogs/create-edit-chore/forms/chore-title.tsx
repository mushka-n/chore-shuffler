"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ChoreTitleFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const ChoreTitleForm = ({ title, setTitle }: ChoreTitleFormProps) => {
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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
};

export default ChoreTitleForm;
