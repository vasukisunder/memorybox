import React, { useEffect, useRef } from 'react';

function BlotterTitle() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.Blotter) {
      try {
        // Create text instance
        const text = new window.Blotter.Text("memory box", {
          family: 'Garamond',
          size: 32,
          fill: "#BAC4B8",
          paddingLeft: 0,
          paddingRight: 0,
          style: "normal"
        });

        // Create material instance
        const material = new window.Blotter.RollingDistortMaterial();

        // Set material properties
        material.uniforms.uSineDistortSpread.value = 0.015;
        material.uniforms.uSineDistortCycleCount.value = 2;
        material.uniforms.uSineDistortAmplitude.value = 0.08;
        material.uniforms.uNoiseDistortVolatility.value = 15;
        material.uniforms.uNoiseDistortAmplitude.value = 0.005;
        material.uniforms.uRotation.value = 0;
        material.uniforms.uSpeed.value = 0.05;

        // Create Blotter instance
        const blotter = new window.Blotter(material, {
          texts: text
        });

        const scope = blotter.forText(text);

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
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%',
        height: '50px',
        marginBottom: '0.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }} 
    />
  );
}

export default BlotterTitle; 