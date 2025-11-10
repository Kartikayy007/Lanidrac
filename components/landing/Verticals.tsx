"use client";

import { useState } from "react";
import { Compare } from "@/components/ui/compare";

export default function Verticals() {
  const [activeTab, setActiveTab] = useState("healthcare");

  const getImages = () => {
    switch (activeTab) {
      case "healthcare":
        return {
          left: "/healthcareleft.png",
          right: "/healthcareright.png",
        };
      case "accounting":
        return {
          left: "/accountleft.png",
          right: "/accountright.png",
        };
      case "supplychain":
        return {
          left: "/healthcareleft.png",
          right: "/healthcareright.png",
        };
      case "finance":
        return {
          left: "/healthcareleft.png",
          right: "/healthcareright.png",
        };
      default:
        return {
          left: "/healthcareleft.png",
          right: "/healthcareright.png",
        };
    }
  };

  const images = getImages();

  return (
    <section className="flex justify-center bg-[#EDEBEB]">
      <div className="w-6xl">
        <table className="w-full border-collapse border border-gray-300/30">
          <tbody>
            <tr>
              <td className="border border-gray-300/30 px-18 py-8 align-bottom">
                <div className="flex justify-start">
                  <h1 className="p-1 bg-[#809ACF] flex justify-center items-center text-[10px] font-semibold">
                    HEADER
                  </h1>
                </div>
                <div className="text-center py-2 bg-[#e0dddd]">
                  <h1 className="text-[#533E3D] text-6xl mb-4 font-gaisyr">
                    Built For Every Vertical
                  </h1>
                  <p className="text-[#533E3D] text-lg font-semibold">
                    Cardinal powers document workflows for the most regulated industries, where precision and reliability matter most.
                  </p>
                </div>
              </td>
            </tr>

            <tr>
              <td className="border border-gray-300/30 p-8">
                {/* Vertical Tabs */}
                <div className="flex justify-center gap-4 mb-8">
                  <button
                    onClick={() => setActiveTab("healthcare")}
                    className={`px-8 py-3 font-semibold ${
                      activeTab === "healthcare"
                        ? "bg-[#8C2221] text-white"
                        : "bg-white text-[#533E3D] border border-gray-300"
                    }`}
                  >
                    Healthcare
                  </button>
                  <button
                    onClick={() => setActiveTab("accounting")}
                    className={`px-8 py-3 font-semibold ${
                      activeTab === "accounting"
                        ? "bg-[#8C2221] text-white"
                        : "bg-white text-[#533E3D] border border-gray-300"
                    }`}
                  >
                    Accounting
                  </button>
                  <button
                    onClick={() => setActiveTab("supplychain")}
                    className={`px-8 py-3 font-semibold ${
                      activeTab === "supplychain"
                        ? "bg-[#8C2221] text-white"
                        : "bg-white text-[#533E3D] border border-gray-300"
                    }`}
                  >
                    Supply Chain
                  </button>
                  <button
                    onClick={() => setActiveTab("finance")}
                    className={`px-8 py-3 font-semibold ${
                      activeTab === "finance"
                        ? "bg-[#8C2221] text-white"
                        : "bg-white text-[#533E3D] border border-gray-300"
                    }`}
                  >
                    Finance
                  </button>
                </div>

                <div className="flex justify-start">
                  <h1 className="p-1 bg-[#926AB0] flex justify-center items-center text-[10px] font-semibold text-[#F3EDED] ">
                    INTERACTIVE-SLIDER
                  </h1>
                </div>

                <div className="flex items-center justify-center">
                  <Compare
                    firstImage={images.left}
                    secondImage={images.right}
                    className="w-full h-[600px]"
                    slideMode="drag"
                    showHandlebar={true}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
