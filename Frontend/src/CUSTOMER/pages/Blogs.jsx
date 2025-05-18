import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faClock,
  faDumbbell,
  faBan,
  faPizzaSlice,
  faLeaf,
  faHeart,
  faBreadSlice,
  faListUl,
  faCube,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer/Footer";

export default function Blogs() {
  const knowledgeContent = [
    {
      icon: faClock,
      title: "Busy Life, Bad Choices",
      text: "Most professionals skip meals or grab the nearest junk.",
    },
    {
      icon: faDumbbell,
      title: "Busy Life, Gym, No Gains",
      text: "Fitness starts in the kitchen — not just the workout floor.",
    },
    {
      icon: faBan,
      title: "Mislabeled 'Healthy'",
      text: "Low-fat? Sugar-free? Often just marketing tricks.",
    },
    {
      icon: faPizzaSlice,
      title: "70% Processed Calories",
      text: "Majority of daily calories come from processed food.",
    },
    {
      icon: faLeaf,
      title: "Low Veggie Intake",
      text: "Only 1 in 10 people eat enough vegetables.",
    },
    {
      icon: faHeart,
      title: "Food Affects Health",
      text: "Mood, energy, and immunity depend on your meals.",
    },
  ];

  const researchBlogs = [
    {
      title: "Why Brown Bread Isn’t Always Healthy",
      link: "/blogs/brown-bread",
      icon: faBreadSlice,
      summary: "Brown bread may not be as healthy as you think. Here's why...",
      date: "Jan 15, 2023",
      image: "https://res.cloudinary.com/dkqllkcbq/image/upload/v1747593233/Blogs/pvx84tdzrfqkkanm9onh.png",
    },
    {
      title: "How to Read Nutrition Labels the Right Way",
      link: "/blogs/nutrition-labels",
      icon: faListUl,
      summary: "Decode the confusing nutrition labels and eat smarter.",
      date: "Feb 10, 2023",
      image: "https://res.cloudinary.com/dkqllkcbq/image/upload/v1747593422/Blogs/k5vz9kkmxjszxkkxw1qv.png",
    },
    {
      title: "Hidden Sugars in Packaged Foods",
      link: "/blogs/hidden-sugars",
      icon: faCube,
      summary: "Learn where sugars hide in your favorite snacks.",
      date: "Mar 05, 2023",
      image: "https://res.cloudinary.com/dkqllkcbq/image/upload/v1747593702/Blogs/czzkrsxk7pwaj4ngauhj.png",
    },
    {
      title: "Why You're Not Seeing Results After Hardcore Workouts",
      link: "/blogs/no-results",
      image: "https://res.cloudinary.com/dkqllkcbq/image/upload/v1747593701/Blogs/hk3xedtp8bpkvvrmpypp.png",
    },
    {
      title: "The Mind Game: Why We Choose Junk Over Health",
      link: "/blogs/mind-game",
      image: "https://res.cloudinary.com/dkqllkcbq/image/upload/v1747593916/Blogs/uabjjztsuftzao5kypyw.png",
    },
    {
      title: "How Reels & Trends Affect Your Cravings",
      link: "/blogs/reels-trends",
      image: "https://res.cloudinary.com/dkqllkcbq/image/upload/v1747593967/Blogs/pv3uteucpcmyiunimbon.png",
    },
  ];

  return (
    <>
      <div className="bg-white min-h-screen py-10 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <h2 className="text-center text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            What You Eat Today <br className="hidden sm:block" />
            Decides How You Feel Tomorrow 🍎
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
            We believe every bite shapes your energy, focus, and health — it’s time to make smarter food choices.
          </p>

          {/* Knowledge Cards */}
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Why We're Not Succeeding at Healthy Living
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-items-center mb-16">
            {knowledgeContent.map((item, idx) => (
              <div
                key={idx}
                className="w-full max-w-xs bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-green-600 mb-4">
                  <FontAwesomeIcon icon={item.icon} size="2x" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-700 text-sm">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Latest Blogs */}
          <section className="py-16">
            <h2 className="font-manrope text-4xl font-bold text-gray-900 text-center mb-16">
              Our Blogs
            </h2>
            <div className="flex justify-center flex-wrap gap-8">
              {researchBlogs.map((blog, idx) => (
                <div
                  key={idx}
                  className="group w-full sm:w-[48%] lg:w-[31%] border border-gray-300 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <img
                    src={
                      blog.image ||
                      "https://via.placeholder.com/400x250?text=Blog+Image"
                    }
                    alt={blog.title}
                    className="rounded-t-2xl w-full object-cover h-56"
                  />
                  <div className="p-4 lg:p-6 rounded-b-2xl">
                    {/* <span className="text-indigo-600 font-medium mb-3 block">
                      {blog.date || "Recent"}
                    </span> */}
                    <h4 className="text-xl text-gray-900 font-medium leading-8 mb-3">
                      {blog.title}
                    </h4>
                    {blog.summary && (
                      <p className="text-gray-600 leading-6 mb-5">{blog.summary}</p>
                    )}
                    <Link
                      to={blog.link}
                      className="cursor-pointer text-lg text-indigo-600 font-semibold"
                    >
                      Read more..
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
