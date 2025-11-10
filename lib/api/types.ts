export type DocumentStatus = 'uploaded' | 'processing' | 'textract_complete' | 'completed' | 'failed'
export type ProcessingMode = 'fast' | 'smart'

export interface Document {
  id: string
  job_id: string
  user_id: string
  filename: string
  original_filename: string
  file_path: string
  file_size_bytes: number
  mime_type: string
  status: DocumentStatus
  processing_mode: ProcessingMode | null
  created_at: string
  updated_at: string
  raw_text: string | null
  markdown_output: string | null
  json_output: Record<string, any> | null
  bbox_image_url: string | null
  textract_response: Record<string, any> | null
  gemini_response: Record<string, any> | null
  error_message: string | null
}

export interface UploadResponse {
  job_id: string
  filename: string
  original_filename: string
  file_size: number
  mime_type: string
  message: string
}

export interface ProcessResponse {
  job_id: string
  status: string
  pages_processed: number
  processing_mode: ProcessingMode
  summary: {
    total_text_length: number
    total_tables: number
    total_forms: number
    total_checkboxes: number
  }
  validation?: {
    textract_score: number
    gemini_score: number
    winner: 'textract' | 'gemini'
  }
}

export interface ExtractResponse {
  job_id: string
  extracted_data: Record<string, any>
  confidence: number
  validation_results: {
    total_fields: number
    valid_fields: number
    invalid_fields: number
    missing_fields: number
    extra_fields: number
    type_errors: Array<{
      path: string
      expected_type: string
      actual_type: string
      value: string
    }>
  }
}

export interface DocumentListResponse {
  documents: Document[]
  total: number
}
