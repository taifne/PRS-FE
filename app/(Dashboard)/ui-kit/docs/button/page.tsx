'use client';

import React from 'react';
import Button from '../../../../components/Button';
import { FaPlus, FaArrowRight } from 'react-icons/fa';

const ButtonDocs: React.FC = () => {
  return (
    <div className="max-w-full mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Button Component</h1>

      {/* 1. Basic Usage */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">1. Basic Usage</h2>
        <div className="mb-4">
          <Button>Click Me</Button>
        </div>
        <p className="text-gray-700">Defaults to primary variant, medium size.</p>
      </section>

      {/* 2. Different Variants */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">2. Different Variants</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="glass">Glass</Button>
        </div>
        <p className="text-gray-700">Each variant provides different styles based on the provided design.</p>
      </section>

      {/* 3. Different Sizes */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">3. Different Sizes</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
        <p className="text-gray-700">Sizes control padding, font size, and spacing.</p>
      </section>

      {/* 4. With Icons */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">4. With Icons</h2>
        <div className="flex flex-wrap gap-4 mb-4 items-center">
          <Button iconLeft={<FaPlus />}>Add Item</Button>
          <Button iconRight={<FaArrowRight />}>Next</Button>
          <Button iconLeft={<FaPlus />} iconRight={<FaArrowRight />}>
            Both Icons
          </Button>
          <Button iconLeft={<FaPlus />} />
        </div>
        <p className="text-gray-700">Icons can be placed on the left, right, or used alone.</p>
      </section>

      {/* 5. Loading State */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">5. Loading State</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <Button isLoading>Loading...</Button>
          <Button isLoading loadingText="Submitting...">
            Submit
          </Button>
          <Button isLoading iconLeft={<FaPlus />} loadingText="Adding">
            Add
          </Button>
        </div>
        <p className="text-gray-700">
          Shows a spinner and optional loading text when <code className="bg-gray-200 p-1 rounded">isLoading</code> is true.
        </p>
      </section>

      {/* 6. Full Width Button */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">6. Full Width Button</h2>
        <div className="mb-4">
          <Button fullWidth>Full Width</Button>
        </div>
        <p className="text-gray-700">Expands to fill the parent container.</p>
      </section>

      {/* 7. Custom Background and Text Color */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">7. Custom Background and Text Color</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <Button backgroundColor="red" textColor="white">
            Custom Colors
          </Button>
          <Button backgroundColor="#ff9900" textColor="#000">
            Hex Colors
          </Button>
        </div>
        <p className="text-gray-700">
          Custom styles using <code className="bg-gray-200 p-1 rounded">backgroundColor</code> and{' '}
          <code className="bg-gray-200 p-1 rounded">textColor</code>.
        </p>
      </section>

      {/* 8. Hover Effect Toggle */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">8. Hover Effect Toggle</h2>
        <div className="mb-4">
          <Button hoverEffect={false}>No Hover Effect</Button>
        </div>
        <p className="text-gray-700">Disables the hover brightness effect.</p>
      </section>

      {/* 9. Rounded Corners */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">9. Rounded Corners</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <Button rounded="none">No Rounding</Button>
          <Button rounded="sm">Small Rounding</Button>
          <Button rounded="md">Medium Rounding</Button>
          <Button rounded="lg">Large Rounding</Button>
          <Button rounded="full">Fully Rounded</Button>
        </div>
        <p className="text-gray-700">Controls border radius.</p>
      </section>

      {/* 10. Shadow Effects */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">10. Shadow Effects</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <Button shadow="none">No Shadow</Button>
          <Button shadow="sm">Small Shadow</Button>
          <Button shadow="md">Medium Shadow</Button>
          <Button shadow="lg">Large Shadow</Button>
          <Button shadow="xl">Extra Large Shadow</Button>
        </div>
        <p className="text-gray-700">Controls button shadow intensity.</p>
      </section>

      {/* 11. Click Animation */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">11. Click Animation</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <Button clickAnimation>With Click Animation</Button>
          <Button clickAnimation={false}>Without Click Animation</Button>
        </div>
        <p className="text-gray-700">Enables or disables the scaling effect on click.</p>
      </section>

      {/* 12. Disabled State */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">12. Disabled State</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <Button disabled>Disabled Button</Button>
          <Button isLoading disabled>
            Loading and Disabled
          </Button>
        </div>
        <p className="text-gray-700">Prevents interactions.</p>
      </section>

      {/* 13. Combining Props */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">13. Combining Props</h2>
        <div className="flex flex-col gap-6 mb-4">
          <Button
            variant="outline"
            size="lg"
            iconLeft={<FaPlus />}
            isLoading
            fullWidth
            hoverEffect={false}
            shadow="lg"
            clickAnimation
          >
            Custom Button
          </Button>
          <Button
            variant="secondary"
            size="md"
            iconRight={<FaArrowRight />}
            backgroundColor="#f0ad4e"
            textColor="#fff"
            rounded="full"
            shadow="md"
          >
            Secondary with Custom Colors
          </Button>
          <Button
            variant="primary"
            size="sm"
            iconLeft={<FaPlus />}
            iconRight={<FaArrowRight />}
            fullWidth
            clickAnimation
          >
            Small Full Width with Icons
          </Button>
          <Button
            variant="glass"
            size="lg"
            isLoading
            loadingText="Processing"
            backgroundColor="rgba(255,255,255,0.2)"
            textColor="#333"
            hoverEffect
            shadow="xl"
          >
            Glass Variant Loading
          </Button>
        </div>
        <p className="text-gray-700">
          Combines multiple props to showcase advanced styling and functionality with various configurations.
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
              <td className="border border-gray-300 p-3">variant</td>
              <td className="border border-gray-300 p-3">'primary' | 'secondary' | 'outline' | 'ghost' | 'glass'</td>
              <td className="border border-gray-300 p-3">Determines the button style.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">size</td>
              <td className="border border-gray-300 p-3">'sm' | 'md' | 'lg'</td>
              <td className="border border-gray-300 p-3">Specifies the button size.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">iconLeft</td>
              <td className="border border-gray-300 p-3">ReactNode</td>
              <td className="border border-gray-300 p-3">Element rendered to the left of the button text.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">iconRight</td>
              <td className="border border-gray-300 p-3">ReactNode</td>
              <td className="border border-gray-300 p-3">Element rendered to the right of the button text.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">isLoading</td>
              <td className="border border-gray-300 p-3">boolean</td>
              <td className="border border-gray-300 p-3">Displays a spinner and loading text if true.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">loadingText</td>
              <td className="border border-gray-300 p-3">string</td>
              <td className="border border-gray-300 p-3">Optional text to display while loading.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">fullWidth</td>
              <td className="border border-gray-300 p-3">boolean</td>
              <td className="border border-gray-300 p-3">If true, the button expands to fill its container.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">backgroundColor</td>
              <td className="border border-gray-300 p-3">string</td>
              <td className="border border-gray-300 p-3">Custom background color.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">textColor</td>
              <td className="border border-gray-300 p-3">string</td>
              <td className="border border-gray-300 p-3">Custom text color.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">hoverEffect</td>
              <td className="border border-gray-300 p-3">boolean</td>
              <td className="border border-gray-300 p-3">Toggles the hover brightness effect.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">rounded</td>
              <td className="border border-gray-300 p-3">'none' | 'sm' | 'md' | 'lg' | 'full'</td>
              <td className="border border-gray-300 p-3">Sets the border radius.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">shadow</td>
              <td className="border border-gray-300 p-3">'none' | 'sm' | 'md' | 'lg' | 'xl'</td>
              <td className="border border-gray-300 p-3">Sets the box shadow.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">clickAnimation</td>
              <td className="border border-gray-300 p-3">boolean</td>
              <td className="border border-gray-300 p-3">Enables a click scaling animation.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ButtonDocs;
