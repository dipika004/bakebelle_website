// HiddenSugarsBlog.jsx
import React from 'react';

const HiddenSugarsBlog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-red-50 via-white to-red-50 py-16 px-6 md:px-20 lg:px-32">
      <article className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-10">
        <header className="mb-10 border-b border-red-300 pb-6">
          <h1 className="text-5xl font-extrabold text-red-700 leading-tight mb-3">
            Hidden Sugars in Packaged Foods
          </h1>
          <p className="text-red-600 italic text-lg tracking-wide">
            Unmasking the sweet secrets behind your favorite snacks
          </p>
        </header>

        <section className="space-y-8 text-gray-700 text-lg leading-relaxed">
          <p>
            Packaged foods often contain added sugars that sneak in under various names. These hidden sugars contribute to excess calorie intake and can increase the risk of obesity, diabetes, and heart disease.
          </p>

          <h2 className="text-2xl font-semibold text-red-700">
            Why Hidden Sugars Are a Problem
          </h2>

          <ul className="list-disc list-inside space-y-3 text-red-700 font-semibold">
            <li>They add empty calories without nutritional benefits.</li>
            <li>Can cause blood sugar spikes and crashes.</li>
            <li>Increase cravings for more sugary foods.</li>
            <li>Often found in foods you wouldn’t expect, like bread and sauces.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-red-700">
            Common Names for Added Sugars
          </h2>

          <ul className="list-disc list-inside space-y-3 text-red-700 font-semibold">
            <li>High fructose corn syrup</li>
            <li>Sucrose, glucose, fructose</li>
            <li>Molasses, cane juice, raw sugar</li>
            <li>Evaporated cane juice</li>
            <li>Dextrose, maltose, corn syrup solids</li>
            <li>Agave nectar, honey (yes, even “natural” sweeteners add sugar!)</li>
          </ul>

          <blockquote className="border-l-4 border-red-500 pl-6 italic text-red-800 bg-red-50 py-4 rounded-md">
            “Being aware of hidden sugars is the first step to taking control of your health.”
          </blockquote>

          <p>
            To reduce hidden sugar intake, read ingredient lists carefully, choose whole foods, and prepare meals at home when possible. Your taste buds and body will thank you!
          </p>
        </section>

        <footer className="mt-14 text-right text-red-600 font-semibold tracking-wide">
          — Dipika’s Healthy Bites Blog
        </footer>
      </article>
    </div>
  );
};

export default HiddenSugarsBlog;
