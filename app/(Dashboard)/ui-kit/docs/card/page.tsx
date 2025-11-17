"use client";
import React, { useState } from "react";
import Card from "../../../../components/Card/card";

const CardDocs: React.FC = () => {
  return (
    <div className="max-w-full mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Card Component
      </h1>
      <p className="text-gray-700 mb-6 text-lg text-center">
        The <strong>Card</strong> component is a versatile UI component that
        allows you to display content in a structured way with support for
        images, custom text, and various interactive options.
      </p>

      <div className="mb-8 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          Example Usage
        </h2>
        <p className="text-gray-600 mb-4">
          Here’s a basic usage example of the Card component:
        </p>
        <Card
          title="Amazing Fruit"
          description="This fruit is great for health and tastes amazing."
          //   imageUrl="https://via.placeholder.com/400"
          imagePosition="top"
          variant="elevated"
          colorScheme="primary"
          shadow="md"
          rounded="lg"
          buttonText="Learn More"
          onClick={() => alert("Card clicked!")}
          className="max-w-[300px]"
        />
      </div>

      <div className="mb-8 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          Custom Card Example
        </h2>
        <p className="text-gray-600 mb-4">
          Here’s an example where the card includes more customization:
        </p>
        <div className="w-full flex gap-5">
          {" "}
          <Card
            title="Delicious Mango"
            description="Mangoes are sweet and tropical fruits that everyone loves."
            //    imageUrl="https://via.placeholder.com/400"
            imagePosition="bottom"
            variant="outline"
            colorScheme="secondary"
            shadow="lg"
            rounded="md"
            border={true}
            buttonText="Buy Now"
            linkUrl="#"
            onClick={() => alert("Button clicked!")}
            className="max-w-[300px]"
          />
          <Card
            title="Product Features"
            description="Discover the key features of our latest product."
            imageUrl="https://example.com/product.jpg"
            imagePosition="top"
            className="max-w-[300px]"
          >
            <ul>
              <li>High performance</li>
              <li>Energy efficient</li>
              <li>Compact design</li>
            </ul>
          </Card>
          <Card
    title="Exclusive Offer"
    description="Limited time offer on our premium services."
    imageUrl="https://example.com/offer.jpg"
    variant="outline"
    colorScheme="primary"
    hoverEffect="scale"
    shadow="md"
    rounded="lg"
      className="max-w-[300px]"
    border={true}
  />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">
        Code Example
      </h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
        <code>
          {`import Card from './Card';

const MyComponent = () => {
  return (
    <Card
      title="Amazing Product"
      description="This is an amazing product with great features."
      imageUrl="https://via.placeholder.com/400"
      variant="elevated"
      colorScheme="primary"
      shadow="md"
      rounded="lg"
      buttonText="Buy Now"
      onClick={() => alert('Card clicked!')}
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
            <th className="border border-gray-300 p-3 text-left">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td className="border border-gray-300 p-3">title</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              The title of the card (required).
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">description</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              The description text for the card (required).
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">imageUrl</td>
            <td className="border border-gray-300 p-3">string (optional)</td>
            <td className="border border-gray-300 p-3">
              URL for an image to display on the card.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">imagePosition</td>
            <td className="border border-gray-300 p-3">
              "top" | "bottom" | "background"
            </td>
            <td className="border border-gray-300 p-3">
              Position of the image relative to the content (default: "top").
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">buttonText</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              Text to display on the button (default: "Learn More").
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">variant</td>
            <td className="border border-gray-300 p-3">
              "elevated" | "outline" | "ghost"
            </td>
            <td className="border border-gray-300 p-3">
              Card style variant (default: "elevated").
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">colorScheme</td>
            <td className="border border-gray-300 p-3">
              "primary" | "secondary" | "neutral" | "custom"
            </td>
            <td className="border border-gray-300 p-3">
              Color scheme of the card (default: "primary").
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">shadow</td>
            <td className="border border-gray-300 p-3">
              "sm" | "md" | "lg" | "xl" | "none"
            </td>
            <td className="border border-gray-300 p-3">
              Shadow depth of the card (default: "lg").
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">rounded</td>
            <td className="border border-gray-300 p-3">
              "none" | "sm" | "md" | "lg" | "full"
            </td>
            <td className="border border-gray-300 p-3">
              Border radius for rounded corners (default: "md").
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">border</td>
            <td className="border border-gray-300 p-3">boolean</td>
            <td className="border border-gray-300 p-3">
              Whether to display a border around the card (default: false).
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">onClick</td>
            <td className="border border-gray-300 p-3">() ={">"} void</td>
            <td className="border border-gray-300 p-3">
              Optional click handler for interactive cards.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">children</td>
            <td className="border border-gray-300 p-3">ReactNode</td>
            <td className="border border-gray-300 p-3">
              Additional content to display inside the card.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CardDocs;
