"use client";

import CreateChoreDialog from "@/components/dialogs/create-edit-chore/create-chore";
import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";
import { useState } from "react";

interface CreateChoreBtnProps {}

const CreateChoreBtn = ({}: CreateChoreBtnProps) => {
  const [createChoreDialogIsOpen, setCreateChoreDialogIsOpen] =
    useState<boolean>(false);

  return (
    <>
      <CreateChoreDialog
        isOpen={createChoreDialogIsOpen}
        setIsOpen={setCreateChoreDialogIsOpen}
      />
      <Button
        className="fixed bottom-0 right-0 mr-4 mb-4 rounded-full h-12 w-12 p-0"
        onClick={() => setCreateChoreDialogIsOpen(true)}
      >
        <CalendarPlus className="h-5 w-5" />
      </Button>
    </>
  );
};

export default CreateChoreBtn;
