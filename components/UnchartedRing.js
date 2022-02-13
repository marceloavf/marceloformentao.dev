import { useState, useEffect } from 'react'
import { AdaptiveEvents } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useSpring, animated, config } from '@react-spring/web'
import UnchartedRingControl from './UnchartedRingControl'

const UnchartedRing = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const styles = useSpring({
    config: { ...config.molasses },
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 300,
  })

  if (!mounted) return null

  return (
    <animated.div style={styles} className="h-52">
      <Canvas mode="concurrent" camera={{ fov: 40, near: 0.1, far: 1000, position: [0, 0, 6] }}>
        <UnchartedRingControl />
        <AdaptiveEvents />
      </Canvas>
    </animated.div>
  )
}

export default UnchartedRing
