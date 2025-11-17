import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MedicineProfitData {
  name: string;
  quantity: number;
  price: number;
}

interface MedicineProfitPieProps {
  data: MedicineProfitData[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00C49F', '#FFBB28', '#FF8042'];

export const MedicineProfitPieChart = ({ data }: MedicineProfitPieProps) => {
  const chartData = data.map((item) => ({
    name: item.name,
    profit: item.quantity * item.price,
  }));

  return (
    <div className="w-full h-96 bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Total Profit by Medicine</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="profit"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
