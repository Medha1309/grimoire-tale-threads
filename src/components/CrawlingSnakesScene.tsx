// CrawlingSnakesScene.tsx
import * as THREE from 'three'
import React, { useMemo, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'

/** Simple prefers-reduced-motion check */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    onChange()
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])
  return reduced
}

/** A small procedural stripe texture that we scroll to fake slithering scales */
function useStripeTexture({
  stripeColor = '#aa3e3e',
  baseColor = '#1a1c24',
  density = 8,
}: { stripeColor?: string; baseColor?: string; density?: number }) {
  // Generate noise seed once
  const noiseSeed = useMemo(() => Math.random(), [])
  
  return useMemo(() => {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    // Base
    ctx.fillStyle = baseColor
    ctx.fillRect(0, 0, size, size)
    // Diagonal stripes
    ctx.strokeStyle = stripeColor
    ctx.lineWidth = 10
    for (let i = -size; i < size * 2; i += size / density) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i - size, size)
      ctx.stroke()
    }
    // Add faint noise using seed
    const imgData = ctx.getImageData(0, 0, size, size)
    for (let i = 0; i < imgData.data.length; i += 4) {
      // Use deterministic noise based on seed
      const n = ((noiseSeed * (i + 1) * 9999) % 20) | 0
      imgData.data[i] += n
      imgData.data[i + 1] += n
      imgData.data[i + 2] += n
    }
    ctx.putImageData(imgData, 0, 0)

    const tex = new THREE.CanvasTexture(canvas)
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.anisotropy = 4
    return tex
  }, [stripeColor, baseColor, density, noiseSeed])
}

/** One animated snake built from a TubeGeometry that updates each frame */
function Snake({
  hue: _hue = 0.0,    // 0..1 hue base (we convert to color) - unused but kept for API
  radius = 0.08,      // tube radius
  length = 12,        // number of control points along body
  speed = 0.25,       // crawl speed
  amp = 0.8,          // amplitude of lateral sway
  freq = 1.4,         // frequency of sway
  y = 0,              // vertical offset
  z = -1.5,           // depth
  glow = 0.35,        // emissive intensity
  stripeDensity = 10, // scale for texture repeat
}: {
  hue?: number; radius?: number; length?: number; speed?: number;
  amp?: number; freq?: number; y?: number; z?: number; glow?: number;
  stripeDensity?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null!)
  
  // NEON PINK - using direct hex colors for maximum brightness
  const stripe = useStripeTexture({
    stripeColor: '#ff1493', // Hot neon pink
    baseColor: '#2d0a1f', // Dark purple-pink base
    density: 12,
  })

  const geomRef = useRef<THREE.TubeGeometry | null>(null)
  const points = useMemo(() => new Array(length).fill(0).map(() => new THREE.Vector3()), [length])

  // NEON PINK: Direct bright pink colors
  const color = useMemo(() => new THREE.Color('#ff69b4'), []) // Hot pink
  const emissive = useMemo(() => new THREE.Color('#ff1493'), []) // Deep pink glow

  useFrame(({ clock, viewport }) => {
    const t = clock.getElapsedTime()
    const baseX = ((t * speed) % (viewport.width + 6)) - (viewport.width / 2 + 3) // crawl L→R
    for (let i = 0; i < length; i++) {
      const headLag = i / (length - 1)
      const px = baseX - i * 0.25
      const py = y + Math.sin(t * freq - headLag * 3.2) * amp * (0.6 + headLag * 0.6)
      const pz = z + Math.cos(t * freq * 0.8 - headLag * 2.7) * 0.25
      points[i].set(px, py, pz)
    }
    const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5)
    const tubularSegments = 120
    const radialSegments = 10

    // Rebuild geometry (few snakes → OK performance; keep counts modest)
    const newGeom = new THREE.TubeGeometry(curve, tubularSegments, radius, radialSegments, false)
    if (geomRef.current) geomRef.current.dispose()
    geomRef.current = newGeom
    mesh.current.geometry = newGeom

    // Scroll the stripe texture to simulate scales sliding
    if (stripe.offset) {
      stripe.offset.x = (t * speed * 0.6) % 1
    }
    stripe.repeat.set(stripeDensity, 1.5)
  })

  return (
    <mesh ref={mesh}>
      {/* geometry set in useFrame */}
      <meshStandardMaterial
        color={color}
        map={stripe}
        metalness={0.1}
        roughness={0.2}
        emissive={emissive}
        emissiveIntensity={glow}
        toneMapped={false}
      />
    </mesh>
  )
}

function SnakesLayer() {
  const reduced = usePrefersReducedMotion()
  // NEON PINK SPIDERS - maximum glow intensity
  const snakes = [
    { hue: 0.92, y: -0.7, z: -1.2, speed: 0.26, amp: 0.7, radius: 0.09, glow: 1.5 },
    { hue: 0.91, y:  0.2, z: -1.8, speed: 0.22, amp: 0.9, radius: 0.08, glow: 1.6 },
    { hue: 0.93, y:  0.8, z: -2.2, speed: 0.30, amp: 1.0, radius: 0.07, glow: 1.7 },
  ]
  if (reduced) {
    // Static, tasteful serpentine silhouettes for accessibility
    return (
      <>
        {snakes.map((s, i) => (
          <Snake key={i} {...s} speed={0} amp={0} />
        ))}
        <Html center>
          <div style={{ color: '#d8cfc5', fontFamily: 'serif', fontSize: 12, opacity: 0.7 }}>
            Motion reduced
          </div>
        </Html>
      </>
    )
  }
  return (
    <>
      {snakes.map((s, i) => <Snake key={i} {...s} />)}
    </>
  )
}

/** Drop-in full scene */
export default function CrawlingSnakesScene({
  className,
  background = '#0b0a0a',
  fogColor = '#0b0a0a',
}: { className?: string; background?: string; fogColor?: string }) {
  const [error] = React.useState<Error | null>(null)

  if (error) {
    console.error('CrawlingSnakesScene error:', error)
    return null // Fail silently
  }

  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas
        gl={{ antialias: true }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 60 }}
      >
        <color attach="background" args={[background]} />
        <fog attach="fog" args={[fogColor, 4, 10]} />
        {/* Lighting adjusted for neon pink visibility */}
        <hemisphereLight intensity={0.25} color={'#ff69b4'} groundColor={'#0b0a0a'} />
        <pointLight position={[2, 1.5, 2]} intensity={0.8} color={'#ff1493'} />
        <pointLight position={[-2, -1, -1]} intensity={0.5} color={'#ff69b4'} />
        <SnakesLayer />
      </Canvas>
      {/* Optional soft vignette overlay to blend into your page */}
      <div
        aria-hidden
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(80% 60% at 50% 50%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)',
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  )
}
