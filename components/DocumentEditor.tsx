'use client';

import React, { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDocuments } from '@/contexts/DocumentsContext';
import { Document } from '@/types';
import MarkdownEditor from './MarkdownEditor';

interface DocumentEditorProps {
  document: Document | null;
  onClose: () => void;
}

export default function DocumentEditor({ document, onClose }: DocumentEditorProps) {
  const { user } = useAuth();
  const { createDocument, updateDocument, canEdit } = useDocuments();
  
  const [title, setTitle] = useState(document?.title || '');
  const [content, setContent] = useState(document?.content || '');
  const [images, setImages] = useState<string[]>(document?.images || []);
  const [isPublic, setIsPublic] = useState(document?.isPublic ?? true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEditing = !!document;
  const canEditDoc = document && user ? canEdit(document, user.id) : true;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!user) return;

    if (!title.trim()) {
      alert('El título es obligatorio');
      return;
    }

    if (isEditing && document) {
      updateDocument(document.id, title, content, images, isPublic);
    } else {
      createDocument(title, content, images, isPublic, user.id);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center overflow-y-auto z-50">
      <div className="bg-white border-4 border-black w-full max-w-4xl my-8 mx-4">
        {/* Header */}
        <div className="border-b-2 border-black p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-black">
            {isEditing ? 'Editar Documento' : 'Nuevo Documento'}
          </h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold hover:bg-gray-200 w-10 h-10 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        {!canEditDoc && (
          <div className="bg-black text-white px-4 py-2 text-sm font-semibold">
            ⚠️ Este documento es de solo lectura
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Título *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black text-xl font-semibold"
              placeholder="Título del documento"
              disabled={!canEditDoc}
              required
            />
          </div>

          {/* Visibility Toggle */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="w-5 h-5 border-2 border-black"
                disabled={!canEditDoc}
              />
              <span className="font-semibold text-black">
                Documento Público (todos pueden editar)
              </span>
            </label>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Contenido (Markdown)
            </label>
            <MarkdownEditor
              value={content}
              onChange={setContent}
              disabled={!canEditDoc}
              placeholder="Escribe el contenido de tu documento usando Markdown..."
            />
          </div>

          {/* Images */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-black">
                Imágenes ({images.length})
              </label>
              {canEditDoc && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-1 bg-black text-white text-sm font-semibold hover:bg-gray-800"
                >
                  + Agregar Imagen
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {images.map((img, index) => (
                  <div key={index} className="relative border-2 border-black">
                    <img
                      src={img}
                      alt={`Imagen ${index + 1}`}
                      className="w-full h-40 object-cover"
                    />
                    {canEditDoc && (
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 bg-black text-white w-6 h-6 flex items-center justify-center font-bold hover:bg-red-600"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {canEditDoc && (
          <div className="border-t-2 border-black p-4 flex gap-4 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 border-2 border-black font-semibold hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-black text-white font-semibold hover:bg-gray-800"
            >
              {isEditing ? 'Guardar Cambios' : 'Crear Documento'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
