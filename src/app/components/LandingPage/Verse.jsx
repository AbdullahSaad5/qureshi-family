import React from "react";
import backgroundImage from "../../_assets/tree2.jpg"; 

function Verse() {
  return (
    <div className="relative flex items-center justify-center h-[1000px] md:h-[600px] w-full">
     
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
          opacity: 1.5,
          zIndex: -1, 
          // height: '600px'
        }}
      ></div>


      <div className=" text-white px-4 md:px-8 lg:px-16 z-10 ">
        <p className="text-2xl tracking-widest md:text-3xl lg:text-4xl xl:text-4xl font-bold mb-8 p-4 leading-custom">
          يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَى
          وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ
          <br />
          لِتَعَارَفُوا إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ إِنَّ
          اللَّهَ عَلِيمٌ خَبِيرٌ
        </p>
        <p className="text-md md:text-xl lg:text-xl  md:font-medium leading-relaxed">
          “O mankind! WE created you from a single soul, male and female, and
          made you into nations and tribes, so <br />
          that you may come to know one another. Truly, the most honored of you
          in the sight of ALLAH is the greatest <br />
          of you in piety. ALLAH is All-Knowing, All Aware.”
        </p>
        <p className="text-md md:text-xl lg:text-2xl font-medium mt-16 md:mt-6 lg:mt-8 text-right ">
          [Quran <span className="text-[#82D026]"> 49:13 </span>]
        </p>
      </div>
    </div>
  );
}

export default Verse;
