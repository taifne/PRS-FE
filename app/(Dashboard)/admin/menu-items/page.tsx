"use client";
import React, { useEffect, useState } from "react";
import {
  useAllMenus,
  useCreateMenu,
  useDeleteMenu,
} from "../../../hooks/useMenuMutation";
import {
  useAllRoles,
  useCreateRole,
  useDeleteRole,
  useRole,
  useUpdateMenusInRole,
} from "../../../hooks/useRoleMutation";
import Button from "../../../components/Button";
import { Input } from "../../../components/Input";
import {
  FiMenu,
  FiPlus,
  FiTrash2,
  FiShield,
  FiCheckSquare,
  FiSave,
} from "react-icons/fi";
import { Toast } from "../../../components/Toast";
import MenuManager, { sampleMenus } from "./dd/dd";
import MenuItem from "./single-item";
export default function ManageMenusPage() {
  const { data: menus, isLoading: loadingMenus } = useAllMenus();
  const { data: roles, isLoading: loadingRoles } = useAllRoles();
  const deleteMenu = useDeleteMenu();
  const createMenu = useCreateMenu();
  const createRole = useCreateRole();
  const deleteRole = useDeleteRole();
  const updateMenusInRole = useUpdateMenusInRole();
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const { data: selectedRoleData } = useRole(selectedRoleId || "");
  const [newRoleName, setNewRoleName] = useState("");
  const [newMenuName, setNewMenuName] = useState("");
  const [newMenuLabel, setNewMenuLabel] = useState("");
  const [newMenuPath, setNewMenuPath] = useState("");
  const [newMenuDescription, setNewMenuDescription] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [assignedMenuIds, setAssignedMenuIds] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (selectedRoleData?.menus) {
      setAssignedMenuIds(selectedRoleData.menus.map((m: any) => m));
    }
  }, [selectedRoleData]);

  const handleCheckboxChange = (menuId: string) => {
    setAssignedMenuIds((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  const handleSaveMenus = () => {
    if (!selectedRoleId) return;
    updateMenusInRole.mutate({
      roleId: selectedRoleId,
      menuIds: assignedMenuIds,
    });
    setMessage("Update role permission successfully !");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  const handleCreateMenu = () => {
    if (!newMenuName.trim() || !newMenuLabel.trim()) return;
    createMenu.mutate({ name: newMenuName, label: newMenuLabel });
    setNewMenuName("");
    setNewMenuLabel("");
    setMessage("Create Menu successfully !");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  const handleCreateRole = () => {
    if (!newRoleName.trim()) return;
    createRole.mutate({ name: newRoleName });
    setNewRoleName("");
    setMessage("Create Role successfully !");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  const handleDeleteRole = (id: string) => {
    if (confirm("Are you sure you want to delete this role?")) {
      deleteRole.mutate(id);
      setMessage("Delele Role successfully !");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      if (selectedRoleId === id) setSelectedRoleId(null);
    }
  };
  useEffect(() => {
    console.log(assignedMenuIds, menus);
  }, [assignedMenuIds]);

  return (
    <div className="flex gap-6 p-6 w-full  mx-auto">
      {/* Menus Section */}
      {/* <div className="w-1/3 space-y-4">
        <div className="h-48 bg-gray-100 rounded-xl shadow-sm border border-gray-100 p-2 space-y-1">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <FiMenu className="text-blue-500" />
            Create New Menu
          </h2>
          <div className="w-full grid grid-cols-2 gap-2">
            {" "}
            <Input
              placeholder="Menu name"
              value={newMenuName}
              onChange={setNewMenuName}
              className="bg-gray-50 border-gray-200"
            />
            <Input
              placeholder="Menu path"
              value={newMenuLabel}
              onChange={setNewMenuPath}
              className="bg-gray-50 border-gray-200"
            />
            <Input
              placeholder="Descriptions"
              value={newMenuDescription}
              onChange={setNewMenuDescription}
              className="bg-gray-50 border-gray-200"
            />
            <Input
              placeholder="Menu label"
              value={newMenuLabel}
              onChange={setNewMenuLabel}
              className="bg-gray-50 border-gray-200"
            />
            <Button
              onClick={handleCreateMenu}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <FiPlus className="mr-2" />
              Create Menu
            </Button>
          </div>
        </div>

        {loadingMenus ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <h3 className="px-4 py-3 font-medium bg-gray-50 text-gray-700 border-b">
              Existing Menus
            </h3>
            <ul className="divide-y divide-gray-100">
              {menus?.map((menu) => (
                <li
                  key={menu._id}
                  className="flex justify-between items-center p-3 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-700">{menu.label}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      deleteMenu.mutate(menu._id);
                      setMessage("Delele Menu successfully !");
                      setShowToast(true);
                      setTimeout(() => {
                        setShowToast(false);
                      }, 3000);
                    }}
                    className="text-red-500 hover:bg-red-50"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div> */}
<MenuManager />
      {/* Roles Section */}
      {/* <div className="w-1/3 space-y-4">
        <div className=" rounded-xl shadow-sm border border-gray-100 p-4 h-48 bg-gray-100">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800 mb-3">
            <FiShield className="text-purple-500" />
            Create New Role
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Enter role name"
              value={newRoleName}
              onChange={setNewRoleName}
              className="bg-gray-50 w-1/2 border-gray-200 flex-1"
            />
                <Input
              placeholder="Enter role name"
              value={newRoleName}
              onChange={setNewRoleName}
              className="bg-gray-50 w-1/2 border-gray-200 flex-1"
            />
            <Button
              onClick={handleCreateRole}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <FiPlus className="mr-1" />
              Create
            </Button>
          </div>
        </div>

        {loadingRoles ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <h3 className="px-4 py-3 font-medium bg-gray-50 text-gray-700 border-b">
              Available Roles
            </h3>
            <ul className="divide-y divide-gray-100">
              {roles?.map((role) => (
                <li
                  key={role._id}
                  className={`p-3 flex justify-between items-center cursor-pointer transition-colors ${
                    selectedRoleId === role._id
                      ? "bg-blue-50 border-l-4 border-blue-500"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedRoleId(role._id)}
                >
                  <span className="font-medium text-gray-700">{role.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteRole(role._id);
                    }}
                    className="text-red-500 hover:bg-red-50"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div> */}
<MenuItem menu={sampleMenus[0]}/>
      {/* Access Control Section */}
      <div className="w-1/3 space-y-4">
        <div className="h-48 bg-gray-100 rounded-xl shadow-sm border border-gray-100 p-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <FiCheckSquare className="text-green-500" />
            Role Permissions
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {selectedRoleId
              ? "Select menus for the role"
              : "Select a role first"}
          </p>
        </div>

        {selectedRoleId && menus && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-medium text-gray-700 mb-3">
              Assign Menu Access
            </h3>
            <div className="space-y-2">
              {menus.map((menu) => (
                <label
                  key={menu._id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={assignedMenuIds.includes(menu._id)}
                      onChange={() => handleCheckboxChange(menu._id)}
                      className="absolute opacity-0 h-0 w-0 peer"
                    />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-md flex items-center justify-center peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-colors">
                      {assignedMenuIds.includes(menu._id) && (
                        <FiCheckSquare className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>
                  </div>
                  <span className="text-gray-700">{menu.label}</span>
                </label>
              ))}
            </div>
            <Button
              onClick={handleSaveMenus}
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
            >
              <FiSave className="mr-2" />
              Save Permissions
            </Button>
          </div>
        )}
      </div>
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
}
