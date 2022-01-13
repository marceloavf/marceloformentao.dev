import { useContextBridge, AdaptiveEvents } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useSpring, animated, config } from '@react-spring/web'
import UnchartedRingControl from './UnchartedRingControl'
import AnimationContext from '@/context/AnimationOrchestrator'

const UnchartedRing = () => {
  const ContextBridge = useContextBridge(AnimationContext)

  const styles = useSpring({
    config: { ...config.molasses },
    to: { opacity: 1 },
    from: { opacity: 0 },
  })

  return (
    <animated.div style={styles} className="h-52">
      <Canvas camera={{ fov: 40, near: 0.1, far: 1000, position: [0, 0, 6] }}>
        <ContextBridge>
          <UnchartedRingControl />
        </ContextBridge>
        <AdaptiveEvents />
      </Canvas>
    </animated.div>
  )
}

export default UnchartedRing
