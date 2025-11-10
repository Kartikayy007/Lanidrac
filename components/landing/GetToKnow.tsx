"use client";

import { Coins, Network, PenSquare } from "lucide-react";

export default function GetToKnow() {
  return (
    <section className="flex justify-center bg-[#8C2221] px-4 sm:px-0">
      <div className="w-full max-w-6xl">
        <table className="w-full border-collapse border border-gray-300/30">
          <tbody>
            <tr>
              <td className="border border-gray-300/30 px-4 sm:px-8 lg:px-18 py-6 sm:py-8 align-bottom">
                <div className="flex justify-start">
                  <h1 className="p-1 bg-[#809ACF] flex justify-center items-center text-[8px] sm:text-[10px] font-semibold">
                    HEADER
                  </h1>
                </div>
                <div className="text-center py-2 border border-gray-300/30 bg-[#f3eded17]">
                  <h1 className="text-[#F3EDED] text-3xl sm:text-5xl lg:text-6xl mb-2 sm:mb-4 font-gaisyr">
                    Get to know Cardinal
                  </h1>
                </div>
              </td>
            </tr>

            <tr>
              <td className="border border-gray-300/30 p-4 sm:p-8">
                <div className="flex justify-start">
                  <h1 className="p-1 bg-[#926AB0] flex justify-center items-center text-[8px] sm:text-[10px] font-semibold text-[#F3EDED]">
                    FEATURE-COLUMNS
                  </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="bg-[#f3eded17] p-8 border border-gray-300/30">
                    <div className="w-16 h-16 bg-[#6B8CB8] rounded flex items-center justify-center mb-6">
                      <Coins className="text-white" size={32} />
                    </div>
                    <h3 className="text-[#F3EDED] text-2xl font-bold mb-4">
                      Flexible pricing
                    </h3>
                    <p className="text-[#F3EDED] text-lg mb-8">
                      3 versatile pricing tiers servicing startups to large enterprises
                    </p>
                    <button className="bg-[#F3EDED] text-[#533E3D] px-8 py-3 font-semibold hover:bg-[#E5E5E5] transition-colors">
                      Explore pricing
                    </button>
                  </div>

                  <div className="bg-[#f3eded17] p-8 border border-gray-300/30">
                    <div className="w-16 h-16 bg-[#926AB0] rounded flex items-center justify-center mb-6">
                      <Network className="text-white" size={32} />
                    </div>
                    <h3 className="text-[#F3EDED] text-2xl font-bold mb-4">
                      API Docs
                    </h3>
                    <p className="text-[#F3EDED] text-lg mb-8">
                      Understand how our API works and how to get set up quickly
                    </p>
                    <button className="bg-[#F3EDED] text-[#533E3D] px-8 py-3 font-semibold hover:bg-[#E5E5E5] transition-colors">
                      Visit API docs
                    </button>
                  </div>

                  <div className="bg-[#f3eded17] p-8 border border-gray-300/30">
                    <div className="w-16 h-16 bg-[#F96733] rounded flex items-center justify-center mb-6">
                      <PenSquare className="text-white" size={32} />
                    </div>
                    <h3 className="text-[#F3EDED] text-2xl font-bold mb-4">
                      Blog
                    </h3>
                    <p className="text-[#F3EDED] text-lg mb-8">
                      Take a deeper dive into everything OCR tech and data handling
                    </p>
                    <button className="bg-[#F3EDED] text-[#533E3D] px-8 py-3 font-semibold hover:bg-[#E5E5E5] transition-colors">
                      Go to blog
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
