'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDocuments } from '@/contexts/DocumentsContext';
import { Document } from '@/types';
import MarkdownPreview from './MarkdownPreview';

interface DocumentsListProps {
  onEditDocument: (doc: Document) => void;
  onNewDocument: () => void;
}

export default function DocumentsList({ onEditDocument, onNewDocument }: DocumentsListProps) {
  const { user, logout } = useAuth();
  const { documents, deleteDocument, getPublicDocuments, getUserDocuments, canEdit } = useDocuments();
  const [activeTab, setActiveTab] = useState<'public' | 'mine'>('public');

  const publicDocuments = getPublicDocuments();
  const myDocuments = user ? getUserDocuments(user.id) : [];
  const displayDocuments = activeTab === 'public' ? publicDocuments : myDocuments;

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este documento?')) {
      deleteDocument(id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b-2 border-black">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">Notion Clone</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-700">
              {user?.username}
            </span>
            <button
              onClick={logout}
              className="px-4 py-2 border-2 border-black font-semibold hover:bg-black hover:text-white transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b-2 border-gray-200">
          <button
            onClick={() => setActiveTab('public')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'public'
                ? 'border-b-4 border-black text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            Documentos Públicos ({publicDocuments.length})
          </button>
          <button
            onClick={() => setActiveTab('mine')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'mine'
                ? 'border-b-4 border-black text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            Mis Documentos ({myDocuments.length})
          </button>
        </div>

        {/* New Document Button */}
        <button
          onClick={onNewDocument}
          className="w-full mb-6 py-4 border-2 border-dashed border-gray-400 hover:border-black hover:bg-gray-50 transition-all font-semibold text-black"
        >
          + Nuevo Documento
        </button>

        {/* Documents Grid */}
        {displayDocuments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No hay documentos aquí todavía</p>
            <p className="text-sm mt-2">
              {activeTab === 'public'
                ? 'Crea el primer documento público'
                : 'Crea tu primer documento'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayDocuments.map((doc) => {
              const isCreator = user?.id === doc.creatorId;
              const canEditDoc = user ? canEdit(doc, user.id) : false;

              return (
                <div
                  key={doc.id}
                  className="border-2 border-black p-4 hover:shadow-lg transition-shadow cursor-pointer bg-white"
                  onClick={() => onEditDocument(doc)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg text-black truncate flex-1">
                      {doc.title || 'Sin título'}
                    </h3>
                    <div className="flex gap-1 ml-2">
                      {doc.isPublic ? (
                        <span className="px-2 py-1 bg-black text-white text-xs font-semibold">
                          PÚBLICO
                        </span>
                      ) : (
                        <span className="px-2 py-1 border border-black text-black text-xs font-semibold">
                          PRIVADO
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-3 line-clamp-3">
                    <MarkdownPreview 
                      content={doc.content || ''} 
                      truncate={150}
                      className="text-sm"
                    />
                  </div>

                  {doc.images.length > 0 && (
                    <div className="mb-3 flex gap-1">
                      {doc.images.slice(0, 3).map((_, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 bg-gray-200 border border-gray-400"
                        />
                      ))}
                      {doc.images.length > 3 && (
                        <div className="w-8 h-8 bg-gray-200 border border-gray-400 flex items-center justify-center text-xs">
                          +{doc.images.length - 3}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                    <span>{formatDate(doc.updatedAt)}</span>
                    {isCreator && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(doc.id);
                        }}
                        className="text-black hover:underline font-semibold"
                      >
                        Eliminar
                      </button>
                    )}
                  </div>

                  {!canEditDoc && (
                    <div className="mt-2 text-xs text-gray-500 italic">
                      Solo lectura
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
