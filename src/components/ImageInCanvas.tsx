import { useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

const ImageInCanvas = () => {
  const texture = useTexture('/images/home/tqn.webp');
  const { viewport } = useThree();
  const SCALE_FACTOR = viewport.width / 1920;

  return (
    <mesh
      position={[
        viewport.width / 2 - (453 * SCALE_FACTOR) / 2,
        viewport.height / 2 - (688 * SCALE_FACTOR) / 2,
        -4,
      ]}
    >
      <planeGeometry args={[453 * SCALE_FACTOR, 688 * SCALE_FACTOR, 20, 20]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

export default ImageInCanvas;
