"use client";
import { HiMiniTrash } from "react-icons/hi2";
import { RiResetLeftFill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import React, { useEffect, useMemo, useState } from "react";
import { Supplier } from "../../../type/supplier.type";
import { useThemeStore } from "../../../stores/layoutStore";
import { Medicine, useAllMedicines, useCreateMedicine, useDeleteManyMedicines, useLazyMedicines, useUpdateMedicine } from "../../../hooks/useLazyMedicines";
import { useAllSuppliers } from "../../../hooks/useSupplier";
import Table, { Column } from "../../../components/table";
import Drawer from "../../../components/Drawer";
import SupplierCard from "./represents/supplier";
import { Loading } from "../../../components/Loading";
import { UploadCloudIcon } from "lucide-react";
import { Popup } from "../../../components/Popup";
import { CustomSelect } from "../../../components/Select";
import { Toast } from "../../../components/Toast";

type MedicineMapped = {
  name: string;
  manufacturer?: string;
  expiryDate?: string; 
  dosage?: string;
  price: number;
  quantityInStock: number;
  packSize?: number;
  sideEffects?: string; 
  prescriptionRequired?: boolean;
  supplier?: Supplier;
  actions: string;
};
const MedicinesPage: React.FC = () => {
  const { data:  dataaa,isLoading, isError } = useAllMedicines();
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<any>>(new Set());
  const [focusedRowData, setFocusedRowData] = useState<any>({});
  const { theme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAddModel, setIsOpenAddModel] = useState(false);
  const [isOpenUpdateModel, setIsOpenUpdateModel] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const { mutate: createMedicine, isLoading: isLoadingCreate } =
    useCreateMedicine();
  const { mutate: deleteManyMedicines } = useDeleteManyMedicines();

  const { mutate: updateMedicine, isSuccess } = useUpdateMedicine();

  const [form, setForm] = useState({
    name: "",
    manufacturer: "",
    expiryDate: "",
    dosage: "",
    price: 0,
    quantityInStock: 0,
    supplier: "",
    category: "",
    description: "",
    dosageForm: "",
    packSize: 0,
    sideEffects: "",
    prescriptionRequired: false,
  });

  const [supplierCurr, setSupplierCurr] = useState("");
  const { data: suppliers, error } = useAllSuppliers();
  const options =
    suppliers?.map((r) => ({
      label: r.name,
      value: r._id,
    })) || [];
  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "quantityInStock" || name === "packSize"
          ? Number(value)
          : value,
    }));
  };
  const handleBulkDelete = () => {
    deleteManyMedicines(
      Array.from(selectedRows).map((e) => e.id),
      {
        onSuccess: () => {
          refetchSearch(); 
        },
        onError: (error) => {
          console.error("Failed to delete medicines:", error);
        },
      }
    );
    setIsDeletePopupOpen(false);
  };
  const handleSubmit = () => {
    const dataToSend = {
      ...form,
      supplier: supplierCurr,
      sideEffects: form.sideEffects.split(",").map((s) => s.trim()),
    };
    createMedicine(dataToSend, {
      onSuccess: () => {
        setIsOpenAddModel(false);
        setForm({
          // reset form
          name: "",
          manufacturer: "",
          expiryDate: "",
          dosage: "",
          price: 0,
          quantityInStock: 0,
          supplier: "",
          category: "",
          description: "",
          dosageForm: "",
          packSize: 0,
          sideEffects: "",
          prescriptionRequired: false,
        });
        handleSearch();

        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      },
    });
  };
  const columns: Column<MedicineMapped>[] = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      editable: false,
      resizable: true,
      filterable: true,
      type: "text",
      reorderable: true,
      frozen: true,
    },
    {
      key: "manufacturer",
      label: "Manufacturer",
      sortable: true,
      editable: false,
      resizable: true,
      filterable: true,
      type: "text",
      reorderable: true,
    },
    {
      key: "expiryDate",
      label: "Expiry Date",
      sortable: true,
      editable: false,
      resizable: true,
      filterable: true,
      type: "date",
      reorderable: true,
    },
    {
      key: "dosage",
      label: "Dosage",
      sortable: true,
      editable: false,
      resizable: true,
      filterable: true,
      type: "text",
      reorderable: true,
    },
    {
      key: "price",
      label: "Price ($)",
      sortable: true,
      editable: false,
      resizable: true,
      type: "number",
      reorderable: true,
    },
    {
      key: "quantityInStock",
      label: "Stock Quantity",
      sortable: true,
      editable: false,
      resizable: true,
      type: "number",
      reorderable: true,
    },
    {
      key: "packSize",
      label: "Pack Size",
      sortable: true,
      editable: false,
      resizable: true,
      type: "number",
      reorderable: true,
    },
    {
      key: "sideEffects",
      label: "Side Effects",
      sortable: false,
      editable: false,
      resizable: true,
      filterable: true,
      type: "text",
      reorderable: true,
    },
    {
      key: "prescriptionRequired",
      label: "Prescription",
      sortable: true,
      editable: false,
      resizable: true,
      type: "text",
      reorderable: true,
    },
    {
      key: "supplier",
      label: "Supplier",
      sortable: true,
      editable: false,
      resizable: true,
      filterable: true,
      type: "text",
      reorderable: true,
      render: (value, row) => {
        const toggleDrawer = () => setIsOpen((prev) => !prev);

        const drawerItems = [
          { label: "Home", onClick: () => alert("Home clicked") },
          { label: "Profile", onClick: () => alert("Profile clicked") },
          { label: "Settings", onClick: () => alert("Settings clicked") },
        ];
        return (
          <>
            <button
              onClick={toggleDrawer}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              {row.supplier?.name}
            </button>

            <Drawer
              isOpen={isOpen}
              onClose={toggleDrawer}
              items={drawerItems}
              isDark={true}
            >
              {SupplierCard(row.supplier)}
            </Drawer>
          </>
        );
      },
    },
  ];
  const darkMode = useMemo(() => {
    return theme === "dark";
  }, [theme]);
  const [filters, setFilters] = useState<
    Partial<{
      name: string;
      manufacturer: string;
      category: string;
      supplier: string;
    }>
  >({
    name: "",
    manufacturer: "",
    category: "",
    supplier: "",
  });
  const [filters1, setFilters1] = useState<
    Partial<{
      name: string;
      manufacturer: string;
      category: string;
      supplier: string;
    }>
  >({
    name: "",
    manufacturer: "",
    category: "",
    supplier: "",
  });

  const { data: medicinesData, refetch: refetchSearch } =
    useLazyMedicines(filters1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = () => {
    const nonEmptyFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, value]) => (value || "").trim() !== ""
      )
    );
    setFilters(nonEmptyFilters);
    setFilters1(nonEmptyFilters);
    refetchSearch();
  };

  const handleReset = () => {
    const emptyFilters = {
      name: "",
      manufacturer: "",
      category: "",
      supplier: "",
    };
    setFilters(emptyFilters);
    refetchSearch();
  };
  const [initialColumnWidths, setInitialColumnWidths] = useState({
    checkbox: 50,
    name: 240,
    manufacturer: 200,
    expiryDate: 200,
    dosage: 200,
    price: 130,
    quantityInStock: 130,
    packSize: 110,
    sideEffects: 200,
    prescriptionRequired: 160,
    supplier: 200,
  });
  const [formState, setFormState] = useState<
    Partial<
      Medicine & {
        sideEffects: string;
        description: string;
        category: string;
        dosageForm: string;
      }
    >
  >({
    name: focusedRowData?.name ?? "",
    manufacturer: focusedRowData?.manufacturer ?? "",
    expiryDate: focusedRowData?.expiryDate ?? "",
    dosage: focusedRowData?.dosage ?? "",
    price: focusedRowData?.price ?? 0,
    quantityInStock: focusedRowData?.quantityInStock ?? 0,
    packSize: focusedRowData?.packSize ?? 0,
    sideEffects: focusedRowData?.sideEffects ?? "", // Join array for text input
    prescriptionRequired: focusedRowData?.prescriptionRequired ?? false,
    supplier: focusedRowData?.supplier?._id ?? supplierCurr,
    category: focusedRowData?.category ?? "",
    dosageForm: focusedRowData?.dosageForm ?? "",
    description: focusedRowData?.description ?? "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    const inputValue =
      isCheckbox && e.target instanceof HTMLInputElement
        ? e.target.checked
        : type === "number"
        ? Number(value)
        : value;

    setFormState((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("hihi", {
      id: focusedRowData,
      updates: formState,
    });
    updateMedicine({
      id: focusedRowData.id,
      updates: formState,
    });
    setIsOpenUpdateModel(false);
    refetchSearch();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };;
  useEffect(() => {
    setFormState(focusedRowData);
  }, [focusedRowData]);
  const [editedRows, setEditedRows] = useState<
    { rowIndex: number; before: any; after: any }[]
  >([]);
  const dataTable = useMemo<MedicineMapped[]>(() => {
    if (!medicinesData) return [];
    return medicinesData.map((medicine) => ({
      id: medicine._id,
      name: medicine.name,
      manufacturer: medicine.manufacturer,
      expiryDate: medicine.expiryDate,
      dosage: medicine.dosage,
      price: medicine.price,
      quantityInStock: medicine.quantityInStock,
      packSize: medicine.packSize,
      sideEffects: medicine.sideEffects?.join(",") || "",
      prescriptionRequired: medicine.prescriptionRequired,
      supplier: medicine.supplier, 
      actions: "",
    }));
  }, [medicinesData]); 


  const handleEdit = (rowIndex: number, before: any, after: any) => {
    setEditedRows((prev) => [...prev, { rowIndex, before, after }]);
    console.log(`Row ${rowIndex} edited:`, { before, after });
  };
  useEffect(() => {
    refetchSearch();
  }, []);
  return (
    <div
      className={`max-w-9xl min-h-[1000px] mx-auto p-6  shadow-md ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* Loading Overlay */}
      <Loading
        isLoading={isLoading}
        text="Fetching data..."
        spinnerColor="border-blue-600"
        textColor={darkMode ? "text-blue-400" : "text-blue-800"}
        overlayColor={darkMode ? "bg-gray-900" : "bg-gray-100"}
        overlayOpacity="bg-opacity-70"
        backgroundColor={darkMode ? "bg-gray-800" : "bg-gray-100"}
        size="lg"
        modalWidth="w-80"
      />

      {/* Filters Section */}
      <div
        className={`p-4 rounded-lg shadow-md mb-6 flex flex-col gap-4 bg-gray-100  
        `}
      >
        <h1 className="text-2xl font-bold"> Medicines Management</h1>

        <div className="grid px-24 grid-cols-5 md:grid-cols-5 gap-4">
          {["name", "manufacturer", "category", "supplier"].map((field) => (
            <div key={field} className="flex flex-col">
              <label
                htmlFor={field}
                className={`mb-1 text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={filters[field as keyof typeof filters] || ""}
                onChange={handleChange}
                className={`p-2 border rounded-md w-full ${
                  darkMode ? "bg-gray-700 text-white" : ""
                }`}
              />
            </div>
          ))}
          <button
            onClick={handleSearch}
            className="bg-blue-500 w-20 h-10 mt-6 text-white  rounded-md hover:bg-blue-600 transition-colors flex flex-row gap-2 justify-center text-2xl fond-bold items-center"
          >
            <CiSearch />
          </button>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => {
              setIsOpenUpdateModel((prev) => !prev);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex flex-row gap-2 items-center"
          >
            <UploadCloudIcon />
            Modify
          </button>
          <button
            onClick={() => setIsDeletePopupOpen(true)}
            disabled={Array.from(selectedRows).length == 0}
            className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-colors flex flex-row gap-2 items-center"
          >
            <HiMiniTrash />
            Delete
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-colors flex flex-row gap-2 items-center"
          >
            <RiResetLeftFill />
            Reset
          </button>

          <button
            onClick={() => {
              setIsOpenAddModel((prev) => !prev);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex flex-row gap-2 items-center"
          >
            <IoMdAddCircleOutline />
            Add
          </button>
        </div>
      </div>

      {/* Status Messages */}
      {isLoading && (
        <p
          className={`text-center mb-4 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Loading medicines...
        </p>
      )}
      {isError && (
        <p className="text-red-500 text-center mb-4">
          Failed to fetch medicines.
        </p>
      )}
      <div className={`flex items-center w-full my-2 `}>
        <hr className="flex-grow border-gray-300" />

        <span className="mx-4 text-2xl text-bold text-gray-500 whitespace-nowrap">
          Inventory
        </span>

        <hr className="flex-grow border-gray-300" />
      </div>
      {/* Data Table */}
      <div
        className={`overflow-x-auto shadow-md rounded-lg max-h-[820px] ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <Table
          columns={columns ?? []}
          data={dataTable ?? []}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          columnWidths={initialColumnWidths}
          onEdit={handleEdit}
          focusedRowData={focusedRowData}
          setFocusedRowData={setFocusedRowData}
        />
      </div>
      <Popup
        isOpen={isOpenAddModel}
        onClose={() => setIsOpenAddModel(false)}
        title="Add New Medicine"
        width="w-[800px]"
        maxNestedDepth={0}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChangeInput}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
              placeholder="Enter medicine name"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Manufacturer
            </label>
            <input
              name="manufacturer"
              value={form.manufacturer}
              onChange={handleChangeInput}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
              placeholder="Enter manufacturer"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="date"
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleChangeInput}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Dosage
            </label>
            <input
              name="dosage"
              value={form.dosage}
              onChange={handleChangeInput}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
              placeholder="e.g., 500mg"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChangeInput}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Quantity in Stock
            </label>
            <input
              type="number"
              name="quantityInStock"
              value={form.quantityInStock}
              onChange={handleChangeInput}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
            />
          </div>

          <div>
            <CustomSelect
              label="Supllier"
              value={supplierCurr}
              onChange={setSupplierCurr}
              options={options}
              placeholder="Choose role"
              //error={error}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              name="category"
              value={form.category}
              onChange={handleChangeInput}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Dosage Form
            </label>
            <input
              name="dosageForm"
              value={form.dosageForm}
              onChange={handleChangeInput}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Pack Size
            </label>
            <input
              type="number"
              name="packSize"
              value={form.packSize}
              onChange={handleChangeInput}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Side Effects (comma-separated)
            </label>
            <input
              name="sideEffects"
              value={form.sideEffects}
              onChange={handleChangeInput}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
              placeholder="e.g., headache, nausea"
            />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="prescriptionRequired"
              checked={form.prescriptionRequired}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  prescriptionRequired: e.target.checked,
                }))
              }
            />
            <label
              htmlFor="prescriptionRequired"
              className="text-sm font-medium text-gray-700"
            >
              Prescription Required
            </label>
          </div>

          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChangeInput}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
              placeholder="Enter description"
            />
          </div>

          <div className="col-span-2 flex justify-end mt-1">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Medicine
            </button>
          </div>
        </div>
      </Popup>
      <Popup
        isOpen={isOpenUpdateModel}
        onClose={() => setIsOpenUpdateModel(false)}
        title="Modify Medicine"
        width="w-[800px]"
        maxNestedDepth={0}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              name="name"
              value={formState.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
              placeholder="Enter medicine name"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Manufacturer
            </label>
            <input
              name="manufacturer"
              value={formState.manufacturer}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
              placeholder="Enter manufacturer"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formState.expiryDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Dosage
            </label>
            <input
              name="dosage"
              value={formState.dosage}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
              placeholder="e.g., 500mg"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formState.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Quantity in Stock
            </label>
            <input
              type="number"
              name="quantityInStock"
              value={formState.quantityInStock}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
            />
          </div>

          <div>
            <CustomSelect
              label="Supllier"
              value={supplierCurr}
              onChange={setSupplierCurr}
              options={options}
              placeholder="Choose role"
              //error={error}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              name="category"
              value={formState.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Dosage Form
            </label>
            <input
              name="dosageForm"
              value={formState.dosageForm}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Pack Size
            </label>
            <input
              type="number"
              name="packSize"
              value={formState.packSize}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Side Effects (comma-separated)
            </label>
            <input
              name="sideEffects"
              value={formState.sideEffects}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
              placeholder="e.g., headache, nausea"
            />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="prescriptionRequired"
              checked={formState.prescriptionRequired}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  prescriptionRequired: e.target.checked,
                }))
              }
            />
            <label
              htmlFor="prescriptionRequired"
              className="text-sm font-medium text-gray-700"
            >
              Prescription Required
            </label>
          </div>

          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formState.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
              placeholder="Enter description"
            />
          </div>

          <div className="col-span-2 flex justify-end mt-1">
            <button
              onClick={handleFormSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Modify Medicine
            </button>
          </div>
        </div>
      </Popup>
      <Popup
        isOpen={isDeletePopupOpen}
        onClose={() => setIsDeletePopupOpen(false)}
        title="Confirm Delete"
        width="w-[400px]"
        maxNestedDepth={0}
      >
        <div className="p-4">
          <p className="mb-6">
            Are you sure you want to delete{" "}
            <span className="font-semibold"></span>? This action cannot be
            undone.
          </p>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsDeletePopupOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                handleBulkDelete();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
          position="top-center"
        />
      )}
    </div>
  );
};

export default MedicinesPage;
