import { StrictMode, Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Global Error Boundary — beklenmedik hataları yakala, beyaz ekran verme
class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Uygulama hatası:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif',
          background: '#f9fafb', padding: '2rem', textAlign: 'center'
        }}>
          <h1 style={{ color: '#dc2626', fontSize: '1.5rem', marginBottom: '1rem' }}>
            ⚠️ Uygulama başlatılamadı
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            Firebase bağlantısı kurulamadı. Lütfen environment variable'ların doğru ayarlandığından emin olun.
          </p>
          <pre style={{
            background: '#1f2937', color: '#f87171', padding: '1rem',
            borderRadius: '0.5rem', fontSize: '0.75rem', maxWidth: '600px',
            whiteSpace: 'pre-wrap', textAlign: 'left'
          }}>
            {this.state.error.message}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)