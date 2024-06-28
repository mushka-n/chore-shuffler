import { getSchedule } from "@/actions/schedule/getSchedule";
import ScheduleTable from "./table";

interface ScheduleDataTableProps {}

const ScheduleDataTable = async ({}: ScheduleDataTableProps) => {
  let schedule = await getSchedule();

  return <ScheduleTable data={schedule} />;
};

export default ScheduleDataTable;
