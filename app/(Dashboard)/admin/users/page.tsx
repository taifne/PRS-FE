"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Loading } from "../../../components/Loading";
import Table from "../../../components/table";
import { RiResetLeftFill } from "react-icons/ri";
import {
  useAllUsers,
  useDeleteUser,
  useDeleteUsersBulk,
  useLazyUsers,
} from "../../../hooks/useUserMutation";
import { FaTrashAlt } from "react-icons/fa";
import { useThemeStore } from "../../../stores/layoutStore";
import { Popup } from "../../../components/Popup";
import { Input } from "../../../components/Input";
import { Toast } from "../../../components/Toast";
import { CustomSelect } from "../../../components/Select";
import { useAllRoles } from "../../../hooks/useRoleMutation";
import { getCookie } from "cookies-next";
import { IoAdd, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useRegister } from "../../../hooks/useAuthMutations";
import { Search } from "lucide-react";
import { initialColumnWidths, UserMapped, useUserColumns } from "./component/table/table-column";

const UsersPage: React.FC = () => {
  const { data: usersData, isLoading, isError, refetch } = useAllUsers();
  const { theme } = useThemeStore();
  const [selectedRows, setSelectedRows] = useState<Set<UserMapped>>(new Set());

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAddModel, setIsOpenAddModel] = useState(false);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const userId = getCookie("userId")?.toString();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);

  const {
    data: roles,
    isLoading: isRoleLoading,
    isError: isRoleError,
    error,
  } = useAllRoles();
  const { mutate: deleteUsersBulk } = useDeleteUsersBulk();

  const { mutate: deleteUser, isLoading: isDeleteLoading } = useDeleteUser();
  const [errorObject, setErrorObject] = useState({
    username: "",
    password: "",
    email: "",
    passwordConfirm: "",
  });
  const { mutate: createUser } = useRegister();

  const handleSubmit = () => {
    let hasError = false;
    const errors = {
      username: "",
      password: "",
      email: "",
      passwordConfirm: "",
    };
    if (!username) {
      errors.username = "Username is required.";
      hasError = true;
    }

    if (!password) {
      errors.password = "Password is required.";
      hasError = true;
    }

    if (!email) {
      errors.email = "Email is required.";
      hasError = true;
    }

    if (password !== passwordConfirm) {
      errors.passwordConfirm = "Passwords do not match.";
      hasError = true;
    }

    // If any validation error exists, set error object and stop submission
    if (hasError) {
      setErrorObject(errors);
      return;
    }
    createUser(
      {
        username,
        password,
        email,
        role: role || undefined,
        phone,
        address,
        createdBy: userId,
        displayName,
      },
      {
        onSuccess: () => {
          setMessage("Create new User Successfully");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 3000);
          refetch();
          setIsOpenAddModel(false);
          setUsername("");
          setPassword("");
          setEmail("");
          setRole("");
          handleReset();
        },
      }
    );
  };
  const handleDelete = (userId: string) => {
    deleteUser(userId, {
      onSuccess: () => {
        setShowToast(true);
        refetch();
        setMessage("Delete User Successfully");
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      },
    });
  };
  const handleDeleteBulk = () => {
    const selectedIds = Array.from(selectedRows).map((user) => user._id);
    if (selectedIds.length === 0) return;

    deleteUsersBulk(selectedIds, {
      onSuccess: () => {
        setSelectedRows(new Set()); // clear selection after delete
        refetch();
      },
      onError: (error) => {
        console.error("Failed to delete users:", error);
      },
    });
  };
  const options =
    roles?.map((r) => ({
      label: r.name,
      value: r.id,
    })) || [];
  const darkMode = useMemo(() => theme === "dark", [theme]);

  const [filters, setFilters] = useState<
    Partial<{
      username: string;
      email: string;
      role: string;
      address: string;
      phone: string;
    }>
  >({
    username: "",
    email: "",
    role: "",
    address: "",
    phone: "",
  });

  const { data: filteredUsers, refetch: refetchSearch } = useLazyUsers(filters);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = () => {
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v.trim() !== "")
    );
    cleanFilters.role = role;
    setFilters(cleanFilters);
    refetchSearch();
  };

  const handleReset = () => {
    setFilters({ username: "", email: "", role: "", address: "", phone: "" });
    refetchSearch();
  };
  useEffect(() => {
    refetchSearch();
  }, []);
  const dataTable = useMemo<UserMapped[]>(() => {
    const mapped = filteredUsers?.items?.map((u) => ({
      _id: u._id ?? "",
      displayName: u.displayName ?? "",
      phone: u.phone ?? "",
      address: u.address ?? "",
      createdBy: u.createdBy ?? "",
      name: u.username ?? "",
      email: u.email ?? "",
      role: u.role?.name.toString() ?? "",
      isActive: u.isActive,
      createdAt: new Date(u.createdBy).toLocaleDateString() ?? new Date(),
      actions: "",
    }));

    return mapped ?? [];
  }, [filteredUsers]);
  const { columns } = useUserColumns({ isOpen, setIsOpen, handleDelete });
  return (
    <div
      className={`max-w-8xl mx-auto p-4 min-h-screen shadow ${darkMode ? "bg-gray-900" : "bg-white"
        }`}
    >
      <Loading
        isLoading={isLoading}
        text="Loading users..."
        spinnerColor="border-indigo-600"
        textColor={darkMode ? "text-indigo-300" : "text-indigo-700"}
        overlayColor={darkMode ? "bg-gray-900" : "bg-gray-100"}
        overlayOpacity="bg-opacity-70"
        backgroundColor={darkMode ? "bg-gray-800" : "bg-gray-100"}
      />

      <div
        className={`mb-4 p-4 rounded-md shadow ${darkMode ? "bg-gray-800" : "bg-white"
          }`}
      >
        <div className="flex mb-4">
          <div className="flex gap-3 w-1/2"></div>

          <div className="flex justify-end gap-3 w-1/2">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2"
              onClick={() => setIsOpenDeletePopup(true)}
            >
              <FaTrashAlt />
              Delete
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-500 flex gap-2 items-center justify-center text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              <RiResetLeftFill />
              Reset
            </button>

            <button
              onClick={() => {
                setIsOpenAddModel((prev) => !prev);
              }}
              className="bg-indigo-500 flex gap-2 items-center justify-center text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              <IoAdd />
              Add
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-between items-center mb-2 bg-gray-100 py-2 px-4 rounded">
          <div className="flex flex-row w-full justify-between items-center">
            <h2
              className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-800"
                }`}
            >
              Filters
            </h2>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-sm flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
            >
              {isCollapsed ? (
                <>
                  Expand <IoChevronDown />
                </>
              ) : (
                <>
                  Collapse <IoChevronUp />
                </>
              )}
            </button>
          </div>

          {!isCollapsed && (
            <div className="grid grid-cols-7 md:grid-cols-7 sm:grid-cols-3 gap-4 mb-4">
              {["username", "email", "address", "phone", "status"].map(
                (key) => (
                  <div key={key} className="flex flex-col">
                    <Input
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                      type="text"
                      value={filters[key as keyof typeof filters]}
                      onChange={(val) =>
                        handleChange({
                          target: {
                            name: key,
                            value: val,
                          },
                        } as React.ChangeEvent<HTMLInputElement>)
                      }
                      placeholder={`${key}`}
                      fullWidth
                      className={
                        darkMode
                          ? "bg-gray-700 text-white border-gray-600"
                          : "border-gray-300"
                      }
                    />
                  </div>
                )
              )}

              <CustomSelect
                label="Role"
                value={role}
                onChange={setRole}
                options={options}
                placeholder="Choose role"
              //error={error}
              />
              <button
                onClick={handleSearch}
                className="bg-indigo-600 mt-6 w-10 h-10 flex items-center justify-center text-white px-2 py-2 rounded hover:bg-indigo-500"
              >
                <Search />
              </button>
            </div>
          )}
        </div>
      </div>

      {isError && (
        <p className="text-red-500 text-center mb-4">
          Failed to load users. Try again later.
        </p>
      )}

      <div className={`flex items-center w-full my-2 `}>
        <hr className="flex-grow border-gray-300" />

        <span className="mx-4 text-2xl text-bold text-gray-500 whitespace-nowrap">
          Your Staff
        </span>

        <hr className="flex-grow border-gray-300" />
      </div>

      <div
        className={`overflow-x-auto shadow-md rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"
          }`}
      >
        <Table
          columns={columns}
          data={dataTable}
          columnWidths={initialColumnWidths}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      </div>
      <Popup
        isOpen={isOpenAddModel}
        onClose={() => setIsOpenAddModel(false)}
        title="Add New User"
        width="w-[800px]"
        maxNestedDepth={0}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Username */}
          <div>
            <Input
              label="Username"
              type="text"
              value={username}
              onChange={(val) => setUsername(val)}
              placeholder="Enter username"
              fullWidth
            />

            {errorObject.username && (
              <div className="text-red-400">{errorObject.username}</div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
              placeholder="Enter email"
            />
            {errorObject.email && (
              <div className="text-red-400">{errorObject.email}</div>
            )}
          </div>

          {/* Select Role */}
          <div>
            <CustomSelect
              label="Role"
              value={role}
              onChange={setRole}
              options={options}
              placeholder="Choose role"
            //error={error}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
              placeholder="Enter phone number"
            />
          </div>

          {/* Address */}
          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
              placeholder="Enter address"
            />
          </div>

          {/* Display Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
              placeholder="Enter display name"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="password" className="font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border rounded"
              />
              {errorObject.password && (
                <div className="text-red-400">{errorObject.password}</div>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="confirmPassword" className="font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={passwordConfirm}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-2 border rounded"
              />
              {errorObject.passwordConfirm && (
                <div className="text-red-400">
                  {errorObject.passwordConfirm}
                </div>
              )}
            </div>
          </div>

          {/* {error && <p className="text-red-600 mt-2">{error}</p>}
      {success && <p className="text-green-600 mt-2">{success}</p>} */}

          {/* Create User Button */}
          <div className="d"></div>
          <div className="flex justify-end mt-1">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create User
            </button>
          </div>
        </div>
      </Popup>
      <Popup
        maxNestedDepth={0}
        isOpen={isOpenDeletePopup}
        onClose={() => setIsOpenDeletePopup(false)}
        title="Confirm Deletion"
        width="w-[400px]"
      >
        <div className="space-y-4">
          <p className="text-gray-700 text-sm">
            Are you sure you want to delete these users? This action cannot be
            undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsOpenDeletePopup(false)}
              className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleDeleteBulk();
                setIsOpenDeletePopup(false);
              }}
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </Popup>

      {showToast && (
        <Toast
          message={message}
          type="success"
          duration={3000}
          position="top-right"
        />
      )}
    </div>
  );
};

export default UsersPage;
