"use client";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import Table, { Column } from "../../../components/table";
import { Loading } from "../../../components/Loading";
import {
  useCreateOrderDetail,
  useDeleteOrderDetail,
  useOrderDetail,
} from "../../../hooks/useOrderDetailMutation";
import { CreateOrderItemDto, OrderDetail } from "../../../type/order-detail.type";
import {
  useOrder,
  useOrderDetailsByOrderKey,
} from "../../../hooks/useOrderMutation";
import Button from "../../../components/Button";
import { Popup } from "../../../components/Popup";
import { Toast } from "../../../components/Toast";
import { CustomSelect } from "../../../components/Select";
import { useAllMedicines } from "../../../hooks/useLazyMedicines";
import { IoIosRemoveCircle } from "react-icons/io";
import {
  FiClock,
  FiDollarSign,
  FiHome,
  FiInfo,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import { Input } from "../../../components/Input";
import { Search } from "lucide-react";
const OrderDetailPage: React.FC = () => {
  const searchParams = useSearchParams();
  const orderKey = searchParams.get("orderKey") ?? "";
  const [filters, setFilters] = useState<
    Partial<{
      username: string;
      email: string;
      role: string;
    }>
  >({
    username: "",
    email: "",
    role: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [isOpenAddModel, setIsOpenAddModel] = useState(false);
  const {
    data: medicinesList,
    isLoading: isMedicineLoading,
    isError: isMedicineError,
    error,
  } = useAllMedicines();
  const options =
    medicinesList?.map((r) => ({
      label: r.name,
      value: r._id,
    })) || [];
  const {
    data: orderdetail,
    isLoading: orderdetailLoading,
    refetch: refethDetail,
  } = useOrderDetailsByOrderKey(orderKey); // Assumes a query like useQuery(['order', orderKey], ...)
  const { mutate: deleteOrderDetail } = useDeleteOrderDetail();

  const handleRemove = (orderKey: string, orderDetailId: string) => {
    deleteOrderDetail({ orderKey, orderDetailId });
  };
  const [orderDetailId, setOrderDetailId] = useState<string>("");
  const [medicine, setMedicine] = useState<string>("");
  const [maxQuantiy, setMaxQuantiy] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [errorObject, setErrorObject] = useState<any>({});
  const [message, setMessage] = useState("");
  const { mutate: CreateOrderDetail } = useCreateOrderDetail();
  const { data: order, isLoading, refetch } = useOrder(orderKey);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const handleRemoveMedicine = () => {
    deleteOrderDetail(
      { orderKey, orderDetailId },
      {
        onSuccess: () => {
          refetch(); // <- Call search after deletion
          refethDetail();
        },
        onError: (error) => {
          console.error("Failed to delete medicines:", error);
        },
      }
    );
    setIsDeletePopupOpen(false);
  };

  const itemColumns: Column<OrderDetail>[] = [
    {
      key: "medicine",
      label: "Medicine",
      render: (_, row) =>
        typeof row.medicine === "string" ? row.medicine : row.medicine.name,
    },
    {
      key: "quantity",
      label: "Quantity",
      sortable: true,
      type: "number",
    },
    {
      key: "unitPrice",
      label: "Unit Price",
      sortable: true,
      type: "number",
      render: (_, row) =>
        `$${row.unitPrice?.toFixed(2) ?? row.unitPrice?.toFixed(2)}`,
    },
    {
      key: "totalPrice",
      label: "Total",
      sortable: true,
      type: "number",
      render: (_, row) =>
        `$${row.totalPrice?.toFixed(2) ?? row.totalPrice?.toFixed(2)}`,
    },
    {
      key: "action",
      label: "Actions",
      sortable: false,
      type: "text",
      render: (_, row) => {
        return (
          <>
            <button
              onClick={() => {
                if (order?.status === "cancel" || order?.status === "confirm") {
                  setMessage(
                    `Can not modified this order because it is in ${order.status} `
                  );
                  setToastType("info");
                  setShowToast(true);
                  setTimeout(() => {
                    setShowToast(false);
                  }, 3000);
                } else {
                  setIsDeletePopupOpen(true);
                  setOrderDetailId(row._id);
                }
              }}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-indigo-700 transition"
            >
              <IoIosRemoveCircle />
            </button>
          </>
        );
      },
    },
  ];

  if (orderdetailLoading) {
    return (
      <Loading
        isLoading={true}
        text="Fetching order details..."
        spinnerColor="border-indigo-600"
        textColor="text-indigo-600"
        overlayColor="bg-gray-100"
        overlayOpacity="bg-opacity-70"
        backgroundColor="bg-white"
      />
    );
  }

  if (!order) {
    return <div className="p-6">Order not found.</div>;
  }

  const handleSubmit = async () => {
    // Basic validation
    const errors: any = {};
    if (!medicine) errors.medicine = "Medicine is required";
    if (quantity <= 0) errors.quantity = "Quantity should be greater than 0";
    if (unitPrice <= 0)
      errors.unitPrice = "Unit Price should be greater than 0";
    if (totalPrice <= 0)
      errors.totalPrice = "Total Price should be greater than 0";

    setErrorObject(errors);
    if (Object.keys(errors).length > 0) return; // Stop if validation fails

    const orderDetail: CreateOrderItemDto = {
      orderKey,
      medicine,
      quantity,
      unitPrice,
      totalPrice,
    };

    // Call the onSubmit function passed from the parent component
    CreateOrderDetail(orderDetail, {
      onSuccess: () => {
        setToastType("success")
        setMessage("Create new User Successfully");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);

        setIsOpenAddModel(false);
        refetch();
      },
    });
    setMedicine("");
    setQuantity(1);
    setUnitPrice(0);
    setTotalPrice(0);
  };

  const handleUnitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setUnitPrice(value);
    setTotalPrice(quantity * value);
  };
  // Handle medicine change
  const handleMedicineChange = (selectedValue: string) => {
    setMedicine(selectedValue); // Update the selected medicine

    // Find the selected medicine from the list
    const selectedMedicine = medicinesList?.find(
      (med) => med._id === selectedValue
    );

    // If a medicine is found, set the max quantity and unit price
    if (selectedMedicine) {
      setMaxQuantiy(selectedMedicine.quantityInStock);
      setUnitPrice(selectedMedicine.price);
      setTotalPrice(quantity * selectedMedicine.price); // Recalculate total price when medicine is changed
    }
  };

  // Handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity >= 1 && newQuantity <= maxQuantiy) {
      setQuantity(newQuantity); // Update the quantity if valid
      setTotalPrice(newQuantity * unitPrice); // Recalculate total price based on quantity and unit price
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="max-w-8xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Order #{order.orderKey}</h1>
      <button
        onClick={() => {
          {
            if (order?.status === "cancel" || order?.status === "confirm") {
              setToastType("info")
              setMessage(
                `Can not modified this order because it is in ${order.status} `
              );
              setShowToast(true);
              setTimeout(() => {
                setShowToast(false);
              }, 3000);
            } else {
              setIsOpenAddModel((prev) => !prev);
            }
          }
        }}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        <MdOutlineCollectionsBookmark />
      </button>
      <div className="flex items-center justify-between w-full ">
        <div className="p-4 rounded w-full bg-gray-100 grid grid-cols-6 md:grid-cols-6 gap-4 mb-4">
          {["username", "email", "address", "phone", "status"].map((key) => (
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
                className={"border-gray-300"}
              />
            </div>
          ))}

          <button
            onClick={() => {}}
            className="bg-indigo-600 mt-7 w-10 h-10 flex items-center justify-center text-white px-2 py-2 rounded hover:bg-indigo-500"
          >
            <Search />
          </button>
        </div>
      </div>

      <div className="w-full flex">
        {" "}
        {/* Order Item Table */}
        <div className="w-3/5">
          <h2 className="text-xl font-semibold mb-4">Order Items</h2>
          <Table
            columns={itemColumns}
            data={orderdetail ?? []}
            columnWidths={{
              medicine: 270,
              quantity: 200,
              unitPrice: 200,
              totalPrice: 200,
              createdAt: 200,
              action: 180,
            }}
          />
        </div>
        <div className={`w-2/5 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 `}>
          {/* Customer Info Card */}
          <div className="border border-gray-200 p-6 rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
              <FiUser className="mr-2" />
              Customer Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="font-medium text-gray-700 min-w-[80px]">
                  Name:
                </span>
                <span className="text-gray-600">{order.customerName}</span>
              </div>

              {order.customerPhone && (
                <div className="flex items-start">
                  <span className="font-medium text-gray-700 min-w-[80px] flex items-center">
                    <FiPhone className="mr-1 inline" size={14} /> Phone:
                  </span>
                  <span className="text-gray-600">{order.customerPhone}</span>
                </div>
              )}

              {order.customerAddress && (
                <div className="flex items-start">
                  <span className="font-medium text-gray-700 min-w-[80px] flex items-center">
                    <FiHome className="mr-1 inline" size={14} /> Address:
                  </span>
                  <span className="text-gray-600">{order.customerAddress}</span>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="border border-gray-200 p-6 rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
              <FiInfo className="mr-2" />
              Order Summary
            </h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="font-medium text-gray-700 min-w-[80px]">
                  Status:
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    order.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : order.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="flex items-start">
                <span className="font-medium text-gray-700 min-w-[80px] flex items-center">
                  <FiDollarSign className="mr-1 inline" size={14} /> Total:
                </span>
                <span className="text-gray-600 font-medium">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex items-start">
                <span className="font-medium text-gray-700 min-w-[80px] flex items-center">
                  <FiClock className="mr-1 inline" size={14} /> Created:
                </span>
                <span className="text-gray-600">
                  {dayjs(order.createAt).format("YYYY-MM-DD HH:mm")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Popup
        isOpen={isOpenAddModel}
        maxNestedDepth={0}
        onClose={() => setIsOpenAddModel(false)}
        title="Add Medicine"
        width="w-[400px]"
      >
        <div className="grid grid-cols-1 gap-6">
          {/* Medicine Selection */}
          <div>
            <CustomSelect
              label="Medicines"
              value={medicine}
              onChange={handleMedicineChange}
              options={options}
              placeholder="Choose Medicine"
              //error={error}
            />
            {errorObject.medicine && (
              <div className="text-red-400">{errorObject.medicine}</div>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              disabled={medicine == ""}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
              placeholder="Enter Quantity"
              max={maxQuantiy}
            />
            {errorObject.quantity && (
              <div className="text-red-400">{errorObject.quantity}</div>
            )}
          </div>

          {/* Unit Price */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Unit Price
            </label>
            <input
              type="number"
              value={unitPrice}
              onChange={handleUnitPriceChange}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
              placeholder="Enter Unit Price"
            />
            {errorObject.unitPrice && (
              <div className="text-red-400">{errorObject.unitPrice}</div>
            )}
          </div>

          {/* Total Price (calculated from quantity and unit price) */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Total Price
            </label>
            <input
              type="number"
              value={totalPrice}
              readOnly
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300 bg-gray-200"
              placeholder="Total Price"
            />
            {errorObject.totalPrice && (
              <div className="text-red-400">{errorObject.totalPrice}</div>
            )}
          </div>

          {/* Create Order Detail Button */}
          <div className="flex justify-end mt-1">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Order Detail
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
                handleRemoveMedicine();
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
          type={toastType as "success" | "error" | "info" | "warning"}
          duration={3000}
          position="top-right"
        />
      )}
    </div>
  );
};

export default OrderDetailPage;
