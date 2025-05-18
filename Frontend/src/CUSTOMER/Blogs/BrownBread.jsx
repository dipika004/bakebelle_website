// BlogPage.jsx
import React from 'react';

const BrownBread = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-50 via-white to-yellow-50 py-16 px-6 md:px-20 lg:px-32">
      <article className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-10">
        <header className="mb-10 border-b border-yellow-300 pb-6">
          <h1 className="text-5xl font-extrabold text-yellow-700 leading-tight mb-3">
            Why Brown Bread Isn’t Always Healthy
          </h1>
          <p className="text-yellow-600 italic text-lg tracking-wide">
            Understanding the hidden truths behind your everyday bread choice
          </p>
        </header>

        <section className="space-y-8 text-gray-700 text-lg leading-relaxed">
          <p>
            Brown bread often gets a health halo because it looks whole grain and fiber-rich. However, not all brown bread is created equal, and many commercially available brown breads contain added sugars, preservatives, and refined flour dyed with caramel coloring to look healthier.
          </p>

          <p>
            Here are some key points to consider before assuming brown bread is always the best choice:
          </p>

          <ul className="list-disc list-inside space-y-3 text-yellow-700 font-semibold">
            <li>Many brown breads use refined flour with coloring instead of whole grain flour.</li>
            <li>Added sugars and additives can negate the health benefits.</li>
            <li>True whole grain bread has a denser texture and nutty flavor, which is often missing.</li>
            <li>Labels like “wheat bread” don’t necessarily mean whole wheat.</li>
          </ul>

          <p>
            Choosing bread with a clear label such as “100% whole grain” or “whole wheat” is essential. Also, checking the ingredient list helps avoid unhealthy additives. When in doubt, consider baking your own or buying from artisanal bakeries.
          </p>

          <blockquote className="border-l-4 border-yellow-500 pl-6 italic text-yellow-800 bg-yellow-50 py-4 rounded-md">
            “Not all brown breads are a healthy choice — knowledge is key to making better dietary decisions.”
          </blockquote>

          <p>
            Ultimately, understanding what’s inside your bread helps you make smarter, healthier food choices. Don’t just rely on color; read labels and choose quality over convenience.
          </p>
        </section>

        <footer className="mt-14 text-right text-yellow-600 font-semibold tracking-wide">
          — Dipika’s Healthy Bites Blog
        </footer>
      </article>
    </div>
  );
};

export default BrownBread;
