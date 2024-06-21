import ScheduleDataTable from "@/components/data-tables/schedule";
import CreateScheduleEntryForm from "@/components/forms/create-schedule-entry";

const DashboardPage = () => {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-start p-4 bg-neutral-950">
      <div className="text-4xl font-bold text-neutral-100">Chore Shuffler</div>
      <CreateScheduleEntryForm />
      <ScheduleDataTable />
    </main>
  );
};

export default DashboardPage;
