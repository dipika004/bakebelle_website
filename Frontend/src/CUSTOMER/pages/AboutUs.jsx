import video from "../../assets/video.mp4";
import Footer from "../components/Footer/Footer";

export default function AboutUs() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white py-16 px-6 md:px-20 text-gray-800 font-inter">
        <h2 className="text-5xl font-bold text-center text-gray-900 mb-16 tracking-tight">
          About <span className="text-blue-600">Us</span>
        </h2>

        {/* Vision */}
        <section className="bg-white bg-opacity-80 backdrop-blur-xl shadow-xl rounded-3xl p-8 mb-10 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-blue-700 mb-2">🌟 Our Vision</h3>
          <p className="text-lg leading-relaxed">
            To become India’s most trusted name for accessible, affordable, and truly healthy food
            options — one bowl, one bite at a time.
          </p>
        </section>

        {/* Mission */}
        <section className="bg-white bg-opacity-80 backdrop-blur-xl shadow-xl rounded-3xl p-8 mb-10 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-blue-700 mb-2">🚀 Our Mission</h3>
          <p className="text-lg leading-relaxed">
            To simplify healthy eating for every lifestyle — with honest ingredients, simple recipes,
            and no compromises.
          </p>
        </section>

        {/* Values */}
        <section className="bg-white bg-opacity-80 backdrop-blur-xl shadow-xl rounded-3xl p-8 mb-10 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">💎 Our Values</h3>
          <ul className="space-y-2 text-lg leading-relaxed pl-4 list-disc">
            <li>Transparency</li>
            <li>Natural Ingredients</li>
            <li>Innovation in Wellness</li>
            <li>Empowering Educated Choices</li>
          </ul>
        </section>

        {/* Founder Note */}
        <section className="bg-white bg-opacity-90 backdrop-blur-2xl shadow-2xl rounded-3xl p-10 mb-14 max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold text-blue-700 mb-6">
            ✍️ A Note from Dipika – Founder of <span className="text-blue-600">The Jagan Bowl</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <video
              src={video}
              controls
              className="w-full h-auto rounded-2xl shadow-lg"
            />
            <div className="text-lg leading-relaxed space-y-4">
              <p>
                Hi, I’m <strong>Dipika Sahoo</strong> — an engineer with a passion for health and mindful living.
              </p>
              <p>
                While traveling, I saw how people often struggle to find truly healthy food. Busy professionals settle for convenience, and gym-goers consume “healthy-labeled” foods that aren’t actually nutritious.
              </p>
              <p>
                That’s when the idea struck — to create real, wholesome food that’s accessible and convenient for everyone.
              </p>
              <p>
                That’s how <strong>The Jagan Bowl</strong> was born. A brand rooted in the belief that small, consistent choices can lead to a healthier, happier life.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="max-w-6xl mx-auto mb-20">
          <h3 className="text-3xl font-bold text-center text-blue-700 mb-10">💡 Why Choose Us?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              ["🌿", "No hidden sugars or preservatives"],
              ["🌾", "Only real, whole ingredients"],
              ["💡", "Built on real needs, not viral diets"],
              ["🧠", "Born from observation, shaped by intention"],
            ].map(([icon, text], index) => (
              <div
                key={index}
                className="bg-white bg-opacity-90 backdrop-blur-xl shadow-md rounded-2xl p-6 text-center transition transform hover:scale-105 hover:shadow-lg"
              >
                <div className="text-3xl mb-2">{icon}</div>
                <p className="font-medium text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
