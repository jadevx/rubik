// Traduce cada movimiento (face, dir) a una rotación geométrica de una o
// varias capas de cubies: eje de rotación, capas afectadas y ángulo.
//
// Convención de ejes (vista estándar, cubo centrado en el origen):
//   +X derecha (R)    -X izquierda (L)
//   +Y arriba (U)     -Y abajo (D)
//   +Z frente (F)     -Z atrás (B)
//
// Las posiciones de los cubies van en {-1, 0, 1} por eje.
//
// `layers`: lista de valores de capa (en el eje) que giran JUNTAS.
//   - Cara simple (R): [1]
//   - Slice (M): [0]
//   - Capa ancha (r = R + M): [1, 0]  -> giran a la vez en un solo movimiento
//   - Rotación de cubo (x): null = todas las capas

const HALF_PI = Math.PI / 2

const MOVE_MAP = {
  // Caras
  R: { axis: 'x', layers: [1], sign: -1 },
  L: { axis: 'x', layers: [-1], sign: 1 },
  U: { axis: 'y', layers: [1], sign: -1 },
  D: { axis: 'y', layers: [-1], sign: 1 },
  F: { axis: 'z', layers: [1], sign: -1 },
  B: { axis: 'z', layers: [-1], sign: 1 },

  // Slices (capa central)
  M: { axis: 'x', layers: [0], sign: 1 }, // sigue a L
  E: { axis: 'y', layers: [0], sign: 1 }, // sigue a D
  S: { axis: 'z', layers: [0], sign: -1 }, // sigue a F

  // Capas anchas (minúsculas): la cara + la capa central, en el sentido de la cara.
  r: { axis: 'x', layers: [1, 0], sign: -1 }, // como R
  l: { axis: 'x', layers: [-1, 0], sign: 1 }, // como L
  u: { axis: 'y', layers: [1, 0], sign: -1 }, // como U
  d: { axis: 'y', layers: [-1, 0], sign: 1 }, // como D
  f: { axis: 'z', layers: [1, 0], sign: -1 }, // como F
  b: { axis: 'z', layers: [-1, 0], sign: 1 }, // como B

  // Rotaciones de cubo completo (layers null = todas)
  x: { axis: 'x', layers: null, sign: -1 }, // sigue a R
  y: { axis: 'y', layers: null, sign: -1 }, // sigue a U
  z: { axis: 'z', layers: null, sign: -1 }, // sigue a F
}

/**
 * Devuelve la info geométrica de un movimiento.
 * @param {{face: string, dir: number}} move
 * @returns {{axis: 'x'|'y'|'z', layers: number[]|null, angle: number}}
 */
export function getMoveGeometry(move) {
  const def = MOVE_MAP[move.face]
  if (!def) return null

  const turns = move.dir === 2 ? 2 : 1
  const direction = move.dir === -1 ? -1 : 1
  const angle = def.sign * direction * HALF_PI * turns

  return {
    axis: def.axis,
    layers: def.layers,
    angle,
  }
}

/**
 * Indica si un cubie (por su posición redondeada) pertenece a alguna de las
 * capas afectadas por este movimiento.
 */
export function cubieInLayer(position, geometry) {
  if (geometry.layers === null) return true // rotación de cubo completo
  const coord = Math.round(position[geometry.axis])
  return geometry.layers.includes(coord)
}

export { HALF_PI }
