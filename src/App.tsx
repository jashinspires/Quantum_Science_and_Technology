export default function App() {
  return (
    <div
      style={{
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        margin: 0,
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          padding: '2.5rem',
          borderRadius: '1rem',
          backgroundColor: '#1e293b',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
          border: '1px solid #334155',
        }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#38bdf8' }}>
          Quantum Science &amp; Technology Study Guide
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
          Ready to Build
        </p>
        <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: '1.6' }}>
          Your project template is configured with Vite, React, and TypeScript. All unit folders and study materials are present and ready for development.
        </p>
      </div>
    </div>
  );
}
