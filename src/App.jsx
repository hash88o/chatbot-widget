import React from 'react';
import { ChatWidget } from './components/ChatWidget';

/**
 * Demo page + embeddable widget.
 * In production, only the ChatWidget would be mounted on the host page.
 */
function App() {
  return (
    <>
      <div className="demo-page">
        <h1>Chatbot Widget</h1>
        <p>
          This is a demo page. The chat launcher is in the bottom-right corner.
          Open it to start a short conversation flow.
        </p>
      </div>
      <ChatWidget brandName="Support" />
    </>
  );
}

export default App;
