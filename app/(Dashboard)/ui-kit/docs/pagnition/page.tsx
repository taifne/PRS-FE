'use client';
import React, { useState } from 'react';
import Pagination from '../../../../components/Pagnition';

const PaginationDocs: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const totalPages = 10; // Set the total pages as an example

  // Handle page change with simulated loading
  const handlePageChange = (page: number) => {
    setIsLoading(true); // Start loading
    setTimeout(() => {
      setCurrentPage(page); // Change the page
      setIsLoading(false); // Stop loading after 0.5s
    }, 500); // 0.5 seconds delay for loading
  };

  return (
    <div className="max-w-full mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Pagination Component</h1>
      <p className="text-gray-700 mb-6 text-lg text-center">
        The <strong>Pagination</strong> component allows navigation through multiple pages of content. It provides previous and next buttons along with individual page buttons. It is also customizable with the number of pages and the current page.
      </p>

      <div className="mb-8 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Example Usage</h2>
        <p className="text-gray-600 mb-4">Here’s a basic example of the Pagination component with a loading simulation when changing pages:</p>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        {isLoading && (
          <div className="mt-4 text-center text-blue-600">
            <p>Loading page {currentPage}...</p>
          </div>
        )}
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">Code Example</h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
        <code>
{`import React, { useState } from 'react';
import Pagination from './Pagination'; // Adjust the path as needed

const PaginationDocs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const totalPages = 10;

  const handlePageChange = (page: number) => {
    setIsLoading(true); // Start loading
    setTimeout(() => {
      setCurrentPage(page); // Change the page
      setIsLoading(false); // Stop loading after 0.5s
    }, 500);
  };

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {isLoading && <p>Loading page {currentPage}...</p>}
    </div>
  );
};

export default PaginationDocs;`}
        </code>
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">Props</h2>
      <table className="w-full border-collapse border border-gray-300 shadow-md">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border border-gray-300 p-3 text-left">Prop</th>
            <th className="border border-gray-300 p-3 text-left">Type</th>
            <th className="border border-gray-300 p-3 text-left">Description</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td className="border border-gray-300 p-3">currentPage</td>
            <td className="border border-gray-300 p-3">number</td>
            <td className="border border-gray-300 p-3">The current page number (required).</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">totalPages</td>
            <td className="border border-gray-300 p-3">number</td>
            <td className="border border-gray-300 p-3">The total number of pages available (required).</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">onPageChange</td>
            <td className="border border-gray-300 p-3">(page: number) ={'>'} void</td>
            <td className="border border-gray-300 p-3">A function that is called when the user clicks a page number or navigation button (required).</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PaginationDocs;
