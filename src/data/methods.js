// Estructura de datos del método Fridrich reducido (CFOP 2-look).
// Datos y algoritmos basados en la guía de myrubik.com (Fridrich Reducido),
// con las imágenes de cada caso descargadas en /public/casos.
//
// Cada caso incluye:
//   - id, code: identificación (code = etiqueta original, p.ej. "B1", "CR3")
//   - name: nombre legible
//   - description: cuándo aplicar el caso
//   - algorithm: algoritmo principal (notación estándar WCA)
//   - alternatives?: variaciones del algoritmo
//   - image: miniatura 256px del caso (en /public)
//   - imageLarge?: versión 1024px
//   - setup?: scramble para plantear el caso (por defecto el inverso del
//             algoritmo, calculado por el motor 3D)
//
// Agregar un caso nuevo = añadir un objeto con su algorithm y su image.

// Raíz de imágenes en public, respetando la base de despliegue (GitHub Pages).
const IMG = `${import.meta.env.BASE_URL}casos`

// Fase F2L — compartida entre el Fridrich reducido y el completo (es la misma).
const F2L_PHASE = {
  id: 'f2l',
  name: 'F2L',
  fullName: 'First 2 Layers — Las dos primeras capas',
  intro:
    'El F2L resuelve a la vez una esquina de la primera capa y su arista ' +
    'del segundo nivel, formando parejas e insertándolas en su ranura. ' +
    'Los casos se agrupan según dónde esté la pieza blanca de la esquina.',
  groups: [
    {
      id: 'f2l-basicos',
      name: 'Básicos (arista y esquina en la capa superior)',
      cases: [
        { id: 'f2l-b1', code: 'B1', name: 'Básico B1', description: 'Pareja preparada para insertar por el frente.', algorithm: "U' F' U F", image: `${IMG}/fridrich/F2L/B1_256.webp`, imageLarge: `${IMG}/fridrich/F2L/B1_1024.webp` },
        { id: 'f2l-b2', code: 'B2', name: 'Básico B2', description: 'Caso que requiere reorientar la pareja antes de insertar.', algorithm: "R U' R' U R U' R' U2 R U' R'", image: `${IMG}/fridrich/F2L/B2_256.webp`, imageLarge: `${IMG}/fridrich/F2L/B2_1024.webp` },
        { id: 'f2l-b3', code: 'B3', name: 'Básico B3', description: 'Inserción directa por el frente.', algorithm: "F' U' F", image: `${IMG}/fridrich/F2L/B3_256.webp`, imageLarge: `${IMG}/fridrich/F2L/B3_1024.webp` },
        { id: 'f2l-b4', code: 'B4', name: 'Básico B4', description: 'Inserción directa por la derecha.', algorithm: "R U R'", image: `${IMG}/fridrich/F2L/B4_256.webp`, imageLarge: `${IMG}/fridrich/F2L/B4_1024.webp` },
      ],
    },
    {
      id: 'f2l-lateral',
      name: 'Esquina con el blanco hacia un lateral',
      cases: [
        { id: 'f2l-ae1', code: 'AE1', name: 'AE1', description: 'Blanco de la esquina mirando a un lado.', algorithm: "R U' R' U R U' R' U2", image: `${IMG}/fridrich/F2L/AE1_256.webp`, imageLarge: `${IMG}/fridrich/F2L/AE1_1024.webp` },
        { id: 'f2l-ae2', code: 'AE2', name: 'AE2', description: 'Blanco al lateral; separa, orienta e inserta.', algorithm: "U' R' U2 R U F' U' F", image: `${IMG}/fridrich/F2L/AE2_256.webp`, imageLarge: `${IMG}/fridrich/F2L/AE2_1024.webp` },
        { id: 'f2l-ae3', code: 'AE3', name: 'AE3', description: 'Blanco al lateral.', algorithm: "R U' R' U2 F' U' F", image: `${IMG}/fridrich/F2L/AE3_256.webp`, imageLarge: `${IMG}/fridrich/F2L/AE3_1024.webp` },
        { id: 'f2l-ae4', code: 'AE4', name: 'AE4', description: 'Blanco al lateral.', algorithm: "F' U F U2 R U R'", image: `${IMG}/fridrich/F2L/AE4_256.webp`, imageLarge: `${IMG}/fridrich/F2L/AE4_1024.webp` },
        { id: 'f2l-ae5', code: 'AE5', name: 'AE5', description: 'Blanco al lateral.', algorithm: "U' R U' R' U R U R'", image: `${IMG}/fridrich/F2L/AE5_256.webp`, imageLarge: `${IMG}/fridrich/F2L/AE5_1024.webp` },
        { id: 'f2l-ae6', code: 'AE6', name: 'AE6', description: 'Blanco al lateral; usa un giro d para colocar.', algorithm: "d R' U R U' R' U' R", image: `${IMG}/fridrich/F2L/AE6_256.webp`, imageLarge: `${IMG}/fridrich/F2L/AE6_1024.webp` },
        { id: 'f2l-ae7', code: 'AE7', name: 'AE7', description: 'Blanco al lateral.', algorithm: "U F' U' F U2 F' U F", image: `${IMG}/fridrich/F2L/AE7_256.webp`, imageLarge: `${IMG}/fridrich/F2L/AE7_1024.webp` },
        { id: 'f2l-ae8', code: 'AE8', name: 'AE8', description: 'Blanco al lateral.', algorithm: "U' R U R' U' R U2 R", image: `${IMG}/fridrich/F2L/AE8_256.webp`, imageLarge: `${IMG}/fridrich/F2L/AE8_1024.webp` },
        { id: 'f2l-ae9', code: 'AE9', name: 'AE9', description: 'Blanco al lateral.', algorithm: "U' R U R' U R U R'", image: `${IMG}/fridrich/F2L/AE9_256.webp`, imageLarge: `${IMG}/fridrich/F2L/AE9_1024.webp` },
        { id: 'f2l-ae10', code: 'AE10', name: 'AE10', description: 'Blanco al lateral.', algorithm: "U' R U' R' U F' U' F", image: `${IMG}/fridrich/F2L/AE10_256.webp`, imageLarge: `${IMG}/fridrich/F2L/AE10_1024.webp` },
        { id: 'f2l-ae11', code: 'AE11', name: 'AE11', description: 'Blanco al lateral; incluye rotación y\'.', algorithm: "y' U R' U2 R U2 R' U R", image: `${IMG}/fridrich/F2L/AE11_256.webp`, imageLarge: `${IMG}/fridrich/F2L/AE11_1024.webp` },
        { id: 'f2l-ae12', code: 'AE12', name: 'AE12', description: 'Blanco al lateral.', algorithm: "U' R U2 R' U2 R U' R'", image: `${IMG}/fridrich/F2L/AE12_256.webp`, imageLarge: `${IMG}/fridrich/F2L/AE12_1024.webp` },
      ],
    },
    {
      id: 'f2l-arriba',
      name: 'Esquina con el blanco hacia arriba',
      cases: [
        { id: 'f2l-up1', code: 'UP1', name: 'UP1', description: 'Blanco de la esquina mirando hacia arriba.', algorithm: "R U R' U2 R U R' U' R U R'", image: `${IMG}/fridrich/F2L/UP1_256.webp`, imageLarge: `${IMG}/fridrich/F2L/UP1_1024.webp` },
        { id: 'f2l-up2', code: 'UP2', name: 'UP2', description: 'Blanco hacia arriba.', algorithm: "R U R' U R U2 R' F' U2 F", image: `${IMG}/fridrich/F2L/UP2_256.webp`, imageLarge: `${IMG}/fridrich/F2L/UP2_1024.webp` },
        { id: 'f2l-up3', code: 'UP3', name: 'UP3', description: 'Blanco hacia arriba.', algorithm: "F' U2 F U F' U' F", image: `${IMG}/fridrich/F2L/UP3_256.webp`, imageLarge: `${IMG}/fridrich/F2L/UP3_1024.webp` },
        { id: 'f2l-up4', code: 'UP4', name: 'UP4', description: 'Blanco hacia arriba.', algorithm: "R U2 R' U' R U R'", image: `${IMG}/fridrich/F2L/UP4_256.webp`, imageLarge: `${IMG}/fridrich/F2L/UP4_1024.webp` },
        { id: 'f2l-up5', code: 'UP5', name: 'UP5', description: 'Blanco hacia arriba.', algorithm: "U' F' U2 F U' F' U F", image: `${IMG}/fridrich/F2L/UP5_256.webp`, imageLarge: `${IMG}/fridrich/F2L/UP5_1024.webp` },
        { id: 'f2l-up6', code: 'UP6', name: 'UP6', description: 'Blanco hacia arriba.', algorithm: "U R U2 R' U R U' R'", image: `${IMG}/fridrich/F2L/UP6_256.webp`, imageLarge: `${IMG}/fridrich/F2L/UP6_1024.webp` },
        { id: 'f2l-up7', code: 'UP7', name: 'UP7', description: 'Blanco hacia arriba.', algorithm: "U2 R U R' U R U' R'", image: `${IMG}/fridrich/F2L/UP7_256.webp`, imageLarge: `${IMG}/fridrich/F2L/UP7_1024.webp` },
        { id: 'f2l-up8', code: 'UP8', name: 'UP8', description: 'Blanco hacia arriba.', algorithm: "U2 F' U' F U' F' U F", image: `${IMG}/fridrich/F2L/UP8_256.webp`, imageLarge: `${IMG}/fridrich/F2L/UP8_1024.webp` },
      ],
    },
  ],
}

