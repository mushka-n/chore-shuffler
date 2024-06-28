"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface ChoreTitleFormProps {
  assignee: number | null;
  setAssignee: React.Dispatch<React.SetStateAction<number | null>>;
}

const users = [
  {
    id: 1,
    name: "Nikita",
  },
  {
    id: 2,
    name: "Lisa",
  },
];

const ChoreAssigneeForm = ({ assignee, setAssignee }: ChoreTitleFormProps) => {
  const assignedUser = users.find((user) => user.id === assignee);

  return (
    <div className="flex flex-col w-[500px] items-start justify-start gap-2">
      <Label htmlFor="chore-title" className="text-md font-semibold ml-1">
        Assignee
      </Label>

      <div className="flex gap-2">
        <Select
          value={`${assignee}`}
          onValueChange={(newAssignee) => setAssignee(+newAssignee)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue>{assignedUser?.name || "Set an assignee"}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {users.map((assignee) => (
                <SelectItem key={assignee.id} value={`${assignee.id}`}>
                  {assignee.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          onClick={() => setAssignee(null)}
          variant="ghost"
          size="icon"
          disabled={!assignee}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChoreAssigneeForm;
