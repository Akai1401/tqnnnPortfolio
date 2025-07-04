import { useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

const BgWelcomeInCanvas = () => {
  const texture = useTexture('/images/loading/bg.jpg');
  const { viewport } = useThree();

  return (
    <mesh position-z={-4}>
      <planeGeometry args={[viewport.width, viewport.height, 20, 20]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

export default BgWelcomeInCanvas;
