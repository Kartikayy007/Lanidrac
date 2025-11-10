"use client";

import { useState, useEffect, useRef } from "react";
import { Upload, Zap, Brain, FileUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { documentsApi } from "@/lib/api/documents";

export default function UploadSection() {
  const [selectedMode, setSelectedMode] = useState<"fast" | "smart">("fast");
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processingStatus, setProcessingStatus] = useState<string>("");
  const pollingInterval = useRef<NodeJS.Timeout | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];

      // Validate file type
      const validTypes = ["application/pdf", "image/png", "image/jpeg", "image/tiff"];
      if (!validTypes.includes(file.type)) {
        setError("Invalid file type. Please upload PDF, PNG, JPG, or TIFF.");
        return;
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("File size exceeds 10MB limit.");
        return;
      }

      setSelectedFile(file);
      setError(null);
      setJobId(null);
      setUploadProgress(0);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      // Validate file type
      const validTypes = ["application/pdf", "image/png", "image/jpeg", "image/tiff"];
      if (!validTypes.includes(file.type)) {
        setError("Invalid file type. Please upload PDF, PNG, JPG, or TIFF.");
        return;
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("File size exceeds 10MB limit.");
        return;
      }

      setSelectedFile(file);
      setError(null);
      setJobId(null);
      setUploadProgress(0);
    }
  };

  useEffect(() => {
    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    };
  }, []);

  const pollStatus = async (uploadedJobId: string) => {
    try {
      const statusResponse = await documentsApi.getStatus(uploadedJobId);
      setProcessingStatus(statusResponse.status);

      if (statusResponse.status === "complete") {
        if (pollingInterval.current) {
          clearInterval(pollingInterval.current);
          pollingInterval.current = null;
        }
        setIsProcessing(false);
        window.location.href = `/dashboard/files/${uploadedJobId}`;
      } else if (statusResponse.status === "failed") {
        if (pollingInterval.current) {
          clearInterval(pollingInterval.current);
          pollingInterval.current = null;
        }
        setIsProcessing(false);
        setError(statusResponse.error_message || "Processing failed");
      }
    } catch (err: any) {
      console.error("Status polling error:", err);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const response = await documentsApi.upload(selectedFile, selectedMode);

      setJobId(response.job_id);
      setUploadProgress(100);
      setIsUploading(false);

      if (response.status === "processing") {
        setIsProcessing(true);
        setProcessingStatus("processing");

        pollingInterval.current = setInterval(() => {
          pollStatus(response.job_id);
        }, 2000);
      } else {
        window.location.href = `/dashboard/files/${response.job_id}`;
      }
    } catch (err: any) {
      setError(err.message || "Upload failed");
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-4">
        <Label className="text-[#533E3D] text-lg font-semibold">Select Processing Mode</Label>
        <RadioGroup
          value={selectedMode}
          onValueChange={(value) => setSelectedMode(value as "fast" | "smart")}
          className="flex gap-4"
          disabled={isProcessing}
        >
          {/* Fast Mode */}
          <Label
            htmlFor="fast"
            className={`flex items-center gap-3 px-6 py-4 border-2 rounded-lg cursor-pointer transition-all flex-1 ${
              selectedMode === "fast"
                ? "border-[#8C2221] bg-[#8C2221]/5"
                : "border-gray-300/30 hover:border-[#8C2221]/50"
            }`}
          >
            <RadioGroupItem value="fast" id="fast" />
            <Zap
              className={`h-6 w-6 ${
                selectedMode === "fast" ? "text-[#8C2221]" : "text-[#533E3D]/50"
              }`}
            />
            <div>
              <h3 className="text-[#533E3D] font-bold">Fast</h3>
              <p className="text-[#533E3D]/70 text-sm font-semibold">
                3-5 seconds
              </p>
            </div>
          </Label>

          {/* Smart Mode */}
          <Label
            htmlFor="smart"
            className={`flex items-center gap-3 px-6 py-4 border-2 rounded-lg cursor-pointer transition-all flex-1 ${
              selectedMode === "smart"
                ? "border-[#8C2221] bg-[#8C2221]/5"
                : "border-gray-300/30 hover:border-[#8C2221]/50"
            }`}
          >
            <RadioGroupItem value="smart" id="smart" />
            <Brain
              className={`h-6 w-6 ${
                selectedMode === "smart" ? "text-[#8C2221]" : "text-[#533E3D]/50"
              }`}
            />
            <div>
              <h3 className="text-[#533E3D] font-bold">Smart</h3>
              <p className="text-[#533E3D]/70 text-sm font-semibold">
                8-12 seconds
              </p>
            </div>
          </Label>
        </RadioGroup>
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
          isDragging
            ? "border-[#8C2221] bg-[#8C2221]/5"
            : "border-gray-300/50 hover:border-[#8C2221]/50"
        }`}
      >
        <input
          type="file"
          id="file-upload"
          accept=".pdf,.png,.jpg,.jpeg,.tiff"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading || isProcessing}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <FileUp className="h-16 w-16 mx-auto mb-4 text-[#533E3D]/50" />
          {selectedFile ? (
            <div>
              <p className="text-[#533E3D] font-bold text-lg mb-2">
                {selectedFile.name}
              </p>
              <p className="text-[#533E3D]/70 text-sm font-semibold">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
              {!jobId && (
                <p className="text-[#8C2221] text-sm font-semibold mt-2">
                  Click to change file
                </p>
              )}
            </div>
          ) : (
            <div>
              <p className="text-[#533E3D] font-bold text-lg mb-2">
                Drop your file here or click to browse
              </p>
              <p className="text-[#533E3D]/70 text-sm font-semibold">
                Supports PDF, PNG, JPG, TIFF (max 10MB)
              </p>
            </div>
          )}
        </label>

        {/* Progress Bar */}
        {isUploading && (
          <div className="mt-4">
            <Progress value={uploadProgress} className="h-2" />
            <p className="text-[#533E3D] text-sm font-semibold mt-2">
              Uploading... {uploadProgress}%
            </p>
          </div>
        )}

        {jobId && !isUploading && (
          <p className="text-green-600 text-sm font-semibold mt-4">
            ✓ Upload complete
          </p>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="font-semibold">{error}</p>
        </div>
      )}

      {/* Upload Button */}
      {selectedFile && !jobId && !isProcessing && (
        <Button
          onClick={handleUpload}
          disabled={isUploading}
          className="w-full bg-[#8C2221] hover:bg-[#6d2421] text-white font-semibold py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-5 w-5 mr-2" />
              Upload & Process ({selectedMode === "fast" ? "Fast" : "Smart"} Mode)
            </>
          )}
        </Button>
      )}

      {/* Processing Status */}
      {isProcessing && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-6 py-4 rounded-lg flex items-center justify-center">
          <Loader2 className="h-5 w-5 mr-3 animate-spin" />
          <div>
            <p className="font-semibold">Processing document...</p>
            <p className="text-sm">This may take {selectedMode === "fast" ? "3-5" : "8-12"} seconds</p>
          </div>
        </div>
      )}
    </div>
  );
}