export const METHODS = {
  'reduced-fridrich': {
    id: 'reduced-fridrich',
    name: 'Fridrich reducido',
    shortName: 'CFOP 2-look',
    description:
      'Versión simplificada del método Fridrich (CFOP). Resuelve la cruz, ' +
      'los primeros dos niveles (F2L), y la última capa en dos pasos: ' +
      'orientar (OLL reducido) y permutar (PLL reducido). Es el puente ideal ' +
      'entre el método principiante y el Fridrich completo.',
    phases: [
      F2L_PHASE,
      {
        id: 'oll',
        name: 'OLL',
        fullName: 'Orientation of the Last Layer — Orientación de la última capa',
        intro:
          'La OLL reducida orienta la última capa en dos pasos: primero se ' +
          'forma la cruz amarilla (orientar aristas) y después se orientan las ' +
          'esquinas para dejar toda la cara amarilla arriba.',
        groups: [
          {
            id: 'oll-cruz',
            name: 'Paso 1 — Cruz amarilla (orientar aristas)',
            cases: [
              { id: 'oll-cruz-l', code: 'L', name: 'Forma de L (ángulo)', description: 'Dos aristas amarillas forman una L. Colócala arriba-izquierda.', algorithm: "F U R U' R' F'", image: `${IMG}/principiant/creu_groga_L_256.webp`, imageLarge: `${IMG}/principiant/creu_groga_L_1024.webp` },
              { id: 'oll-cruz-linea', code: 'Línea', name: 'Línea horizontal', description: 'Dos aristas amarillas en línea. Colócala horizontal.', algorithm: "F R U R' U' F'", image: `${IMG}/principiant/creu_groga_linia_256.webp`, imageLarge: `${IMG}/principiant/creu_groga_linia_1024.webp` },
              { id: 'oll-cruz-punto', code: 'Punto', name: 'Punto (ninguna arista)', description: 'Ninguna arista amarilla orientada. Se aplica el algoritmo de la línea, se gira U2 y se repite para formar la cruz.', algorithm: "F R U R' U' F' U2 F U R U' R' F'", notes: ['Truco: este caso equivale a hacer el algoritmo de la Línea (F R U R\' U\' F\'), girar la capa superior U2, y volver a hacerlo. Si lo prefieres, puedes resolverlo en dos pasos: primero el de la Línea para pasar a punto→L o línea, y luego el que corresponda.'], image: `${IMG}/principiant/creu_groga_punt_256.webp`, imageLarge: `${IMG}/principiant/creu_groga_punt_1024.webp` },
            ],
          },
          {
            id: 'oll-esquinas',
            name: 'Paso 2 — Orientar esquinas',
            cases: [
              { id: 'oll-cr1', code: 'CR1', name: 'CR1', description: 'Orientación de esquinas (caso CR1).', algorithm: "R U2 R' U' R U R' U' R U' R'", image: `${IMG}/fridrich/OLL/CR1_256.webp`, imageLarge: `${IMG}/fridrich/OLL/CR1_1024.webp` },
              { id: 'oll-cr2', code: 'CR2', name: 'CR2', description: 'Orientación de esquinas (caso CR2).', algorithm: "R U2 R2 U' R2 U' R2 U2 R", image: `${IMG}/fridrich/OLL/CR2_256.webp`, imageLarge: `${IMG}/fridrich/OLL/CR2_1024.webp` },
              { id: 'oll-cr3', code: 'CR3', name: 'CR3', description: 'Orientación de esquinas (caso CR3).', algorithm: "L' U R U' L U R'", image: `${IMG}/fridrich/OLL/CR3_256.webp`, imageLarge: `${IMG}/fridrich/OLL/CR3_1024.webp` },
              { id: 'oll-cr4', code: 'CR4', name: 'CR4', description: 'Orientación de esquinas (caso CR4).', algorithm: "R U' L' U R' U' L", image: `${IMG}/fridrich/OLL/CR4_256.webp`, imageLarge: `${IMG}/fridrich/OLL/CR4_1024.webp` },
              { id: 'oll-cr5', code: 'CR5', name: 'CR5', description: 'Orientación de esquinas (caso CR5).', algorithm: "R2 D' R U2 R' D R U2 R", image: `${IMG}/fridrich/OLL/CR5_256.webp`, imageLarge: `${IMG}/fridrich/OLL/CR5_1024.webp` },
              { id: 'oll-cr6', code: 'CR6', name: 'CR6', description: 'Orientación de esquinas (caso CR6).', algorithm: "r U R' U' r' F R F'", image: `${IMG}/fridrich/OLL/CR6_256.webp`, imageLarge: `${IMG}/fridrich/OLL/CR6_1024.webp` },
              { id: 'oll-cr7', code: 'CR7', name: 'CR7', description: 'Orientación de esquinas (caso CR7).', algorithm: "R' F' L' F R F' L F", image: `${IMG}/fridrich/OLL/CR7_256.webp`, imageLarge: `${IMG}/fridrich/OLL/CR7_1024.webp` },
            ],
          },
        ],
      },
      {
        id: 'pll',
        name: 'PLL',
        fullName: 'Permutation of the Last Layer — Permutación de la última capa',
        intro:
          'La PLL reducida permuta la última capa en dos pasos: primero se ' +
          'colocan las esquinas en su sitio y después se permutan las aristas.',
        groups: [
          {
            id: 'pll-esquinas',
            name: 'Paso 1 — Permutar esquinas',
            cases: [
              {
                id: 'pll-corner',
                code: 'Esquinas',
                name: 'Permutar esquinas',
                description:
                  'Coloca al frente la cara que tenga las dos esquinas ya ' +
                  'correctas (si no hay ninguna correcta, hazlo en cualquier ' +
                  'orientación). Un solo algoritmo resuelve ambos casos ' +
                  '(adyacente y diagonal).',
                algorithm: "L' B L' F2 L B' L' F2 L2",
                notes: [
                  'Localiza las dos esquinas que ya están bien colocadas (comparten color en una cara) y ponlas al frente antes de ejecutar el algoritmo.',
                  'Si ninguna pareja de esquinas es correcta (caso diagonal), ejecútalo en cualquier orientación: tras aplicarlo quedarás en el caso adyacente, y repitiéndolo con la cara correcta al frente terminas de permutar.',
                ],
                image: `${IMG}/fridrich/PLL/reduit/PLL1_256.webp`,
                imageLarge: `${IMG}/fridrich/PLL/reduit/PLL1_1024.webp`,
              },
            ],
          },
          {
            id: 'pll-aristas',
            name: 'Paso 2 — Permutar aristas',
            cases: [
              { id: 'pll-u1', code: 'U1', name: 'Ua-perm (ciclo de 3 aristas)', description: 'Tres aristas rotan en un sentido; la cuarta ya está bien.', algorithm: "R U R' U R' U' R2 U' R' U R' U R", image: `${IMG}/fridrich/PLL/complet/U1_256.webp`, imageLarge: `${IMG}/fridrich/PLL/complet/U1_1024.webp` },
              { id: 'pll-u2', code: 'U2', name: 'Ub-perm (ciclo de 3 aristas)', description: 'El ciclo de aristas en el sentido contrario a Ua.', algorithm: "R' U R' U' R' U' R' U R U R2", image: `${IMG}/fridrich/PLL/complet/U2_256.webp`, imageLarge: `${IMG}/fridrich/PLL/complet/U2_1024.webp` },
              { id: 'pll-z', code: 'Z', name: 'Z-perm', description: 'Dos pares de aristas adyacentes se intercambian.', algorithm: "M2 U' M2 U' M' U2 M2 U2 M' U2", image: `${IMG}/fridrich/PLL/complet/Z_256.webp`, imageLarge: `${IMG}/fridrich/PLL/complet/Z_1024.webp` },
              { id: 'pll-h', code: 'H', name: 'H-perm', description: 'Las aristas opuestas se intercambian entre sí.', algorithm: "M2 U M2 U2 M2 U M2", image: `${IMG}/fridrich/PLL/complet/H_256.webp`, imageLarge: `${IMG}/fridrich/PLL/complet/H_1024.webp` },
            ],
          },
        ],
      },
    ],
  },

  'complete-fridrich': {
    id: 'complete-fridrich',
    name: 'Fridrich completo',
    shortName: 'CFOP',
    description:
      'El método Fridrich (CFOP) completo. Usa el mismo F2L que el reducido, ' +
      'pero resuelve la última capa de una sola vez: la OLL orienta toda la ' +
      'cara amarilla en un paso y la PLL permuta las piezas en un paso. Es el ' +
      'método usado por los velocistas.',
    phases: [
      // F2L es idéntico al del Fridrich reducido: se reutiliza la misma fase.
      F2L_PHASE,
      {
        id: 'oll',
        name: 'OLL',
        fullName: 'Orientation of the Last Layer — Orientación en un paso',
        intro:
          'En el Fridrich completo la OLL orienta toda la cara amarilla con un ' +
          'solo algoritmo. Aquí se incluyen los casos de orientación de ' +
          'esquinas (los demás casos se irán añadiendo).',
        groups: [
          {
            id: 'oll-full',
            name: 'Orientación de la última capa',
            cases: [
              { id: 'coll-cr1', code: 'CR1', name: 'CR1', description: 'Orientación de esquinas (caso CR1).', algorithm: "R U2 R' U' R U R' U' R U' R'", image: `${IMG}/fridrich/OLL/CR1_256.webp`, imageLarge: `${IMG}/fridrich/OLL/CR1_1024.webp` },
              { id: 'coll-cr2', code: 'CR2', name: 'CR2', description: 'Orientación de esquinas (caso CR2).', algorithm: "R U2 R2 U' R2 U' R2 U2 R", image: `${IMG}/fridrich/OLL/CR2_256.webp`, imageLarge: `${IMG}/fridrich/OLL/CR2_1024.webp` },
              { id: 'coll-cr3', code: 'CR3', name: 'CR3', description: 'Orientación de esquinas (caso CR3).', algorithm: "L' U R U' L U R'", image: `${IMG}/fridrich/OLL/CR3_256.webp`, imageLarge: `${IMG}/fridrich/OLL/CR3_1024.webp` },
              { id: 'coll-cr4', code: 'CR4', name: 'CR4', description: 'Orientación de esquinas (caso CR4).', algorithm: "R U' L' U R' U' L", image: `${IMG}/fridrich/OLL/CR4_256.webp`, imageLarge: `${IMG}/fridrich/OLL/CR4_1024.webp` },
              { id: 'coll-cr5', code: 'CR5', name: 'CR5', description: 'Orientación de esquinas (caso CR5).', algorithm: "R2 D' R U2 R' D R U2 R", image: `${IMG}/fridrich/OLL/CR5_256.webp`, imageLarge: `${IMG}/fridrich/OLL/CR5_1024.webp` },
              { id: 'coll-cr6', code: 'CR6', name: 'CR6', description: 'Orientación de esquinas (caso CR6).', algorithm: "r U R' U' r' F R F'", image: `${IMG}/fridrich/OLL/CR6_256.webp`, imageLarge: `${IMG}/fridrich/OLL/CR6_1024.webp` },
              { id: 'coll-cr7', code: 'CR7', name: 'CR7', description: 'Orientación de esquinas (caso CR7).', algorithm: "R' F' L' F R F' L F", image: `${IMG}/fridrich/OLL/CR7_256.webp`, imageLarge: `${IMG}/fridrich/OLL/CR7_1024.webp` },
            ],
          },
        ],
      },
      {
        id: 'pll',
        name: 'PLL',
        fullName: 'Permutation of the Last Layer — Permutación en un paso',
        intro:
          'En el Fridrich completo la PLL permuta todas las piezas de la última ' +
          'capa con un solo algoritmo. Aquí están las permutaciones de aristas ' +
          '(los demás casos se irán añadiendo).',
        groups: [
          {
            id: 'pll-full',
            name: 'Permutación de la última capa',
            cases: [
              { id: 'cpll-ua', code: 'Ua', name: 'Ua-perm', description: 'Ciclo de 3 aristas en sentido horario.', algorithm: "R U R' U R' U' R2 U' R' U R' U R", image: `${IMG}/fridrich/PLL/complet/U1_256.webp`, imageLarge: `${IMG}/fridrich/PLL/complet/U1_1024.webp` },
              { id: 'cpll-ub', code: 'Ub', name: 'Ub-perm', description: 'Ciclo de 3 aristas en sentido antihorario.', algorithm: "R' U R' U' R' U' R' U R U R2", image: `${IMG}/fridrich/PLL/complet/U2_256.webp`, imageLarge: `${IMG}/fridrich/PLL/complet/U2_1024.webp` },
              { id: 'cpll-z', code: 'Z', name: 'Z-perm', description: 'Dos pares de aristas adyacentes se intercambian.', algorithm: "M2 U' M2 U' M' U2 M2 U2 M' U2", image: `${IMG}/fridrich/PLL/complet/Z_256.webp`, imageLarge: `${IMG}/fridrich/PLL/complet/Z_1024.webp` },
              { id: 'cpll-h', code: 'H', name: 'H-perm', description: 'Las aristas opuestas se intercambian entre sí.', algorithm: "M2 U M2 U2 M2 U M2", image: `${IMG}/fridrich/PLL/complet/H_256.webp`, imageLarge: `${IMG}/fridrich/PLL/complet/H_1024.webp` },
            ],
          },
        ],
      },
    ],
  },
}

// Helpers de acceso.

export function getMethod(methodId) {
  return METHODS[methodId] || null
}

export function getPhase(methodId, phaseId) {
  const method = getMethod(methodId)
  if (!method) return null
  return method.phases.find((p) => p.id === phaseId) || null
}

export function getCase(methodId, phaseId, caseId) {
  const phase = getPhase(methodId, phaseId)
  if (!phase) return null
  for (const group of phase.groups) {
    const found = group.cases.find((c) => c.id === caseId)
    if (found) return { ...found, group }
  }
  return null
}

export function getAllMethods() {
  return Object.values(METHODS)
}
