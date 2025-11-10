"use client";

import { useEffect, useState } from "react";
import { FileText, Clock, CheckCircle, XCircle, Loader2, Eye, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://51.20.18.32:8000/api/v1";

interface Document {
  id: string;
  job_id: string;
  filename: string;
  original_filename: string;
  status: "uploaded" | "processing" | "complete" | "failed";
  processing_mode: "fast" | "smart" | null;
  created_at: string;
  updated_at: string;
}

export default function RecentUploads() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("Not authenticated");
      }

      const response = await fetch(`${API_BASE_URL}/documents/list`, {
        headers: {
          "Authorization": `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch documents");
      }

      const data = await response.json();
      setDocuments(data.slice(0, 7)); // Only show first 7
    } catch (err: any) {
      setError(err.message || "Failed to load documents");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: Document["status"]) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "processing":
        return <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: Document["status"]) => {
    switch (status) {
      case "complete":
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
    return mode === "fast" ? "Fast" : "Smart";
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="w-full mt-12">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 text-[#8C2221] animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full mt-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (documents.length === 0) {
    return null; // Don't show section if no uploads
  }

  return (
    <div className="w-full mt-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#533E3D] text-2xl font-gaisyr">Recent Uploads</h2>
        <Link
          href="/dashboard/files"
          className="inline-flex items-center gap-2 text-[#8C2221] hover:text-[#6d2421] font-semibold transition-colors"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="border border-gray-300/30 rounded-lg p-4 hover:border-[#8C2221]/50 transition-all bg-white"
          >
            {/* File Info */}
            <div className="flex items-start gap-3 mb-3">
              <FileText className="h-5 w-5 text-[#533E3D]/50 flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <h3 className="text-[#533E3D] font-semibold truncate text-sm">
                  {doc.original_filename}
                </h3>
                <p className="text-[#533E3D]/70 text-xs mt-1">
                  {formatRelativeTime(doc.created_at)}
                </p>
              </div>
            </div>

            {/* Status & Mode */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {getStatusIcon(doc.status)}
                <span className="text-[#533E3D] text-xs font-semibold">
                  {getStatusText(doc.status)}
                </span>
              </div>
              <span className="text-[#533E3D]/70 text-xs font-semibold">
                {getModeText(doc.processing_mode)}
              </span>
            </div>

            {/* Action */}
            {doc.status === "complete" ? (
              <Link
                href={`/dashboard/files/${doc.job_id}`}
                className="inline-flex items-center gap-2 text-[#8C2221] hover:text-[#6d2421] text-sm font-semibold transition-colors"
              >
                <Eye className="h-4 w-4" />
                View Results
              </Link>
            ) : doc.status === "processing" ? (
              <span className="text-[#533E3D]/50 text-sm font-semibold">
                Processing...
              </span>
            ) : (
              <span className="text-[#533E3D]/50 text-sm font-semibold">-</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
