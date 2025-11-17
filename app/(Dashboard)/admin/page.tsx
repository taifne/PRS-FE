"use client";

import React from "react";

const ModuleCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default function DashboardPage() {
  const modules = [
    {
      title: "Sales",
      description: "Manage customer orders and revenue tracking.",
    },
    {
      title: "Inventory",
      description: "Track stock levels, suppliers, and reorder points.",
    },
    {
      title: "Finance",
      description: "Handle budgets, invoices, and financial reports.",
    },
    {
      title: "Human Resources",
      description: "Manage employee records, attendance, and payroll.",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-8">Welcome to the Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {modules.map((mod) => (
          <ModuleCard
            key={mod.title}
            title={mod.title}
            description={mod.description}
          />
        ))}
      </div>
    </main>
  );
}
