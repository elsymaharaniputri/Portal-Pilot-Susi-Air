// services/documentService.ts
import type { Document } from '../types/flight'

interface DocumentRaw {
  documents: Document[]
}

export async function fetchDocuments(): Promise<Document[]> {
  const raw: DocumentRaw = await import('../mocks/mock-documents.json')
  return raw.documents
}

export function getDocumentStatus(
  expiryDate: string,
  today: string
): 'safe' | 'soon' | 'expired' {
  const diff = Math.round(
    (new Date(expiryDate).getTime() - new Date(today).getTime()) / 86_400_000
  )
  if (diff <= 0) return 'expired'
  if (diff <= 30) return 'soon'
  return 'safe'
}
