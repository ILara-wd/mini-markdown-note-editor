# 📝 Notion Mini Clone

Un clon simplificado de Notion desarrollado con **Next.js 16**, **React 19**, **TypeScript** y **Tailwind CSS**, que incluye un potente editor de markdown y gestión de documentos colaborativos.

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0.4-black.svg)
![React](https://img.shields.io/badge/React-19.2.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)

## 🌟 Características Principales

### 🔐 Sistema de Autenticación
- **Registro de usuarios** con validación de datos
- **Inicio de sesión** seguro y persistente
- **Sesión persistente** con localStorage
- **Usuarios de demostración** pre-configurados:
  - `demo` / `demo123`
  - `user` / `user123`

### 📄 Gestión de Documentos
- **Creación y edición** de documentos
- **Documentos públicos** (cualquiera puede editar)
- **Documentos privados** (solo el creador puede editar)
- **Eliminación de documentos** (solo el creador)
- **Persistencia** en localStorage
- **Vista de lista** organizada por categorías
- **Metadatos** automáticos (fechas de creación y actualización)

### ✍️ Editor de Markdown Avanzado
- **Editor con pestañas** (Edición / Vista Previa)
- **Barra de herramientas** con formato rápido
- **Sintaxis highlighting** para bloques de código
- **Vista previa en tiempo real** del markdown
- **Ayuda integrada** con referencia de sintaxis
- **Soporte completo** para GitHub Flavored Markdown (GFM)

### 🖼️ Gestión de Imágenes
- **Subida de múltiples imágenes**
- **Vista previa** de imágenes en documentos
- **Eliminación individual** de imágenes
- **Almacenamiento** en base64 (localStorage)

### 🎨 Diseño y UX
- **Diseño "Brutal"** con bordes gruesos y tipografía bold
- **Responsive design** para todos los dispositivos
- **Tema consistente** negro y blanco
- **Interfaz intuitiva** con navegación clara
- **Animaciones suaves** y transiciones

## 🚀 Tecnologías Utilizadas

### Frontend Framework
- **Next.js 16.0.4** - Framework de React con App Router
- **React 19.2.0** - Librería para interfaces de usuario
- **TypeScript 5.x** - Tipado estático para JavaScript

### Styling & UI
- **Tailwind CSS 4** - Framework CSS utility-first
- **PostCSS** - Procesador CSS
- **CSS Custom Properties** - Variables CSS personalizadas

### Markdown & Code Highlighting
- **react-markdown 10.1.0** - Renderizado de markdown en React
- **remark-gfm 4.0.1** - Plugin para GitHub Flavored Markdown
- **rehype-highlight 7.0.2** - Resaltado de sintaxis para código
- **rehype-raw 7.0.0** - Soporte para HTML en markdown
- **highlight.js 11.11.1** - Librería de resaltado de sintaxis

### Development Tools
- **ESLint 9** - Linter para JavaScript/TypeScript
- **eslint-config-next** - Configuración ESLint para Next.js

## 📁 Estructura del Proyecto

```
notion-mini-clone/
├── app/                      # App Router de Next.js
│   ├── globals.css          # Estilos globales y CSS para markdown
│   ├── layout.tsx           # Layout principal con providers
│   └── page.tsx             # Página principal de la aplicación
├── components/               # Componentes React reutilizables
│   ├── DocumentEditor.tsx   # Editor principal de documentos
│   ├── DocumentsList.tsx    # Lista y gestión de documentos
│   ├── LoginPage.tsx        # Página de autenticación
│   ├── MarkdownEditor.tsx   # Editor avanzado de markdown
│   └── MarkdownPreview.tsx  # Componente de vista previa
├── contexts/                 # Context APIs de React
│   ├── AuthContext.tsx      # Gestión de autenticación
│   └── DocumentsContext.tsx # Gestión de documentos
├── types/                    # Definiciones de TypeScript
│   └── index.ts             # Interfaces y tipos principales
├── public/                   # Archivos estáticos
├── next.config.ts           # Configuración de Next.js
├── tsconfig.json            # Configuración de TypeScript
├── tailwind.config.js       # Configuración de Tailwind CSS
├── postcss.config.mjs       # Configuración de PostCSS
└── package.json             # Dependencias y scripts
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- **Node.js** 18.x o superior
- **npm** o **yarn** como gestor de paquetes

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone [url-del-repositorio]
cd notion-mini-clone
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
# o
yarn dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construir para producción
npm run start    # Ejecutar versión de producción
npm run lint     # Ejecutar ESLint
```

## 📖 Funcionalidades Markdown Soportadas

### Formato Básico
- **Encabezados**: `# H1`, `## H2`, `### H3`
- **Énfasis**: `**negrita**`, `*cursiva*`, `~~tachado~~`
- **Código inline**: `código`

### Elementos Estructurales
- **Listas con viñetas**: `- elemento`
- **Listas numeradas**: `1. elemento`
- **Enlaces**: `[texto](url)`
- **Imágenes**: `![alt](url)`

### Elementos Avanzados
- **Bloques de código**:
  ```markdown
  ```javascript
  function ejemplo() {
    return "¡Hola!";
  }
  ```
  ```
- **Citas**: `> Texto de cita`
- **Tablas**:
  ```markdown
  | Columna 1 | Columna 2 |
  |-----------|-----------|
  | Dato A    | Dato B    |
  ```
- **Separadores**: `---`

### Características GFM
- **Listas de tareas**: `- [x] Tarea completada`
- **Tablas avanzadas** con alineación
- **Enlaces automáticos**
- **Strikethrough** (texto tachado)

## 🎯 Casos de Uso

### Para Desarrolladores
- **Documentación técnica** con código resaltado
- **Notas de proyecto** con formato rico
- **Wikis colaborativas** para equipos

### Para Escritores
- **Artículos** y **blogs** con formato markdown
- **Documentos compartidos** para colaboración
- **Notas personales** con organización

### Para Equipos
- **Documentación colaborativa**
- **Bases de conocimiento** compartidas
- **Procedimientos** y **guías** de trabajo

## 🔧 Personalización

### Estilos del Editor
Los estilos del editor markdown se pueden personalizar en `app/globals.css`:

```css
.markdown-preview {
  /* Estilos personalizados para vista previa */
}

.hljs {
  /* Personalización del resaltado de código */
}
```

### Configuración de Markdown
Los plugins de markdown se configuran en `MarkdownEditor.tsx` y `MarkdownPreview.tsx`:

```typescript
remarkPlugins={[remarkGfm]}
rehypePlugins={[rehypeHighlight, rehypeRaw]}
```

## 🏗️ Arquitectura

### Patrones Utilizados
- **Context API** para gestión de estado global
- **Custom Hooks** para lógica reutilizable
- **Component Composition** para modularidad
- **TypeScript Interfaces** para tipado fuerte

### Gestión de Estado
- **AuthContext**: Autenticación y sesiones
- **DocumentsContext**: CRUD de documentos
- **localStorage**: Persistencia local de datos

### Estructura de Componentes
```
App (page.tsx)
├── LoginPage (si no autenticado)
└── DocumentsList + DocumentEditor (si autenticado)
    ├── MarkdownEditor
    └── MarkdownPreview
```

## 🚦 Estado del Proyecto

### ✅ Implementado
- [x] Sistema de autenticación básico
- [x] CRUD completo de documentos
- [x] Editor markdown avanzado
- [x] Vista previa en tiempo real
- [x] Gestión de imágenes
- [x] Documentos públicos/privados
- [x] Persistencia local
- [x] Diseño responsive
- [x] Sintaxis highlighting

### 🔄 En Progreso
- [ ] Base de datos real (reemplazar localStorage)
- [ ] Autenticación con JWT
- [ ] Colaboración en tiempo real
- [ ] Historial de versiones

### 📋 Roadmap Futuro
- [ ] Integración con backend (Node.js/Python)
- [ ] WebSockets para colaboración
- [ ] Exportación a PDF/HTML
- [ ] Sistema de plugins
- [ ] Modo oscuro
- [ ] Búsqueda avanzada
- [ ] Comentarios y menciones
- [ ] Carpetas y organización

## 🤝 Contribuir

1. **Fork** del repositorio
2. **Crear** una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Abrir** un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Notion** por la inspiración del diseño y funcionalidades
- **Next.js Team** por el excelente framework
- **React Team** por la librería base
- **GitHub** por el hosting y herramientas de desarrollo

---

**Desarrollado con ❤️ usando Next.js y TypeScript**