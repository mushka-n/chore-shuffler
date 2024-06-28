"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import * as React from "react";
import { InsertChore } from "@/database/types";
import { createChore } from "@/actions/chores/createChore";
import { useState } from "react";
import CreateEditChoreDialogContent from "./content";

type CreateChoreDialogProps = {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  trigger?: React.ReactNode;
};

const CreateChoreDialog = ({
  isOpen: extIsOpen,
  setIsOpen: extSetIsOpen,
  trigger,
}: CreateChoreDialogProps) => {
  const [intIsOpen, setIntIsOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] =
    extIsOpen !== undefined && extSetIsOpen
      ? [extIsOpen, extSetIsOpen]
      : [intIsOpen, setIntIsOpen];

  const onSubmitForm = async (chore: InsertChore) => {
    await createChore(chore);
  };

  const onCloseDialog = () => {
    if (isOpen && setIsOpen) setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

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
