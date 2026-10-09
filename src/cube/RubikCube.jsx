import {
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useEffect,
} from 'react'
import { useFrame } from '@react-three/fiber'
import { getMoveGeometry, cubieInLayer } from './moves'

const COLORS = {
  U: '#ffd500', // amarillo arriba (OLL/PLL se trabajan aquí)
  D: '#f8f8ff', // blanco abajo (cruz y primera capa)
  F: '#00b84d',
  B: '#0051ba',
  L: '#ff6d00',
  R: '#d50a2e',
  inner: '#1a1d26',
}

const CUBIE_SIZE = 0.95
const GAP = 1.02
const DEFAULT_SPEED = 7

function faceColors(x, y, z) {
  return [
    x === 1 ? COLORS.R : COLORS.inner,
    x === -1 ? COLORS.L : COLORS.inner,
    y === 1 ? COLORS.U : COLORS.inner,
    y === -1 ? COLORS.D : COLORS.inner,
    z === 1 ? COLORS.F : COLORS.inner,
    z === -1 ? COLORS.B : COLORS.inner,
  ]
}

// Un cubie: mesh con 6 materiales. position/quaternion se controlan por ref.
function Cubie({ onReady, colors }) {
  return (
    <mesh ref={onReady}>
      <boxGeometry args={[CUBIE_SIZE, CUBIE_SIZE, CUBIE_SIZE]} />
      {colors.map((c, i) => (
        <meshStandardMaterial
          key={i}
          attach={`material-${i}`}
          color={c}
          roughness={0.4}
          metalness={0.05}
        />
      ))}
    </mesh>
  )
}

/**
 * RubikCube idiomático para R3F.
 *
 * - 27 cubies viven normalmente en la escena (grupo "static").
 * - Para animar un movimiento, movemos los meshes afectados al grupo "pivot"
 *   (reparenting con THREE attach), rotamos el pivot vía useFrame sobre su
 *   rotación, y al terminar los devolvemos al estático snappeando posición
 *   y orientación a la rejilla.
 * - R3F renderiza normalmente (frameloop always), así que la rotación del
 *   pivot se ve animada.
 */
const RubikCube = forwardRef(function RubikCube({ speed = DEFAULT_SPEED, onReady }, ref) {
  const staticRef = useRef()
  const pivotRef = useRef()
  const animRef = useRef(null)

  // Definición estática de los 27 cubies y sus refs.
  const defsRef = useRef(null)
  if (defsRef.current === null) {
    const defs = []
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          defs.push({ x, y, z, colors: faceColors(x, y, z), ref: { current: null } })
        }
    defsRef.current = defs
  }
  const defs = defsRef.current

  // Coloca cada cubie en su posición inicial una vez montado.
  const placeInitial = useCallback(() => {
    defs.forEach((d) => {
      const m = d.ref.current
      if (!m) return
      m.position.set(d.x * GAP, d.y * GAP, d.z * GAP)
      m.quaternion.identity()
    })
  }, [defs])

  // Colocación inicial tras montar los meshes.
  useEffect(() => {
    placeInitial()
    if (onReady) onReady()
  }, [placeInitial, onReady])

  function beginMove(move, animate) {
    const geometry = getMoveGeometry(move)
    const stat = staticRef.current
    const pivot = pivotRef.current
    if (!geometry || !stat || !pivot) return Promise.resolve()

    // Reset pivote.
    pivot.rotation.set(0, 0, 0)
    pivot.updateMatrixWorld(true)

    // Seleccionar meshes de la capa (por su posición mundial redondeada).
    const affected = []
    defs.forEach((d) => {
      const m = d.ref.current
      if (!m) return
      const pos = {
        x: m.position.x / GAP,
        y: m.position.y / GAP,
        z: m.position.z / GAP,
      }
      if (cubieInLayer(pos, geometry)) {
        affected.push(m)
        pivot.attach(m) // mueve preservando transform mundial
      }
    })

    const commit = () => {
      pivot.rotation[geometry.axis] = geometry.angle
      pivot.updateMatrixWorld(true)
      affected.forEach((m) => {
        stat.attach(m)
        m.position.set(
          Math.round(m.position.x / GAP) * GAP,
          Math.round(m.position.y / GAP) * GAP,
          Math.round(m.position.z / GAP) * GAP,
        )
      })
      pivot.rotation.set(0, 0, 0)
      animRef.current = null
    }

    return new Promise((resolve) => {
      if (!animate) {
        commit()
        resolve()
        return
      }
      animRef.current = {
        axis: geometry.axis,
        target: geometry.angle,
        current: 0,
        commit: () => {
          commit()
          resolve()
        },
      }
    })
  }

  useFrame((_s, delta) => {
    const anim = animRef.current
    const pivot = pivotRef.current
    if (!anim || !pivot) return
    const remaining = anim.target - anim.current
    const step =
      Math.sign(remaining) * Math.min(Math.abs(remaining), speed * delta)
    anim.current += step
    pivot.rotation[anim.axis] = anim.current
    if (Math.abs(anim.target - anim.current) < 0.001) {
      anim.commit()
    }
  })

  useImperativeHandle(ref, () => ({
    applyMove(move, opts = {}) {
      return beginMove(move, opts.animate !== false)
    },
    reset() {
      animRef.current = null
      if (pivotRef.current) pivotRef.current.rotation.set(0, 0, 0)
      // Devolver todos los meshes al estático y recolocar.
      const stat = staticRef.current
      if (stat) {
        defs.forEach((d) => {
          const m = d.ref.current
          if (m && m.parent !== stat) stat.attach(m)
        })
      }
      placeInitial()
    },
    isAnimating() {
      return animRef.current !== null
    },
  }))

  return (
    <group>
      <group ref={staticRef}>
        {defs.map((d, i) => (
          <Cubie
            key={i}
            onReady={(m) => {
              d.ref.current = m
            }}
            colors={d.colors}
          />
        ))}
      </group>
      <group ref={pivotRef} />
    </group>
  )
})

export default RubikCube
