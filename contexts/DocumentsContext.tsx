'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Document } from '@/types';

interface DocumentsContextType {
  documents: Document[];
  createDocument: (title: string, content: string, images: string[], isPublic: boolean, creatorId: string) => void;
  updateDocument: (id: string, title: string, content: string, images: string[], isPublic: boolean) => void;
  deleteDocument: (id: string) => void;
  getPublicDocuments: () => Document[];
  getUserDocuments: (userId: string) => Document[];
  canEdit: (document: Document, userId: string) => boolean;
}

const DocumentsContext = createContext<DocumentsContextType | undefined>(undefined);

export function DocumentsProvider({ children }: { children: React.ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>([]);

  // Cargar documentos desde localStorage
  useEffect(() => {
    const savedDocuments = localStorage.getItem('documents');
    if (savedDocuments) {
      setDocuments(JSON.parse(savedDocuments));
    } else {
      // Crear algunos documentos de ejemplo
      const demoDocuments: Document[] = [
        {
          id: '1',
          title: 'Bienvenido a Notion Clone',
          content: 'Este es un documento público que todos pueden ver y editar.',
          images: [],
          isPublic: true,
          creatorId: '1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Mi documento privado',
          content: 'Este documento solo lo puedo ver yo.',
          images: [],
          isPublic: false,
          creatorId: '1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      setDocuments(demoDocuments);
      localStorage.setItem('documents', JSON.stringify(demoDocuments));
    }
  }, []);

  // Guardar documentos en localStorage cuando cambien
  const saveDocuments = (docs: Document[]) => {
    setDocuments(docs);
    localStorage.setItem('documents', JSON.stringify(docs));
  };

  const createDocument = (
    title: string,
    content: string,
    images: string[],
    isPublic: boolean,
    creatorId: string
  ) => {
    const newDocument: Document = {
      id: Date.now().toString(),
      title,
      content,
      images,
      isPublic,
      creatorId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveDocuments([...documents, newDocument]);
  };

  const updateDocument = (
    id: string,
    title: string,
    content: string,
    images: string[],
    isPublic: boolean
  ) => {
    const updatedDocuments = documents.map((doc) =>
      doc.id === id
        ? { ...doc, title, content, images, isPublic, updatedAt: new Date().toISOString() }
        : doc
    );
    saveDocuments(updatedDocuments);
  };

  const deleteDocument = (id: string) => {
    const filteredDocuments = documents.filter((doc) => doc.id !== id);
    saveDocuments(filteredDocuments);
  };

  const getPublicDocuments = (): Document[] => {
    return documents.filter((doc) => doc.isPublic);
  };

  const getUserDocuments = (userId: string): Document[] => {
    return documents.filter((doc) => doc.creatorId === userId);
  };

  const canEdit = (document: Document, userId: string): boolean => {
    // Los documentos públicos pueden ser editados por cualquiera
    // Los documentos privados solo por el creador
    return document.isPublic || document.creatorId === userId;
  };

  return (
    <DocumentsContext.Provider
      value={{
        documents,
        createDocument,
        updateDocument,
        deleteDocument,
        getPublicDocuments,
        getUserDocuments,
        canEdit,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
}

export function useDocuments() {
  const context = useContext(DocumentsContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentsProvider');
  }
  return context;
}
