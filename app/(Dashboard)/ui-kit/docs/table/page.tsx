"use client";
import React, { useState } from "react";
import Table, { Column } from "../../../../components/table";

const App = () => {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const data = [
    {
      id: 1,
      name: "John Doe",
      age: 28,
      city: "New York",
      job: "Developer",
      salary: 50000,
      country: "USA",
      department:
        "EngineeringEngineeringEngineeringEngineeringEngineeringEngineeringEngineeringEngineeringEngineeringEngineering",
      status: "Active",
      dateJoined: "2020-01-01",
      actions: "",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 34,
      city: "Los Angeles",
      job: "Designer",
      salary: 45000,
      country: "USA",
      department: "Design",
      status: "Inactive",
      dateJoined: "2019-03-12",
      actions: "",
    },
    {
      id: 3,
      name: "Sam Brown",
      age: 22,
      city: "Chicago",
      job: "Manager",
      salary: 60000,
      country: "USA",
      department: "Sales",
      status: "Active",
      dateJoined: "2018-07-25",
      actions: "",
    },
    {
      id: 4,
      name: "Emily White",
      age: 25,
      city: "San Francisco",
      job: "Developer",
      salary: 52000,
      country: "USA",
      department: "Engineering",
      status: "Active",
      dateJoined: "2021-05-19",
      actions: "",
    },
    {
      id: 5,
      name: "Michael Green",
      age: 30,
      city: "Boston",
      job: "Designer",
      salary: 47000,
      country: "USA",
      department: "Design",
      status: "Inactive",
      dateJoined: "2019-11-03",
      actions: "",
    },
    {
      id: 6,
      name: "Lucy Black",
      age: 27,
      city: "Austin",
      job: "Manager",
      salary: 58000,
      country: "USA",
      department: "Sales",
      status: "Active",
      dateJoined: "2017-02-18",
      actions: "",
    },
    {
      id: 7,
      name: "Robert Blue",
      age: 29,
      city: "Miami",
      job: "Developer",
      salary: 51000,
      country: "USA",
      department: "Engineering",
      status: "Inactive",
      dateJoined: "2020-10-30",
      actions: "",
    },
    {
      id: 8,
      name: "Anna Yellow",
      age: 32,
      city: "Dallas",
      job: "Designer",
      salary: 48000,
      country: "USA",
      department: "Design",
      status: "Active",
      dateJoined: "2018-06-24",
      actions: "",
    },
    {
      id: 9,
      name: "David Purple",
      age: 40,
      city: "Seattle",
      job: "Manager",
      salary: 65000,
      country: "USA",
      department: "Sales",
      status: "Active",
      dateJoined: "2016-09-09",
      actions: "",
    },
    {
      id: 10,
      name: "Sarah Red",
      age: 26,
      city: "Denver",
      job: "Developer",
      salary: 53000,
      country: "USA",
      department: "Engineering",
      status: "Inactive",
      dateJoined: "2021-01-13",
      actions: "",
    },
    {
      id: 11,
      name: "James Gray",
      age: 38,
      city: "Phoenix",
      job: "Designer",
      salary: 46000,
      country: "USA",
      department: "Design",
      status: "Active",
      dateJoined: "2015-04-08",
      actions: "",
    },
    {
      id: 12,
      name: "Sophia Orange",
      age: 24,
      city: "San Diego",
      job: "Manager",
      salary: 59000,
      country: "USA",
      department: "Sales",
      status: "Active",
      dateJoined: "2020-08-21",
      actions: "",
    },
    {
      id: 13,
      name: "Daniel Violet",
      age: 33,
      city: "Portland",
      job: "Developer",
      salary: 54000,
      country: "USA",
      department: "Engineering",
      status: "Inactive",
      dateJoined: "2018-11-15",
      actions: "",
    },
    {
      id: 14,
      name: "Megan Pink",
      age: 29,
      city: "Chicago",
      job: "Designer",
      salary: 49000,
      country: "USA",
      department: "Design",
      status: "Active",
      dateJoined: "2019-09-04",
      actions: "",
    },
    {
      id: 15,
      name: "William Cyan",
      age: 37,
      city: "Miami",
      job: "Manager",
      salary: 62000,
      country: "USA",
      department: "Sales",
      status: "Inactive",
      dateJoined: "2017-12-27",
      actions: "",
    },
    {
      id: 16,
      name: "Chloe Indigo",
      age: 30,
      city: "Los Angeles",
      job: "Developer",
      salary: 51000,
      country: "USA",
      department: "Engineering",
      status: "Active",
      dateJoined: "2018-04-19",
      actions: "",
    },
    {
      id: 17,
      name: "Lucas Gold",
      age: 23,
      city: "Dallas",
      job: "Designer",
      salary: 47000,
      country: "USA",
      department: "Design",
      status: "Active",
      dateJoined: "2020-02-25",
      actions: "",
    },
    {
      id: 18,
      name: "Grace Silver",
      age: 35,
      city: "Austin",
      job: "Manager",
      salary: 60000,
      country: "USA",
      department: "Sales",
      status: "Active",
      dateJoined: "2016-07-09",
      actions: "",
    },
    {
      id: 19,
      name: "Oliver Bronze",
      age: 26,
      city: "Seattle",
      job: "Developer",
      salary: 52000,
      country: "USA",
      department: "Engineering",
      status: "Inactive",
      dateJoined: "2021-03-14",
      actions: "",
    },
    {
      id: 20,
      name: "Lily Brown",
      age: 31,
      city: "San Francisco",
      job: "Designer",
      salary: 49000,
      country: "USA",
      department: "Design",
      status: "Active",
      dateJoined: "2019-02-10",
      actions: "",
    },
  ];

  const columns: Column<{
    id: number;
    name: string;
    age: number;
    city: string;
    job: string;
    salary: number;
    country: string;
    department: string;
    status: string;
    dateJoined: string;
    actions: string;
  }>[] = [
    { key: "id", label: "ID", sortable: true, resizable: true },
    {
      key: "name",
      label: "Name",
      sortable: true,
      editable: true,
      resizable: true,
      filterable: true,
      type: "text",
      reorderable: true,
      frozen: true,
    },
    // sortable?: boolean;
    // editable?: boolean;
    // resizable?: boolean;
    // filterable?: boolean;
    // type?: "text" | "number" | "date";
    // reorderable?: boolean;
    // frozen?: boolean;
    {
      key: "age",
      label: "Age",
      sortable: true,
      editable: true,
      resizable: true,
      reorderable: true,
    },
    { key: "city", label: "City", filterable: true, resizable: true,reorderable: true, },
    {
      key: "job",
      label: "Job",
      filterable: true,
      editable: true,
      resizable: true,
      reorderable: true,
      type: "text",
      sortable: true,
      frozen: true,
    },
    {
      key: "salary",
      label: "Salary",
      sortable: true,
      editable: true,
      resizable: true,
    },
    { key: "country", label: "Country", filterable: true },
    { key: "department", label: "Department", filterable: true },
    { key: "status", label: "Status", filterable: true },
    {
      key: "dateJoined",
      label: "Date Joined",
      sortable: true,
      type: "date",
      editable: true,
    },
    {
      key: "actions",
      label: "Actions",
      render: (value, row) => (
        <button
          onClick={() => console.log(row)}
          className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 transition"
        >
          View
        </button>
      ),
    },
  ];

  const [initialColumnWidths, setInitialColumnWidths] = useState({
    checkbox: 50,
    id: 50,
    name: 200,
    age: 80,
    city: 150,
    job: 120,
    salary: 100,
    country: 100,
    department: 150,
    status: 100,
    dateJoined: 400,
  });

  const handleSelectedRowsChange = (newSelectedRows: Set<number>) => {
    console.log("Selected rows:", Array.from(newSelectedRows)); // Convert Set to Array
    setSelectedRows(newSelectedRows);
  };
  const [editedRows, setEditedRows] = useState<
    { rowIndex: number; before: any; after: any }[]
  >([]);

  // Capture the edited row data
  const handleEdit = (rowIndex: number, before: any, after: any) => {
    setEditedRows((prev) => [...prev, { rowIndex, before, after }]);
    console.log(`Row ${rowIndex} edited:`, { before, after });
  };

  return (
    <div className="App max-h-[900px]">
      <Table
        columns={columns}
        data={data}
        selectedRows={selectedRows}
        setSelectedRows={handleSelectedRowsChange}
        columnWidths={initialColumnWidths}
        onEdit={handleEdit}
      />

      <h2 className="mt-4 text-lg font-semibold">Edited Rows:</h2>
      <pre className="bg-gray-100 p-2">
        {JSON.stringify(editedRows, null, 2)}
      </pre>
    </div>
  );
};

export default App;
