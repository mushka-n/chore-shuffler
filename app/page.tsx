import ChoreTable from "./components/ChoreTable";

const DashboardPage = () => {
  return (
    <main className="w-screen h-screen flex items-start justify-center p-4 bg-zinc-900">
      <div className="text-4xl font-bold text-zinc-100">Chore Shuffler</div>
      <ChoreTable />
    </main>
  );
};

export default DashboardPage;
