// Descarga las imágenes (256 y 1024) de todos los casos a public/casos/.
import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const BASE = 'https://myrubik.com'
const OUT = 'public/casos'

// Lista de rutas de imagen a descargar (de la extracción previa).
const paths = [
  // F2L básicos
  'F2L/B1', 'F2L/B2', 'F2L/B3', 'F2L/B4',
  // F2L arista+esquina blanco al lateral
  'F2L/AE1', 'F2L/AE2', 'F2L/AE3', 'F2L/AE4', 'F2L/AE5', 'F2L/AE6',
  'F2L/AE7', 'F2L/AE8', 'F2L/AE9', 'F2L/AE10', 'F2L/AE11', 'F2L/AE12',
  // F2L blanco arriba
  'F2L/UP1', 'F2L/UP2', 'F2L/UP3', 'F2L/UP4', 'F2L/UP5', 'F2L/UP6', 'F2L/UP7', 'F2L/UP8',
  // OLL esquinas
  'OLL/CR1', 'OLL/CR2', 'OLL/CR3', 'OLL/CR4', 'OLL/CR5', 'OLL/CR6', 'OLL/CR7',
  // PLL aristas (completo)
  'PLL/complet/U1', 'PLL/complet/U2', 'PLL/complet/Z', 'PLL/complet/H',
  // PLL esquinas (reducido)
  'PLL/reduit/PLL1', 'PLL/reduit/PLL2',
]

// Imágenes de la cruz amarilla (OLL aristas) — usan rutas de principiante.
const crossPaths = [
  'principiant/creu_groga_L',
  'principiant/creu_groga_linia',
  'principiant/creu_groga_punt',
]

const prefix = '/3x3x3/resolucio/fridrich/'
const allUrls = []
for (const p of paths) {
  allUrls.push(`${prefix}${p}_256.webp`)
  allUrls.push(`${prefix}${p}_1024.webp`)
}
for (const p of crossPaths) {
  allUrls.push(`/3x3x3/resolucio/${p}_256.webp`)
  allUrls.push(`/3x3x3/resolucio/${p}_1024.webp`)
}

const browser = await chromium.launch()
const context = await browser.newContext({ ignoreHTTPSErrors: true })
const page = await context.newPage()
// Visitar el sitio para establecer sesión/cookies.
await page.goto(`${BASE}/es/solve/3x3x3/reduced-fridrich`, {
  waitUntil: 'domcontentloaded',
  timeout: 60000,
})

let ok = 0
let fail = 0
for (const url of allUrls) {
  try {
    const resp = await context.request.get(`${BASE}${url}`)
    if (!resp.ok()) {
      console.log('FAIL', resp.status(), url)
      fail++
      continue
    }
    const buf = await resp.body()
    // Reconstruir ruta local: quitar el prefijo del sitio.
    const local = join(OUT, url.replace(/^\/3x3x3\/resolucio\//, ''))
    await mkdir(dirname(local), { recursive: true })
    await writeFile(local, buf)
    ok++
  } catch (e) {
    console.log('ERR', url, e.message)
    fail++
  }
}

console.log(`\nDescargadas: ${ok}  Fallidas: ${fail}`)
await browser.close()
