import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/static/images/uncharted-ring-draco-transformed.glb')

  useFrame(({ clock }) => {
    group.current.rotation.y = clock.getElapsedTime() * 0.2
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <Environment files="/static/images/studio_small_03_1k.hdr" />
      <mesh
        position={[0, -0.6, 0]}
        geometry={nodes.Mesh_0.geometry}
        material={materials['Material.001']}
        rotation={[-1.61, 0, -Math.PI]}
        scale={0.13}
      />
    </group>
  )
}

useGLTF.preload('/static/images/uncharted-ring-draco-transformed.glb')
