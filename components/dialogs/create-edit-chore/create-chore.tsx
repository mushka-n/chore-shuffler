"use client";

import { Dialog } from "@/components/ui/dialog";
import * as React from "react";
import { InsertChore } from "@/database/types";
import { createChore } from "@/actions/chores/createChore";
import CreateEditChoreDialogContent from "./content";

type CreateChoreDialogProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateChoreDialog = ({ isOpen, setIsOpen }: CreateChoreDialogProps) => {
  const onSubmitForm = async (chore: InsertChore) => {
    await createChore(chore);
  };

  const onCloseDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <CreateEditChoreDialogContent
        mode="create"
        initialState={{
          title: "",
          points: 2,
          repetitions: [{ weekdays: [], frequency: 1 }],
          assignee: null,
        }}
        onSubmitForm={onSubmitForm}
        onCloseDialog={onCloseDialog}
      />
    </Dialog>
  );
};

export default CreateChoreDialog;
