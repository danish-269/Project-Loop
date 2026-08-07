import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  change: string;
  icon: LucideIcon;
  color: string;
}

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  color,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500">{title}</p>

          <h2 className="text-4xl font-bold mt-2 text-gray-900">
            {value}
          </h2>

          <p className="text-green-600 mt-2 font-medium">
            {change}
          </p>
        </div>

        <div className={`${color} p-4 rounded-xl text-white`}>
          <Icon size={28} />
        </div>

      </div>

    </div>
  );
}