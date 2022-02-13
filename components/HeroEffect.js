import * as THREE from 'three'
import resolveConfig from 'tailwindcss/resolveConfig'
import React, { Suspense, useEffect, useRef, useState, useMemo } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { Preload, shaderMaterial, useFBO, AdaptiveEvents } from '@react-three/drei'
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  ColorAverage,
  Sepia,
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useTheme } from 'next-themes'
import { vertexShader, fragmentShader } from './shaders/HeroNoiseEffect'
import tailwindConfig from '@/tailwind.config.js'

THREE.Color.prototype.toVector = function () {
  return new THREE.Vector3(this.r, this.g, this.b)
}

const WaveShaderMaterial = shaderMaterial(
  {
    iTime: 1.0,
    iResolution: new THREE.Vector2(0, 0),
    iBuffer: new THREE.Texture(),
    iDpr: 1,
    baseColor: new THREE.Color(0x8b5cf6).toVector(),
    backgroundColor: new THREE.Color(0x120724).toVector(),
    amplitudeFactor: 0,
    xOffset: 0,
    yOffset: 0.18,
    size: 0.8,
    brightness: 0.8,
  },
  vertexShader,
  fragmentShader
)

extend({ WaveShaderMaterial })

const NoiseSphere = ({ theme }) => {
  const ref = useRef()
  const { size, viewport } = useThree()
  let bufferTarget = useFBO()
  let bufferFeedback = useFBO()

  const fullConfig = resolveConfig(tailwindConfig)

  const baseBackgroundColor = useMemo(
    () => new THREE.Color(fullConfig.theme.backgroundColor.violet[1000]).toVector(),
    [fullConfig.theme.backgroundColor.violet]
  )
  const blackBackgroundColor = useMemo(() => new THREE.Color('black').toVector(), [])

  useEffect(() => {
    ref.current.uniforms.backgroundColor.value =
      theme === 'dark' ? baseBackgroundColor : blackBackgroundColor
    ref.current.uniforms.brightness.value = theme === 'dark' ? 0.8 : 0.01
  }, [baseBackgroundColor, blackBackgroundColor, theme])

  useEffect(() => {
    // TODO: add variance of yOffset to lower screen resolution fullConfig.theme.screens
    // INFO: Modern mobile devices have high pixel ratios as high as 5 - consider limiting the max pixel ratio to 2 or 3 on these devices.
    // At the expense of some very slight blurring of your scene you will gain a considerable performance increase.
    if (ref.current) {
      ref.current.uniforms.iResolution.value.x = size.width
      ref.current.uniforms.iResolution.value.y = size.height
      ref.current.uniforms.iDpr.value = (viewport.dpr >= 3 ? 3 : viewport.dpr) || 1
    }
  }, [size, viewport.dpr])

  useFrame(({ clock, gl, scene, camera }) => {
    ref.current.iTime = clock.getElapsedTime()
    ref.current.iBuffer = bufferFeedback.texture

    gl.setRenderTarget(bufferTarget)
    gl.render(scene, camera)
    gl.setRenderTarget(null)
    gl.clear()

    let temp = bufferTarget
    bufferTarget = bufferFeedback
    bufferFeedback = temp

    gl.render(scene, camera)
    gl.setClearColor(baseBackgroundColor, 1)
  }, 1)

  return (
    <mesh dispose={null}>
      <planeGeometry attach="geometry" args={[2, 2]} dispose={null} />
      <waveShaderMaterial ref={ref} attach="material" dispose={null} />
    </mesh>
  )
}

const HeroEffect = () => {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-x-0 top-0 -z-20 m-auto h-full">
      <Canvas
        linear
        mode="concurrent"
        camera={{ position: [0, 0, 1] }}
        gl={{ alpha: false, antialias: false }}
        className="brightness-100 hue-rotate-53 invert saturate-1000 dark:filter-none"
      >
        <Suspense fallback={null} r3f>
          <NoiseSphere theme={theme} />
          <Preload all />
        </Suspense>
        <EffectComposer>
          <Bloom luminanceThreshold={0.8} />
          <ChromaticAberration />
          {theme === 'light' && (
            <>
              <ColorAverage blendFunction={BlendFunction.ALPHA} />
              <Sepia intensity={1.0} blendFunction={BlendFunction.SCREEN} />
            </>
          )}
        </EffectComposer>
        <AdaptiveEvents />
      </Canvas>
    </div>
  )
}

export default HeroEffect
