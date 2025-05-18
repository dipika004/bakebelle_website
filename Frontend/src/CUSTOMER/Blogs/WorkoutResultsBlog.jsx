// WorkoutResultsBlogSimple.jsx
import React from 'react';

const WorkoutResultsBlogSimple = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 py-16 px-6 md:px-20 lg:px-32">
      <article className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-10">
        <header className="mb-10 border-b border-blue-300 pb-6">
          <h1 className="text-5xl font-extrabold text-blue-700 leading-tight mb-3">
            Why You’re Not Seeing Results After Hard Workouts
          </h1>
          <p className="text-blue-600 italic text-lg tracking-wide">
            Simple reasons why your workouts may not be working
          </p>
        </header>

        <section className="space-y-8 text-gray-700 text-lg leading-relaxed">
          <p>
            You work hard in the gym, but sometimes the results don’t show. This can be very frustrating. The problem is not always how hard you work, but how you work and what else you do.
          </p>

          <h2 className="text-2xl font-semibold text-blue-700">
            Common Reasons You Don’t See Progress
          </h2>

          <ul className="list-disc list-inside space-y-3 text-blue-700 font-semibold">
            <li><strong>Not Eating Enough:</strong> Your body needs food, especially protein, to build muscles.</li>
            <li><strong>Too Much Exercise:</strong> If you don’t rest, your muscles can’t heal and grow.</li>
            <li><strong>Not Being Consistent:</strong> Skipping workouts makes it hard to get results.</li>
            <li><strong>Ignoring Rest:</strong> Sleep and relaxing help your body get stronger.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-blue-700">
            How to Start Seeing Results
          </h2>

          <ul className="list-disc list-inside space-y-3 text-blue-700 font-semibold">
            <li>Eat enough healthy food with protein to help your muscles.</li>
            <li>Take breaks and rest your body after hard workouts.</li>
            <li>Try to exercise regularly and not miss too many days.</li>
            <li>Get good sleep and find ways to relax and reduce stress.</li>
          </ul>

          <blockquote className="border-l-4 border-blue-500 pl-6 italic text-blue-800 bg-blue-50 py-4 rounded-md">
            “Fitness takes time — keep going and be patient with yourself.”
          </blockquote>

          <p>
            Remember, changes don’t happen overnight. Keep going, eat well, rest well, and you will see progress.
          </p>
        </section>

        <footer className="mt-14 text-right text-blue-600 font-semibold tracking-wide">
          — Dipika’s Healthy Bites Blog
        </footer>
      </article>
    </div>
  );
};

export default WorkoutResultsBlogSimple;
