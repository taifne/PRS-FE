"use client";
import React, { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import PunchSummaryDisplay from "./Component/Puncj";
import { MedicineProfitPieChart } from "./Component/pie";
import { useAllUsers } from "../../../hooks/useUserMutation";
import { useMedicineSalesInMonth, useMonthlyRevenue, useTopMedicinesPerMonth, useTopMedicinesPerYear, useUserOrderStatsForMonth } from "../../../hooks/useOrderMutation";
import { usePunchSummaryByMonth, useTotalWorkingHours } from "../../../hooks/usePunch";
import { Tab, Tabs } from "../../../components/Tab";
import MonthYearPicker from "../../../components/MonthYearPicker/MonthYearPicker";
import { CustomSelect } from "../../../components/Select";

const currentYear = new Date().getFullYear();
const MAX_HOURS = 208;
interface OrderStatsProps {
  totalOrders: number;
  totalAmount: number;
  month: string; // e.g. "2025-06"
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ReportPage: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const { data: usersData, isLoading, isError, refetch } = useAllUsers();

  const { data: revenueData, isLoading: loadingRevenue } =
    useMonthlyRevenue(selectedYear);
  const { data: topMonthly, isLoading: loadingTopMonthly } =
    useTopMedicinesPerMonth(selectedYear);
  const { data: topYearly, isLoading: loadingTopYearly } =
    useTopMedicinesPerYear(selectedYear);
  const [selectedMonth, setSelectedMonth] = React.useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
  });
  const [selectedMonthMedi, setSelectedMonthMedi] = React.useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
  });
  const [staff, setStaff] = useState("");
  const { data: staffData, error } = usePunchSummaryByMonth(
    staff,
    selectedMonth
  );
  const { data } = useTotalWorkingHours(staff, selectedMonth);
  const { data: totalAmount } = useUserOrderStatsForMonth(staff, selectedMonth);
  const { data: medidata } = useMedicineSalesInMonth(selectedMonthMedi);

  const total = data?.totalHours ?? 0;
  const percentage = Math.min((total / MAX_HOURS) * 100, 100);
useEffect(()=>{
  console.log(topYearly,"topMonthly")
},[topYearly])
  const options =
    usersData?.map((r) => ({
      label: r.displayName,
      value: r._id,
    })) || [];
  return (
    <div className="p-6 space-y-10 w-full">
      <Tabs>
        <Tab label="Profit">
          <h1 className="text-2xl font-bold">Order Reports</h1>

          <div className="flex items-center gap-4">
            <label className="text-sm font-semibold">Year:</label>
            <input
              type="number"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="border px-3 py-1 rounded-md w-28"
            />
          </div>

          {/* Monthly Revenue */}
          <section>
            <h2 className="text-xl font-semibold mb-2">Monthly Revenue</h2>
            {loadingRevenue ? (
              <p>Loading...</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="totalRevenue" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </section>

          {/* Top Medicines Monthly */}
          <section>
            <h2 className="text-xl font-semibold mb-2">
              Top Medicines per Month
            </h2>
            {loadingTopMonthly ? (
              <p>Loading...</p>
            ) : (
              <div className="overflow-auto">
                <table className="w-full text-left border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2">Month</th>
                      <th className="p-2">Medicine</th>
                      <th className="p-2">Quantity Sold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topMonthly?.map((row: any, i: number) => (
                      <tr key={i}>
                        <td className="p-2">{6}</td>
                        <td className="p-2">{row.name}</td>
                        <td className="p-2">{row.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Top Medicines Yearly */}
          <section>
            <h2 className="text-xl font-semibold mb-2">
              Top Medicines This Year
            </h2>
            {loadingTopYearly ? (
              <p>Loading...</p>
            ) : (
              <div className="overflow-auto">
                <table className="w-full text-left border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2">Medicine</th>
                      <th className="p-2">Quantity Sold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topYearly?.map((row: any, i: number) => (
                      <tr key={i}>
                        <td className="p-2">{row.name}</td>
                        <td className="p-2">{row.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </Tab>
        <Tab label="Staff">
          <div className="search flex flex-row grap-4">
            <div className="flex flex-col">
              {" "}
              <div className="flex flex-row">
                {" "}
                <div className="p-6 ">
                  <MonthYearPicker
                    value={selectedMonth}
                    onChange={setSelectedMonth}
                  />
                </div>
                <div className="user mt-6">
                  <CustomSelect
                    value={staff}
                    onChange={setStaff}
                    options={options}
                    placeholder="Staff"
                    //error={error}
                  />
                </div>
              </div>
              <div className="display">
                <PunchSummaryDisplay
                  data={
                    staffData ?? {
                      totalDays: 0,
                      missingPunches: 0,
                      lateArrivals: 0,
                      earlyLeaves: 0,
                    }
                  }
                />
              </div>
            </div>
            <div className="p-4 pt-10 border rounded w-1/3 shadow bg-white dark:bg-gray-800">
              <h2 className="text-lg font-semibold mb-2">
                Total Working Hours
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Month: <strong>{data?.month}</strong>
              </p>
              <p className="text-xl font-bold mt-2">
                {total.toFixed(2)} / {MAX_HOURS} hrs
              </p>

              <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {percentage.toFixed(1)}% of monthly target
              </p>
            </div>
            <div className="w-1/3 p-4 pt-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Order Statistics for {selectedMonth}
              </h2>
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-gray-500">Total Orders</p>
                  <p className="text-3xl font-bold text-indigo-600">
                    {totalAmount?.totalOrders ?? ""}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Total Amount</p>
                  <p className="text-3xl font-bold text-green-600">
                    ${totalAmount?.totalAmount.toLocaleString() ?? ""}
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                {/* Progress bar with max = 176 (you said max is 176) */}
                <div
                  className="h-4 bg-indigo-500"
                  style={{
                    width: `${Math.min(
                      (totalAmount?.totalOrders / 10) * 100,
                      100
                    )}%`,
                  }}
                  title={`${totalAmount?.totalOrders} / 176 orders`}
                />
              </div>
            
            </div>
          </div>
        </Tab>
        <Tab label="Medicines">
          <div className="p-6 ">
            <MonthYearPicker
              value={selectedMonthMedi}
              onChange={setSelectedMonthMedi}
            />
          </div>
      <div className="w-full h-96 p-4 bg-white rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Top-Selling Medicines (Monthly)</h2>
      <ResponsiveContainer width="100%" height="100%" >
        <BarChart
          data={medidata}
          margin={{ top: 10, right: 30, left: 20, bottom: 40 }
          
        }
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantity" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <MedicineProfitPieChart data={medidata || []} />;
    </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ReportPage;
