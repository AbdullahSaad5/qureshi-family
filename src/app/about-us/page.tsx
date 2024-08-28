import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          About Us
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Our project is dedicated to mapping the noble bloodline of our beloved Prophet Muhammad (peace be upon him). 
            With a deep sense of respect and reverence, we aim to trace the lineage and preserve this knowledge for future generations. 
            Through careful research and collaboration with historians and scholars, we strive to provide an accurate and respectful representation 
            of this sacred genealogy.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Background</h2>
          <p className="text-gray-600 leading-relaxed">
            The bloodline of Prophet Muhammad (peace be upon him) is of profound significance in Islamic history and culture. 
            This project seeks to document and visualize the family tree, connecting key historical figures and events. 
            By utilizing modern tools and technologies, we hope to make this information accessible to a broader audience, 
            helping to foster understanding and appreciation of this vital aspect of Islamic heritage.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Team</h2>
          <p className="text-gray-600 leading-relaxed">
            Our team consists of dedicated researchers, developers, and designers who share a common goal: to preserve and honor the legacy of Prophet Muhammad (peace be upon him). 
            We are committed to maintaining the highest standards of accuracy and respect in our work. 
            We believe that by mapping this sacred bloodline, we can contribute to the preservation of Islamic heritage and educate future generations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">
            We welcome collaboration and feedback from scholars, historians, and anyone interested in our work. 
            If you have any questions, suggestions, or contributions, please feel free to contact us.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Email: <a href="mailto:contact@bloodlinemapping.com" className="text-blue-500">contact@bloodlinemapping.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
