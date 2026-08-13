import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen px-6 py-12 bg-gray-50 dark:bg-slate-950 text-gray-800 dark:text-gray-200">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 dark:text-white">About AI Guru Nepal</h1>
        <p className="text-lg mb-10 dark:text-gray-300">
          AI Guru Nepal is a modern online learning platform dedicated to providing quality, affordable, and accessible education to students across the globe. Whether you're a beginner or a professional, our platform empowers you to upskill and grow through curated courses.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-md border dark:border-slate-800">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Our Mission</h2>
            <p className="dark:text-gray-300">
              Our mission is to bridge the education gap by delivering high-quality content at affordable prices. We aim to bring world-class instructors and practical learning directly to your screen—anytime, anywhere.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-md border dark:border-slate-800">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">What We Offer</h2>
            <ul className="list-disc pl-5 space-y-2 dark:text-gray-300">
              <li>Wide range of courses including Development, Design, AI, and more</li>
              <li>Experienced instructors and industry professionals</li>
              <li>Secure course purchasing and easy progress tracking</li>
              <li>Certification upon course completion</li>
              <li>Interactive video lectures, downloadable resources, and quizzes</li>
            </ul>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-md border dark:border-slate-800">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Why Choose AI Guru Nepal?</h2>
            <ul className="list-disc pl-5 space-y-2 dark:text-gray-300">
              <li>Learn at your own pace with lifetime access</li>
              <li>Mobile-friendly learning experience</li>
              <li>Trusted by thousands of students in Nepal and beyond</li>
              <li>Dedicated student support and query resolution</li>
            </ul>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-md border dark:border-slate-800">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Join Our Learning Community</h2>
            <p className="dark:text-gray-300">
              At AI Guru Nepal, we believe in collaborative growth. Join a community of learners and educators who are passionate about knowledge and skill development. Whether you're here to start a new career or just explore a hobby, we're here to support you.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-medium dark:text-white">Ready to start your learning journey?</h3>
          <p className="mt-2 dark:text-gray-400">Browse our course catalog and enroll today!</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
