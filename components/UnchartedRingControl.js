import { Suspense, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Preload, Stars } from '@react-three/drei'
import UnchartedRingModel from './UnchartedRingModel'

const UnchartedRing = () => {
  const cameraRef = useRef()

  useFrame(({ clock }) => {
    cameraRef.current.rotation.y = clock.getElapsedTime() * 0.1
  })

  return (
    <>
      <OrbitControls
        enableZoom={false}
        enableDamping={false}
        enablePan={false}
        rotateSpeed={0.05}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
      <PerspectiveCamera ref={cameraRef} rotation={[0.4, 0, 0]} position={[0, 0, 0]}>
        <Stars radius={0.05} depth={2.4} count={200} factor={0.06} saturation={1000} fade />
        <Suspense fallback={null} r3f>
          <UnchartedRingModel position={[0, 0.4, 0]} />
          <Preload all />
        </Suspense>
      </PerspectiveCamera>
    </>
  )
}

export default UnchartedRing
