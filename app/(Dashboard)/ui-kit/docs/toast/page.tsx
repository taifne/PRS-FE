'use client';

import React, { useState } from 'react';
import { Toast } from '../../../../components/Toast';

const ToastPage: React.FC = () => {
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Toast Component Documentation</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p className="mt-4">
          The Toast component displays non-intrusive notifications on the screen. You can customize the toast message,
          its duration, type (success, error, info, warning), icon, and positioning (top-left, top-right, bottom-left,
          bottom-right).
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <pre className="bg-gray-800 text-white p-4 rounded-lg mt-4">
          npm install your-toast-package
        </pre>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Usage Example</h2>
        <p className="mt-4">Here's an example of how to use the Toast component:</p>
        <pre className="bg-gray-800 text-white p-4 rounded-lg mt-4">
          {`import React, { useState } from 'react';
import { Toast } from 'your-toast-package';

const App = () => {
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <button
        onClick={() => setShowToast(true)}
        className="p-3 bg-blue-500 text-white rounded-lg"
      >
        Show Toast
      </button>

      {showToast && (
        <Toast
          message="This is a success message!"
          type="success"
          duration={4000}
          position="top-right"
        />
      )}
    </div>
  );
};

export default App;
`}
        </pre>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Props</h2>
        <table className="min-w-full mt-4 table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Prop</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Default</th>
              <th className="px-4 py-2 border">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border">`message`</td>
              <td className="px-4 py-2 border">`string`</td>
              <td className="px-4 py-2 border">-</td>
              <td className="px-4 py-2 border">The message text to display in the toast (required).</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">`type`</td>
              <td className="px-4 py-2 border">`'success' | 'error' | 'info' | 'warning'`</td>
              <td className="px-4 py-2 border">`'info'`</td>
              <td className="px-4 py-2 border">The toast type that determines its styling and icon.</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">`duration`</td>
              <td className="px-4 py-2 border">`number`</td>
              <td className="px-4 py-2 border">`3000`</td>
              <td className="px-4 py-2 border">Duration in milliseconds that the toast is visible.</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">`icon`</td>
              <td className="px-4 py-2 border">`React.ReactNode`</td>
              <td className="px-4 py-2 border">`undefined`</td>
              <td className="px-4 py-2 border">A custom icon to override the default toast icon.</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">`position`</td>
              <td className="px-4 py-2 border">`'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'`</td>
              <td className="px-4 py-2 border">`'bottom-right'`</td>
              <td className="px-4 py-2 border">Position of the toast on the screen.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Live Demo</h2>
        <p className="mt-4">Click the button to show the toast notification in the top-right corner.</p>
        <div className="mt-4 flex justify-center items-center">
          <button
            onClick={() => setShowToast(true)}
            className="p-3 bg-green-500 text-white rounded-lg"
          >
            Show Success Toast
          </button>

          {showToast && (
            <Toast
              message="Success! Everything is working!"
              type="success"
              duration={4000}
              position="top-right"
            />
          )}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Customization</h2>
        <p className="mt-4">You can customize the Toast by changing the following props:</p>
        <ul className="list-disc pl-6 mt-4">
          <li><strong>type:</strong> Choose between `success`, `error`, `info`, or `warning` to change the appearance and icon.</li>
          <li><strong>duration:</strong> Control how long the toast will be visible before it disappears.</li>
          <li><strong>position:</strong> Adjust the toast's position on the screen with values like `top-right`, `top-left`, `bottom-right`, `bottom-left`.</li>
        </ul>
      </section>
    </div>
  );
};

export default ToastPage;
