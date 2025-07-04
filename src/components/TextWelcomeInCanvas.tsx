import { useThree } from '@react-three/fiber';
import { Text as DreiText } from '@react-three/drei';

const TextWelcomeInCanvas = () => {
  const WELCOME_TEXT = [
    'CREATIVE DEVELOPMENT',
    'PORTFOLIO',
    '2025 SHOWCASE',
    'OF',
    'THANH QUY NGUYEN',
  ];

  const COUNT = WELCOME_TEXT.length;
  const { viewport } = useThree();
  const MARGIN_BOTTOM = 50;
  const MARGIN_X = 320;
  const SCALE_FACTOR = viewport.width / 1920;

  return (
    <group position={[0, 0, 0]}>
      {WELCOME_TEXT.map((text, index) => {
        const x =
          -viewport.width / 2 +
          (index * (viewport.width - MARGIN_X)) / (COUNT - 1) +
          MARGIN_X / 2;
        return (
          <DreiText
            key={index}
            font={'/fonts/grotesk.otf'}
            fontSize={20 * SCALE_FACTOR}
            color='#F4E4CA'
            anchorX='center'
            anchorY='middle'
            position={[x, 0, 0]}
          >
            {text}
          </DreiText>
        );
      })}
      <DreiText
        font={'/fonts/grotesk.otf'}
        fontSize={16 * SCALE_FACTOR}
        color='#837A6D'
        anchorX='center'
        anchorY='middle'
        position={[0, -viewport.height / 2 + MARGIN_BOTTOM, 0]}
      >
        ALL RIGHTS RESERVED. © 2025 TQNG MARUKO
      </DreiText>
    </group>
  );
};

export default TextWelcomeInCanvas;
