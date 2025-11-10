import { apiClient } from './client'
import type {
  Document,
  UploadResponse,
  ProcessResponse,
  ExtractResponse,
  DocumentListResponse,
  DocumentStatusResponse,
  ProcessingMode,
} from './types'

export const documentsApi = {
  async upload(file: File, mode?: ProcessingMode): Promise<UploadResponse> {
    const formData = new FormData()
    formData.append('file', file)

    const url = mode ? `/documents/upload?mode=${mode}` : '/documents/upload'
    const response = await apiClient.post<UploadResponse>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  },

  async process(jobId: string, mode: ProcessingMode = 'fast'): Promise<ProcessResponse> {
    const response = await apiClient.post<ProcessResponse>(
      `/documents/process/${jobId}?mode=${mode}`
    )

    return response.data
  },

  async getStatus(jobId: string): Promise<DocumentStatusResponse> {
    const response = await apiClient.get<DocumentStatusResponse>(`/documents/status/${jobId}`)

    return response.data
  },

  async getDocument(jobId: string): Promise<Document> {
    const response = await apiClient.get<Document>(`/documents/document/${jobId}`)

    return response.data
  },

  async listDocuments(): Promise<DocumentListResponse> {
    const response = await apiClient.get<Document[]>('/documents/list')

    // Backend returns array directly, wrap it for frontend compatibility
    return {
      documents: response.data || [],
      total: response.data?.length || 0
    }
  },

  async getMarkdown(jobId: string): Promise<{ markdown: string; source: string }> {
    const response = await apiClient.get<{ markdown: string; source: string }>(
      `/documents/markdown/${jobId}`
    )

    return response.data
  },

  async downloadMarkdown(jobId: string): Promise<Blob> {
    const response = await apiClient.get(`/documents/download/${jobId}/markdown`, {
      responseType: 'blob',
    })

    return response.data
  },

  async downloadJson(jobId: string): Promise<Blob> {
    const response = await apiClient.get(`/documents/download/${jobId}/json`, {
      responseType: 'blob',
    })

    return response.data
  },

  async extract(jobId: string, schema: Record<string, any>): Promise<ExtractResponse> {
    const response = await apiClient.post<ExtractResponse>(
      `/documents/extract/${jobId}`,
      { schema }
    )

    return response.data
  },
}
