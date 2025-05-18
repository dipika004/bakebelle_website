// ReelsTrendsBlog.jsx
import React from 'react';

const ReelsTrendsBlog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-50 via-white to-orange-50 py-16 px-6 md:px-20 lg:px-32">
      <article className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-10">
        <header className="mb-10 border-b border-orange-300 pb-6">
          <h1 className="text-5xl font-extrabold text-orange-700 leading-tight mb-3">
            How Reels & Trends Affect Your Cravings
          </h1>
          <p className="text-orange-600 italic text-lg tracking-wide">
            Why social media makes you want certain foods
          </p>
        </header>

        <section className="space-y-8 text-gray-700 text-lg leading-relaxed">
          <p>
            Watching reels and following food trends on social media can make you crave foods you don’t usually eat. Bright videos, yummy dishes, and popular recipes can make your mouth water and push you to eat unhealthy snacks.
          </p>

          <h2 className="text-2xl font-semibold text-orange-700">
            Why Social Media Changes What You Want to Eat
          </h2>

          <ul className="list-disc list-inside space-y-3 text-orange-700 font-semibold">
            <li><strong>Visual Appeal:</strong> Colorful, fast videos make food look very tasty.</li>
            <li><strong>Peer Influence:</strong> Seeing many people try certain foods makes you want to try too.</li>
            <li><strong>Instant Gratification:</strong> Social media wants quick attention, so it shows tempting foods fast.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-orange-700">
            How to Manage These Cravings
          </h2>

          <ul className="list-disc list-inside space-y-3 text-orange-700 font-semibold">
            <li>Limit your time watching food reels if you notice cravings rising.</li>
            <li>Follow healthy food creators to see better options.</li>
            <li>Prepare healthy snacks in advance to avoid quick junk food choices.</li>
            <li>Be mindful — ask yourself if you are really hungry or just reacting to videos.</li>
          </ul>

          <blockquote className="border-l-4 border-orange-500 pl-6 italic text-orange-800 bg-orange-50 py-4 rounded-md">
            “You control what you eat, even if the trends try to control your cravings.”
          </blockquote>

          <p>
            Social media can be fun and inspiring, but knowing how it affects you helps you make healthier food choices every day.
          </p>
        </section>

        <footer className="mt-14 text-right text-orange-600 font-semibold tracking-wide">
          — Dipika’s Healthy Bites Blog
        </footer>
      </article>
    </div>
  );
};

export default ReelsTrendsBlog;
