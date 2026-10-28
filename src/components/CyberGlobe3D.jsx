import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Interactive 3D Cyber Security & Network Topology Sphere
 * Features rotating holographic rings, data node mesh, and interactive mouse drag
 */
export default function CyberGlobe3D({ theme = 'dark', size = 360 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || size;
    const height = mount.clientHeight || size;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const isDark = theme === 'dark';
    const mainCyan = isDark ? 0x00b4d8 : 0x0077b6;
    const accentBlue = isDark ? 0x1e3a8a : 0x0096c7;
    const emerald = 0x10b981;

    // 1. Central Core Sphere (Holographic Wireframe)
    const coreGeo = new THREE.IcosahedronGeometry(1.65, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: mainCyan,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.28,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // 2. Vertex Nodes on the Sphere
    const pos = coreGeo.attributes.position;
    const nodeGeo = new THREE.BufferGeometry();
    const nodePos = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count * 3; i++) {
      nodePos[i] = pos.array[i];
    }
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePos, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: 0x48cae4,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
    });
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodePoints);

    // 3. Inner Glowing Sphere
    const innerGeo = new THREE.SphereGeometry(1.0, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: accentBlue,
      transparent: true,
      opacity: isDark ? 0.18 : 0.12,
      wireframe: false,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // 4. Orbital Cyber Rings (Representing Network Security Layers)
    const ring1Geo = new THREE.TorusGeometry(2.1, 0.015, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: mainCyan,
      transparent: true,
      opacity: 0.5,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.3, 0.012, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: emerald,
      transparent: true,
      opacity: 0.45,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = Math.PI / 6;
    scene.add(ring2);

    // 5. Orbiting Data Packet Satellites
    const satGroup = new THREE.Group();
    const satGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const satMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const satCount = 4;
    const satellites = [];

    for (let i = 0; i < satCount; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      satellites.push({
        mesh: sat,
        radius: 2.1,
        angle: (i * Math.PI * 2) / satCount,
        speed: 0.02 + i * 0.005,
      });
      satGroup.add(sat);
    }
    satGroup.rotation.x = Math.PI / 3;
    scene.add(satGroup);

    // Mouse Interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) {
        // Hover parallax
        const rect = mount.getBoundingClientRect();
        const x = (e.clientX - rect.left) / width - 0.5;
        const y = (e.clientY - rect.top) / height - 0.5;
        targetRotationY = x * 0.8;
        targetRotationX = y * 0.8;
        return;
      }

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      coreMesh.rotation.y += deltaX * 0.01;
      coreMesh.rotation.x += deltaY * 0.01;
      nodePoints.rotation.y += deltaX * 0.01;
      nodePoints.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    mount.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Resize handler
    const handleResize = () => {
      if (!mount || !renderer || !camera) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Auto rotation
      coreMesh.rotation.y += 0.004;
      coreMesh.rotation.x += 0.002;
      nodePoints.rotation.y += 0.004;
      nodePoints.rotation.x += 0.002;

      innerMesh.rotation.y -= 0.003;
      ring1.rotation.z += 0.005;
      ring2.rotation.z -= 0.004;
      ring2.rotation.y += 0.002;

      // Update Satellites
      satellites.forEach((sat) => {
        sat.angle += sat.speed;
        sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
        sat.mesh.position.y = Math.sin(sat.angle) * sat.radius;
      });

      // Smooth hover rotation interpolation
      if (!isDragging) {
        coreMesh.rotation.y += (targetRotationY - coreMesh.rotation.y * 0.1) * 0.03;
        coreMesh.rotation.x += (targetRotationX - coreMesh.rotation.x * 0.1) * 0.03;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);

      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }

      coreGeo.dispose();
      coreMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      satGeo.dispose();
      satMat.dispose();
      renderer.dispose();
    };
  }, [theme, size]);

  return (
    <div 
      ref={mountRef} 
      className="cyber-globe-canvas-wrapper" 
      style={{ 
        width: '100%', 
        height: '100%', 
        minHeight: '360px',
        cursor: 'grab',
        position: 'relative'
      }}
      title="Interactive 3D Network Topology (Click & Drag to Rotate)"
      aria-label="Interactive 3D Network Topology Sphere"
    />
  );
}
