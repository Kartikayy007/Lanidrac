"use client";

import { useEffect, useState, useRef } from "react";
import { FileText, Clock, CheckCircle, XCircle, Loader2, Eye } from "lucide-react";
import { documentsApi } from "@/lib/api/documents";
import type { Document } from "@/lib/api/types";
import Link from "next/link";

export default function FilesList() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pollingInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchDocuments();

    pollingInterval.current = setInterval(() => {
      fetchDocuments();
    }, 5000);

    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    };
  }, []);

  const fetchDocuments = async () => {
    try {
      if (documents.length === 0) {
        setIsLoading(true);
      }
      setError(null);

      const data = await documentsApi.listDocuments();
      setDocuments(data);
    } catch (err: any) {
      setError(err.message || "Failed to load documents");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: Document["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "processing":
        return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: Document["status"]) => {
    switch (status) {
      case "completed":
        return "Complete";
      case "processing":
        return "Processing";
      case "failed":
        return "Failed";
      default:
        return "Uploaded";
    }
  };

  const getModeText = (mode: Document["processing_mode"]) => {
    if (!mode) return "-";
    return mode === "fast" ? "Fast (3-5s)" : "Smart (8-12s)";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 text-[#8C2221] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <p className="font-semibold">{error}</p>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="bg-[#f3eded17] p-6 sm:p-12 border border-gray-300/30 text-center">
        <FileText className="h-16 w-16 mx-auto mb-4 text-[#533E3D]/50" />
        <h2 className="text-[#533E3D] text-2xl sm:text-3xl font-gaisyr mb-4">
          No Files Yet
        </h2>
        <p className="text-[#533E3D] text-base sm:text-lg mb-6">
          Upload your first document to get started
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-[#8C2221] text-white px-6 py-3 font-semibold hover:bg-[#6d2421] transition-colors"
        >
          Upload Document
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300/30">
        <thead className="bg-[#8C2221]/5">
          <tr>
            <th className="border border-gray-300/30 px-4 py-3 text-left text-[#533E3D] font-semibold">
              File Name
            </th>
            <th className="border border-gray-300/30 px-4 py-3 text-left text-[#533E3D] font-semibold">
              Status
            </th>
            <th className="border border-gray-300/30 px-4 py-3 text-left text-[#533E3D] font-semibold">
              Mode
            </th>
            <th className="border border-gray-300/30 px-4 py-3 text-left text-[#533E3D] font-semibold">
              Created
            </th>
            <th className="border border-gray-300/30 px-4 py-3 text-left text-[#533E3D] font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id} className="hover:bg-[#8C2221]/5 transition-colors cursour-pointer">
              <td className="border border-gray-300/30 px-4 py-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#533E3D]/50" />
                  <span className="text-[#533E3D] font-semibold">
                    {doc.original_filename}
                  </span>
                </div>
              </td>
              <td className="border border-gray-300/30 px-4 py-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(doc.status)}
                  <span className="text-[#533E3D] font-semibold">
                    {getStatusText(doc.status)}
                  </span>
                </div>
              </td>
              <td className="border border-gray-300/30 px-4 py-3">
                <span className="text-[#533E3D] font-semibold">
                  {getModeText(doc.processing_mode)}
                </span>
              </td>
              <td className="border border-gray-300/30 px-4 py-3">
                <span className="text-[#533E3D]/70 text-sm font-semibold">
                  {formatDate(doc.created_at)}
                </span>
              </td>
              <td className="border border-gray-300/30 px-4 py-3">
                {doc.status === "completed" ? (
                  <Link
                    href={`/dashboard/files/${doc.job_id}`}
                    className="inline-flex items-center gap-2 text-[#8C2221] hover:text-[#6d2421] font-semibold transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Link>
                ) : doc.status === "processing" ? (
                  <span className="text-[#533E3D]/50 text-sm font-semibold">
                    Processing...
                  </span>
                ) : (
                  <span className="text-[#533E3D]/50 text-sm font-semibold">
                    -
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
