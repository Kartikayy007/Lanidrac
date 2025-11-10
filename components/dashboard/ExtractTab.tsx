"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertCircle,
  CheckCircle,
  Download,
  FileJson,
  Loader2,
  Sparkles,
  Copy,
  Code,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";


const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api/proxy'
  : (process.env.NEXT_PUBLIC_API_URL || '');

interface ExtractTabProps {
  jobId: string;
  authToken: string | null;
}

interface SchemaExample {
  name: string;
  description: string;
  schema: any;
}

interface ExtractResponse {
  job_id: string;
  extracted_data: any;
  confidence: number;
  status: string;
  message?: string;
}

const SCHEMA_EXAMPLES: SchemaExample[] = [
  {
    name: "Invoice",
    description: "Extract data from an invoice",
    schema: {
      invoice_number: "string",
      date: "date",
      vendor: {
        name: "string",
        address: "string",
      },
      items: [
        {
          description: "string",
          quantity: "number",
          price: "number",
        },
      ],
      subtotal: "number",
      tax: "number",
      total: "number",
    },
  },
  {
    name: "Receipt",
    description: "Extract data from a restaurant receipt",
    schema: {
      restaurant_name: "string",
      date: "date",
      time: "string",
      items: [
        {
          name: "string",
          price: "number",
        },
      ],
      subtotal: "number",
      tax: "number",
      tip: "number",
      total: "number",
    },
  },
  {
    name: "Medical Form",
    description: "Extract data from a medical intake form",
    schema: {
      patient: {
        name: "string",
        date_of_birth: "date",
        gender: "string",
      },
      symptoms: [
        {
          symptom: "string",
          severity: "string",
        },
      ],
      medications: [
        {
          name: "string",
          dosage: "string",
        },
      ],
      allergies: ["string"],
      insurance: {
        provider: "string",
        policy_number: "string",
      },
    },
  },
];

const ExtractTab: React.FC<ExtractTabProps> = ({ jobId, authToken }) => {
  const [schema, setSchema] = useState<string>("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [selectedExample, setSelectedExample] = useState<string>("");

  const loadExample = (exampleName: string) => {
    const example = SCHEMA_EXAMPLES.find((ex) => ex.name === exampleName);
    if (example) {
      setSchema(JSON.stringify(example.schema, null, 2));
      setSelectedExample(exampleName);
    }
  };

  const validateSchema = () => {
    try {
      JSON.parse(schema);
      return true;
    } catch {
      setError("Invalid JSON schema. Please check your syntax.");
      return false;
    }
  };

  const handleExtract = async () => {
    setError("");
    setExtractedData(null);
    setConfidence(null);

    if (!schema.trim()) {
      setError("Please provide a schema");
      return;
    }

    if (!validateSchema()) {
      return;
    }

    setIsExtracting(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/documents/extract/${jobId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            schema: JSON.parse(schema),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail?.message ||
          errorData.detail ||
          "Extraction failed"
        );
      }

      const data: ExtractResponse = await response.json();
      setExtractedData(data.extracted_data);
      setConfidence(data.confidence);
      toast.success(data.message || "Extraction completed successfully");
    } catch (err: any) {
      setError(err.message || "Failed to extract data");
      toast.error(err.message || "Extraction failed");
    } finally {
      setIsExtracting(false);
    }
  };

  const downloadJson = () => {
    if (!extractedData) return;

    const blob = new Blob([JSON.stringify(extractedData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `extracted_${jobId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    if (!extractedData) return;

    navigator.clipboard.writeText(JSON.stringify(extractedData, null, 2));
    toast.success("Copied to clipboard");
  };

  const getConfidenceColor = (conf: number) => {
    if (conf >= 0.9) return "text-green-600";
    if (conf >= 0.7) return "text-yellow-600";
    return "text-red-600";
  };

  const getConfidenceIcon = (conf: number) => {
    if (conf >= 0.7) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
    return <AlertCircle className="w-5 h-5 text-yellow-600" />;
  };

  return (
    <div className="space-y-4">
      {/* Schema Input Section */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Code className="w-5 h-5" />
                Define Your Schema
              </h3>
              <Select
                value={selectedExample}
                onValueChange={loadExample}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Load example..." />
                </SelectTrigger>
                <SelectContent>
                  {SCHEMA_EXAMPLES.map((example) => (
                    <SelectItem key={example.name} value={example.name}>
                      {example.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="relative">
              <textarea
                value={schema}
                onChange={(e) => {
                  setSchema(e.target.value);
                  setSelectedExample("");
                }}
                placeholder={`{
  "invoice_number": "string",
  "date": "date",
  "total": "number",
  "items": [{
    "description": "string",
    "price": "number"
  }]
}`}
                className="w-full h-64 p-4 font-mono text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C2221]"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Supported types: string, number, integer, boolean, date, datetime, array, object
              </div>
              <Button
                onClick={handleExtract}
                disabled={isExtracting || !schema.trim()}
                className="bg-[#8C2221] hover:bg-[#7a1e1d] text-white"
              >
                {isExtracting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Extracting...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Extract Data
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {extractedData && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Confidence Score */}
              {confidence !== null && (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getConfidenceIcon(confidence)}
                    <div>
                      <div className="font-semibold">Confidence Score</div>
                      <div className="text-sm text-gray-600">
                        Based on validation and cross-verification
                      </div>
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${getConfidenceColor(confidence)}`}>
                    {(confidence * 100).toFixed(1)}%
                  </div>
                </div>
              )}

              {/* Extracted Data */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold flex items-center gap-2">
                    <FileJson className="w-4 h-4" />
                    Extracted Data
                  </h4>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadJson}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto max-h-96">
                  <pre className="text-sm">
                    <code>{JSON.stringify(extractedData, null, 2)}</code>
                  </pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!extractedData && !error && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Define a JSON schema above to extract structured data from your document.
            The AI will analyze the document image and fill in the values according to your schema.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ExtractTab;