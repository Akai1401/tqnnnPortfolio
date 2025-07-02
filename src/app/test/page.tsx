'use client';
import { Fluid } from '@whatisjery/react-fluid-distortion';
import { EffectComposer } from '@react-three/postprocessing';
import { Canvas, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

const Image = () => {
  const texture = useTexture('/images/loading/bg-text.jpg');
  const { viewport } = useThree();

  return (
    <mesh position-z={-4}>
      <planeGeometry args={[viewport.width, viewport.height, 20, 20]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

const page = () => {
  return (
    <Canvas
      orthographic
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <Image />
      <EffectComposer>
        <Fluid
          radius={0.03}
          curl={10}
          swirl={5}
          distortion={1}
          force={2}
          pressure={0.94}
          densityDissipation={0.98}
          velocityDissipation={0.99}
          intensity={0.3}
          rainbow={false}
          blend={0}
        />
      </EffectComposer>
    </Canvas>
  );
};

export default page;
