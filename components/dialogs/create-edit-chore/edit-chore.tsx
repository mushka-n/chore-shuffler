"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import * as React from "react";
import { SelectChore } from "@/database/types";
import { useState } from "react";
import CreateEditChoreDialogContent from "./content";
import { updateChore } from "@/actions/chores/updateChore";

type EditChoreDialogProps = {
  initialState: SelectChore;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditChoreDialog = ({
  initialState,
  isOpen: extIsOpen,
  setIsOpen: extSetIsOpen,
}: EditChoreDialogProps) => {
  const [intIsOpen, setIntIsOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] =
    extIsOpen !== undefined && extSetIsOpen
      ? [extIsOpen, extSetIsOpen]
      : [intIsOpen, setIntIsOpen];

  const onSubmitForm = async (chore: SelectChore) => {
    await updateChore(chore);
  };

  const onCloseDialog = () => {
    if (isOpen && setIsOpen) setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <CreateEditChoreDialogContent
        mode="edit"
        initialState={initialState}
        onSubmitForm={onSubmitForm}
        onCloseDialog={onCloseDialog}
      />
    </Dialog>
  );
};

export default EditChoreDialog;
