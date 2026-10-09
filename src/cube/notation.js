// Parser de notación estándar de cubo de Rubik (WCA).
// Convierte un string de algoritmo en una lista de movimientos.
//
// Soporta:
//   - Caras: U D L R F B
//   - Slices: M E S
//   - Rotaciones de cubo: x y z
//   - Capas anchas: minúsculas (u d l r f b) y notación Rw/Uw/... (un solo
//     movimiento que gira la cara + la capa central a la vez)
// Modificadores: ' (antihorario) y 2 (doble).
//
// Cada movimiento se normaliza a: { face, dir, token }
//   face: letra base ('R','r','M','x',...)
//   dir:  1 (horario), -1 (antihorario), 2 (doble)
//   token: el texto original tal cual, para mostrarlo en la UI

const VALID_FACES = new Set([
  'U', 'D', 'L', 'R', 'F', 'B',
  'M', 'E', 'S',
  'x', 'y', 'z',
  'u', 'd', 'l', 'r', 'f', 'b',
])

function modifierToDir(modifier) {
  if (modifier === '2' || modifier === "'2" || modifier === "2'") return 2
  if (modifier === "'") return -1
  return 1
}

/**
 * Parsea un algoritmo en texto a una lista de movimientos.
 * @param {string} algorithm - ej. "R U R' U'" o "r U R' U' r' F R F'"
 * @returns {Array<{face: string, dir: number, token: string}>}
 */
export function parseAlgorithm(algorithm) {
  if (!algorithm || typeof algorithm !== 'string') return []

  const tokens = algorithm
    .replace(/[()]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  const result = []

  for (const token of tokens) {
    // Notación ancha con sufijo w: Rw, Uw2, Rw', etc.
    const wideMatch = token.match(/^([UDLRFB])w('|2|'2|2')?$/)
    if (wideMatch) {
      const face = wideMatch[1].toLowerCase() // r, u, ...
      result.push({ face, dir: modifierToDir(wideMatch[2]), token })
      continue
    }

    // Movimiento normal: letra + modificador opcional.
    const match = token.match(/^([UDLRFBMESxyzudlrfb])('|2|'2|2')?$/)
    if (!match) continue

    const [, letter, modifier] = match
    if (!VALID_FACES.has(letter)) continue
    result.push({ face: letter, dir: modifierToDir(modifier), token })
  }

  return result
}

/**
 * Invierte un algoritmo (útil para plantear el caso = inverso de la solución).
 * @param {string} algorithm
 * @returns {string}
 */
export function invertAlgorithm(algorithm) {
  const tokens = algorithm
    .replace(/[()]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  return tokens
    .reverse()
    .map((token) => {
      if (token.endsWith('2')) return token
      if (token.endsWith("'")) return token.slice(0, -1)
      return token + "'"
    })
    .join(' ')
}
