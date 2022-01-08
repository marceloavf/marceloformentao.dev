import * as THREE from 'three'
import resolveConfig from 'tailwindcss/resolveConfig'
import React, { forwardRef, Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { Preload, shaderMaterial, useFBO } from '@react-three/drei'
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  ColorAverage,
  Sepia,
} from '@react-three/postprocessing'
import { useTheme } from 'next-themes'
import { BlendFunction } from 'postprocessing'
import { useSpring, animated } from '@react-spring/three'
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
    yOffset: 0.11,
    size: 0.5,
    brightness: 0.8,
  },
  vertexShader,
  fragmentShader
)

extend({ WaveShaderMaterial })

const AnimatedShaderMaterial = animated(
  forwardRef(function AnimatedShaderMaterial(props, ref) {
    return <waveShaderMaterial ref={ref} {...props} />
  })
)

const NoiseSphere = ({ theme }) => {
  const ref = useRef()
  const { size, viewport } = useThree()

  let bufferTarget = useFBO()
  let bufferFeedback = useFBO()

  const fullConfig = resolveConfig(tailwindConfig)

  const baseBackgroundColor = new THREE.Color(
    fullConfig.theme.backgroundColor.violet[1000]
  ).toVector()
  const blackBackgroundColor = new THREE.Color('black').toVector()

  useEffect(() => {
    ref.current.uniforms.backgroundColor.value =
      theme === 'dark' ? baseBackgroundColor : blackBackgroundColor
    ref.current.uniforms.brightness.value = theme === 'dark' ? 0.8 : 0.01
  }, [baseBackgroundColor, blackBackgroundColor, theme])

  useEffect(() => {
    // TODO: add variance of yOffset to lower screen resolution fullConfig.theme.screens
    if (ref.current) {
      console.log(ref)
      ref.current.uniforms.iResolution.value.x = size.width
      ref.current.uniforms.iResolution.value.y = size.height
      ref.current.uniforms.iDpr.value = viewport.dpr || 1
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

  const { scale } = useSpring({
    to: {
      scale: 0.5,
    },
    from: { scale: 0 },
    config: { mass: 5, tension: 280, friction: 150 },
  })

  return (
    <mesh>
      <planeGeometry attach="geometry" args={[2, 2]} />
      <AnimatedShaderMaterial ref={ref} attach="material" uniforms-size-value={scale} />
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
    <div className="absolute top-0 -z-1 inset-x-0 m-auto h-full">
      <Canvas
        linear
        concurrent
        camera={{ position: [0, 0, 1] }}
        gl={{ alpha: false, antialias: false }}
        className="invert saturate-1000 brightness-100 hue-rotate-53 dark:filter-none"
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
      </Canvas>
    </div>
  )
}

export default HeroEffect
