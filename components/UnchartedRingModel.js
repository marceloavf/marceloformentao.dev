import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/static/images/uncharted-ring-draco.glb')

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime() * 0.3
    group.current.rotation.y = a
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <Environment preset="studio" />
      <mesh
        geometry={nodes.Mesh_0.geometry}
        material={materials['Material.001']}
        rotation={[-1.61, 0, -Math.PI]}
        scale={0.13}
      ></mesh>
    </group>
  )
}

useGLTF.preload('/static/images/uncharted-ring-draco.glb')
