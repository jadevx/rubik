// Simulador lógico del cubo (independiente del 3D) para VERIFICAR que el
// parser de notación y la geometría de movimientos son correctos.
//
// Modela los 26 cubies visibles por su posición y orientación usando la
// MISMA geometría que el render (getMoveGeometry): rota el vector posición
// y la orientación con una matriz de rotación de 90° sobre el eje indicado.
import { parseAlgorithm, invertAlgorithm } from '../src/cube/notation.js'
import { getMoveGeometry, cubieInLayer } from '../src/cube/moves.js'

function rotateVec(v, axis, angle) {
  const c = Math.round(Math.cos(angle))
  const s = Math.round(Math.sin(angle))
  const { x, y, z } = v
  if (axis === 'x') return { x, y: y * c - z * s, z: y * s + z * c }
  if (axis === 'y') return { x: x * c + z * s, y, z: -x * s + z * c }
  return { x: x * c - y * s, y: x * s + y * c, z } // z
}

function makeSolved() {
  const list = []
  let id = 0
  for (let x = -1; x <= 1; x++)
    for (let y = -1; y <= 1; y++)
      for (let z = -1; z <= 1; z++) {
        // orient: para detectar giros, guardamos un marco de 3 vectores.
        list.push({
          id: id++,
          pos: { x, y, z },
          ax: { x: 1, y: 0, z: 0 },
          ay: { x: 0, y: 1, z: 0 },
        })
      }
  return list
}

function applyMove(state, move) {
  const g = getMoveGeometry(move)
  if (!g) return state
  const turns = Math.abs(Math.round(g.angle / (Math.PI / 2)))
  // aplicar 1 o 2 cuartos de giro
  let st = state
  const unit = g.angle / turns || 0
  for (let t = 0; t < (turns || 0); t++) {
    st = st.map((cubie) => {
      if (!cubieInLayer(cubie.pos, g)) return cubie
      return {
        ...cubie,
        pos: rotateVec(cubie.pos, g.axis, unit),
        ax: rotateVec(cubie.ax, g.axis, unit),
        ay: rotateVec(cubie.ay, g.axis, unit),
      }
    })
  }
  return st
}

function applyAlg(state, alg) {
  let st = state
  for (const mv of parseAlgorithm(alg)) st = applyMove(st, mv)
  return st
}

function isSolved(state) {
  const solved = makeSolved()
  const byId = Object.fromEntries(solved.map((c) => [c.id, c]))
  return state.every((c) => {
    const s = byId[c.id]
    return (
      c.pos.x === s.pos.x && c.pos.y === s.pos.y && c.pos.z === s.pos.z &&
      c.ax.x === s.ax.x && c.ax.y === s.ax.y && c.ax.z === s.ax.z &&
      c.ay.x === s.ay.x && c.ay.y === s.ay.y && c.ay.z === s.ay.z
    )
  })
}

function assert(name, cond) {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}`)
  return cond
}

let allOk = true

// 1) Sexy move (R U R' U') x6 = resuelto
{
  let st = makeSolved()
  for (let i = 0; i < 6; i++) st = applyAlg(st, "R U R' U'")
  allOk &= assert("(R U R' U') x6 = resuelto", isSolved(st))
}

// 2) R R' = resuelto
{
  const st = applyAlg(makeSolved(), "R R'")
  allOk &= assert("R R' = resuelto", isSolved(st))
}

// 3) U4 = resuelto
{
  const st = applyAlg(makeSolved(), 'U U U U')
  allOk &= assert('U4 = resuelto', isSolved(st))
}

// 4) alg + inverso(alg) = resuelto, para varios algoritmos reales
const algs = [
  "R U R'",
  "U' F' U F",
  "R U2 R' U' R U R' U' R U' R'", // CR1
  "r U R' U' r' F R F'", // CR6
  "M2 U M2 U2 M2 U M2", // H-perm
  "F R U R' U' F'", // OLL línea
  "y' U R' U2 R U2 R' U R", // AE11 con y'
]
for (const alg of algs) {
  const st = applyAlg(makeSolved(), `${alg} ${invertAlgorithm(alg)}`)
  allOk &= assert(`"${alg}" + inverso = resuelto`, isSolved(st))
}

// 5) H-perm aplicada 2 veces = resuelto (es su propia inversa)
{
  let st = makeSolved()
  st = applyAlg(st, 'M2 U M2 U2 M2 U M2')
  st = applyAlg(st, 'M2 U M2 U2 M2 U M2')
  allOk &= assert('H-perm x2 = resuelto', isSolved(st))
}

console.log(allOk ? '\nTODO OK' : '\nHAY FALLOS')
process.exit(allOk ? 0 : 1)
