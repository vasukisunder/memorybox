import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MemoryDisplay.css';

function MemoryDisplay({ memories }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (memories.length === 0) return;

    const currentText = memories[currentIndex].text;
    const typingDuration = currentText.length * 0.05;
    const displayDuration = 3;
    const totalDuration = (typingDuration + displayDuration) * 1000;

    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === memories.length - 1 ? 0 : prevIndex + 1
      );
    }, totalDuration);

    return () => clearTimeout(timer);
  }, [currentIndex, memories]);

  if (memories.length === 0) {
    return <div className="memory-display">No memories yet...</div>;
  }

  const words = memories[currentIndex].text.split(' ');
  let charCount = 0;

  return (
    <div className="memory-display">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="memory-container"
        >
          {words.map((word, wordIndex) => {
            const wordSpan = (
              <motion.span 
                key={wordIndex} 
                className="memory-word"
              >
                {word.split('').map((char, charIndex) => {
                  const delay = charCount * 0.05;
                  charCount++;
                  return (
                    <motion.span
                      key={`${wordIndex}-${charIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.05,
                        delay: delay,
                        ease: "easeIn"
                      }}
                      className="memory-char"
                    >
                      {char}
                    </motion.span>
                  );
                })}
                {/* Add space after each word except the last one */}
                {wordIndex < words.length - 1 && (
                  <span className="memory-char"> </span>
                )}
              </motion.span>
            );
            charCount++; // Account for space between words
            return wordSpan;
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default MemoryDisplay; 