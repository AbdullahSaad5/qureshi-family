"use client";
import React from "react";
import { Pagination } from "antd";
export default function Explore() {
  return (
    <div>
      <div className="container mx-auto flex flex-col items-center my- p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          {" "}
          Famous Personalities{" "}
        </h1>
        {/* <!-- Table Structure --> */}
        <div className="overflow-x-auto rounded-xl flex items-center justify-center shadow-lg border-3 border-black w-[80%]">
          <table className=" text-left text-sm border-2 border-[#EEEEEE] overflow-hidden">
            {/* Apply border-radius to the entire table */}
            <thead className="bg-[#82D026] text-black">
              <tr className="">
                <th className="p-3 border-2 border-[#EEEEEE] text-center">
                  id
                </th>
                <th className="p-3 border-2 border-[#EEEEEE] text-center">
                  Name
                </th>
                <th className="p-3 text-center">Description</th>
              </tr>
            </thead>
            <tbody className="text-[#515151]">
              {/* <!-- Row 1 --> */}
              <tr className="border-b">
                <td className="p-3 border-2 border-[#EEEEEE]">1231</td>
                <td className="p-3 border-2 border-[#EEEEEE]">
                  <a href="" className="hover:text-[#82D026]">
                    {" "}
                    Holy Prophet Hazrat Muhammad (May ALLAH grant peace and
                    honor Him and His family) [bin Abdullah | Amina]{" "}
                  </a>
                </td>
                <td className="p-3 border-2 border-[#EEEEEE]">
                  <a href="" className="hover:text-[#82D026]">
                    Muhammad [Abu al-Qasim Muhammad ibn Abdullah] (Sallallahu
                    Alaihi wa Sallam) is messenger of Allah (Jalla Jalaluhu) and
                    last Prophet of the religion of Islam.{" "}
                  </a>
                </td>
              </tr>
              {/* <!-- Row 2 --> */}
              <tr className="border-b">
                <td className="p-3 border-2 border-[#EEEEEE]">1231</td>
                <td className="p-3 border-2 border-[#EEEEEE]">
                  <a href="" className="hover:text-[#82D026]">
                    Adnan [bin Awad | Aad | Alnaja | Balhaa]
                  </a>
                </td>
                <td className="p-3 border-2 border-[#EEEEEE]">
                  <a href="" className="hover:text-[#82D026]">
                    {" "}
                    Hazrat Muhammad (Sallallahu Alaihi wa Sallam) mentioned HIS
                    lineage up to ADNAN.{" "}
                  </a>
                </td>
              </tr>
              {/* <!-- Row 3 --> */}
              <tr className="border-b">
                <td className="p-3 border-2 border-[#EEEEEE]">1231</td>
                <td className="p-3 border-2 border-[#EEEEEE]">
                  <a href="" className="hover:text-[#82D026]">
                    {" "}
                    Fahr | Quraish [bin Malik | Jandlah]{" "}
                  </a>
                </td>
                <td className="p-3 border-2 border-[#EEEEEE]">
                  <a href="" className="hover:text-[#82D026]">
                    A distinguished tribe chief and the first Qureshi whose
                    descendants called Quraish. Hazrat Muhammad (Sallallahu
                    Alaihi wa Sallam) also mentioned Fahr/Quraish in HIS
                    lineage.{" "}
                  </a>
                </td>
              </tr>
              {/* <!-- Row 4 --> */}
              <tr className="border-b">
                <td className="p-3 border-2 border-[#EEEEEE]">1231</td>
                <td className="p-3 border-2 border-[#EEEEEE]">
                  <a href="" className="hover:text-[#82D026]">
                    Abdul Muttalib | Shibah [bin Hashim | Amr | Salma]{" "}
                  </a>
                </td>
                <td className="p-3 border-2 border-[#EEEEEE]">
                  <a href="" className="hover:text-[#82D026]">
                    Grandfather of the Holy Prophet Hazrat Muhammad (Sallallahu
                    Alaihi wa Sallam). He lived for 82 years and His good
                    leadership earned Him the title Sayyidul-Bat ha which means
                    Chief of Makka.
                  </a>
                </td>
              </tr>
              {/* <!-- Row 5 --> */}
              <tr className="border-b">
                <td className="p-3 border-2 border-[#EEEEEE]">1231</td>
                <td className="p-3 border-2 border-[#EEEEEE]">
                  <a href="" className="hover:text-[#82D026]">
                    Hazrat Abu Bakr Siddiq | Abdullah (May Allah be pleased with
                    him) [bin Usman Abu Qahafa (May Allah be pleased with him) |
                    Salma Umm ul...
                  </a>
                </td>
                <td className="p-3 border-2 border-[#EEEEEE]">
                  <a href="" className="hover:text-[#82D026]">
                    [573-634] The first Muslim Caliph [ruled for 2 years and 3
                    months], a senior companion (Sahabah) and the father-in-law
                    of the Prophet Hazrat Muhammad (Sallallahu Alaihi wa
                    Sallam).
                  </a>
                </td>
              </tr>
              {/* <!-- Row 6 --> */}
              <tr className="border-b">
                <td className="p-3 border-2 border-[#EEEEEE]">1231</td>
                <td className="p-3 border-2 border-[#EEEEEE]">
                  <a href="" className="hover:text-[#82D026]">
                    Hazrat Umar Farooq (May Allah be pleased with him) [bin Al
                    Kattab | Hatma]
                  </a>
                </td>
                <td className="p-3 border-2 border-[#EEEEEE]">
                  <a href="" className="hover:text-[#82D026]">
                    The second Muslim Caliph [ruled for about 10 years], a
                    leading companion (Sahabah) and adviser to the Prophet
                    Hazrat Muhammad (Sallallahu Alaihi wa Sallam).
                  </a>
                </td>
              </tr>
              {/* <!-- Row 7 --> */}
              <tr className="rounded-b-lg border-b-2 border-[#EEEEEE]">
                <td className="p-3 border-2 border-[#EEEEEE]">1231</td>
                <td className="p-3 border-2 border-[#EEEEEE]">
                  <a href="" className="hover:text-[#82D026]">
                    Hazrat Usman Ghani (May Allah be pleased with him) [bin
                    Affan]
                  </a>
                </td>
                <td className="p-3 border-2 border-[#EEEEEE]">
                  <a href="" className="hover:text-[#82D026]">
                    The third Muslim Caliph [ruled for about 12 years], a
                    companion (Sahabah) of the Prophet Hazrat Muhammad
                    (Sallallahu Alaihi wa Sallam) and played a major role in
                    early Islamic history.
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-12 mb-8 ">
          <Pagination
            defaultCurrent={1}
            total={50}
            itemRender={(page, type, originalElement) => {
              if (type === "page") {
                return (
                  <a
                    className={
                      page === 1
                        ? "text-[#82D026]"
                        : "text-[#515151] hover:text-[#82D026]"
                    }
                  >
                    {page}
                  </a>
                );
              }
              return originalElement;
            }}
          />
        </div>
      </div>
    </div>
  );
}
