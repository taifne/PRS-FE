'use client';

import React, { useState } from 'react';
import Autocomplete from '../../../../components/Autocomplete';

const AutocompleteDocs: React.FC = () => {
  const suggestions = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
  ];

  const handleSelect = (selectedValue: string) => {
    console.log('Selected:', selectedValue);
  };

  return (
    <div className="max-w-full mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Autocomplete Component</h1>
      <p className="text-gray-700 mb-6 text-lg text-center">
        The <strong>Autocomplete</strong> component provides a search box with dynamic suggestions
        based on user input. It supports keyboard navigation, debounce handling, and click-outside
        detection.
      </p>

      <h2 className="text-xl font-semibold mb-2 text-gray-800">Example Usage</h2>
      <Autocomplete 
        suggestions={suggestions} 
        onSelect={handleSelect} 
        placeholder="Search fruits..." 
      />

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Code Example</h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
        <code>
{`import Autocomplete from './Autocomplete';

const MyComponent = () => {
  const suggestions = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
  ];

  const handleSelect = (selectedValue) => {
    console.log('Selected:', selectedValue);
  };

  return (
    <Autocomplete suggestions={suggestions} onSelect={handleSelect} placeholder="Search..." />
  );
};`}
        </code>
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
            <td className="border border-gray-300 p-3">suggestions</td>
            <td className="border border-gray-300 p-3">SuggestionItem[]</td>
            <td className="border border-gray-300 p-3">List of available suggestions.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">onSelect</td>
            <td className="border border-gray-300 p-3">(selectedValue: string) ={'>'} void</td>
            <td className="border border-gray-300 p-3">Callback when a suggestion is selected.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">placeholder</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">Placeholder text for the input field.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">debounceDelay</td>
            <td className="border border-gray-300 p-3">number</td>
            <td className="border border-gray-300 p-3">Delay (ms) for input debounce.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">emptyText</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">Text displayed when no matches are found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AutocompleteDocs;
