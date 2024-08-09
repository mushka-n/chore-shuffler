"use client";

import { Schedule } from "@/database/types";
import { useState } from "react";

interface WeekShuffleContentProps {
  schedule: Schedule;
}

const WeekShuffleContent = ({ schedule }: WeekShuffleContentProps) => {
  const [selectedAssigneeId, setselectedAssigneeId] = useState<number | null>(
    null
  );
  // const selectedAssignee = schedule.find(sch => sch.assignee)
  // const scheduleByAssignees =

  return (
    <>
      {schedule.map((day) =>
        day.map(({ assignee, chores }) => chores.map((c) => c.title))
      )}
    </>
  );
};

export default WeekShuffleContent;
