"use client";

import Link from "next/link";

export default function AboutUs() {
  return (
    <section className="flex justify-center px-4 sm:px-0">
      <div className="w-full max-w-6xl">
        <table className="w-full border-collapse border border-gray-300/30">
          <tbody>
            {/* Header Section */}
            <tr>
              <td className="border border-gray-300/30 px-4 sm:px-8 lg:px-18 py-6 sm:py-8 align-bottom">
                <div className="flex justify-start">
                  <h1 className="p-1 bg-[#809ACF] flex justify-center items-center text-[8px] sm:text-[10px] font-semibold text-[#F3EDED]">
                    HEADER
                  </h1>
                </div>
                <div className="text-center py-2 bg-[#e0dddd]">
                  <h1 className="text-[#533E3D] text-3xl sm:text-5xl lg:text-6xl mb-2 sm:mb-4 font-gaisyr">
                    About Us
                  </h1>
                  <p className="text-[#533E3D] text-sm sm:text-lg font-semibold px-2">
                    Why we're building Cardinal
                  </p>
                </div>
              </td>
            </tr>

            {/* Story Section */}
            <tr>
              <td className="border border-gray-300/30 p-4 sm:p-8">
                <div className="flex justify-start">
                  <h1 className="p-1 bg-[#926AB0] flex justify-center items-center text-[8px] sm:text-[10px] font-semibold text-[#F3EDED]">
                    FEATURE-BLOCK
                  </h1>
                </div>
                <div className="bg-[#8C2221] font-semibold p-6 sm:p-12 border border-gray-300/30">
                  <div className="text-[#F3EDED] space-y-4 sm:space-y-6">
                    <p className="text-sm sm:text-lg leading-relaxed">
                      Hi all - Devi, Jianna and <span className="text-[#F96733]">Kartikay</span> here! We first met in 2023 and built our first company Leafpress (YC S23) together.
                      an energy management platform. At its core, Leafpress parsed utility data for customers - and the hardest
                      part, by far, was processing utility bills. <span className="text-[#F96733]">Kartikay</span> joined later after he made a whole MVP of Cardinal in 2025.
                    </p>

                    <p className="text-sm sm:text-lg leading-relaxed">
                      Some were handwritten, others covered in annotations, and nearly all of them were formatted completely
                      differently. Every line item mattered, and preserving the structure was critical - otherwise, account numbers
                      wouldn't match usage data, and things would fall apart.
                    </p>

                    <p className="text-sm sm:text-lg leading-relaxed">
                      We spent countless hours manually reading bills, trying every solution on the market. In the end, we cobbled
                      together a multi-step, human-in-the-loop pipeline... and still got inaccurate results.
                    </p>

                    <p className="text-sm sm:text-lg leading-relaxed">
                      So we built the tool we wish we had: Cardinal - a new OCR engine born from those painful lessons. It's
                      everything we needed back then, and everything we couldn't find anywhere else. For healthcare companies,
                      where fax is the most common means of communication, having a good document intelligence engine is
                      critical.
                    </p>

                    <p className="text-sm sm:text-lg leading-relaxed">
                      We're excited for you to give it a try - and we'd love to get your feedback! Email us at devi@trycardinal.ai or
                      jianna@trycardinal.ai
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mt-6 sm:mt-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-full">
                          <img src="/devi.avif" alt="Devi" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <div className="text-xl sm:text-2xl">Devi</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-full">
                          <img src="/jinna.avif" alt="Jianna" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <div className="text-xl sm:text-2xl">Jianna</div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-full">
                          <img src="/kartikay.png" alt="Kartikay" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <div className="text-xl sm:text-2xl">Kartikay</div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>

            {/* CTA Section */}
            <tr>
              <td className="border border-gray-300/30 p-4 sm:p-8">
                <div className="flex justify-start">
                  <h1 className="p-1 bg-[#809ACF] flex justify-center items-center text-[8px] sm:text-[10px] font-semibold text-[#F3EDED]">
                    CTA-BLOCK
                  </h1>
                </div>
                <div className="bg-[#B7C2DD] p-6 sm:p-12 text-center border border-gray-300/30">
                  <h2 className="text-[#533E3D] text-2xl sm:text-4xl mb-6 sm:mb-8 font-gaisyr">
                    Want to chat about your document processing challenges?
                  </h2>
                  <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                    <Link href="/signup" className="bg-[#8C2221] text-white px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold hover:bg-[#6d2421] transition-colors">
                      Try it now
                    </Link>
                    <button className="bg-white text-[#533E3D] px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold border border-gray-300 hover:bg-gray-100 transition-colors">
                      Contact us
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
