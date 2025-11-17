"use client";
import React, { useState } from 'react';
import { FaFolder, FaFile } from 'react-icons/fa';
import Treeview from '../../../../components/TreeView';

const sampleData = [
  {
    id: '1',
    label: 'Root Node 1',
    children: [
      {
        id: '1-1',
        label: 'Child Node 1-1',
        icon: <FaFolder className="text-yellow-500" />,
        children: [
          { id: '1-1-1', label: 'Sub Child Node 1-1-1' },
          { id: '1-1-2', label: 'Sub Child Node 1-1-2' },
        ],
      },
      { id: '1-2', label: 'Child Node 1-2' },
    ],
  },
  {
    id: '2',
    label: 'Root Node 2',
    icon: <FaFolder className="text-yellow-500" />,
    children: [
      { id: '2-1', label: 'Child Node 2-1' },
      { id: '2-2', label: 'Child Node 2-2' },
    ],
  },
];

const TreeviewDocumentation: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedNode(id);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Treeview Component Documentation</h1>
        <p className="text-lg text-gray-600">
          A flexible and customizable tree structure for displaying hierarchical data.
        </p>
      </header>

      {/* Introduction Section */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
        <p className="text-gray-700 mb-4">
          The <strong className="text-blue-600">Treeview</strong> component is a powerful tool for visualizing hierarchical data. It supports features like expand/collapse, node selection, and customizable icons.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Expand/Collapse nodes:</strong> Toggle the visibility of child nodes.</li>
          <li><strong>Select nodes:</strong> Allows users to select or deselect individual nodes.</li>
          <li><strong>Accordion mode:</strong> Only one node can be expanded at a time.</li>
          <li><strong>Connectors:</strong> Show connecting lines between nodes for better visualization.</li>
          <li><strong>Customizable icons:</strong> Use custom icons for each node.</li>
          <li><strong>Positioning:</strong> Child nodes are automatically positioned relative to their parent.</li>
        </ul>
      </section>

      {/* Props Section */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Props</h2>
        <p className="text-gray-700 mb-4">The following props are available for the <code className="bg-gray-100 px-2 py-1 rounded">Treeview</code> component:</p>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left text-gray-700">Prop Name</th>
              <th className="border px-4 py-2 text-left text-gray-700">Type</th>
              <th className="border px-4 py-2 text-left text-gray-700">Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              { prop: 'data', type: 'TreeNode[]', desc: 'The hierarchical data to display in the tree.' },
              { prop: 'onSelect', type: 'function', desc: 'Callback triggered when a node is selected.' },
              { prop: 'onToggle', type: 'function', desc: 'Callback triggered when a node is expanded/collapsed.' },
              { prop: 'selectable', type: 'boolean', desc: 'Determines if nodes are selectable. Default: false.' },
              { prop: 'accordion', type: 'boolean', desc: 'Only one node can be expanded at a time. Default: false.' },
              { prop: 'showConnectors', type: 'boolean', desc: 'Show connectors between nodes. Default: true.' },
              { prop: 'className', type: 'string', desc: 'Additional class names for customization.' },
              { prop: 'expandAll', type: 'boolean', desc: 'Expand all nodes initially. Default: false.' },
            ].map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="border px-4 py-2 text-gray-700"><code>{row.prop}</code></td>
                <td className="border px-4 py-2 text-gray-700">{row.type}</td>
                <td className="border px-4 py-2 text-gray-700">{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Example Section */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Treeview Example</h2>
        <div className="border p-4 rounded-lg bg-gray-50">
          <Treeview
            data={sampleData}
            onSelect={handleSelect}
            selectable={true}
            showConnectors={true}
            expandAll={false}
            accordion={true}
          />
          {selectedNode && (
            <p className="mt-4 text-gray-700">
              Selected Node ID: <span className="font-semibold text-blue-600">{selectedNode}</span>
            </p>
          )}
        </div>
      </section>

      {/* TreeNode Structure Section */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">TreeNode Structure</h2>
        <p className="text-gray-700 mb-4">The structure of each node should follow the <code className="bg-gray-100 px-2 py-1 rounded">TreeNode</code> interface:</p>
        <pre className="bg-gray-100 p-4 rounded-md text-gray-700 overflow-x-auto">
          {`type TreeNode = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  isDisabled?: boolean;
};`}
        </pre>
      </section>

      {/* Usage Example Section */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Usage Example</h2>
        <p className="text-gray-700 mb-4">Here is an example of how to use the Treeview component in your application:</p>
        <pre className="bg-gray-100 p-4 rounded-md text-gray-700 overflow-x-auto">
          {`import React, { useState } from 'react';
import Treeview from './Treeview';

const sampleData = [
  {
    id: '1',
    label: 'Root Node 1',
    children: [
      {
        id: '1-1',
        label: 'Child Node 1-1',
        icon: <FaFolder />,
        children: [
          { id: '1-1-1', label: 'Sub Child Node 1-1-1' },
          { id: '1-1-2', label: 'Sub Child Node 1-1-2' },
        ],
      },
      { id: '1-2', label: 'Child Node 1-2' },
    ],
  },
];

const App: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedNode(id);
  };

  return (
    <div className="p-8">
      <Treeview
        data={sampleData}
        onSelect={handleSelect}
        selectable={true}
        showConnectors={true}
        expandAll={false}
        accordion={true}
      />
      {selectedNode && <p>Selected Node ID: {selectedNode}</p>}
    </div>
  );
};

export default App;`}
        </pre>
      </section>

      {/* Styling Section */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Styling & Customization</h2>
        <p className="text-gray-700 mb-4">
          The component uses Tailwind CSS for styling. You can customize it by overriding Tailwind classes or passing your own <code className="bg-gray-100 px-2 py-1 rounded">className</code> prop.
        </p>
        <p className="text-gray-700">
          Icons are provided by <code className="bg-gray-100 px-2 py-1 rounded">react-icons</code>, but you can use custom icons as needed.
        </p>
      </section>
    </div>
  );
};

export default TreeviewDocumentation;