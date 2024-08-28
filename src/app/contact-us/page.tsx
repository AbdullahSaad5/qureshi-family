"use client";
import React, { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ name, email, message });
    // You might want to use a toast to show success or error messages here
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Contact Us
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            We would love to hear from you. Whether you have questions,
            feedback, or would like to collaborate, please fill out the form
            below or reach out to us directly.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                rows="5"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Send Message
              </button>
            </div>
          </form>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Contact Information
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Email:{" "}
            <a
              href="mailto:contact@bloodlinemapping.com"
              className="text-blue-500"
            >
              contact@bloodlinemapping.com
            </a>
          </p>
          <p className="text-gray-600 leading-relaxed mt-2">
            Phone:{" "}
            <a href="tel:+1234567890" className="text-blue-500">
              +1 (234) 567-890
            </a>
          </p>
          <p className="text-gray-600 leading-relaxed mt-2">
            Address: 123 Heritage Avenue, History City, Country
          </p>
        </section>
      </div>
    </div>
  );
}
