import { Drawer } from "@mui/material";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IoIosRemoveCircle } from "react-icons/io";
import { LuNotebookText } from "react-icons/lu";
import { Column } from "../../../../../components/table";
import UserCard from "../../../../../represent/User/user";
import { Dispatch, SetStateAction } from "react";

  export type UserMapped = {
  _id: string;
  displayName: string;
  phone?: string;
  email: string;
  role: string;
  address?: string;
  isActive?: boolean;
  createdAt: string;
  actions: string;
  createdBy: string;
};
export type UseUserColumnsParams = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleDelete: (id: string) => void;
};

type UserColumnKey =
  | "displayName"
  | "phone"
  | "address"
  | "createdBy"
  | "checkbox"
  | "name"
  | "email"
  | "role"
  | "isActive"
  | "createdAt"
  | "actions";

export const initialColumnWidths: Record<UserColumnKey, number> = {
  checkbox: 100,
  name: 200,
  displayName: 200,
  phone: 200,
  createdBy: 200,
  address: 300,
  email: 230,
  role: 200,
  isActive: 200,
  createdAt: 200,
  actions: 200,
};

export const useUserColumns = ({
  isOpen,
  setIsOpen,
  handleDelete,
}: UseUserColumnsParams) => {
  const toggleDrawer = () => setIsOpen((prev) => !prev);

  const columns: Column<UserMapped>[] = [
    {
      key: "displayName",
      label: "User Name",
      sortable: true,
      filterable: true,
      type: "text",
      resizable: true,
      reorderable: true,
      frozen: true,
    },
    {
      key: "address",
      label: "Address",
      sortable: true,
      filterable: true,
      type: "text",
      resizable: true,
      reorderable: true,
      frozen: true,
    },
    {
      key: "phone",
      label: "Phone",
      sortable: true,
      filterable: true,
      type: "text",
      resizable: true,
      reorderable: true,
      frozen: true,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
      filterable: true,
      type: "text",
      resizable: true,
      reorderable: true,
    },
    {
      key: "role",
      label: "Role",
      sortable: true,
      filterable: true,
      type: "text",
      resizable: true,
      reorderable: true,
    },
    {
      key: "isActive",
      label: "Active",
      sortable: true,
      type: "text",
      resizable: true,
      reorderable: true,
      render: (_, row) => (
        <div className="flex items-center justify-center">
          {row.isActive ? (
            <FaCheckCircle className="text-green-500" title="Active" />
          ) : (
            <FaTimesCircle className="text-red-500" title="Inactive" />
          )}
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Created At",
      sortable: true,
      type: "date",
      resizable: true,
      reorderable: true,
    },
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      type: "text",
      render: (_, row) => (
        <>
          <button onClick={toggleDrawer} className="rounded" title="View">
            <LuNotebookText />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="ml-2 rounded"
            title="Delete"
          >
            <IoIosRemoveCircle />
          </button>
          <Drawer open={isOpen} onClose={toggleDrawer}>
            {UserCard(row)}
          </Drawer>
        </>
      ),
    },
  ];

  return { columns };
};