"use client"
import React, { useState } from 'react';
import Drawer from '../../../../components/Drawer';

const DrawerDocs: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDrawer = () => setIsOpen((prev) => !prev);

  const drawerItems = [
    { label: 'Home', onClick: () => alert('Home clicked') },
    { label: 'Profile', onClick: () => alert('Profile clicked') },
    { label: 'Settings', onClick: () => alert('Settings clicked') },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Drawer Component Documentation</h1>
      <p className="text-gray-700 mb-6">
        The <strong>Drawer</strong> component is a slide-in menu that allows navigation or actions to be placed in a sidebar.
        It supports keyboard accessibility, focus management, and can be closed by clicking outside or pressing the Escape key.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Usage</h2>
      <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
{`import Drawer from '../components/Drawer';

const [isOpen, setIsOpen] = useState(false);

<Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} items={drawerItems} />;`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Example</h2>
      <button
        onClick={toggleDrawer}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Open Drawer
      </button>

      <Drawer isOpen={isOpen} onClose={toggleDrawer} items={drawerItems} isDark={true} >hehe</Drawer>
    </div>
  );
};

export default DrawerDocs;
