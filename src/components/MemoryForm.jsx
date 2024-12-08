import React, { useState } from 'react';

function MemoryForm({ onSubmit }) {
  const [memory, setMemory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (memory.trim()) {
      onSubmit(memory);
      setMemory('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="memory-form">
      <textarea
        value={memory}
        onChange={(e) => setMemory(e.target.value)}
        placeholder="Share your memory..."
        rows="4"
      />
      <button type="submit">Save Memory</button>
    </form>
  );
}

export default MemoryForm; 