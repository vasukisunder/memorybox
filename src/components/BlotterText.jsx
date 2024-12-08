import React, { useEffect, useRef } from 'react';

function BlotterText({ text }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.Blotter) {
      try {
        // Create text instance with the passed text
        const blotterText = new window.Blotter.Text(text, {
          family : "serif",
          size : 80,
          fill : "#fff",
          paddingLeft: 40,
          paddingRight: 40,
          weight: 300
        });

        // Create material instance
        const material = new window.Blotter.RollingDistortMaterial();

        // Set material properties
        material.uniforms.uSineDistortSpread.value = 0.035;
        material.uniforms.uSineDistortCycleCount.value = 2;
        material.uniforms.uSineDistortAmplitude.value = 0.25;
        material.uniforms.uNoiseDistortVolatility.value = 20;
        material.uniforms.uNoiseDistortAmplitude.value = 0.01;
        material.uniforms.uRotation.value = 0;
        material.uniforms.uSpeed.value = 0.08;

        // Create Blotter instance
        const blotter = new window.Blotter(material, {
          texts : blotterText
        });

        const scope = blotter.forText(blotterText);

        // Add to DOM
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
          containerRef.current.appendChild(scope.domElement);
        }

        return () => {
          if (containerRef.current) {
            containerRef.current.innerHTML = '';
          }
        };
      } catch (error) {
        console.error('Error setting up Blotter:', error);
      }
    }
  }, [text]);

  return <div ref={containerRef} style={{ width: '100%', height: '300px' }} />;
}

export default BlotterText; 