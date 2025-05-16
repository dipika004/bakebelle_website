import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const KnowYourself = () => {
  const [form, setForm] = useState({
    height: '',
    weight: '',
    age: '',
    gender: 'female',
    activity: 'sedentary',
    goal: 'maintain'
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi < 24.9) return 'Normal weight';
    if (bmi >= 25 && bmi < 29.9) return 'Overweight';
    return 'Obese';
  };

  const calculate = () => {
    const { height, weight, age } = form;
    if (!height || !weight || !age || height <= 0 || weight <= 0 || age <= 0) {
      setError('Please enter valid positive numbers for height, weight, and age.');
      return;
    }

    setError('');
    const heightInMeters = form.height / 100;
    const bmi = (form.weight / (heightInMeters * heightInMeters)).toFixed(2);
    const bmiCategory = getBmiCategory(bmi);

    let bmr;
    if (form.gender === 'female') {
      bmr = 10 * form.weight + 6.25 * form.height - 5 * form.age - 161;
    } else {
      bmr = 10 * form.weight + 6.25 * form.height - 5 * form.age + 5;
    }

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    let calorieNeeds = bmr * activityMultipliers[form.activity];

    if (form.goal === 'lose') calorieNeeds -= 500;
    else if (form.goal === 'gain') calorieNeeds += 300;

    calorieNeeds = Math.round(calorieNeeds);

    const protein = Math.round(form.weight * 1.2);
    const fats = Math.round((calorieNeeds * 0.25) / 9);
    const carbs = Math.round((calorieNeeds - (protein * 4 + fats * 9)) / 4);
    const waterIntake = Math.round(form.weight * 35); // in ml

    setResult({ bmi, bmiCategory, calorieNeeds, protein, fats, carbs, waterIntake });
  };

  const pieData = result && {
    labels: ['Protein', 'Fats', 'Carbs'],
    datasets: [
      {
        data: [result.protein * 4, result.fats * 9, result.carbs * 4],
        backgroundColor: ['#34D399', '#FBBF24', '#60A5FA'],
        borderWidth: 1
      }
    ]
  };

  const pieOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 md:p-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-8">Know Yourself</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="number"
            name="height"
            value={form.height}
            onChange={handleChange}
            placeholder="Height (cm)"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="number"
            name="weight"
            value={form.weight}
            onChange={handleChange}
            placeholder="Weight (kg)"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>

          <select
            name="activity"
            value={form.activity}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="light">Light (1-3 days/week)</option>
            <option value="moderate">Moderate (3-5 days/week)</option>
            <option value="active">Active (6-7 days/week)</option>
            <option value="very_active">Very Active (physical job + hard exercise)</option>
          </select>

          <select
            name="goal"
            value={form.goal}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="maintain">Maintain Weight</option>
            <option value="lose">Lose Weight</option>
            <option value="gain">Gain Muscle</option>
          </select>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <button
          onClick={calculate}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Calculate
        </button>

        {result && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-green-800 mb-4">Your Health Report</h3>
            <ul className="space-y-2 text-green-700">
              <li><strong>BMI:</strong> {result.bmi} <span className="ml-2 italic text-sm text-gray-600">({result.bmiCategory})</span></li>
              <li><strong>Daily Calorie Needs:</strong> {result.calorieNeeds} kcal</li>
              <li><strong>Protein:</strong> {result.protein} g</li>
              <li><strong>Fats:</strong> {result.fats} g</li>
              <li><strong>Carbohydrates:</strong> {result.carbs} g</li>
              <li><strong>Water Intake:</strong> {result.waterIntake} ml/day</li>
            </ul>

            <div className="mt-6 w-full flex justify-center">
              <div className="w-60 h-60">
                <Pie data={pieData} options={pieOptions} />
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-500 italic">
              💡 Health Tip: Stay consistent, sleep well, and keep moving daily for better health.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowYourself;
