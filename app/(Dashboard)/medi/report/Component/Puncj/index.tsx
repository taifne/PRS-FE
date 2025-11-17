import { Clock, AlertTriangle, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

type Props = {
  data: {
    totalDays: number;
    missingPunches: number;
    lateArrivals: number;
    earlyLeaves: number;
  };
};

const PunchSummaryDisplay: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Monthly Attendance Summary
      </h3>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className="text-blue-500" size={20} />
            <span className="text-gray-700 dark:text-gray-200">Total Days</span>
          </div>
          <span className="font-bold text-blue-600 dark:text-blue-400">{data.totalDays}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-red-500" size={20} />
            <span className="text-gray-700 dark:text-gray-200">Missing Punches</span>
          </div>
          <span className="font-bold text-red-600 dark:text-red-400">{data.missingPunches}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2">
            <ArrowDownLeft className="text-yellow-500" size={20} />
            <span className="text-gray-700 dark:text-gray-200">Late Arrivals</span>
          </div>
          <span className="font-bold text-yellow-600 dark:text-yellow-400">{data.lateArrivals}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2">
            <ArrowUpRight className="text-pink-500" size={20} />
            <span className="text-gray-700 dark:text-gray-200">Early Leaves</span>
          </div>
          <span className="font-bold text-pink-600 dark:text-pink-400">{data.earlyLeaves}</span>
        </div>
      </div>
    </div>
  );
};

export default PunchSummaryDisplay;
