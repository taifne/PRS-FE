"use client";

import React from "react";
import Breadcrumb, { BreadcrumbItem } from "../../../../components/Breadcrumb";

const BreadcrumbDocs: React.FC = () => {
  // Example breadcrumb items
  const items: BreadcrumbItem[] = [
    { label: "Home", link: "/", id: "home" },
    { label: "Library", link: "/library", id: "library" },
    { label: "Data", id: "data" }, // Last item, not clickable
  ];

  return (
    <div className="max-w-full mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Breadcrumb Component
      </h1>
      <p className="text-gray-700 mb-6 text-lg text-center">
        The <strong>Breadcrumb</strong> component provides a simple, customizable navigation
        interface to display the user’s location within a website hierarchy.
      </p>

      <h2 className="text-xl font-semibold mb-2 text-gray-800">Example Usage</h2>
      <Breadcrumb items={items} />

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Code Example</h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
        <code>{`import Breadcrumb, { BreadcrumbItem } from './Breadcrumb';

const items: BreadcrumbItem[] = [
  { label: 'Home', link: '/', id: 'home' },
  { label: 'Library', link: '/library', id: 'library' },
  { label: 'Data', id: 'data' },
];

const MyComponent = () => (
  <Breadcrumb items={items} />
);

export default MyComponent;`}</code>
      </pre>

      <h2 className="text-xl font-semibold mb-2 text-gray-800">Props</h2>
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
            <td className="border border-gray-300 p-3">items</td>
            <td className="border border-gray-300 p-3">BreadcrumbItem[]</td>
            <td className="border border-gray-300 p-3">
              Array of breadcrumb items containing <code>label</code>, optional <code>link</code>,
              <code>icon</code>, and unique <code>id</code>.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">separator</td>
            <td className="border border-gray-300 p-3">string | React.ReactNode</td>
            <td className="border border-gray-300 p-3">
              Character or element to separate breadcrumb items (default is <code>"/"</code>).
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">className</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              CSS class for the breadcrumb container.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">linkClass</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              CSS class for clickable breadcrumb links.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">separatorClass</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              CSS class for the separator element.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">activeClass</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              CSS class for the active (current) breadcrumb item.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">iconClass</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              CSS class for the icon displayed alongside breadcrumb items.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">LinkComponent</td>
            <td className="border border-gray-300 p-3">React.ElementType</td>
            <td className="border border-gray-300 p-3">
              Custom component for navigation links (e.g., React Router's <code>Link</code>). Defaults
              to <code>"a"</code>.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">linkComponentProp</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              Prop name for the URL in the LinkComponent (default is <code>"href"</code>).
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BreadcrumbDocs;
