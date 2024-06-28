"use client";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import * as React from "react";
import { InsertChore, Repetition, SelectChore } from "@/database/types";
import { Button } from "@/components/ui/button";
import RepetitionsForm from "./forms/repetitions";
import ChoreTitleForm from "./forms/chore-title";
import ChorePointsForm from "./forms/chore-points";
import ChoreAssigneeForm from "./forms/assignee";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

type CreateChoreDialogContentProps = (
  | {
      mode: "create";
      initialState: InsertChore;
      onSubmitForm: (chore: InsertChore) => void;
    }
  | {
      mode: "edit";
      initialState: SelectChore;
      onSubmitForm: (chore: SelectChore) => void;
    }
) & {
  onCloseDialog: () => void;
};

const CreateEditChoreDialogContent = ({
  mode,
  initialState,
  onSubmitForm,
  onCloseDialog,
}: CreateChoreDialogContentProps) => {
  const { toast } = useToast();

  const [title, setTitle] = useState<string>(initialState.title);
  const [points, setPoints] = useState<number>(initialState.points);
  const [assignee, setAssignee] = useState<number | null>(
    initialState.assignee || null
  );
  const [repetitionsRaw, setRepetitions] = useState<
    ({ key: number } & Repetition)[]
  >(initialState.repetitions.map((r, key) => ({ key, ...r })));
  const repetitions: Repetition[] = repetitionsRaw.map(({ key, ...r }) => r);

  const onSubmit = () => {
    try {
      if (!title) throw new Error("Please provide a chore title.");
      if (!repetitions.length)
        throw new Error("Please provide at least one repetition.");
      repetitions.forEach(({ weekdays, frequency }) => {
        if (!weekdays.length || !frequency)
          throw new Error("Please provide valid repetitions.");
      });

      if (mode === "create")
        onSubmitForm({ title, points, repetitions, assignee });
      if (mode === "edit") {
        const id = initialState.id;
        onSubmitForm({ id, title, points, repetitions, assignee });
      }
      onClose();
    } catch (err: any) {
      console.error(err);
      toast({
        title:
          mode === "create" ? "Failed to create chore" : "Failed to edit chore",
        description: err.message,
      });
    }
  };

  const onClose = () => {
    setTitle(initialState.title);
    setPoints(initialState.points);
    setRepetitions(initialState.repetitions.map((r, key) => ({ key, ...r })));
    setAssignee(null);
    onCloseDialog();
  };

  return (
    <DialogContent className="w-fit max-w-fit gap-8">
      <DialogHeader>
        <DialogTitle>
          {mode === "create" && "Create a schedule entry"}
          {mode === "edit" && "Edit a schedule entry"}
        </DialogTitle>
        <DialogDescription>
          {mode === "create" &&
            "Fill in the fields to create a new schedule entry. Click a submit button when you're done."}
          {mode === "edit" &&
            "Edit the fields to update the schedule entry. Click a save button when you're done."}
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-6 text-sm items-start justify-center">
        <ChoreTitleForm title={title} setTitle={setTitle} />
        <ChorePointsForm points={points} setPoints={setPoints} />
        <ChoreAssigneeForm assignee={assignee} setAssignee={setAssignee} />
        <Separator className="my-3 w-[calc(100%-32px)] ml-4" />
        <RepetitionsForm
          repetitions={repetitionsRaw}
          setRepetitions={setRepetitions}
        />
      </div>

      <DialogFooter>
        <Button variant={"secondary"} onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>
          {mode === "create" && "Submit"}
          {mode === "edit" && "Save"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default CreateEditChoreDialogContent;
