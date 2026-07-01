export default function StatsCards({ tasks }) {

  const total = tasks.length;

  const pending = tasks.filter(
    task => task.status === "Pending"
  ).length;

  const completed = tasks.filter(
    task => task.status === "Completed"
  ).length;

  return (
    <div className="grid md:grid-cols-3 gap-5">

      <div className="bg-white rounded-xl p-6 shadow">
        <h1 className="text-4xl font-bold text-blue-600">
          {total}
        </h1>

        <p>Total Tasks</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow">
        <h1 className="text-4xl font-bold text-orange-500">
          {pending}
        </h1>

        <p>Pending</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow">
        <h1 className="text-4xl font-bold text-green-600">
          {completed}
        </h1>

        <p>Completed</p>
      </div>

    </div>
  );
}