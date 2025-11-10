"use client";

import {
  Scissors,
  Database,
  FileText,
  Grid3x3,
  Clipboard,
  Image,
  PenTool,
  HardDrive,
  CheckSquare,
  Table,
  Globe,
  ScanLine
} from "lucide-react";

export default function UseCases() {
  return (
    <section className="flex justify-center bg-[#8C2221]">
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
                <div className="text-center py-2 border border-gray-300/30 bg-[#f3eded17]">
                  <h1 className="text-[#F3EDED] text-6xl mb-4 font-gaisyr">
                    Use Cases
                  </h1>
                  <p className="text-[#F3EDED] text-lg">
                    We handle the hardest pdfs and images— with bounding boxes you can trust, HIPAA compliance, and on-prem options.
                  </p>
                </div>
              </td>
            </tr>

            <tr>
              <td className="border border-gray-300/30 p-8 align-bottom">
                <div className="flex justify-start">
                  <h1 className="p-1 bg-[#926AB0] flex justify-center items-center text-[10px] font-semibold text-[#F3EDED] ">
                    FEATURE-BLOCK
                  </h1>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-[#FCF7F5] p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-[#6B8CB8] rounded flex items-center justify-center flex-shrink-0">
                        <Scissors className="text-white" size={24} />
                      </div>
                      <h3 className="text-[#1A1A1A] text-3xl font-gaisyr">Split</h3>
                    </div>
                    <p className="text-[#533E3D] text-lg font-semibold mb-6">
                      Classify pages and break apart multi-page files using natural-language queries.
                    </p>
                    <button className="w-full bg-[#8C2221] text-white py-3 font-semibold hover:bg-[#F96733] transition-colors cursor-pointer">
                      Explore
                    </button>
                  </div>

                  <div className="bg-[#FCF7F5] p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-[#F96733] rounded flex items-center justify-center flex-shrink-0">
                        <Database className="text-white" size={24} />
                      </div>
                      <h3 className="text-[#1A1A1A] text-3xl font-gaisyr">Extract</h3>
                    </div>
                    <p className="text-[#533E3D] text-lg font-semibold mb-6">
                      Enter your schema, get a custom output. Extract anything from the document.
                    </p>
                    <button className="w-full bg-[#8C2221] text-white py-3 font-semibold hover:bg-[#F96733] transition-colors cursor-pointer">
                      Explore
                    </button>
                  </div>

                  <div className="bg-[#FCF7F5] p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-[#867673] rounded flex items-center justify-center flex-shrink-0">
                        <FileText className="text-white" size={24} />
                      </div>
                      <h3 className="text-[#1A1A1A] text-3xl  font-gaisyr">Markdown</h3>
                    </div>
                    <p className="text-[#533E3D] text-lg font-semibold mb-6">
                      Get clean, readable markdown text output that preserves layout.
                    </p>
                    <button className="w-full bg-[#8C2221] text-white py-3 font-semibold hover:bg-[#F96733] transition-colors cursor-pointer">
                      Explore
                    </button>
                  </div>

                  <div className="bg-[#FCF7F5] p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-[#926AB0] rounded flex items-center justify-center flex-shrink-0">
                        <Grid3x3 className="text-white" size={24} />
                      </div>
                      <h3 className="text-[#1A1A1A] text-3xl font-gaisyr">RAG</h3>
                    </div>
                    <p className="text-[#1A1A1A] text-lg font-semibold mb-6">
                      Chunk intelligently for retrieval and embedding workflows. Bounding boxes included.
                    </p>
                    <button className="w-full bg-[#8C2221] text-white py-3 font-semibold hover:bg-[#F96733] transition-colors cursor-pointer">
                      Explore
                    </button>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td className="border border-gray-300/30 p-8">
                <h1 className="text-[#F3EDED] text-4xl text-center mb-6 font-gaisyr">
                  Features
                </h1>
                <div className="flex justify-start">
                  <h1 className="p-1 bg-[#809ACF] flex justify-center items-center text-[10px] font-semibold text-[#F3EDED]">
                    FEATURE-GRID
                  </h1>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-8">
                  <div className="bg-[#FCF7F5] p-6 flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#F3E5E5] rounded flex items-center justify-center flex-shrink-0">
                      <Clipboard className="text-[#C1554D]" size={20} />
                    </div>
                    <div>
                      <h4 className="text-[#1A1A1A] text-lg font-bold mb-1">Faxed Forms</h4>
                      <p className="text-[#999] text-sm">Scan all formats</p>
                    </div>
                  </div>

                  <div className="bg-[#FCF7F5] p-6 flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#FFE8D9] rounded flex items-center justify-center flex-shrink-0">
                      <Image className="text-[#F96733]" size={20} />
                    </div>
                    <div>
                      <h4 className="text-[#1A1A1A] text-lg font-bold mb-1">Diagram Metadata</h4>
                      <p className="text-[#999] text-sm">Auto classify</p>
                    </div>
                  </div>

                  <div className="bg-[#FCF7F5] p-6 flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#EDE5F5] rounded flex items-center justify-center flex-shrink-0">
                      <PenTool className="text-[#9B7EBD]" size={20} />
                    </div>
                    <div>
                      <h4 className="text-[#1A1A1A] text-lg font-bold mb-1">Signature Detection</h4>
                      <p className="text-[#999] text-sm">Forensic accuracy</p>
                    </div>
                  </div>

                  <div className="bg-[#FCF7F5] p-6 flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#D9E8F5] rounded flex items-center justify-center flex-shrink-0">
                      <HardDrive className="text-[#6B8CB8]" size={20} />
                    </div>
                    <div>
                      <h4 className="text-[#1A1A1A] text-lg font-bold mb-1">Source Citations</h4>
                      <p className="text-[#999] text-sm">Full extraction</p>
                    </div>
                  </div>

                  <div className="bg-[#FCF7F5] p-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#EDE5F5] rounded flex items-center justify-center flex-shrink-0">
                      <CheckSquare className="text-[#9B7EBD]" size={20} />
                    </div>
                    <div>
                      <h4 className="text-[#1A1A1A] text-lg font-bold mb-1">Checkmarks/Circles</h4>
                      <p className="text-[#999] text-sm">Scan all formats</p>
                    </div>
                  </div>

                  <div className="bg-[#FCF7F5] p-6 flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#D9E8F5] rounded flex items-center justify-center flex-shrink-0">
                      <Table className="text-[#6B8CB8]" size={20} />
                    </div>
                    <div>
                      <h4 className="text-[#1A1A1A] text-lg font-bold mb-1">Complex tables</h4>
                      <p className="text-[#999] text-sm">PDF-converted csvs</p>
                    </div>
                  </div>

                  <div className="bg-[#FCF7F5] p-6 flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#FFE8E8] rounded flex items-center justify-center flex-shrink-0">
                      <Globe className="text-[#C1554D]" size={20} />
                    </div>
                    <div>
                      <h4 className="text-[#1A1A1A] text-lg font-bold mb-1">Multilingual</h4>
                      <p className="text-[#999] text-sm">100+ languages</p>
                    </div>
                  </div>

                  <div className="bg-[#FCF7F5] p-6 flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#FFE8D9] rounded flex items-center justify-center flex-shrink-0">
                      <ScanLine className="text-[#F96733]" size={20} />
                    </div>
                    <div>
                      <h4 className="text-[#1A1A1A] text-lg font-bold mb-1">Scanned Docs</h4>
                      <p className="text-[#999] text-sm">Receipts, invoices, etc.</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button className="bg-[#F4DED9] text-[#1A1A1A] px-8 py-3 font-semibold text-lg">
                    Try it now
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
