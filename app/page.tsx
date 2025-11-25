'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginPage from '@/components/LoginPage';
import DocumentsList from '@/components/DocumentsList';
import DocumentEditor from '@/components/DocumentEditor';
import { Document } from '@/types';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const handleEditDocument = (doc: Document) => {
    setEditingDocument(doc);
    setShowEditor(true);
  };

  const handleNewDocument = () => {
    setEditingDocument(null);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingDocument(null);
  };

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <>
      <DocumentsList
        onEditDocument={handleEditDocument}
        onNewDocument={handleNewDocument}
      />
      {showEditor && (
        <DocumentEditor
          document={editingDocument}
          onClose={handleCloseEditor}
        />
      )}
    </>
  );
}
