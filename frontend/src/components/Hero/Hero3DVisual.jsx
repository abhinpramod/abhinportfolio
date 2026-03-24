import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, PresentationControls, ContactShadows, Edges } from '@react-three/drei';

const LogicCube = ({ position, index }) => {
  const meshRef = useRef();
  
  // Mathematical pulsing and shifting for each individual cube
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Offset each cube mathematically based on its original index to create an algorithmic wave
    const offset = Math.sin(time * 2 + index * 0.4) * 0.15;
    meshRef.current.position.y = position[1] + offset;
    
    // Very subtle dynamic rotation representing data processing
    meshRef.current.rotation.x = Math.sin(time + index) * 0.05;
    meshRef.current.rotation.z = Math.cos(time + index) * 0.05;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.85, 0.85, 0.85]} />
      {/* Sleek, semi-transparent frosted physical material */}
      <meshStandardMaterial 
        color="#3b82f6" 
        transparent 
        opacity={0.7} 
        roughness={0.1}
        metalness={0.8}
      />
      {/* Beautiful techie glowing edges representing logical connections */}
      <Edges color="#8b5cf6" linewidth={2} />
    </mesh>
  );
};

const AlgorithmGrid = () => {
  // Generate a structured 3x3x3 Rubik's-style grid of data blocks
  const cubes = useMemo(() => {
    const grid = [];
    const size = 3;
    const spacing = 1.1; // Distance between elements
    const offset = (size - 1) * spacing / 2;
    let idx = 0;
    
    for(let x = 0; x < size; x++) {
      for(let y = 0; y < size; y++) {
        for(let z = 0; z < size; z++) {
          grid.push({
            position: [
              x * spacing - offset, 
              y * spacing - offset, 
              z * spacing - offset
            ],
            index: idx++
          });
        }
      }
    }
    return grid;
  }, []);

  const groupRef = useRef();
  const { viewport } = useThree();

  // Dynamically scale the grid down on smaller mobile screens
  const scale = Math.min(1, viewport.width / 5.5);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // The entire algorithm matrix majestically rotates over time
      groupRef.current.rotation.y -= delta * 0.15;
      groupRef.current.rotation.x -= delta * 0.1;
      
      // Scroll parallax - moves down as user scrolls
      const scrollY = window.scrollY;
      groupRef.current.position.y = scrollY * -0.002;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
      <group ref={groupRef} scale={scale}>
        {cubes.map((cube) => (
          <LogicCube key={cube.index} position={cube.position} index={cube.index} />
        ))}
      </group>
    </Float>
  );
};

const Hero3DVisual = () => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px', cursor: 'grab', position: 'relative', zIndex: 10 }}>
      {/* Capping DPR ensures perfect, lag-free performance for this 27-object array! Responsive. */}
      <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <spotLight position={[-10, -10, 10]} intensity={2.5} color="#ec4899" />
        
        {/* Interactive grabbing capability */}
        <PresentationControls 
          global 
          config={{ mass: 1, tension: 200 }} 
          snap={{ mass: 2, tension: 500 }} 
          polar={[-Math.PI / 4, Math.PI / 4]} 
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <AlgorithmGrid />
        </PresentationControls>
        
        {/* Grounding shadow gives it realism */}
        <ContactShadows position={[0, -4, 0]} opacity={0.6} scale={15} blur={3} far={5} color="#1e1b4b" />
      </Canvas>
    </div>
  );
};

export default Hero3DVisual;
