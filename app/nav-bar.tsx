"use client";

import CreateChoreDialog from "@/components/dialogs/create-edit-chore/create-chore";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

interface NavBarProps {}

const NavBar = ({}: NavBarProps) => {
  const [createChoreDialogIsOpen, setCreateChoreDialogIsOpen] =
    useState<boolean>(false);

  return (
    <nav className="flex items-center border-box justify-between p-4 px-8 bg-neutral-900 border-b border-neutral-800">
      <div className="text-lg font-bold">Chore Shuffler</div>
      <CreateChoreDialog
        isOpen={createChoreDialogIsOpen}
        setIsOpen={setCreateChoreDialogIsOpen}
      />
      <Button
        className="w-fit flex gap-2"
        onClick={() => setCreateChoreDialogIsOpen(true)}
      >
        <Plus className="h-4 w-4" />
        Create chore
      </Button>
    </nav>
  );
};

export default NavBar;
