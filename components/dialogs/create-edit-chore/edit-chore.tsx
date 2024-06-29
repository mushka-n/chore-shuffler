"use client";

import { Dialog } from "@/components/ui/dialog";
import * as React from "react";
import { SelectChore } from "@/database/types";
import CreateEditChoreDialogContent from "./content";
import { updateChore } from "@/actions/chores/updateChore";

type EditChoreDialogProps = {
  initialState: SelectChore;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditChoreDialog = ({
  initialState,
  isOpen,
  setIsOpen,
}: EditChoreDialogProps) => {
  const onSubmitForm = async (chore: SelectChore) => {
    await updateChore(chore);
  };

  const onCloseDialog = () => {
    setIsOpen(false);
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
