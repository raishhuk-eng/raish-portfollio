import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Interactive 3D Network Topology Background using Three.js
 * Visualizes nodes, interconnects, and dynamic spatial parallax for IT/Network Engineering
 */
export default function NetworkBackground3D({ theme = 'dark' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1200
    );
    camera.position.z = 450;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance' 
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100vw';
    renderer.domElement.style.height = '100vh';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.zIndex = '0';
    container.appendChild(renderer.domElement);

    // Particle Data
    const particleCount = window.innerWidth < 768 ? 65 : 120;
    const maxDistance = 110;
    const bounds = { x: 500, y: 350, z: 300 };

    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * bounds.x * 2;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * bounds.y * 2;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * bounds.z * 2;

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.45,
        y: (Math.random() - 0.5) * 0.45,
        z: (Math.random() - 0.5) * 0.45,
      });
    }

    // Points Geometry & Material
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const isDark = theme === 'dark';
    const pointColor = isDark ? 0x00b4d8 : 0x0077b6;
    const lineColor = isDark ? 0x0096c7 : 0x0077b6;

    const pMaterial = new THREE.PointsMaterial({
      color: pointColor,
      size: isDark ? 4.5 : 4,
      transparent: true,
      opacity: isDark ? 0.85 : 0.65,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

    const pointCloud = new THREE.Points(particlesGeometry, pMaterial);
    scene.add(pointCloud);

    // Lines Connecting Nodes
    const maxLineSegments = particleCount * particleCount;
    const linePositions = new Float32Array(maxLineSegments * 6);
    const lineColors = new Float32Array(maxLineSegments * 6);

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    linesGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.25,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // Interactive Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.15;
      mouseY = (event.clientY - windowHalfY) * 0.15;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Window Resize Handler
    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const baseColor = new THREE.Color(lineColor);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera parallax
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      camera.position.x = targetX;
      camera.position.y = -targetY;
      camera.lookAt(scene.position);

      // Subtle scene rotation
      scene.rotation.y += 0.0006;
      scene.rotation.x += 0.0003;

      let lineVertexIndex = 0;
      let lineCount = 0;

      // Update particle positions
      const positions = particlesGeometry.attributes.position.array;

      for (let i = 0; i < particleCount; i++) {
        // Move particle
        positions[i * 3] += particleVelocities[i].x;
        positions[i * 3 + 1] += particleVelocities[i].y;
        positions[i * 3 + 2] += particleVelocities[i].z;

        // Bounce back inside bounds
        if (Math.abs(positions[i * 3]) > bounds.x) particleVelocities[i].x *= -1;
        if (Math.abs(positions[i * 3 + 1]) > bounds.y) particleVelocities[i].y *= -1;
        if (Math.abs(positions[i * 3 + 2]) > bounds.z) particleVelocities[i].z *= -1;

        // Check distance with subsequent particles to draw lines
        for (let j = i + 1; j < particleCount; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            const alpha = 1.0 - dist / maxDistance;

            linePositions[lineVertexIndex] = positions[i * 3];
            linePositions[lineVertexIndex + 1] = positions[i * 3 + 1];
            linePositions[lineVertexIndex + 2] = positions[i * 3 + 2];

            lineColors[lineVertexIndex] = baseColor.r * alpha;
            lineColors[lineVertexIndex + 1] = baseColor.g * alpha;
            lineColors[lineVertexIndex + 2] = baseColor.b * alpha;

            linePositions[lineVertexIndex + 3] = positions[j * 3];
            linePositions[lineVertexIndex + 4] = positions[j * 3 + 1];
            linePositions[lineVertexIndex + 5] = positions[j * 3 + 2];

            lineColors[lineVertexIndex + 3] = baseColor.r * alpha;
            lineColors[lineVertexIndex + 4] = baseColor.g * alpha;
            lineColors[lineVertexIndex + 5] = baseColor.b * alpha;

            lineVertexIndex += 6;
            lineCount++;
          }
        }
      }

      particlesGeometry.attributes.position.needsUpdate = true;

      linesMesh.geometry.setDrawRange(0, lineCount * 2);
      linesMesh.geometry.attributes.position.needsUpdate = true;
      linesMesh.geometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount or theme switch
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      particlesGeometry.dispose();
      pMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return <div ref={containerRef} className="three-background-canvas" aria-hidden="true" />;
}
