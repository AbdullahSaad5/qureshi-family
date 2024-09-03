"use client";

import React, { useEffect, useState } from "react";
import Loader from "./Loader";

function KalmaCounter() {
  const [totalCount, setTotalCount] = useState("");
  const [Kalma, setKalma] = useState(1);
  const [Loading, setLoading] = useState(false);
  const [change, setChange] = useState(0);

  const getCounts = async () => {
    try {
      const res = await axios.get(
        `https://quresh-family-5b06b2823b36.herokuapp.com/api/counter`
      );
      setChange(change + 1);
      setKalma("");
    } catch (error) {
      console.log("post error : ", error);
    }
  };
  useEffect(() => {
    getCounts();
  }, [change]);

  const Submit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `https://quresh-family-5b06b2823b36.herokuapp.com/api/counter/${Kalma}`
      );
      setChange(change + 1);
      setKalma("");
    } catch (error) {
      console.log("post error : ", error);
    }
    setLoading(false);
  };

  return (
    <section className="flex flex-col items-center justify-center text-center w-full h-[500px]">
      <div className="p-6 mt-24  w-[70%]  border-b-2 border-[#999595]">
        <h2 className="text-2xl md:text-3xl py-6 font-medium text-[#82D026]">
          Kalma Counter : <span>{totalCount}</span>
        </h2>
        <h2 className="text-4xl lg:text-6xl md:text-5xl py-6 text-black">
          لَآ اِلٰهَ اِلَّا اللّٰهُ مُحَمَّدٌ رَّسُوْلُ اللّٰهِؕ
        </h2>
        <p className="text-xl md:text-2xl py-6 text-[#82D026] ">
          “None worthy of worship except Allah. Muhammad is Messenger of Allah”
        </p>
        <p className="text-xl md:text-2xl py-6 text-black font-medium">
          Recite Kalma
          {/* <span className='border-2 border-black px-3 mx-3'>1</span>  */}
          <input
            type="number"
            min="0"
            onChange={(e) => {
              setKalma(e.target.value);
            }}
            value={Kalma}
            className="border-2 text-center text-xl border-black px-2 py-1 mx-3 w-16"
          />
          Times And Click
        </p>

        <button
          onClick={Submit}
          disabled={!Kalma}
          className="text-2xl my-6 text-white font-medium bg-[#82D026] py-3 px-8 rounded-full hover:bg-[#6fb21f]"
        >
          {Loading ? <Loader /> : "Submit"}
        </button>
      </div>
    </section>
  );
}

export default KalmaCounter;
