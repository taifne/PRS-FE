import dayjs from 'dayjs';
import { FiUser, FiPhone, FiHome, FiInfo, FiDollarSign, FiClock } from 'react-icons/fi';

interface Order {
  customerName: string;
  customerPhone?: string;
  customerAddress?: string;
  status: string;
  totalAmount: number;
  createAt: string | Date;
}

interface OrderInfoCardProps {
  order: Order;
  className?: string;
}

export const OrderInfoCard = ({ order, className = '' }: OrderInfoCardProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      {/* Customer Info Card */}
      <div className="border border-gray-200 p-6 rounded-lg shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
          <FiUser className="mr-2" />
          Customer Information
        </h2>
        <div className="space-y-3">
          <div className="flex items-start">
            <span className="font-medium text-gray-700 min-w-[80px]">Name:</span>
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
            <span className="font-medium text-gray-700 min-w-[80px]">Status:</span>
            <span className={`px-2 py-1 text-xs rounded-full ${
              order.status === 'completed' ? 'bg-green-100 text-green-800' :
              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-blue-100 text-blue-800'
            }`}>
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
              {dayjs(order.createAt).format('YYYY-MM-DD HH:mm')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};