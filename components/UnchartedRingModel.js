import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, useGLTF } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/static/images/uncharted-ring-draco.glb')

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime() * 0.3
    group.current.rotation.y = a
  })

  const { scale } = useSpring({
    to: {
      scale: 0.13,
    },
    from: { scale: 0 },
    config: { mass: 5, tension: 280, friction: 150 },
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <Environment preset="studio" />
      <animated.mesh
        geometry={nodes.Mesh_0.geometry}
        material={materials['Material.001']}
        rotation={[-1.61, 0, -Math.PI]}
        scale={scale}
      ></animated.mesh>
    </group>
  )
}

useGLTF.preload('/static/images/uncharted-ring-draco.glb')
