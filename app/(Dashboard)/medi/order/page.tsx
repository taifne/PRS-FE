"use client";

import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { MdDetails, MdOutlineCreateNewFolder } from "react-icons/md";

import { getCookie } from "cookies-next";
import {
  Search,
} from "lucide-react";
import { GiCancel, GiConfirmed } from "react-icons/gi";
import { useThemeStore } from "../../../stores/layoutStore";
import { useConfirmOrderStatus, useCreateOrder, useOrder, useOrders } from "../../../hooks/useOrderMutation";
import { useAllOrderDetails } from "../../../hooks/useOrderDetailMutation";
import Table, { Column } from "../../../components/table";
import { Loading } from "../../../components/Loading";
import { Input } from "../../../components/Input";
import { CustomSelect } from "../../../components/Select";
import Drawer from "../../../components/Drawer";
import { Popup } from "../../../components/Popup";
import { Toast } from "../../../components/Toast";


const OrdersPage: React.FC = () => {
  const { theme } = useThemeStore();
  const darkMode = theme === "dark";
  const [status, setStatus] = useState<string>("comfirmed");
  const { mutate: confirmOrder } = useConfirmOrderStatus(status);
  const userId = getCookie("userId")?.toString();
  const { data: orders, isLoading } = useOrders();
  const { data: orderDetails } = useAllOrderDetails();
  const { mutate: createOrder } = useCreateOrder();
  const [isConfirmModel, setIsConfirmAddModel] = useState(false);
  const [orderStatus, setOrderStatus] = useState("ALL");
  const [errorObject, setErrorObject] = useState({
    customerName: "",
  });
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date } | null>(
    null
  );
  const [selectedRows, setSelectedRows] = useState<Set<any>>(new Set());
  const [focusedRowData, setFocusedRowData] = useState<any>({});
  const [isOpenAddModel, setIsOpenAddModel] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);
  const { data: order, error } = useOrder(confirmedOrderId || "");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const handleViewDetails = (id: string) => {
    setSelectedOrderId(id);
    setDrawerOpen(true);
  };

  const handleConfirm = async (orderId: string) => {
    try {
      setStatus("confirm");
      await confirmOrder(orderId);
      setConfirmedOrderId(orderId);
    } catch (error) {
      console.error("Failed to confirm order", error);
    } finally {
      setIsConfirmAddModel(false);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };
  const filteredOrders = useMemo(() => {
    return (
      orders?.filter((o) => {
        const matchesSearch = o.customerName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        const inDateRange = dateRange
          ? dayjs(o.createAt).isAfter(dayjs(dateRange.start)) &&
            dayjs(o.createAt).isBefore(dayjs(dateRange.end))
          : true;
        return matchesSearch && inDateRange;
      }) || []
    );
  }, [orders, searchTerm, dateRange]);

  const columns: Column<any>[] = [
    {
      key: "orderKey",
      label: "orderKey",
      sortable: true,
      type: "text",
      render: (_, row) => (
        <a
          href={`/admin/order-detail?orderKey=${encodeURIComponent(
            row.orderKey
          )}`}
        >
          {row.orderKey}
        </a>
      ),
    },
    {
      key: "customerName",
      label: "Customer",
      sortable: true,
      type: "text",
    },
    {
      key: "customerAddress",
      label: "Customer Address",
      sortable: true,
      type: "text",
    },
    {
      key: "customerPhone",
      label: "Customer Phone",
      sortable: true,
      type: "text",
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      type: "text",
      render: (_, row) => {
        const status = (row.status || "").toLowerCase();
        let icon = null;
        let color = "";

        if (status === "pending") {
          icon = "⏳"; // Or use an actual icon component if you like
          color = "text-yellow-500";
        } else if (status === "cancel") {
          icon = "❌";
          color = "text-red-500";
        } else if (status === "confirmed") {
          icon = "✅";
          color = "text-green-500";
        }

        return (
          <span className={`flex items-center gap-2 ${color}`}>
            {icon}
            {status}
          </span>
        );
      },
    },
    {
      key: "totalAmount",
      label: "TotalAmount",
      sortable: true,
      type: "text",
    },
    {
      key: "createdAt",
      label: "Created At",
      sortable: true,
      type: "date",
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <button
          className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
          onClick={() => handleViewDetails(row._id)}
        >
          <MdDetails />
        </button>
      ),
    },
  ];

  const orderRows = filteredOrders.map((o) => ({
    ...o,
    createdAt: dayjs(o.createAt).format("YYYY-MM-DD HH:mm"),
    actions: "",
  }));
  const handleSubmit = () => {
    let hasError = false;
    const errors = {
      customerName: "",
    };
    if (!customerName) {
      errors.customerName = "customerName is required.";
      hasError = true;
    }
    // If any validation error exists, set error object and stop submission
    if (hasError) {
      setErrorObject(errors);
      return;
    }
    createOrder(
      {
        customerName: customerName,
        customerAddress: customerAddress,
        customerPhone: customerPhone,
        status: "Pending",
        items: [],
        totalAmount: 0,
        createdBy: userId ?? "",
      },
      {
        onSuccess: () => {
          setMessage("Create new User Successfully");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 3000);

          setIsOpenAddModel(false);
          setCustomerName("");
          setCustomerAddress("");
          setCustomerPhone("");
        },
      }
    );
  };
  useEffect(() => {
    if (order) {
      setFocusedRowData(order);
    }
  }, [order]);

  const options =
    ["ALL", "PENDING", "CANCEL", "CONFIRM"].map((r) => ({
      label: r,
      value: r,
    })) || [];
  return (
    <div
      className={`max-w-8xl mx-auto p-6 space-y-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white"
      }`}
    >
      <Loading
        isLoading={isLoading}
        text="Loading orders..."
        spinnerColor="border-indigo-600"
        textColor={darkMode ? "text-indigo-300" : "text-indigo-700"}
        overlayColor={darkMode ? "bg-gray-900" : "bg-gray-100"}
        overlayOpacity="bg-opacity-70"
        backgroundColor={darkMode ? "bg-gray-800" : "bg-gray-100"}
      />
      <div className="w-full flex flex-col items-center bg-gray-100 rounded p-10">
        <div className="flex flex-row w-full justify-between ">
          <h1 className="text-2xl font-bold">Orders Management</h1>
          <button
            onClick={() => {
              setIsOpenAddModel((prev) => !prev);
            }}
            className="bg-white gap-4 text-black flex flex-col items-center justify-center h-20 w-32 px-4 py-2 rounded hover:bg-cyan-500 hover:text-white"
          >
            <MdOutlineCreateNewFolder className="text-sm" />
            New Order
          </button>
        </div>

        <div className="flex items-center gap-3 ">
          <Input
            placeholder="Customer Name"
            className="border-2"
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <Input
            placeholder="Customer Phone"
            className="border-2"
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <Input
            placeholder="Oder Key "
            className="border-2"
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <Input
            placeholder="Customer Address"
            className="border-2"
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <div className="w-56">
            {" "}
            <CustomSelect
              value={orderStatus}
              onChange={setOrderStatus}
              options={options}
              placeholder="Status"
              //error={error}
            />
          </div>
          <button
            onClick={() => {}}
            className="bg-indigo-600  w-12 h-12 flex items-center justify-center text-white px-2 py-2 rounded hover:bg-indigo-500"
          >
            <Search />
          </button>
        </div>
      </div>
      <div className={`flex items-center w-full my-2 `}>
        <hr className="flex-grow border-gray-300" />

        <span className="mx-4 text-2xl text-bold text-gray-500 whitespace-nowrap">
          Oders List
        </span>

        <hr className="flex-grow border-gray-300" />
      </div>

      <div className="w-full grid grid-cols-3 gap-4">
        <div className="col-span-2">
          {" "}
          <Table
            columns={columns}
            data={orderRows}
            columnWidths={{
              orderKey: 200,
              totalAmount: 170,
              customerName: 150,
              customerAddress: 200,
              status: 170,
              createdAt: 170,
              actions: 90,
            }}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            focusedRowData={focusedRowData}
            setFocusedRowData={setFocusedRowData}
          />
        </div>
        <div className="w-full">
          {" "}
          {focusedRowData && (
            <div className="w-full max-w-3xl mx-auto p-6 bg-gray-100 rounded-xl shadow-lg space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  Order: {focusedRowData.orderKey ?? "N/A"}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    focusedRowData.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : focusedRowData.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {focusedRowData.status ?? "Unknown"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <strong>Customer:</strong>{" "}
                  {focusedRowData.customerName ?? "N/A"}
                </div>
                <div>
                  <strong>Created At:</strong>{" "}
                  {focusedRowData.createdAt
                    ? new Date(focusedRowData.createdAt).toLocaleString()
                    : "N/A"}
                </div>
                <div>
                  <strong>Last Updated:</strong>{" "}
                  {focusedRowData.updatedAt
                    ? new Date(focusedRowData.updatedAt).toLocaleString()
                    : "N/A"}
                </div>
                <div>
                  <strong>Total Amount:</strong> $
                  {typeof focusedRowData.totalAmount === "number"
                    ? focusedRowData.totalAmount.toFixed(2)
                    : "0.00"}
                </div>
                <div className="mt-4 text-right col-span-2 gap-4 flex flex-row-reverse ">
                  <button
                    onClick={() => {
                      setStatus("confirm");
                      setIsConfirmAddModel(true);
                    }}
                    className="px-4 flex flex-col bg-white py-2 items-center gap-4 hover:bg-green-500 hover:text-white rounded-xl transition"
                  >
                    <GiConfirmed />
                    Confirm
                  </button>
                  <button
                    onClick={() => {
                      setStatus("cancel");
                      setIsConfirmAddModel(true);
                    }}
                    className="gap-4 px-4 flex items-center bg-white flex-col py-2 hover:bg-red-500 hover:text-white rounded-xl  transition"
                  >
                    <GiCancel />
                    Cancel
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mt-4 mb-2">Items</h3>
                <div className="divide-y border rounded-lg overflow-hidden">
                  {(focusedRowData.orderDetails ?? []).map(
                    (
                      detail: {
                        _id: any;
                        medicine: { name: any; dosage: any; manufacturer: any };
                        quantity: any;
                        unitPrice: number;
                        totalPrice: number;
                      },
                      index: any
                    ) => (
                      <div
                        key={detail._id || index}
                        className="p-6 bg-white rounded-2xl shadow-md mb-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-lg font-semibold text-gray-800">
                              {detail.medicine?.name ?? "Unnamed Medicine"}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {detail.medicine?.dosage ?? "N/A"} •{" "}
                              {detail.medicine?.manufacturer ?? "Unknown"}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600">
                              Qty: {detail.quantity ?? "0"}
                            </div>
                            <div className="text-sm text-gray-600">
                              Unit: $
                              {typeof detail.unitPrice === "number"
                                ? detail.unitPrice.toFixed(2)
                                : "0.00"}
                            </div>
                            <div className="text-base font-bold text-green-600 mt-1">
                              Total: $
                              {typeof detail.totalPrice === "number"
                                ? detail.totalPrice.toFixed(2)
                                : "0.00"}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        isDark={darkMode}
        items={[]}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Order Details</h2>
          <button
            onClick={() => setDrawerOpen((prev) => !prev)}
            className="text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {orderDetails ? (
          orders
            ?.find((e) => e._id === selectedOrderId)
            ?.orderDetails.map((item, idx) => (
              <div
                key={item._id}
                className="border rounded-xl shadow-sm p-4 mb-5 bg-gray-50"
              >
                {item.unitPrice}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Unit Price:</strong> ${item.unitPrice.toFixed(2)}
                  </div>
                  <div>
                    <strong>Quantity:</strong> {item.quantity}
                  </div>
                  <div>
                    <strong>Total:</strong> ${item.totalPrice.toFixed(2)}
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p>No order details available.</p>
        )}
      </Drawer>
      <Popup
        isOpen={isOpenAddModel}
        onClose={() => setIsOpenAddModel(false)}
        title="Create Order"
        width="w-[400px]"
        maxNestedDepth={0}
      >
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
          {/* customerName */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Customer Name
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
              placeholder="Enter Customer Name"
            />
            {errorObject.customerName && (
              <div className="text-red-400">{errorObject.customerName}</div>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Customer Address
            </label>
            <input
              type="text"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
              placeholder="Enter Customer Name"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Customer Phone
            </label>
            <input
              type="text"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
              placeholder="Enter Customer Name"
            />
          </div>

          {/* Create User Button */}
          <div className="d"></div>
          <div className="flex justify-end mt-1">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Order
            </button>
          </div>
        </div>
      </Popup>
      <Popup
        isOpen={isConfirmModel}
        onClose={() => setIsConfirmAddModel(false)}
        title="Progress Order"
        width="w-[400px]"
        maxNestedDepth={0}
      >
        <div className="p-4">
          <p className="mb-6">
            Are you sure you want to {status} Order{" "}
            {focusedRowData?.orderKey ?? ""}
            <span className="font-semibold"></span>? This action cannot be
            undone.
          </p>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsConfirmAddModel(false)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                handleConfirm(focusedRowData?.orderKey ?? "");
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Progress this Order
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

export default OrdersPage;
