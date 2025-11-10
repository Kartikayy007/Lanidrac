'use client'

import { useState, useCallback } from 'react'
import { documentsApi } from '@/lib/api'
import type {
  Document,
  UploadResponse,
  ProcessResponse,
  ExtractResponse,
  ProcessingMode,
} from '@/lib/api/types'

export function useDocumentUpload() {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const upload = useCallback(async (file: File): Promise<UploadResponse | null> => {
    try {
      setUploading(true)
      setError(null)
      const response = await documentsApi.upload(file)
      return response
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Upload failed')
      return null
    } finally {
      setUploading(false)
    }
  }, [])

  return { upload, uploading, error }
}

export function useDocumentProcess() {
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const process = useCallback(
    async (jobId: string, mode: ProcessingMode = 'fast'): Promise<ProcessResponse | null> => {
      try {
        setProcessing(true)
        setError(null)
        const response = await documentsApi.process(jobId, mode)
        return response
      } catch (err: any) {
        setError(err.response?.data?.detail || err.message || 'Processing failed')
        return null
      } finally {
        setProcessing(false)
      }
    },
    []
  )

  return { process, processing, error }
}

export function useDocument(jobId: string | null) {
  const [document, setDocument] = useState<Document | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDocument = useCallback(async () => {
    if (!jobId) return

    try {
      setLoading(true)
      setError(null)
      const response = await documentsApi.getDocument(jobId)
      setDocument(response)
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Failed to fetch document')
    } finally {
      setLoading(false)
    }
  }, [jobId])

  return { document, loading, error, refetch: fetchDocument }
}

export function useDocumentList() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await documentsApi.listDocuments()
      setDocuments(response.documents)
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Failed to fetch documents')
    } finally {
      setLoading(false)
    }
  }, [])

  return { documents, loading, error, refetch: fetchDocuments }
}

export function useDocumentExtract() {
  const [extracting, setExtracting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const extract = useCallback(
    async (jobId: string, schema: Record<string, any>): Promise<ExtractResponse | null> => {
      try {
        setExtracting(true)
        setError(null)
        const response = await documentsApi.extract(jobId, schema)
        return response
      } catch (err: any) {
        setError(err.response?.data?.detail || err.message || 'Extraction failed')
        return null
      } finally {
        setExtracting(false)
      }
    },
    []
  )

  return { extract, extracting, error }
}

export function useDocumentDownload() {
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const downloadMarkdown = useCallback(async (jobId: string, filename: string) => {
    try {
      setDownloading(true)
      setError(null)
      const blob = await documentsApi.downloadMarkdown(jobId)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Download failed')
    } finally {
      setDownloading(false)
    }
  }, [])

  const downloadJson = useCallback(async (jobId: string, filename: string) => {
    try {
      setDownloading(true)
      setError(null)
      const blob = await documentsApi.downloadJson(jobId)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Download failed')
    } finally {
      setDownloading(false)
    }
  }, [])

  return { downloadMarkdown, downloadJson, downloading, error }
}
