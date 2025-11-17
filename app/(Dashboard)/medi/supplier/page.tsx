"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { getCookie } from "cookies-next";
import { useThemeStore } from "../../../stores/layoutStore";
import { useAllSuppliers, useCreateSupplier, useDeleteSupplier, useUpdateSupplier } from "../../../hooks/useSupplier";
import { Supplier } from "../../../type/supplier.type";
import { Loading } from "../../../components/Loading";
import { Popup } from "../../../components/Popup";
import { Toast } from "../../../components/Toast";

type FormFieldKey =
  | "name"
  | "contactInfo"
  | "address"
  | "email"
  | "taxId"
  | "country"
  | "paymentTerms"
  | "phoneNumber"
  | "representativeName";

const formFields: { key: FormFieldKey; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "contactInfo", label: "Contact Info" },
  { key: "address", label: "Address" },
  { key: "email", label: "Email" },
  { key: "taxId", label: "Tax ID" },
  { key: "country", label: "Country" },
  { key: "paymentTerms", label: "Payment Terms" },
  { key: "phoneNumber", label: "Phone Number" },
  { key: "representativeName", label: "Representative Name" },
];

const UsersPage: React.FC = () => {
  const { theme } = useThemeStore();
  const darkMode = useMemo(() => theme === "dark", [theme]);
  const { data: suppliers, isLoading, isError, error } = useAllSuppliers();
  const [message, setMessage] = useState("");
  const [curr, setCurr] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isOpenAddModel, setIsOpenAddModel] = useState(false);
  const [isOpenEditModel, setIsOpenEditModel] = useState(false);
  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
  const [name, setName] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const { mutate: updateSupplier } = useUpdateSupplier();

  const [form, setForm] = useState<any>({
    name: "",
    contactInfo: "",
    address: "",
    email: "",
    taxId: "",
    country: "",
    paymentTerms: "",
    isActive: false,
    phoneNumber: "",
    representativeName: "",
    contractStartDate: "",
  });
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [taxId, setTaxId] = useState("");
  const [country, setCountry] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [representativeName, setRepresentativeName] = useState("");
  const [contractStartDate, setContractStartDate] = useState("");
  const [address, setAddress] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [errorObject, setErrorObject] = useState<any>({});
  const { mutate: createSupplier } = useCreateSupplier();
  const [searchTerm, setSearchTerm] = useState("");
  const clearSupplierForm = () => {
  setName("");
  setEmail("");
  setPhoneNumber("");
  setTaxId("");
  setCountry("");
  setPaymentTerms("");
  setRepresentativeName("");
  setContractStartDate("");
  setAddress("");
  setContactInfo("");
  setIsActive(true);
  setErrorObject({});
};

  const handleCreateSupplier = () => {
    createSupplier(
      {
        name,
        email,
        phoneNumber,
        taxId,
        country,
        paymentTerms,
        representativeName,
        contractStartDate,
        address,
        contactInfo,
        isActive,
      },
      {
        onSuccess: () => {
          setIsOpenAddModel(false);
      clearSupplierForm(); 
        },
        onError: (error: any) => {
          // Handle validation error
          console.error(error);
        },
      }
    );
  };
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const { mutate: deleteSupplier } = useDeleteSupplier();

  const handleDelete = () => {deleteSupplier(curr);};
  const handleSubmit = () => {
    updateSupplier({
      id: curr,
      data: form,
    });
    setIsOpenEditModel(false);
  };
  return (
    <div
      className={`max-w-8xl mx-auto p-6 min-h-screen shadow ${
        darkMode ? "bg-gray-900" : "bg-white"
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
        className={`overflow-x-auto shadow-md rounded-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Supplier Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your suppliers and contracts
            </p>
          </div>
          <button
            onClick={() => {
              setIsOpenAddModel((prev) => !prev);
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center"
          >
            <PlusIcon />
            Add New Supplier
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supplier Name
              </label>
              <div className="relative">
          
                <input
                  type="text"
                  placeholder="Search suppliers..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option>All Statuses</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option>All Countries</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Germany</option>
              </select>
            </div>
          </div>
        </div>

        {/* Supplier Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Supplier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contract Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {suppliers?.map((supplier) => (
                  <tr
                    key={supplier._id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedSupplier(supplier)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="bg-indigo-100 text-indigo-800 rounded-lg p-2 mr-4">
                          <BuildingOfficeIcon />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {supplier.name}
                          </div>
                          <div className="text-gray-500 text-sm">
                            {supplier.taxId && `Tax ID: ${supplier.taxId}`}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{supplier.email}</div>
                      <div className="text-gray-500 text-sm">
                        {supplier.phoneNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{supplier.country}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {supplier.contractStartDate &&
                        new Date(
                          supplier.contractStartDate
                        ).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          supplier.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {supplier.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button
                        onClick={() => {
                          setIsOpenEditModel(true);
                          setCurr(supplier._id);
                          setForm(supplier);
                        }}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <PencilSquareIcon />
                      </button>
                      <button
                        onClick={() => {
                          setCurr(supplier._id);
                          setIsOpenDeletePopup(true);
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {suppliers?.length === 0 && (
            <div className="text-center py-12">
              <FolderOpenIcon />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No suppliers found
              </h3>
              <p className="mt-1 text-gray-500 max-w-prose mx-auto">
                {searchTerm
                  ? `No suppliers match your search for "${searchTerm}". Try a different search term.`
                  : "You haven't added any suppliers yet. Add your first supplier to get started."}
              </p>
              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                  <PlusIcon />
                  Add Supplier
                </button>
              </div>
            </div>
          )}
        </div>

        <Popup
          isOpen={isOpenAddModel}
          onClose={() => setIsOpenAddModel(false)}
          title="Add New Supplier"
          width="w-[800px]"
          maxNestedDepth={0}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
                placeholder="Enter supplier name"
              />
              {errorObject.name && (
                <div className="text-red-400">{errorObject.name}</div>
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

            {/* Phone */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
                placeholder="Enter phone number"
              />
            </div>

            {/* Tax ID */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Tax ID
              </label>
              <input
                type="text"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
                placeholder="Enter tax ID"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
                placeholder="Enter country"
              />
            </div>

            {/* Payment Terms */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Payment Terms
              </label>
              <input
                type="text"
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
                placeholder="e.g. Net 30"
              />
            </div>

            {/* Representative */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Representative Name
              </label>
              <input
                type="text"
                value={representativeName}
                onChange={(e) => setRepresentativeName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
                placeholder="Enter representative name"
              />
            </div>

            {/* Contract Start Date */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Contract Start Date
              </label>
              <input
                type="date"
                value={contractStartDate}
                onChange={(e) => setContractStartDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
              />
            </div>

            {/* Address (Full Width) */}
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

            {/* Contact Info */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Contact Info
              </label>
              <input
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
                placeholder="Enter contact details"
              />
            </div>

            {/* Is Active (Checkbox) */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="h-4 w-4 text-blue-600"
              />
              <label className="text-sm font-medium text-gray-700">
                Is Active
              </label>
            </div>

            {/* Submit */}
            <div className="d"></div>
            <div className="flex justify-end mt-1">
              <button
                onClick={handleCreateSupplier}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Supplier
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
              handleDelete()
                  setIsOpenDeletePopup(false);
                }}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </Popup>
        <Popup
          isOpen={isOpenEditModel}
          onClose={() => setIsOpenEditModel(false)}
          title="Edit Supplier"
          width="w-[800px]"
          maxNestedDepth={0}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {formFields.map(({ key, label }) => (
              <div key={key}>
                <label className="block mb-1 text-sm text-gray-700">
                  {label}
                </label>
                <input
                  type="text"
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm border-gray-300"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}

            {/* isActive checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <label className="text-sm text-gray-700">Active</label>
            </div>

            {/* contractStartDate */}
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                Contract Start Date
              </label>
              <input
                type="date"
                name="contractStartDate"
                value={form.contractStartDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-sm border-gray-300"
              />
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2 flex justify-end mt-2">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {isLoading ? "Updating..." : "Update Supplier"}
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
              Are you sure you want to delete this supplier? This action cannot be
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
                  handleDelete();
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
    </div>
  );
};

export default UsersPage;
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

const BuildingOfficeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
    />
  </svg>
);

const PencilSquareIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
    />
  </svg>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    />
  </svg>
);

const FolderOpenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-12 h-12"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
    />
  </svg>
);
