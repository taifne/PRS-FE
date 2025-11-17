"use client";

import React, { useState } from "react";
import { Dropdown } from "../../../../components/Dropdown";

const DropdownDocs: React.FC = () => {
  // Example dropdown options with labels, values, and optional icons.
  const options = [
    { label: "Option 1", value: "option1", icon: "https://example.com/icon1.png" },
    { label: "Option 2", value: "option2", icon: "https://example.com/icon2.png" },
    { label: "Option 3", value: "option3" },
  ];

  const handleSelect = (selectedOptions: string[]) => {
    console.log("Selected Options:", selectedOptions);
  };

  return (
    <div className="max-w-full mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Dropdown Component
      </h1>
      <p className="text-gray-700 mb-6 text-lg text-center">
        The <strong>Dropdown</strong> component provides a searchable and selectable list that supports both single and multi-select options.
        It includes features like live search filtering, click-outside detection, and customizable button labels.
      </p>

      <h2 className="text-xl font-semibold mb-2 text-gray-800">Example Usage</h2>
      <Dropdown 
        options={options} 
        onSelect={handleSelect} 
        buttonLabel="Select an Option" 
        isMultiSelect={true} 
      />

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Code Example</h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
        <code>{`import { Dropdown } from './Dropdown';

const options = [
  { label: 'Option 1', value: 'option1', icon: 'https://example.com/icon1.png' },
  { label: 'Option 2', value: 'option2', icon: 'https://example.com/icon2.png' },
  { label: 'Option 3', value: 'option3' },
];

const handleSelect = (selectedOptions) => {
  console.log('Selected Options:', selectedOptions);
};

const MyComponent = () => (
  <Dropdown 
    options={options} 
    onSelect={handleSelect} 
    buttonLabel="Select an Option" 
    isMultiSelect={true} 
  />
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
            <td className="border border-gray-300 p-3">options</td>
            <td className="border border-gray-300 p-3">{`{ label: string; value: string; icon?: string }[]`}</td>
            <td className="border border-gray-300 p-3">
              Array of option objects. Each object should contain a <code>label</code> and <code>value</code>, with an optional <code>icon</code> URL.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">onSelect</td>
            <td className="border border-gray-300 p-3">function</td>
            <td className="border border-gray-300 p-3">
              Callback triggered when an option is selected. Returns an array of selected option values.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">buttonLabel</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              Label displayed on the dropdown button.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">isMultiSelect</td>
            <td className="border border-gray-300 p-3">boolean</td>
            <td className="border border-gray-300 p-3">
              Optional flag to enable multi-select functionality. When true, allows selection of multiple options.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DropdownDocs;
