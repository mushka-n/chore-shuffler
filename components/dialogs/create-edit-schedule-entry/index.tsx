"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import * as React from "react";
import { Chore, Repetition } from "@/database/types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import RepetitionsForm from "./forms/repetitions";
import ChoreTitleForm from "./forms/chore-title";
import ChorePointsForm from "./forms/chore-points";
import ChoreAssigneeForm from "./forms/assignee";
import { Separator } from "@/components/ui/separator";
import { createScheduleEntry } from "@/actions/schedule/createScheduleEntry";
import { updateScheduleEntry } from "@/actions/schedule/updateScheduleEntry";

interface CreateEditScheduleEntryDialogProps {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit?: boolean;
  trigger?: React.ReactNode;
  initialData?: {
    id?: number;
    assignee: number | null;
    chore: Chore;
    repetitions: Repetition[];
  };
}

const CreateEditScheduleEntryDialog = ({
  isEdit,
  isOpen: extIsOpen,
  setIsOpen: extSetIsOpen,
  trigger,
  initialData = {
    assignee: null,
    chore: { title: "", points: 2 },
    repetitions: [{ weekdays: [], frequency: 1 }],
  },
}: CreateEditScheduleEntryDialogProps) => {
  const { toast } = useToast();

  const [intIsOpen, setIntIsOpen] = React.useState<boolean>(false);
  const [isOpen, setIsOpen] =
    extIsOpen !== undefined && extSetIsOpen
      ? [extIsOpen, extSetIsOpen]
      : [intIsOpen, setIntIsOpen];

  const [assignee, setAssignee] = React.useState<number | null>(
    initialData.assignee
  );
  const [chore, setChore] = React.useState<Chore>({ ...initialData.chore });
  const [repetitions, setRepetitions] = React.useState<
    ({ key: number } & Repetition)[]
  >([{ key: Date.now(), ...initialData.repetitions[0] }]);

  const onSubmit = async () => {
    try {
      if (!chore?.title || !repetitions.length)
        throw new Error("Please fill in all the fields.");

      const newScheduleEntry = {
        assignee,
        chore,
        repetitions: repetitions.map(({ weekdays, frequency }) => {
          if (!weekdays.length || !frequency)
            throw new Error("Please fill in all the fields.");
          return { weekdays, frequency };
        }),
      };

      if (!isEdit) await createScheduleEntry(newScheduleEntry);
      else if (initialData?.id)
        await updateScheduleEntry({ id: initialData.id, ...newScheduleEntry });

      onClose();
    } catch (err: any) {
      if (err.message) {
        console.error(err);
        toast({
          title: "Could not create a schedule entry",
          description: err.message,
        });
      }
    }
  };

  const onClose = () => {
    if (isOpen && setIsOpen) setIsOpen(false);
    setAssignee(null);
    setChore({ title: "", points: 2 });
    setRepetitions([{ key: Date.now(), weekdays: [], frequency: 1 }]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className="w-fit max-w-fit gap-8">
        <DialogHeader>
          <DialogTitle>
            {!isEdit ? "Create a schedule entry" : "Edit a schedule entry"}
          </DialogTitle>
          <DialogDescription>
            {!isEdit
              ? "Fill in the fields to create a new schedule entry. Click a submit button when you're done."
              : "Edit the fields to update the schedule entry. Click a save button when you're done."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 text-sm items-start justify-center">
          <ChoreTitleForm chore={chore} setChore={setChore} />
          <ChorePointsForm chore={chore} setChore={setChore} />
          <ChoreAssigneeForm assignee={assignee} setAssignee={setAssignee} />
          <Separator className="my-3 w-[calc(100%-32px)] ml-4" />
          <RepetitionsForm
            repetitions={repetitions}
            setRepetitions={setRepetitions}
          />
        </div>

        <DialogFooter>
          <Button variant={"secondary"} onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>{!isEdit ? "Submit" : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditScheduleEntryDialog;
