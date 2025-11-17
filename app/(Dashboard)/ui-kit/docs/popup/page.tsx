"use client"
import React, { useState } from 'react';
import { Popup } from '../../../../components/Popup';
import Fireworks from '../../../../components/Firework';

const PopupDocumentation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sampleContent = (
    <div>
      <h3 className="text-lg font-semibold">This is the content of the popup!</h3>
      <p className="mt-2">You can add any content you want here.</p>
    </div>
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Popup Component Documentation</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Introduction</h2>
        <p>
          The <strong>Popup</strong> component is a versatile modal window that can be used to display any content in a popup form. It can be customized with animations, positioning, and various properties for a smooth user experience.
        </p>
        <ul className="list-disc pl-5">
          <li><strong>Open/Close functionality:</strong> Easily toggle the popup visibility with <code>isOpen</code> prop.</li>
          <li><strong>Customizable animations:</strong> Choose from <code>fade</code>, <code>slide</code>, or <code>zoom</code> animations.</li>
          <li><strong>Nested popups:</strong> You can open a popup inside another popup.</li>
          <li><strong>Positioning:</strong> Choose from predefined positions for the close button.</li>
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Props</h2>
        <p>The following props are available for the <code>Popup</code> component:</p>
        <table className="table-auto w-full mt-2 border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Prop Name</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2"><code>isOpen</code></td>
              <td className="border px-4 py-2">boolean</td>
              <td className="border px-4 py-2">Controls the visibility of the popup. When <code>true</code>, the popup is shown.</td>
            </tr>
            <tr>
              <td className="border px-4 py-2"><code>onClose</code></td>
              <td className="border px-4 py-2">function</td>
              <td className="border px-4 py-2">Callback function triggered when the popup is closed.</td>
            </tr>
            <tr>
              <td className="border px-4 py-2"><code>overlayColor</code></td>
              <td className="border px-4 py-2">string</td>
              <td className="border px-4 py-2">Custom background color for the overlay. Default is <code>'black'</code>.</td>
            </tr>
            <tr>
              <td className="border px-4 py-2"><code>animation</code></td>
              <td className="border px-4 py-2">'fade' | 'slide' | 'zoom'</td>
              <td className="border px-4 py-2">The animation style for the popup.</td>
            </tr>
            <tr>
              <td className="border px-4 py-2"><code>customCloseButton</code></td>
              <td className="border px-4 py-2">React.ReactNode</td>
              <td className="border px-4 py-2">Pass a custom button to close the popup.</td>
            </tr>
            <tr>
              <td className="border px-4 py-2"><code>header</code></td>
              <td className="border px-4 py-2">React.ReactNode</td>
              <td className="border px-4 py-2">Custom header for the popup.</td>
            </tr>
            <tr>
              <td className="border px-4 py-2"><code>footer</code></td>
              <td className="border px-4 py-2">React.ReactNode</td>
              <td className="border px-4 py-2">Custom footer for the popup.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Usage Example</h2>
        <p>Here's how you can use the Popup component in your project:</p>
        <pre className="bg-gray-100 p-4 rounded-md">
          {`import React, { useState } from 'react';
import { Popup } from './Popup'; // Adjust the path to where you have Popup.tsx

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Popup Example</h1>
      
      <button
        className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        Open Popup
      </button>

      <Popup
        isOpen={isOpen}
        onClose={handleClose}
        header={<h3 className="text-xl">Custom Header</h3>}
        footer={<div className="text-center">Custom Footer Content</div>}
        overlayColor="gray"
        animation="fade"
        closeButtonPosition="top-right"
      >
        <p>This is the content inside the popup!</p>
      </Popup>
    </div>
  );
};

export default App;`}
        </pre>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Explanation</h2>
        <p>In this example:</p>
        <ul className="list-disc pl-5">
          <li><strong>isOpen</strong>: Controls whether the popup is visible or not. It is toggled by clicking the "Open Popup" button.</li>
          <li><strong>onClose</strong>: The <code>handleClose</code> function is passed as a callback to close the popup.</li>
          <li><strong>Custom Header and Footer</strong>: These are optional. If not passed, default headers/footers will be used.</li>
          <li><strong>Overlay and Animation</strong>: You can customize the overlay color and choose the animation style (fade, slide, or zoom).</li>
        </ul>
      </section>

      <section className="mt-4">
      <div className="p-8">
      <button
        className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        Open Main Popup
      </button>

     <Popup
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Main Popup"
  width="w-[800px]"
  maxNestedDepth={3}
  nestedPopupContent={
    <div>
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 opacity-50" />
      <Fireworks />
    </div>
  }
>
  <div>
    <p>Main popup content</p>
  </div>
</Popup>
    </div>
        <h2 className="text-xl font-semibold mb-2">Nested Popup</h2>
        <p>
          You can also add a nested popup inside the main popup. Here's how you can achieve that:
        </p>
        <pre className="bg-gray-100 p-4 rounded-md">
          {`const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8">
      <button
        className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        Open Main Popup
      </button>

      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showNestedButton={true}
        nestedPopupContent={<div>Content of the nested popup!</div>}
      >
        <p>This is the content of the main popup.</p>
      </Popup>
    </div>
  );
};`}
        </pre>
      </section>
    </div>
  );
};

export default PopupDocumentation;
