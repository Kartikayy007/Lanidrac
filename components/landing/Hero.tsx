"use client";

export default function Hero() {
  return (
    <section className="flex justify-center items-end mt-20 -z-10">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="w-6xl bg-[#FCF7F6] shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1),10px_0_15px_-3px_rgba(0,0,0,0.1),-10px_0_15px_-3px_rgba(0,0,0,0.1)] animate-[fadeInUp_0.2s_ease-out]">
        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            <tr>
              <td className="border border-gray-300 h-20 w-32"></td>
              <td className="border border-gray-300 h-20">
                <div className="flex justify-start items-end h-full">
                  <h1 className="p-1 bg-[#809ACF] flex justify-center items-center text-[10px] font-semibold">
                    HEADER
                  </h1>
                </div>
              </td>
              <td className="border border-gray-300 h-20 w-72">
                <div className="flex justify-start items-end h-full">
                  <h1 className="p-1 bg-[#F96733] flex justify-center items-center text-[10px] font-semibold text-white">
                    AI SUMMARY
                  </h1>
                </div>
              </td>
            </tr>

            <tr>
              <td className="border border-gray-300 w-32"></td>
              <td className="bg-[#F3EDED] text-[#533E3D] text-7xl mb-3 font border border-gray-300">
                <h1 className="font-gaisyr">Next-Gen Document</h1>
                <h1 className="font-gaisyr">Processing</h1>
              </td>
              <td className="border border-gray-300 w-72 align-top">
                <div className="border border-gray-300 text-[10px] p-2 text-[#533e3d59]">
                  <h1>ONE API FOR SPLITTING, EXTRACTING, AND STRUCTURING MESSY DOCUMENTS.</h1>
                </div>
              </td>
            </tr>

            <tr className="h-8">
              <td className="border border-gray-300 w-32"></td>
              <td className="border border-gray-300 align-bottom">
                <div className="flex justify-start items-center h-full">
                  <h1 className="p-1 bg-[#809ACF] flex justify-center items-center text-[10px] font-semibold text-[#F3EDED]">
                    DESCRIPTION
                  </h1>
                </div>
              </td>
              <td className="border border-gray-300 w-72"></td>
            </tr>

            <tr className="h-32">
              <td className="border border-gray-300 w-32"></td>
              <td className="border border-gray-300 align-top">
                <div className="bg-[#F3EDED] text-xl px-4 py-2">
                  <h1 className="text-[#533E3D]">
                    Go beyond OCR — build and run your entire document workflow with one API.
                  </h1>
                </div>
              </td>
              <td className="border border-gray-300 w-72 align-top">
                <div className="p-2 text-[10px] text-[#533e3d59]">
                  <h1>PURPOSE-BUILT FOR MESSY, REAL-WORLD DOCUMENTS ACROSS VERTICALS.</h1>
                </div>
              </td>
            </tr>

            <tr className="h-8">
              <td className="border border-gray-300 w-32"></td>
              <td className="border border-gray-300 align-bottom">
                <div className="flex justify-start items-center h-full">
                  <h1 className="p-1 bg-[#A79A98] flex justify-center items-center text-[10px] font-semibold text-[#F3EDED]">
                    BUTTON
                  </h1>
                </div>
              </td>
              <td className="border border-gray-300 w-72"></td>
            </tr>

            <tr>
              <td className="border border-gray-300 w-32"></td>
              <td className="border border-gray-300">
                <div className="text-xl flex justify-start gap-4">
                  <button className="bg-[#8C2221] text-[#F3EDED] p-3 cursor-pointer font-semibold">
                    Try it now.
                  </button>
                  <button className="text-[#533E3D] bg-transparent cursor-pointer font-semibold border border-gray-300 p-3">
                    Contact us
                  </button>
                </div>
              </td>
              <td className="border border-gray-300 w-72 align-top">
                <div className="p-2 text-[10px] text-[#533e3d59]">
                  <h1>TRY THE PLATFORM OR REACH OUT TO THE TEAM</h1>
                </div>
              </td>
            </tr>

            <tr>
              <td className="border border-gray-300 h-20 w-32"></td>
              <td className="border border-gray-300 h-20"></td>
              <td className="border border-gray-300 h-20 w-72"></td>
            </tr>

            <tr>
              <td className="border border-gray-300 h-20 w-32"></td>
              <td className="border bg-[#F3EDED] border-gray-300 h-20"></td>
              <td className="border border-gray-300 h-20 w-48"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
