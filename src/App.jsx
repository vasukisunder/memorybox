import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from './firebase';
import MemoryDisplay from './components/MemoryDisplay';
import MemoryInput from './components/MemoryInput';
import './App.css';

function App() {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    // Create a query with random ordering
    const q = query(
      collection(db, 'memories'),
      // Add a random field when documents are created
      orderBy('random')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMemories = snapshot.docs.map(doc => ({
        id: doc.id,
        text: doc.data().text,
        timestamp: doc.data().timestamp
      }));
      setMemories(newMemories);
    });

    return () => unsubscribe();
  }, []);

  const addMemory = async (text) => {
    try {
      await addDoc(collection(db, 'memories'), {
        text,
        timestamp: new Date().toISOString(),
        // Add a random number when creating the document
        random: Math.random()
      });
    } catch (error) {
      console.error("Error adding memory: ", error);
    }
  };

  return (
    <div className="app">
      <main className="main-content">
        <MemoryDisplay memories={memories} />
        <MemoryInput onSubmit={addMemory} />
      </main>
    </div>
  );
}

export default App; 