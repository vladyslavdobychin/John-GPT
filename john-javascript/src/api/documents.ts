import axios from "axios";
import { Document } from "../types";

const getAllDocuments = async (): Promise<Document[]> => {
  const response = await axios.get<Document[]>('/api/documents');
  if (!Array.isArray(response.data)) {
    throw new Error('Invalid response format');
  }
  return response.data;
}

const updateDocument = async (document: Partial<Document>): Promise<Document> => {
  const response = await axios.put(`/api/documents/${document.id}`, document);
  return response.data;
}

const deleteDocument = async (id: string): Promise<void> => {
  await axios.delete(`/api/documents/${id}`);
}

const createDocument = async (document: Omit<Document, 'id'>): Promise<Document> => {
  const response = await axios.post('/api/documents', document);
  return response.data;
}

export const documentsApi = {
  getAllDocuments,
  updateDocument,
  deleteDocument,
  createDocument,
}