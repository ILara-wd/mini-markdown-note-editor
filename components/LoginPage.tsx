'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username.length < 3 || password.length < 3) {
      setError('Usuario y contraseña deben tener al menos 3 caracteres');
      return;
    }

    const success = isLogin ? login(username, password) : register(username, password);

    if (!success) {
      setError(
        isLogin
          ? 'Credenciales incorrectas'
          : 'El usuario ya existe o los datos son inválidos'
      );
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">Notion Clone</h1>
          <p className="text-gray-600">Crea y gestiona tus documentos</p>
        </div>

        <div className="bg-white border-2 border-black p-8">
          <div className="flex mb-6">
            <button
              onClick={() => {
                setIsLogin(true);
                setError('');
              }}
              className={`flex-1 py-2 text-center font-semibold transition-colors ${
                isLogin
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
              className={`flex-1 py-2 text-center font-semibold transition-colors ${
                !isLogin
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              Registrarse
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Ingresa tu usuario"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            {error && (
              <div className="bg-black text-white px-4 py-2 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white py-3 font-semibold hover:bg-gray-800 transition-colors"
            >
              {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
          </form>

          {isLogin && (
            <div className="mt-6 text-sm text-gray-600 border-t-2 border-gray-200 pt-4">
              <p className="font-semibold mb-1">Usuarios de demostración:</p>
              <p>• demo / demo123</p>
              <p>• user / user123</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
