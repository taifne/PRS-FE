"use client";

import React, { useState } from "react";
import { Dropdown } from "../../../../components/Dropdown";
import Fireworks from "../../../../components/Firework";
import Game from "../../../../components/Game";

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
     
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 opacity-50" />
      <Fireworks />
  
      </div>
  );
};

export default DropdownDocs;
