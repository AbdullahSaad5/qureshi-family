import React from 'react';
import Image from "next/image";
import card1 from '../../_assets/card1.png';
import card2 from '../../_assets/card.jpg';
import card3 from '../../_assets/card3.png';
import card4 from '../../_assets/card4.png';

function Card() {
  const cardData = [
    {
      image: card1,
      title: "Manual Data Verification",
      description: "To ensure accuracy, all genealogical data is manually verified, giving users confidence in the reliability of the information provided."
    },
    {
      image: card2,
      title: "Expandable Family Trees",
      description: "This feature allows users to build and expand their family trees, adding new branches as they discover more ancestors and relatives."
    },
    {
      image: card3,
      title: "Free Forever Access",
      description: "Users are granted lifetime access to the website's resources and features without any charges, ensuring that everyone can explore their ancestry at no cost."
    },
    {
      image: card4,
      title: "Qureshi Specific record",
      description: `This section focuses on gathering and providing detailed genealogical records specific to individuals with the surname "Qureshi," helping users trace their lineage and family history.`
    }
  ];

  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-12 bg-[#F4FFE8]'>
      {cardData.map((card, index) => (
        <div key={index} className='shadow-lg p-4 rounded-lg bg-white my-4 mx-3 '>
          <Image
            src={card.image}
            alt={`card-image-${index}`}
            className="w-full h-[200px] object-cover rounded-lg"
          />
          <h2 className='font-semibold text-[#000000] mt-4 mb-2'>
            {card.title}
          </h2>
          <div className='border-2 border-[#82D026] w-[15%] mb-4' />
          <p className='text-sm text-left text-[#888888]'>
            {card.description}
          </p>
        </div>
      ))}
    </section>
  );
}

export default Card;
