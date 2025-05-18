// NutritionLabelBlog.jsx
import React from 'react';

const NutritionLabelBlog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 via-white to-green-50 py-16 px-6 md:px-20 lg:px-32">
      <article className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-10">
        <header className="mb-10 border-b border-green-300 pb-6">
          <h1 className="text-5xl font-extrabold text-green-700 leading-tight mb-3">
            How to Read Nutrition Labels the Right Way
          </h1>
          <p className="text-green-600 italic text-lg tracking-wide">
            Decode the facts and make smarter food choices
          </p>
        </header>

        <section className="space-y-8 text-gray-700 text-lg leading-relaxed">
          <p>
            Nutrition labels are your guide to understanding what’s really in your food. But with all the numbers and terms, they can be confusing. Learning to read labels correctly empowers you to choose healthier options and avoid unwanted ingredients.
          </p>

          <h2 className="text-2xl font-semibold text-green-700">
            Key Components of a Nutrition Label
          </h2>

          <ul className="list-disc list-inside space-y-3 text-green-700 font-semibold">
            <li><strong>Serving Size:</strong> Always check this first. All nutritional information on the label is based on this amount.</li>
            <li><strong>Calories:</strong> Shows the energy you get per serving. Pay attention if you’re watching weight or energy intake.</li>
            <li><strong>Macronutrients:</strong> Includes fats, carbohydrates, and proteins. Look for healthy fats and fiber.</li>
            <li><strong>Sodium and Sugars:</strong> Keep these in check to reduce risk of heart disease and diabetes.</li>
            <li><strong>% Daily Value (%DV):</strong> Helps you understand how much a nutrient in a serving contributes to your daily diet. 5% or less is low, 20% or more is high.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-green-700">
            Tips for Smart Label Reading
          </h2>

          <ul className="list-disc list-inside space-y-3 text-green-700 font-semibold">
            <li>Compare products to pick the option with lower sugar, sodium, and saturated fats.</li>
            <li>Watch out for added sugars hidden under names like corn syrup, dextrose, or maltose.</li>
            <li>Choose foods high in fiber and protein to keep you fuller longer.</li>
            <li>Be cautious with “low-fat” labels — some products compensate by adding sugar.</li>
            <li>Look beyond the front of the package; always read the detailed nutrition label on the back.</li>
          </ul>

          <blockquote className="border-l-4 border-green-500 pl-6 italic text-green-800 bg-green-50 py-4 rounded-md">
            “Understanding nutrition labels is a simple but powerful step toward healthier eating habits.”
          </blockquote>

          <p>
            With practice, reading nutrition labels becomes second nature. It helps you make choices that support your health goals and avoid unnecessary additives or excess calories. Knowledge is power when it comes to food!
          </p>
        </section>

        <footer className="mt-14 text-right text-green-600 font-semibold tracking-wide">
          — Dipika’s Healthy Bites Blog
        </footer>
      </article>
    </div>
  );
};

export default NutritionLabelBlog;
