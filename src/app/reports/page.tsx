import ProtectedReports from "@/components/ProtectedReports";

export default function ReportsPage() {
  return (
    <ProtectedReports>
      <main>

        <h1 className="text-4xl font-bold text-blue-600 mb-6">
          Reports
        </h1>

        <div className="bg-white rounded-xl shadow p-8">
          <p className="text-gray-700">
            Charts and analytics will be displayed here.
          </p>
        </div>

      </main>
    </ProtectedReports>
  );
}