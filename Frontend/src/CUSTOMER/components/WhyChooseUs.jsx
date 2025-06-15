import React from 'react';
import { CheckCircle } from 'lucide-react';

const benefits = [
  {
    title: "100% Natural Ingredients",
    description: "No chemicals, no preservatives — just clean, wholesome food.",
  },
  {
    title: "Freshly Baked Daily",
    description: "Made every morning to ensure maximum freshness and nutrition.",
  },
  {
    title: "Supports Healthy Lifestyle",
    description: "Helps with weight control, digestion, and sustained energy.",
  },
  {
    title: "Tastes Delicious",
    description: "Soft texture, rich flavors — guilt-free indulgence.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Why Choose Us?</h2>
        <p className="text-gray-600 mb-10 text-lg">
          Discover what makes our healthy bread and food stand out.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4 bg-gray-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <CheckCircle className="text-green-600 w-6 h-6 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{benefit.title}</h3>
                <p className="text-gray-600 mt-1">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
