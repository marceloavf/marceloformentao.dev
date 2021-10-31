import { Suspense, useRef } from 'react'
import { OrbitControls, Preload, PerspectiveCamera, AdaptiveEvents } from '@react-three/drei'
import UnchartedRingModel from './UnchartedRingModel'

const UnchartedRing = () => {
  const cameraRef = useRef(null)
  const controlsRef = useRef(null)

  return (
    <>
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <directionalLight position={[-10, -10, -5]} intensity={1} />
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableZoom={false}
        enableDamping
        rotateSpeed={0.1}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        camera={cameraRef.current}
      />
      <PerspectiveCamera ref={cameraRef} rotation={[0.4, 0, 0]} position={[0, 0, 0]}>
        <Suspense fallback={null} r3f>
          <UnchartedRingModel position={[0, 0.4, 0]} />
          <Preload all />
        </Suspense>
      </PerspectiveCamera>
      <AdaptiveEvents />
    </>
  )
}

export default UnchartedRing
