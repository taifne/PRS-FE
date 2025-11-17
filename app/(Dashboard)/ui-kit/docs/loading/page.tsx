'use client';
import React, { useState } from 'react';
import { Loading } from '../../../../components/Loading';

const LoadingDocs: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false); // Start with loading off

  // Handle the click event to toggle loading
  const handleClick = () => {
    setIsLoading(true); // Start loading immediately

    // Simulate a 0.5 second delay before hiding the loading screen
    setTimeout(() => {
      setIsLoading(false); // Hide loading after 0.5 seconds
    }, 500); // 0.5 seconds
  };

  return (
    <div className="max-w-full mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Loading Component</h1>
      <p className="text-gray-700 mb-6 text-lg text-center">
        The <strong>Loading</strong> component is designed to show a customizable loading spinner and optional text or content while waiting for data or a process to finish. It can be tailored with various props for a flexible user experience.
      </p>

      <div className="mb-8 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Example Usage</h2>
        <p className="text-gray-600 mb-4">Here’s a basic example of the Loading component with default configurations:</p>
        <button
          onClick={handleClick}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Trigger Loading for 0.5s
        </button>

        {/* Show the Loading component when isLoading is true */}
        <Loading
          isLoading={isLoading}
          text="Loading... Please wait"
        />
      </div>

      <div className="mb-8 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Customizable Example</h2>
        <p className="text-gray-600 mb-4">This example demonstrates how to customize various props:</p>
        <button
          onClick={handleClick}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Trigger Customizable Loading for 0.5s
        </button>

        <Loading
          isLoading={isLoading}
          text="Fetching data..."
          spinnerColor="border-blue-600"
          textColor="text-blue-800"
          overlayColor="bg-gray-900"
          overlayOpacity="bg-opacity-70"
          backgroundColor="bg-gray-100"
          size="lg"
          modalWidth="w-96"
        />
         
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">Code Example</h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
        <code>
{`import { Loading } from './Loading';

const MyComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);

    // Hide loading after 0.5s
    setTimeout(() => {
      setIsLoading(false);
    }, 500); // 0.5 seconds
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        Trigger Loading for 0.5s
      </button>

      <Loading
        isLoading={isLoading}
        text="Fetching user details..."
        spinnerColor="border-red-500"
        textColor="text-white"
        overlayColor="bg-black"
        overlayOpacity="bg-opacity-60"
        backgroundColor="bg-gray-800"
        size="md"
        modalWidth="w-72"
      />
    </div>
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
            <th className="border border-gray-300 p-3 text-left">Description</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td className="border border-gray-300 p-3">isLoading</td>
            <td className="border border-gray-300 p-3">boolean</td>
            <td className="border border-gray-300 p-3">Determines whether the loading spinner and text are shown. (required)</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">text</td>
            <td className="border border-gray-300 p-3">string (optional)</td>
            <td className="border border-gray-300 p-3">The text displayed below the spinner (optional).</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">spinnerColor</td>
            <td className="border border-gray-300 p-3">string (optional)</td>
            <td className="border border-gray-300 p-3">Customizes the spinner’s color. Defaults to 'border-blue-500'.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">textColor</td>
            <td className="border border-gray-300 p-3">string (optional)</td>
            <td className="border border-gray-300 p-3">Customizes the text color. Defaults to 'text-gray-800'.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">overlayColor</td>
            <td className="border border-gray-300 p-3">string (optional)</td>
            <td className="border border-gray-300 p-3">Customizes the color of the overlay background (default: 'bg-gray-800').</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">overlayOpacity</td>
            <td className="border border-gray-300 p-3">string (optional)</td>
            <td className="border border-gray-300 p-3">Sets the opacity of the overlay background (default: 'bg-opacity-50').</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">backgroundColor</td>
            <td className="border border-gray-300 p-3">string (optional)</td>
            <td className="border border-gray-300 p-3">Sets the background color of the modal (default: 'bg-white').</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">size</td>
            <td className="border border-gray-300 p-3">'sm' | 'md' | 'lg' (optional)</td>
            <td className="border border-gray-300 p-3">Determines the size of the spinner. (default: 'md').</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">modalWidth</td>
            <td className="border border-gray-300 p-3">string (optional)</td>
            <td className="border border-gray-300 p-3">Sets the width of the modal container (default: 'w-80').</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">children</td>
            <td className="border border-gray-300 p-3">ReactNode (optional)</td>
            <td className="border border-gray-300 p-3">Custom content to render inside the loading modal (optional). If provided, overrides the spinner and text.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">onClick</td>
            <td className="border border-gray-300 p-3">() ={'>'} void (optional)</td>
            <td className="border border-gray-300 p-3">A callback function that will be called when the loading modal is clicked. It can be used to close the loading modal.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LoadingDocs;
