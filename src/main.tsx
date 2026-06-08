import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { initializeDataLayer } from './utils/analytics'

// Initialize GTM dataLayer
initializeDataLayer()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/gcf">
      <Routes>
        {/* 日本語版（デフォルト） */}
        <Route path="/" element={<App />} />
        
        {/* 英語版 */}
        <Route path="/en" element={<App />} />
        
        {/* その他のパスは日本語版にリダイレクト */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
