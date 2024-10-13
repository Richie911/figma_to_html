'use client'

import { useState } from 'react';

export default function Home() {
  const [figmaUrl, setFigmaUrl] = useState('');
  const [token, setToken] = useState('');
  const [param1, setParam1] = useState('');
  const [nodeId, setNodeId] = useState<string | null>('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    try {
      const url = new URL(figmaUrl);
      const pathSegments = url.pathname.split('/');
      const queryParams = new URLSearchParams(url.search);

      // Extracting param1 from the URL path
      const param1Value = pathSegments[2];
      setParam1(param1Value);

      // Extracting node-id from the URL query
      const nodeIdValue = queryParams.get('node-id');
      setNodeId(nodeIdValue);
    } catch (error) {
      alert("Invalid URL format. Please check the URL and try again.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', gap: '20px' }}>
      <h1>Figma URL Parser</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '450px', padding: '10px' }}>
       
          <input
            type="url"
            value={figmaUrl}
            onChange={(e) => setFigmaUrl(e.target.value)}
            placeholder="Enter Figma URL"
            required
            style={{ width: '100%', height: '40px' }}
          />

          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter Figma Token"
            required
            style={{ width: '100%', height: '40px' }}
          />

        <button type="submit" style={{ padding: '10px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '5px' }}>
          Submit
        </button>
      </form>

      {param1 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Extracted Parameters:</h3>
          <p><strong>param1:</strong> {param1}</p>
          <p><strong>node-id:</strong> {nodeId || 'Not provided'}</p>
        </div>
      )}
    </div>
  );
}
