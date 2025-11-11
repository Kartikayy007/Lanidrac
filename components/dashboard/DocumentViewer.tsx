"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Download, Copy, CheckCircle, Loader2, FileText, Eye, Sparkles, Globe } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { marked } from "marked";
import ExtractTab from "./ExtractTab";


const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api/proxy/api/v1'
  : (process.env.NEXT_PUBLIC_API_URL || 'http://51.20.18.32:8000/api/v1');

interface DocumentDetails {
  id: string;
  job_id: string;
  filename: string;
  original_filename: string;
  status: string;
  processing_mode: "fast" | "smart" | null;
  created_at: string;
  raw_text: string | null;
  markdown_output: string | null;
  json_output: object | null;
  error_message: string | null;
}

interface DocumentViewerProps {
  jobId: string;
}

export default function DocumentViewer({ jobId }: DocumentViewerProps) {
  const [document, setDocument] = useState<DocumentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"markdown" | "html" | "extract">("markdown");
  const [copied, setCopied] = useState(false);
  const [markdownMode, setMarkdownMode] = useState<"raw" | "preview">("preview");
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");

  useEffect(() => {
    fetchDocument();
  }, [jobId]);

  useEffect(() => {
    if (document?.markdown_output) {
      marked.setOptions({
        breaks: true,
        gfm: true,
      });
      const html = marked.parse(document.markdown_output);
      setHtmlContent(html as string);
    }
  }, [document?.markdown_output]);

  const fetchDocument = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("Not authenticated");
      }

      setAuthToken(session.access_token);

      const response = await fetch(`${API_BASE_URL}/documents/document/${jobId}`, {
        headers: {
          "Authorization": `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch document");
      }

      const data = await response.json();
      setDocument(data);
    } catch (err: any) {
      setError(err.message || "Failed to load document");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    const content = activeTab === "html" ? htmlContent : document?.markdown_output || "";
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadHtml = () => {
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${document?.original_filename || "Document"}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      line-height: 1.6;
      color: #333;
    }
    h1, h2, h3, h4, h5, h6 {
      margin-top: 24px;
      margin-bottom: 16px;
      font-weight: 600;
      line-height: 1.25;
    }
    h1 { font-size: 2em; border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
    h2 { font-size: 1.5em; border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
    h3 { font-size: 1.25em; }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 20px 0;
      overflow: hidden;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }
    th {
      background: #f5f5f5;
      font-weight: 600;
    }
    tr:hover {
      background: #f9f9f9;
    }
    code {
      background: #f5f5f5;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: "Courier New", monospace;
      font-size: 0.9em;
    }
    pre {
      background: #f5f5f5;
      padding: 16px;
      border-radius: 6px;
      overflow-x: auto;
    }
    pre code {
      background: none;
      padding: 0;
    }
    ul, ol {
      padding-left: 2em;
      margin: 16px 0;
    }
    li {
      margin: 8px 0;
    }
    blockquote {
      border-left: 4px solid #ddd;
      padding-left: 16px;
      margin: 16px 0;
      color: #666;
      font-style: italic;
    }
    a {
      color: #0366d6;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    img {
      max-width: 100%;
      height: auto;
    }
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = `${document?.original_filename || "document"}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownload = async () => {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("Not authenticated");
      }

      const response = await fetch(
        `${API_BASE_URL}/documents/download/${jobId}/markdown`,
        {
          headers: {
            "Authorization": `Bearer ${session.access_token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = window.document.createElement("a");
      a.href = url;
      a.download = `${document?.original_filename || "document"}.md`;
      window.document.body.appendChild(a);
      a.click();
      window.document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      alert(err.message || "Download failed");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 text-[#8C2221] animate-spin" />
      </div>
    );
  }

  if (error || !document) {
    return (
      <div>
        <Link
          href="/dashboard/files"
          className="inline-flex items-center gap-2 text-[#8C2221] hover:text-[#6d2421] font-semibold mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Files
        </Link>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="font-semibold">{error || "Document not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Link
            href="/dashboard/files"
            className="inline-flex items-center gap-2 text-[#8C2221] hover:text-[#6d2421] font-semibold mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Files
          </Link>
          <h1 className="text-[#533E3D] text-2xl sm:text-4xl font-gaisyr mb-2">
            {document.original_filename}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-[#533E3D]/70 font-semibold">
            <span>
              Mode: {document.processing_mode === "fast" ? "Fast" : "Smart"}
            </span>
            <span>•</span>
            <span>
              Created: {new Date(document.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-300/30">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("markdown")}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === "markdown"
                ? "text-[#8C2221] border-b-2 border-[#8C2221]"
                : "text-[#533E3D]/70 hover:text-[#533E3D]"
            }`}
          >
            Markdown
          </button>
          <button
            onClick={() => setActiveTab("html")}
            className={`px-4 py-2 font-semibold transition-colors flex items-center gap-2 ${
              activeTab === "html"
                ? "text-[#8C2221] border-b-2 border-[#8C2221]"
                : "text-[#533E3D]/70 hover:text-[#533E3D]"
            }`}
          >
            <Globe className="h-4 w-4" />
            HTML
          </button>
          <button
            onClick={() => setActiveTab("extract")}
            className={`px-4 py-2 font-semibold transition-colors flex items-center gap-2 ${
              activeTab === "extract"
                ? "text-[#8C2221] border-b-2 border-[#8C2221]"
                : "text-[#533E3D]/70 hover:text-[#533E3D]"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Extract
          </button>
        </div>
      </div>

      {activeTab === "markdown" && (
        <div className="flex gap-2">
          <Button
            onClick={handleCopy}
            variant="outline"
            className="font-semibold"
          >
            {copied ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>
      )}

      {activeTab === "html" && (
        <div className="flex gap-2">
          <Button
            onClick={handleCopy}
            variant="outline"
            className="font-semibold"
          >
            {copied ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy HTML
              </>
            )}
          </Button>
          <Button
            onClick={handleDownloadHtml}
            variant="outline"
            className="font-semibold"
          >
            <Download className="h-4 w-4 mr-2" />
            Download HTML
          </Button>
        </div>
      )}

      {activeTab === "extract" ? (
        <ExtractTab jobId={jobId} authToken={authToken} />
      ) : activeTab === "html" ? (
        <div className="border border-gray-300/30 rounded-lg overflow-hidden">
          <div className="bg-white p-6">
            {htmlContent ? (
              <div
                className="prose prose-slate max-w-none
                  prose-headings:text-[#533E3D] prose-headings:font-gaisyr
                  prose-p:text-[#533E3D] prose-p:leading-relaxed
                  prose-strong:text-[#533E3D] prose-strong:font-semibold
                  prose-code:text-[#8C2221] prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                  prose-pre:bg-gray-900 prose-pre:text-gray-100
                  prose-a:text-[#8C2221] prose-a:no-underline hover:prose-a:underline
                  prose-table:border-collapse prose-table:w-full
                  prose-th:border prose-th:border-gray-300 prose-th:bg-gray-100 prose-th:p-3 prose-th:text-left prose-th:font-semibold
                  prose-td:border prose-td:border-gray-300 prose-td:p-3
                  prose-ul:list-disc prose-ul:pl-6
                  prose-ol:list-decimal prose-ol:pl-6
                  prose-li:text-[#533E3D]
                  prose-blockquote:border-l-4 prose-blockquote:border-[#8C2221] prose-blockquote:pl-4 prose-blockquote:italic"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            ) : (
              <p className="text-[#533E3D]/70 font-semibold">
                No HTML content available
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="border border-gray-300/30 rounded-lg overflow-hidden">
          <div className="space-y-4">
            {document.markdown_output && (
              <div className="flex items-center gap-2 p-4 border-b border-gray-300/30 bg-gray-50">
                <span className="text-sm text-[#533E3D]/70 font-semibold mr-2">View Mode:</span>
                <Button
                  onClick={() => setMarkdownMode("preview")}
                  variant={markdownMode === "preview" ? "default" : "outline"}
                  size="sm"
                  className={markdownMode === "preview" ? "bg-[#8C2221] hover:bg-[#6d2421]" : ""}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
                <Button
                  onClick={() => setMarkdownMode("raw")}
                  variant={markdownMode === "raw" ? "default" : "outline"}
                  size="sm"
                  className={markdownMode === "raw" ? "bg-[#8C2221] hover:bg-[#6d2421]" : ""}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Raw
                </Button>
              </div>
            )}

            <div className="bg-white p-6">
              {document.markdown_output ? (
                markdownMode === "raw" ? (
                  <pre className="whitespace-pre-wrap text-sm text-[#533E3D] font-mono leading-relaxed">
                    {document.markdown_output}
                  </pre>
                ) : (
                  <div className="prose prose-sm max-w-none
                    prose-headings:text-[#533E3D] prose-headings:font-gaisyr
                    prose-p:text-[#533E3D] prose-p:leading-relaxed
                    prose-strong:text-[#533E3D] prose-strong:font-semibold
                    prose-code:text-[#8C2221] prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                    prose-pre:bg-gray-900 prose-pre:text-gray-100
                    prose-a:text-[#8C2221] prose-a:no-underline hover:prose-a:underline
                    prose-table:border-collapse prose-table:w-full
                    prose-th:border prose-th:border-gray-300 prose-th:bg-gray-100 prose-th:p-2 prose-th:text-left prose-th:font-semibold
                    prose-td:border prose-td:border-gray-300 prose-td:p-2
                    prose-ul:list-disc prose-ul:pl-6
                    prose-ol:list-decimal prose-ol:pl-6
                    prose-li:text-[#533E3D]
                    prose-blockquote:border-l-4 prose-blockquote:border-[#8C2221] prose-blockquote:pl-4 prose-blockquote:italic
                  ">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        input: ({ node, ...props }) => {
                          if (props.type === "checkbox") {
                            return (
                              <input
                                {...props}
                                className="mr-2 accent-[#8C2221] pointer-events-none"
                                disabled
                              />
                            );
                          }
                          return <input {...props} />;
                        },
                        table: ({ node, ...props }) => (
                          <div className="overflow-x-auto my-4">
                            <table {...props} className="min-w-full border border-gray-300" />
                          </div>
                        ),
                      }}
                    >
                      {document.markdown_output}
                    </ReactMarkdown>
                  </div>
                )
              ) : (
                <p className="text-[#533E3D]/70 font-semibold">
                  No markdown output available
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
