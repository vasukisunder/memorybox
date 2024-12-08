import React, { useState } from 'react';
import BlotterTitle from './BlotterTitle';
import './MemoryInput.css';

function MemoryInput({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
      setInput('');
    }
  };

  return (
    <div className="input-section-container">
      <BlotterTitle />
      <p className="input-description">
        Think of a special moment and share it below.<br />Become part of a collective memory we build together.
      </p>
      <form className="memory-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a memory..."
          className="memory-input-field"
        />
        <button type="submit" className="memory-submit-btn">
          Add Memory
        </button>
      </form>
    </div>
  );
}

export default MemoryInput; 