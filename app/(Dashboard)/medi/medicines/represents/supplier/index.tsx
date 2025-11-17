import { FaBuilding, FaPhone, FaEnvelope, FaGlobe, FaFileInvoice, FaUser, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaMobileAlt } from "react-icons/fa";
interface Supplier {
    _id: string;
    name: string;
    contactInfo?: string;
    address?: string;
    email?: string;
    taxId?: string;
    country?: string;
    paymentTerms?: string;
    isActive?: boolean;
    phoneNumber?: string;
    representativeName?: string;
    contractStartDate?: string;
}

const SupplierCard = (supplier :Supplier|undefined) => {
  return (<div className="max-w-4xl mx-auto bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-3xl">
    {/* Header */}
    <div className="flex items-center gap-4 mb-6">
      <div className="p-4 bg-blue-100 dark:bg-blue-800 rounded-xl">
        <FaBuilding className="h-8 w-8 text-blue-600 dark:text-blue-300" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{supplier?.name ?? ""}</h1>
      {supplier?.isActive !== undefined && (
        <span className={`ml-auto px-4 py-2 rounded-full text-sm font-medium ${
          supplier.isActive 
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        }`}>
          {supplier.isActive ? "Active" : "Inactive"}
        </span>
      )}
    </div>
  
    {/* Details Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {/* Left Column */}
      <div className="space-y-6">
        {supplier?.contactInfo && (
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
            <FaPhone className="h-6 w-6 text-gray-500 dark:text-gray-300" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Contact Info</p>
              <p className="font-medium text-gray-600">{supplier.contactInfo}</p>
            </div>
          </div>
        )}
  
        {supplier?.phoneNumber && (
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
            <FaMobileAlt className="h-6 w-6 text-gray-500 dark:text-gray-300" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
              <p className="font-medium text-gray-600">{supplier.phoneNumber}</p>
            </div>
          </div>
        )}
  
        {supplier?.email && (
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
            <FaEnvelope className="h-6 w-6 text-gray-500 dark:text-gray-300" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="font-medium text-gray-600">{supplier.email}</p>
            </div>
          </div>
        )}
  
        {supplier?.address && (
          <div className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Address</p>
            <p className="font-medium text-gray-600">{supplier.address}</p>
          </div>
        )}
      </div>
  
      {/* Right Column */}
      <div className="space-y-6">
        {supplier?.taxId && (
          <div className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Tax ID</p>
            <p className="font-medium text-gray-600">{supplier.taxId}</p>
          </div>
        )}
  
        {supplier?.paymentTerms && (
          <div className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Payment Terms</p>
            <p className="font-medium text-gray-600">{supplier.paymentTerms}</p>
          </div>
        )}
  
        {supplier?.representativeName && (
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
            <FaUser className="h-6 w-6 text-gray-500 dark:text-gray-300" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Representative</p>
              <p className="font-medium text-gray-600">{supplier.representativeName}</p>
            </div>
          </div>
        )}
  
        {supplier?.contractStartDate && (
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
            <FaCalendarAlt className="h-6 w-6 text-gray-500 dark:text-gray-300" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Contract Start Date</p>
              <p className="font-medium text-gray-600">{new Date(supplier.contractStartDate).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  
    {/* Footer */}
    <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-xl">
      <p className="text-sm text-blue-600 text-blue-300 flex items-center gap-2">
        <FaGlobe className="h-5 w-5" />
        Country
      </p>
      <p className="text-gray-700 text-gray-600 leading-relaxed">
        {supplier?.country || "Not specified"}
      </p>
    </div>
  </div>
  
  );
};

export default SupplierCard;
