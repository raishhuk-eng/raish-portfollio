import { useState, useRef } from 'react';

/**
 * 3D Tilt Card Component with interactive perspective and glare reflection
 */
export default function TiltCard3D({ 
  children, 
  className = '', 
  style = {}, 
  maxTilt = 8,
  glare = true
}) {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  });
  const [glareStyle, setGlareStyle] = useState({
    opacity: 0,
    background: 'none'
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;

    // Calculate rotation angles
    const rotX = ((y / height) - 0.5) * -maxTilt * 2;
    const rotY = ((x / width) - 0.5) * maxTilt * 2;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
    });

    if (glare) {
      const glareX = (x / width) * 100;
      const glareY = (y / height) * 100;
      setGlareStyle({
        opacity: 1,
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(0, 180, 216, 0.18), transparent 60%)`,
        transition: 'opacity 0.2s ease-out',
      });
    }
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    });
    if (glare) {
      setGlareStyle({
        opacity: 0,
        background: 'none',
        transition: 'opacity 0.4s ease-out',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card-3d-wrapper ${className}`}
      style={{
        ...style,
        ...tiltStyle,
        transformStyle: 'preserve-3d',
        position: 'relative',
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {glare && (
        <div
          className="tilt-card-glare"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            zIndex: 3,
            ...glareStyle,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
