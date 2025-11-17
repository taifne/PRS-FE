"use client"
import React, { useState, useEffect } from 'react';
import Calendar from '../../../../components/Calendar'; // Assuming you have the Calendar component in the components folder

const CalendarDocs: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Calendar Component</h1>
      <p className="text-gray-700 mb-6 text-lg text-center">
        The <strong>Calendar</strong> component provides a fully-featured, interactive calendar UI. It supports custom themes, date selection, navigation between months, and the ability to render custom day content.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      // Basic usage
<Calendar />

// Compact purple theme starting week on Monday
<Calendar 
  colorTheme="purple" 
  compactMode 
  startOfWeek="monday"
/>

// Custom day rendering
<Calendar
  customDayRenderer={(date) => (
    <div className="relative">
      {date.getDate()}
      {date.getDay() === 0 && <div className="absolute top-0 right-0 w-1 h-1 bg-red-500 rounded-full" />}
    </div>
  )}
/>

// Event handling
<Calendar 
  onDateSelect={(date) => console.log('Selected date:', date)}
  colorTheme="green"
/>
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">Code Example</h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
        <code>
{`import Calendar from './Calendar';

const MyComponent = () => {
  const handleDateSelect = (date) => {
    console.log('Selected date:', date);
  };

  return (
    <Calendar 
      colorTheme="blue" 
      showHeader={true} 
      showFooter={true} 
      onDateSelect={handleDateSelect} 
      startOfWeek="sunday" 
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
            <th className="border border-gray-300 p-3 text-left">Description</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td className="border border-gray-300 p-3">colorTheme</td>
            <td className="border border-gray-300 p-3">'blue' | 'green' | 'purple' | 'red' | 'indigo'</td>
            <td className="border border-gray-300 p-3">The theme color for the calendar. Default is 'blue'.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">showHeader</td>
            <td className="border border-gray-300 p-3">boolean</td>
            <td className="border border-gray-300 p-3">Determines whether to show the calendar header. Default is true.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">showFooter</td>
            <td className="border border-gray-300 p-3">boolean</td>
            <td className="border border-gray-300 p-3">Determines whether to show the footer with the "Today" button. Default is true.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">showWeekNumbers</td>
            <td className="border border-gray-300 p-3">boolean</td>
            <td className="border border-gray-300 p-3">Shows the week numbers next to the days. Default is false.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">compactMode</td>
            <td className="border border-gray-300 p-3">boolean</td>
            <td className="border border-gray-300 p-3">Enables compact view with smaller day labels. Default is false.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">onDateSelect</td>
            <td className="border border-gray-300 p-3">(date: Date) ={'>'} void</td>
            <td className="border border-gray-300 p-3">Callback function triggered when a date is selected.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">customDayRenderer</td>
            <td className="border border-gray-300 p-3">(date: Date) ={'>'} React.ReactNode</td>
            <td className="border border-gray-300 p-3">Custom function to render the day cell, which receives the current date.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">startOfWeek</td>
            <td className="border border-gray-300 p-3">'sunday' | 'monday'</td>
            <td className="border border-gray-300 p-3">Sets the starting day of the week. Default is 'sunday'.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CalendarDocs;
