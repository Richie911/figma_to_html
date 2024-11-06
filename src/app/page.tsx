'use client'

import { useState } from 'react';
import { setCookie,deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [figmaUrl, setFigmaUrl] = useState('');
  const [token, setToken] = useState('');
  const [param, setParam] = useState('');
  const [nodeId, setNodeId] = useState<string | null>('');
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if(!figmaUrl || !token) {
      alert("Please fill in all the fields.");
      return
    }
    
    try {
      const url = new URL(figmaUrl);
      const pathSegments = url.pathname.split('/');
      const queryParams = new URLSearchParams(url.search);

      // Extracting param from the URL path
      const paramValue = pathSegments[2];
      setParam(paramValue);

      // Extracting node-id from the URL query
      const nodeIdValue = queryParams.get('node-id')?.replace('-', ':') || '';
      setNodeId(nodeIdValue);
      if(nodeIdValue && nodeIdValue?.length > 0 && paramValue.length > 0) {
        setCookie('figmaToken', token)
        setCookie('nodeId', nodeIdValue)
        setCookie('param', paramValue)
      
      router.push('/code');
      }
      else {
        alert("Please provide a valid figma url.");
      } 
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

      {param && (
        <div style={{ marginTop: '20px' }}>
          <h3>Extracted Parameters:</h3>
          <p><strong>param:</strong> {param}</p>
          <p><strong>node-id:</strong> {nodeId || 'Not provided'}</p>
        </div>
      )}
    </div>
  );
}
