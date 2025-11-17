"use client";
import React, { useState } from "react";
import { Input } from "../../../../components/Input"; // Assuming you have the Input component in the components folder
import { UserIcon } from "../../../../components/Icons";

const InputDocs: React.FC = () => {
  const [value, setValue] = useState<string>("");

  return (
    <div className="w-full mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Input Component
      </h1>
      <p className="text-gray-700 mb-6 text-lg text-center">
        The <strong>Input</strong> component is a flexible, reusable input field
        that supports various states, sizes, and icons. It also provides options
        like error handling, password visibility toggle, and more.
      </p>

      <div className="mb-8 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          Example Usage
        </h2>
        <p className="text-gray-600 mb-4">
          Type something to see the input behavior:
        </p>
        // Basic Input
        <Input placeholder="Enter your name" />
        // With Label and Error
        <Input
          label="Email Address"
          type="email"
          error="Invalid email format"
        />
        // Password Input with Visibility Toggle
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
        // With Icons
        <Input
          startIcon={<UserIcon className="w-5 h-5" />}
          endIcon={<UserIcon className="w-5 h-5" />}
          placeholder="Email"
        />
        // Disabled State
        <Input label="Disabled Input" value="Read-only content" disabled />
        // Full Width
        <Input label="Full Width Input" fullWidth className="mb-4" />
        // Success State
        <Input label="Valid Input" success value="Correct value" />
        {value && (
          <p className="mt-4 text-green-600 font-semibold">
            You typed: {value}
          </p>
        )}
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">
        Code Example
      </h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
        <code>
          {`import { Input } from './Input';

const MyComponent = () => {
  const [value, setValue] = useState('');

  return (
    <Input 
      label="Your Name"
      value={value}
      onChange={(val) => setValue(val)}
      placeholder="Enter your name..."
      size="md"
    />
  );
};`}
        </code>
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">Props</h2>
      <table className="w-full border-collapse border border-gray-300 shadow-md">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border border-gray-300 p-3 text-left">Prop</th>
            <th className="border border-gray-300 p-3 text-left">Type</th>
            <th className="border border-gray-300 p-3 text-left">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td className="border border-gray-300 p-3">type</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              Type of input (`text`, `email`, `password`, etc.).
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">label</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              Label text for the input field.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">error</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              Error message displayed below the input when there is an issue.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">success</td>
            <td className="border border-gray-300 p-3">boolean</td>
            <td className="border border-gray-300 p-3">
              Indicates if the input field is in a success state (shows
              checkmark).
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">disabled</td>
            <td className="border border-gray-300 p-3">boolean</td>
            <td className="border border-gray-300 p-3">
              Disables the input field.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">placeholder</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              Placeholder text when the input is empty.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">className</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              Additional CSS classes to apply to the input container.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">size</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              Adjusts the size of the input (`sm`, `md`, `lg`).
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">fullWidth</td>
            <td className="border border-gray-300 p-3">boolean</td>
            <td className="border border-gray-300 p-3">
              If true, the input will take the full width of its container.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">value</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              Value of the input field.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">onChange</td>
            <td className="border border-gray-300 p-3">
              (value: string) ={">"} void
            </td>
            <td className="border border-gray-300 p-3">
              Callback function when the input value changes.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">onFocus</td>
            <td className="border border-gray-300 p-3">() ={">"} void</td>
            <td className="border border-gray-300 p-3">
              Callback function when the input is focused.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">onBlur</td>
            <td className="border border-gray-300 p-3">() ={">"} void</td>
            <td className="border border-gray-300 p-3">
              Callback function when the input loses focus.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">autoComplete</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              Defines the autocomplete behavior for the input.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InputDocs;
