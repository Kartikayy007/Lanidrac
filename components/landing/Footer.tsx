"use client";

export default function Footer() {
  return (
    <section className="flex justify-center bg-[#8C2221]">
      <div className="w-6xl">
        <table className="w-full border-collapse border border-gray-300/30">
          <tbody>
            {/* Footer Details Section */}
            <tr>
              <td className="border border-gray-300/30 p-8">
                <div className="flex justify-start mb-4">
                  <h1 className="p-1 bg-[#809ACF] flex justify-center items-center text-[10px] font-semibold text-[#F3EDED]">
                    FOOTER-DETAILS
                  </h1>
                </div>
                <div className="flex justify-between items-center text-[#F3EDED]">
                  <p className="text-lg">© 2025 Cardinal. All rights reserved.</p>
                  <p className="text-lg">team@trycardinal.ai</p>
                </div>
              </td>
            </tr>

            {/* Footer Image Section */}
            <tr>
              <td className="border border-gray-300/30 p-8">
                <div className="flex justify-start">
                  <h1 className="p-1 bg-[#F96733] flex justify-center items-center text-[10px] font-semibold text-[#F3EDED]">
                    LOGO-XL
                  </h1>
                </div>
                <div className="flex justify-center">
                  <img
                    src="/fotter.avif"
                    alt="Cardinal Logo"
                    className="w-full h-auto mb-12"
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
