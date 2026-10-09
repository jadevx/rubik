import { useRef, useState, useCallback, useEffect, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import RubikCube from './RubikCube'
import { parseAlgorithm, invertAlgorithm } from './notation'

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

/**
 * CubePlayer — reproductor del algoritmo sobre un cubo 3D.
 *
 * Props:
 *   algorithm: string  -> algoritmo en notación estándar (ej. "R U R'")
 *   setup?: string     -> movimientos previos para plantear el caso.
 *                         Si no se da, se usa el inverso del algoritmo.
 *   autoSpeedMs?: number -> pausa entre movimientos en modo automático.
 */
export default function CubePlayer({ algorithm, setup, autoSpeedMs = 1000 }) {
  const cubeRef = useRef(null)
  const [stepIndex, setStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [busy, setBusy] = useState(false)

  // Índice y estado de reproducción como refs = fuente de verdad, sin stale closures.
  const indexRef = useRef(0)
  const playingRef = useRef(false)
  const runTokenRef = useRef(0) // invalida bucles anteriores

  const moves = useMemo(() => parseAlgorithm(algorithm), [algorithm])

  const setupMoves = useMemo(() => {
    const src = setup && setup.trim() ? setup : invertAlgorithm(algorithm)
    return parseAlgorithm(src)
  }, [setup, algorithm])

  // Velocidad angular del giro, proporcional a la cadencia elegida.
  const turnSpeed = useMemo(
    () => Math.max(4, Math.min(12, 7000 / autoSpeedMs)),
    [autoSpeedMs],
  )

  const setIndex = useCallback((n) => {
    indexRef.current = n
    setStepIndex(n)
  }, [])

  const applySetup = useCallback(async () => {
    const cube = cubeRef.current
    if (!cube) return
    cube.reset()
    for (const move of setupMoves) {
      await cube.applyMove(move, { animate: false })
    }
  }, [setupMoves])

  const stopAuto = useCallback(() => {
    playingRef.current = false
    runTokenRef.current += 1 // cancela cualquier bucle en curso
    setIsPlaying(false)
  }, [])

  const resetCase = useCallback(async () => {
    stopAuto()
    setBusy(true)
    await applySetup()
    setIndex(0)
    setBusy(false)
  }, [applySetup, stopAuto, setIndex])

  // Plantear el caso al montar / cambiar algoritmo.
  // Plantear el caso cuando el cubo esté listo (y al cambiar algoritmo).
  const readyRef = useRef(false)
  const doSetup = useCallback(async () => {
    await applySetup()
    setIndex(0)
  }, [applySetup, setIndex])

  const handleReady = useCallback(() => {
    readyRef.current = true
    doSetup()
  }, [doSetup])

  // Si cambia el algoritmo/caso y el cubo ya estaba listo, re-plantear.
  useEffect(() => {
    if (readyRef.current) doSetup()
    return () => {
      runTokenRef.current += 1
      playingRef.current = false
    }
  }, [doSetup])

  // Un solo paso manual.
  const stepForward = useCallback(async () => {
    const cube = cubeRef.current
    if (!cube || busy || playingRef.current) return
    const i = indexRef.current
    if (i >= moves.length) return
    setBusy(true)
    await cube.applyMove(moves[i], { animate: true })
    setIndex(i + 1)
    setBusy(false)
  }, [busy, moves, setIndex])

  // Bucle de reproducción automática: espera cada animación + pausa.
  const runAuto = useCallback(async () => {
    const cube = cubeRef.current
    if (!cube) return
    const token = ++runTokenRef.current
    playingRef.current = true
    setIsPlaying(true)

    // Si ya está al final, reiniciar el caso antes de reproducir.
    if (indexRef.current >= moves.length) {
      await applySetup()
      setIndex(0)
    }

    while (playingRef.current && runTokenRef.current === token) {
      const i = indexRef.current
      if (i >= moves.length) break
      await cube.applyMove(moves[i], { animate: true })
      if (!playingRef.current || runTokenRef.current !== token) break
      setIndex(i + 1)
      if (indexRef.current >= moves.length) break
      await wait(autoSpeedMs)
    }

    if (runTokenRef.current === token) {
      playingRef.current = false
      setIsPlaying(false)
    }
  }, [moves, applySetup, autoSpeedMs, setIndex])

  const togglePlay = useCallback(() => {
    if (playingRef.current) {
      stopAuto()
    } else {
      runAuto()
    }
  }, [stopAuto, runAuto])

  const done = stepIndex >= moves.length

  return (
    <div className="flex flex-col gap-4">
      <div className="relative h-[360px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-100 to-slate-200 shadow-inner sm:h-[440px]">
        <Canvas camera={{ position: [4.2, 4, 6], fov: 42 }} dpr={[1, 2]}>
          <color attach="background" args={['#e8edf5']} />
          <ambientLight intensity={0.95} />
          <directionalLight position={[5, 8, 6]} intensity={1.2} />
          <directionalLight position={[-5, -2, -4]} intensity={0.5} />
          <RubikCube ref={cubeRef} speed={turnSpeed} onReady={handleReady} />
          <OrbitControls
            enablePan={false}
            minDistance={5}
            maxDistance={14}
            enableDamping
          />
        </Canvas>

        <div className="pointer-events-none absolute left-3 top-3 flex max-w-[90%] flex-wrap gap-1">
          {moves.map((m, i) => (
            <span
              key={i}
              className={`rounded px-1.5 py-0.5 text-xs font-mono font-semibold shadow-sm transition-colors ${
                i < stepIndex
                  ? 'bg-emerald-500 text-white'
                  : i === stepIndex
                    ? 'bg-amber-400 text-slate-900'
                    : 'bg-white/90 text-slate-500'
              }`}
            >
              {m.token}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={resetCase}
          disabled={busy}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-40"
        >
          ↺ Reiniciar
        </button>
        <button
          onClick={stepForward}
          disabled={busy || isPlaying || done}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-40"
        >
          Paso ▶
        </button>
        <button
          onClick={togglePlay}
          className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-bold text-white shadow transition hover:bg-indigo-500"
        >
          {isPlaying ? '⏸ Pausar' : done ? '↻ Repetir' : '▶ Resolver'}
        </button>
      </div>

      <p className="text-center text-xs font-medium text-slate-400">
        Movimiento {Math.min(stepIndex, moves.length)} de {moves.length}
        {done && ' — ¡completado!'}
      </p>
    </div>
  )
}
