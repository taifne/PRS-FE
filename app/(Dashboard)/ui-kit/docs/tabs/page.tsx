"use client";

import React from "react";
import { Tab, Tabs } from "../../../../components/Tab";

const TabsDocs: React.FC = () => {
  return (
    <div className="max-w-full mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Tabs Component
      </h1>
      <p className="text-gray-700 mb-6 text-lg text-center">
        The <strong>Tabs</strong> component provides an accessible tabbed interface for displaying
        dynamic content. Each tab is defined using the <code>Tab</code> component, which accepts a label and content.
      </p>

      <h2 className="text-xl font-semibold mb-2 text-gray-800">Example Usage</h2>
      <Tabs>
        <Tab label="Tab 1">
          <p>This is the content of Tab 1.</p>
        </Tab>
        <Tab label="Tab 2">
          <p>This is the content of Tab 2.</p>
        </Tab>
        <Tab label="Tab 3">
          <p>This is the content of Tab 3.</p>
        </Tab>
      </Tabs>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Code Example</h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
        <code>{`import { Tabs, Tab } from './Tabs';

const MyTabs = () => (
  <Tabs>
    <Tab label="Tab 1">
      <p>This is the content of Tab 1.</p>
    </Tab>
    <Tab label="Tab 2">
      <p>This is the content of Tab 2.</p>
    </Tab>
    <Tab label="Tab 3">
      <p>This is the content of Tab 3.</p>
    </Tab>
  </Tabs>
);

export default MyTabs;`}</code>
      </pre>

      <h2 className="text-xl font-semibold mb-2 text-gray-800">Props</h2>
      <table className="w-full border-collapse border border-gray-300 shadow-md">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border border-gray-300 p-3 text-left">Component</th>
            <th className="border border-gray-300 p-3 text-left">Prop</th>
            <th className="border border-gray-300 p-3 text-left">Type</th>
            <th className="border border-gray-300 p-3 text-left">Description</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td className="border border-gray-300 p-3">Tab</td>
            <td className="border border-gray-300 p-3">label</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              Text displayed on the tab button.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">Tab</td>
            <td className="border border-gray-300 p-3">children</td>
            <td className="border border-gray-300 p-3">React.ReactNode</td>
            <td className="border border-gray-300 p-3">
              Content rendered when the tab is active.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">Tabs</td>
            <td className="border border-gray-300 p-3">children</td>
            <td className="border border-gray-300 p-3">React.ReactNode</td>
            <td className="border border-gray-300 p-3">
              Collection of <code>Tab</code> components representing each tab.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TabsDocs;
