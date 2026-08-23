import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="mt-16 max-w-5xl mx-auto px-4">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold text-primary">Contact Us</h1>

        <div className="flex justify-center mt-2">
          <div className="w-16 h-0.5 bg-primary rounded-full"></div>
        </div>

        <p className="text-gray-500 dark:text-slate-400 mt-2">
          We’re here to help you with any questions or issues.
        </p>
      </div>

      {/* Contact Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-card rounded-xl p-6">
          <h2 className="text-xl font-medium mb-4 text-gray-900 dark:text-white">Send Message</h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500 p-3 rounded-lg outline-none focus:border-primary transition-colors"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500 p-3 rounded-lg outline-none focus:border-primary transition-colors"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500 p-3 rounded-lg outline-none focus:border-primary transition-colors"
            ></textarea>

            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dull transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Info */}
        <div className="bg-surface dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-6 shadow-card">
          <h2 className="text-xl font-medium mb-4 text-gray-900 dark:text-white">Contact Information</h2>

          <div className="space-y-4 text-gray-700 dark:text-slate-300">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary" />
              <b>Address:</b> Shahodi Garhi, Punjab, Pakistan
            </p>

            <p className="flex items-center gap-2">
              <FaPhone className="text-primary" />
              <b>Phone:</b> +92 300 0000000
            </p>

            <p className="flex items-center gap-2">
              <FaEnvelope className="text-primary" />
              <b>Email:</b> support@freshcart.com
            </p>

            <p className="flex items-center gap-2">
              <FaClock className="text-primary" />
              <b>Working Hours:</b> 9AM - 9PM
            </p>

            <div className="mt-6 text-sm text-gray-500 dark:text-slate-400">
              We usually respond within 24 hours.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
