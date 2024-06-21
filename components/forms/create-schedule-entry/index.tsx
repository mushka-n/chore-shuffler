import { SelectChore } from "@/database/types";
import CreateScheduleEntryForm from "./form";
import api from "@/app/api";
import { NextRequest } from "next/server";

interface CreateScheduleEntryProps {}

const CreateScheduleEntry = async ({}: CreateScheduleEntryProps) => {
  let chores: SelectChore[] = await api.chores.GET().then((res) => res.json());

  const onCreateScheduleEntry = async (
    choreId: number | null,
    weekday: number | null,
    repetition: number | null
  ) => {
    "use server";

    if (!choreId || !weekday || !repetition) {
      return;
    }

    await api.schedule.POST(
      new NextRequest("http://localhost:3000/api/schedule", {
        method: "POST",
        body: JSON.stringify({ choreId, weekday, repetition }),
      })
    );
  };

  return (
    <CreateScheduleEntryForm
      chores={chores}
      onCreateScheduleEntry={onCreateScheduleEntry}
    />
  );
};

export default CreateScheduleEntry;
