import { Canvas } from '@react-three/fiber'
import UnchartedRingControl from './UnchartedRingControl'

const UnchartedRing = () => {
  return (
    <div className="h-52">
      <Canvas concurrent camera={{ fov: 40, near: 0.1, far: 1000, position: [0, 0, 6] }}>
        <UnchartedRingControl />
      </Canvas>
    </div>
  )
}

export default UnchartedRing
