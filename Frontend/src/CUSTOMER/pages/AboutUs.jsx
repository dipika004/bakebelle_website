import Footer from "../components/Footer/Footer";

export default function AboutUs() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-100 to-pink-50 py-16 px-6 md:px-20 text-rose-900 font-sans">
        <h2 className="text-5xl font-extrabold text-center text-pink-700 mb-16 tracking-tight">
          About <span className="text-yellow-500">BakeBelle</span>
        </h2>

        {/* Our Sweet Beginning */}
        <section className="bg-white/70 backdrop-blur-lg shadow-lg rounded-3xl p-8 mb-10 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-pink-600 mb-2">🎀 Our Sweet Beginning</h3>
          <p className="text-lg leading-relaxed">
            At <strong>BakeBelle Bakery</strong>, every sprinkle has a story. What started as a cozy kitchen dream turned into a magical little oven where love rises with every bake.
            From the very first cupcake to our bestselling almond croissants, every treat is made to warm hearts and fill tummies with joy.
          </p>
        </section>

        {/* What We Bake with Love */}
        <section className="bg-white/70 backdrop-blur-lg shadow-lg rounded-3xl p-8 mb-10 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-pink-600 mb-2">🍓 What We Bake with Love</h3>
          <p className="text-lg leading-relaxed">
            From melt-in-your-mouth cookies and fluffy cupcakes to golden sourdough loaves and dreamy fruit tarts — our bakery is a sweet symphony of textures and tastes.
            Every bite is handcrafted with clean ingredients, a splash of whimsy, and a whole lot of heart. ✨
          </p>
        </section>

        {/* Our Baking Beliefs */}
        <section className="bg-white/70 backdrop-blur-lg shadow-lg rounded-3xl p-8 mb-10 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-pink-600 mb-4">💗 What We Believe In</h3>
          <ul className="space-y-2 text-lg leading-relaxed pl-4 list-disc">
            <li>Magic happens when you bake with love</li>
            <li>Wholesome ingredients = heavenly flavor</li>
            <li>Sweetness should nourish your soul</li>
            <li>Kindness, clarity, and care in every crumb</li>
          </ul>
        </section>

        {/* Why Choose BakeBelle? */}
        <section className="max-w-6xl mx-auto mb-20">
          <h3 className="text-3xl font-bold text-center text-pink-600 mb-10">🍰 Why Choose BakeBelle?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              ["🧁", "Bakes that melt hearts, not shelf life"],
              ["🌼", "Only the fluffiest, realest ingredients"],
              ["🎂", "Every creation tells a sweet story"],
              ["💌", "Made with love, shared with joy"],
            ].map(([icon, text], index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-xl shadow-md rounded-2xl p-6 text-center transition transform hover:scale-105 hover:shadow-lg"
              >
                <div className="text-4xl mb-2">{icon}</div>
                <p className="font-medium text-rose-800">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
