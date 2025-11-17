'use client';

import React, { useState } from 'react';
import Stepper from '../../../../components/Stepper';
import { FaUser, FaCheck } from 'react-icons/fa';

const StepperDocs: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);


  type ColorTheme = {
    active: string;
    completed: string;
    inactive: string;
    textActive: string;
    textCompleted: string;
    textInactive: string;
    connector: string;
    connectorOptional: string;
    connectorDisabled: string;
    connectorError: string;
    connectorCompleted: string; // Add color for completed connectors
};
const customTheme: ColorTheme = {
  active: 'bg-purple-600 border-purple-600',
  completed: 'bg-teal-500 border-teal-500',
  inactive: 'bg-gray-200 border-gray-200',
  textActive: 'text-white',
  textCompleted: 'text-white',
  textInactive: 'text-gray-800',
  connector: 'bg-gray-300',
  connectorOptional: 'bg-yellow-400',
  connectorDisabled: 'bg-gray-500',
  connectorError: 'bg-red-600',
  connectorCompleted: 'bg-teal-700', // Custom completed connector color
};
  const handleStepChange = (stepIndex: number) => {
    setActiveStep(stepIndex);
    console.log('Step changed to', stepIndex);
  };
  const steps = [
    { label: 'Start' },
    { label: 'Details', optional: true },
    { label: 'Shipping', disabled: true },
    { label: 'Payment', error: true },
    { label: 'Confirm' },
  ];


  return (
    <div className="max-w-full mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Stepper Component</h1>

      {/* 1. Basic Horizontal Stepper */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">1. Basic Horizontal Stepper</h2>
        <Stepper
  activeStep={3}
  steps={steps}
  onStepChange={(step) => console.log('Go to step:', step)}
  linear={true}
  circleSize="md"
  className="my-8"
/>
        <p className="text-gray-700 mt-2">A basic horizontal stepper with clickable steps.</p>
      </section>

      {/* 2. Vertical Stepper */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">2. Vertical Stepper</h2>
        <Stepper
  activeStep={2}
  steps={steps}
    colorTheme={customTheme}
/>
        <p className="text-gray-700 mt-2">A vertical stepper layout.</p>
      </section>

      {/* 3. Alternative Label */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">3. Alternative Label</h2>


        <p className="text-gray-700 mt-2">
          Uses an alternative label layout (labels positioned below icons).
        </p>
      </section>

      {/* 4. Custom Color Theme */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">4. Custom Color Theme</h2>
        <Stepper
  activeStep={2} // Set activeStep to 2, so steps 0 and 1 are completed
  steps={steps}
  onStepChange={(step) => console.log('Go to step:', step)}
  linear={true}
  circleSize="md"
  className="my-8"
/>
        <p className="text-gray-700 mt-2">
          Customizes colors for active, completed, and inactive steps.
        </p>
      </section>

      {/* Props Table */}
      <section className="mb-8">
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
              <td className="border border-gray-300 p-3">activeStep</td>
              <td className="border border-gray-300 p-3">number</td>
              <td className="border border-gray-300 p-3">
                Index of the currently active step.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">steps</td>
              <td className="border border-gray-300 p-3">
                Array of objects with properties:{' '}
                <code>label: string</code>, <code>optional?: boolean</code>,{' '}
                <code>optionalLabel?: string</code>, <code>icon?: React.ReactNode</code>,{' '}
                <code>completedIcon?: React.ReactNode</code>
              </td>
              <td className="border border-gray-300 p-3">
                Defines the steps in the stepper.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">onStepChange</td>
              <td className="border border-gray-300 p-3">(stepIndex: number) =&gt; void</td>
              <td className="border border-gray-300 p-3">
                Callback invoked when a step is clicked.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">colorTheme</td>
              <td className="border border-gray-300 p-3">
                {`{ active: string; completed: string; inactive: string; }`}
              </td>
              <td className="border border-gray-300 p-3">
                Defines colors for active, completed, and inactive steps.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">connectorStyle</td>
              <td className="border border-gray-300 p-3">React.CSSProperties</td>
              <td className="border border-gray-300 p-3">
                Custom styles for the connector line between steps.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">stepClassName</td>
              <td className="border border-gray-300 p-3">string</td>
              <td className="border border-gray-300 p-3">
                Custom class name for individual steps.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">className</td>
              <td className="border border-gray-300 p-3">string</td>
              <td className="border border-gray-300 p-3">
                Custom class name for the stepper container.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">alternativeLabel</td>
              <td className="border border-gray-300 p-3">boolean</td>
              <td className="border border-gray-300 p-3">
                If true, positions labels below the step icons.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">stepSize</td>
              <td className="border border-gray-300 p-3">'sm' | 'md' | 'lg'</td>
              <td className="border border-gray-300 p-3">
                Specifies the size of the step icons.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">showCheckOnComplete</td>
              <td className="border border-gray-300 p-3">boolean</td>
              <td className="border border-gray-300 p-3">
                If true, displays a checkmark icon for completed steps.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">orientation</td>
              <td className="border border-gray-300 p-3">'horizontal' | 'vertical'</td>
              <td className="border border-gray-300 p-3">
                Layout orientation of the stepper.
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default StepperDocs;
