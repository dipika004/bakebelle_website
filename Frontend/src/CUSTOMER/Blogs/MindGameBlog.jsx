// MindGameBlog.jsx
import React from 'react';

const MindGameBlog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 via-white to-green-50 py-16 px-6 md:px-20 lg:px-32">
      <article className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-10">
        <header className="mb-10 border-b border-green-300 pb-6">
          <h1 className="text-5xl font-extrabold text-green-700 leading-tight mb-3">
            The Mind Game: Why We Choose Junk Over Health
          </h1>
          <p className="text-green-600 italic text-lg tracking-wide">
            Understanding why our brain picks unhealthy food
          </p>
        </header>

        <section className="space-y-8 text-gray-700 text-lg leading-relaxed">
          <p>
            Even when we know healthy food is better, sometimes we choose junk food. This happens because our brain plays tricks on us. It wants quick rewards and tastes, even if they are not good for us.
          </p>

          <h2 className="text-2xl font-semibold text-green-700">
            Why Our Brain Likes Junk Food
          </h2>

          <ul className="list-disc list-inside space-y-3 text-green-700 font-semibold">
            <li><strong>Quick Energy:</strong> Junk food is often high in sugar and fat, giving fast energy boosts.</li>
            <li><strong>Comfort and Pleasure:</strong> Eating junk food releases chemicals that make us feel happy for a short time.</li>
            <li><strong>Habit and Convenience:</strong> Junk food is easy to get and becomes a habit over time.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-green-700">
            How to Win the Mind Game
          </h2>

          <ul className="list-disc list-inside space-y-3 text-green-700 font-semibold">
            <li>Find healthy snacks that you enjoy and keep them handy.</li>
            <li>Plan meals so you don’t feel hungry and tempted to grab junk.</li>
            <li>Practice mindfulness — pay attention to why you want to eat junk.</li>
            <li>Take small steps to change your habits slowly, not all at once.</li>
          </ul>

          <blockquote className="border-l-4 border-green-500 pl-6 italic text-green-800 bg-green-50 py-4 rounded-md">
            “Changing what you eat starts in your mind — be kind and patient with yourself.”
          </blockquote>

          <p>
            Remember, it’s normal to crave junk sometimes. Understanding your mind helps you make better choices and feel healthier over time.
          </p>
        </section>

        <footer className="mt-14 text-right text-green-600 font-semibold tracking-wide">
          — Dipika’s Healthy Bites Blog
        </footer>
      </article>
    </div>
  );
};

export default MindGameBlog;
