import ScheduleTable from "./table";
import api from "@/app/api";

interface ScheduleDataTableProps {}

const ScheduleDataTable = async ({}: ScheduleDataTableProps) => {
  let schedule = await api.schedule.GET().then((res) => res.json());

  return <ScheduleTable data={schedule} />;
};

export default ScheduleDataTable;
