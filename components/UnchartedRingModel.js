import React, { useRef, useContext } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, useGLTF } from '@react-three/drei'
import { useSpring, animated, config } from '@react-spring/three'
import AnimationContext from '@/context/AnimationOrchestrator'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/static/images/uncharted-ring-draco.glb')
  const {
    animation: { ringEffectShouldStart },
    setAnimation,
  } = useContext(AnimationContext)

  const { scale } = useSpring({
    to: {
      scale: 0.13,
    },
    from: { scale: 0 },
    config: { ...config.slow },
    pause: !ringEffectShouldStart,
    onRest: () => setAnimation({ ringEffectIsFinished: true }),
  })

  useFrame(({ clock }) => {
    group.current.rotation.y = clock.getElapsedTime() * 0.2
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <Environment preset="studio" />
      <animated.mesh
        geometry={nodes.Mesh_0.geometry}
        material={materials['Material.001']}
        rotation={[-1.61, 0, -Math.PI]}
        scale={scale}
      />
    </group>
  )
}

useGLTF.preload('/static/images/uncharted-ring-draco.glb')
