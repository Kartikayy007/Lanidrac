"use client";

import { Database, Shield, Lock } from "lucide-react";

export default function Security() {
  return (
    <section className="flex justify-center bg-[#533E3D] px-4 sm:px-0">
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
                    Enterprise-Grade Security
                  </h1>
                  <p className="text-[#F3EDED] text-sm sm:text-lg font-semibold px-2">
                    Security isn't an afterthought, it's our foundation.
                  </p>
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
                  <div className="bg-[#6B5B5A] p-8 border border-gray-300/30">
                    <div className="w-12 h-12 bg-[#F3EDED] rounded flex items-center justify-center mb-6">
                      <Database className="text-[#533E3D]" size={24} />
                    </div>
                    <h3 className="text-[#F3EDED] text-2xl font-bold mb-4">
                      HIPAA +SOC2 Compliant
                    </h3>
                    <p className="text-[#F3EDED] text-lg">
                      We are HIPAA and Soc2 compliant and can sign BAA's.
                    </p>
                  </div>

                  <div className="bg-[#6B5B5A] p-8 border border-gray-300/30">
                    <div className="w-12 h-12 bg-[#F3EDED] rounded flex items-center justify-center mb-6">
                      <Shield className="text-[#533E3D]" size={24} />
                    </div>
                    <h3 className="text-[#F3EDED] text-2xl font-bold mb-4">
                      Zero Data Retention
                    </h3>
                    <p className="text-[#F3EDED] text-lg">
                      We do not store any data passed through our system.
                    </p>
                  </div>

                  <div className="bg-[#6B5B5A] p-8 border border-gray-300/30">
                    <div className="w-12 h-12 bg-[#F3EDED] rounded flex items-center justify-center mb-6">
                      <Lock className="text-[#533E3D]" size={24} />
                    </div>
                    <h3 className="text-[#F3EDED] text-2xl font-bold mb-4">
                      Enterprise Security
                    </h3>
                    <p className="text-[#F3EDED] text-lg">
                      End-to-end encryption, RBAC, audit logging.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button className="bg-[#F4DED9] text-[#533E3D] px-8 py-3 font-semibold text-lg hover:bg-[#E5E5E5] transition-colors">
                    Contact us
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
