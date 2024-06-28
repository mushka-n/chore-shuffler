"use client";

import { useState } from "react";
import CreateEditScheduleEntryDialog from "./create-edit-schedule-entry";

interface DialogsProps {}

const Dialogs = ({}: DialogsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <CreateEditScheduleEntryDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Dialogs;
