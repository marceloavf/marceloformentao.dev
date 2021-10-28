import { Canvas } from '@react-three/fiber'
import UnchartedRingControl from './UnchartedRingControl'

const UnchartedRing = () => {
  return (
    <Canvas concurrent camera={{ fov: 40, near: 0.1, far: 1000, position: [0, 0, 5] }}>
      <UnchartedRingControl />
    </Canvas>
  )
}

export default UnchartedRing
