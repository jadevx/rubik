import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getMethod, getPhase, getCase } from '../data/methods'
import Breadcrumb from '../components/Breadcrumb'
import CubePlayer from '../cube/CubePlayer'

const SPEEDS = [
  { label: 'Lento', ms: 1500 },
  { label: 'Normal', ms: 1000 },
  { label: 'Rápido', ms: 500 },
]

export default function CasePage() {
  const { methodId, phaseId, caseId } = useParams()
  const method = getMethod(methodId)
  const phase = getPhase(methodId, phaseId)
  const caseData = getCase(methodId, phaseId, caseId)

  const [speedMs, setSpeedMs] = useState(1000)

  if (!method || !phase || !caseData) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <p className="text-slate-500">Caso no encontrado.</p>
        <Link to="/" className="text-indigo-600 hover:underline">
          ← Volver al inicio
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Breadcrumb
        items={[
          { label: 'Inicio', to: '/' },
          { label: method.name, to: `/metodo/${method.id}` },
          { label: phase.name, to: `/metodo/${method.id}/${phase.id}` },
          { label: caseData.name },
        ]}
      />

      <header className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
          {phase.name} · {caseData.group.name}
        </span>
        <h1 className="mt-1 text-3xl font-black text-slate-800">
          {caseData.name}
        </h1>
        <p className="mt-2 max-w-3xl text-slate-500">{caseData.description}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <CubePlayer
            key={`${caseData.id}-${speedMs}`}
            algorithm={caseData.algorithm}
            setup={caseData.setup}
            autoSpeedMs={speedMs}
          />
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-400">
              Caso{caseData.code ? ` · ${caseData.code}` : ''}
            </h2>
            <img
              src={caseData.imageLarge || caseData.image}
              alt={`Caso ${caseData.name}`}
              className="mx-auto h-44 w-44 rounded-xl bg-slate-50 object-contain p-2 ring-1 ring-slate-100"
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-slate-400">
              Algoritmo
            </h2>
            <code className="block rounded-xl bg-slate-900 px-3 py-3 font-mono text-lg font-medium text-emerald-300">
              {caseData.algorithm}
            </code>
          </div>

          {caseData.alternatives?.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-slate-400">
                Variaciones
              </h2>
              <div className="space-y-2">
                {caseData.alternatives.map((alt, i) => (
                  <code
                    key={i}
                    className="block rounded-lg bg-slate-900 px-3 py-2 font-mono text-sm text-sky-300"
                  >
                    {alt}
                  </code>
                ))}
              </div>
            </div>
          )}

          {caseData.notes?.length > 0 && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
              <h2 className="mb-2 flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest text-amber-600">
                <span>💡</span> Notas
              </h2>
              <ul className="space-y-2">
                {caseData.notes.map((note, i) => (
                  <li
                    key={i}
                    className="text-sm leading-relaxed text-amber-900"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-400">
              Velocidad automática
            </h2>
            <div className="flex gap-2">
              {SPEEDS.map((s) => (
                <button
                  key={s.ms}
                  onClick={() => setSpeedMs(s.ms)}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    speedMs === s.ms
                      ? 'bg-indigo-600 text-white shadow'
                      : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-slate-400">
              Cómo leer la notación
            </h2>
            <ul className="space-y-1.5">
              <li>
                <code className="rounded bg-slate-100 px-1.5 py-0.5 font-semibold text-slate-700">
                  R L U D F B
                </code>{' '}
                — giro horario de esa cara.
              </li>
              <li>
                <code className="rounded bg-slate-100 px-1.5 py-0.5 font-semibold text-slate-700">
                  '
                </code>{' '}
                — giro antihorario.
              </li>
              <li>
                <code className="rounded bg-slate-100 px-1.5 py-0.5 font-semibold text-slate-700">
                  2
                </code>{' '}
                — giro doble (180°).
              </li>
              <li>
                Minúsculas y{' '}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 font-semibold text-slate-700">
                  M E S
                </code>{' '}
                — capas dobles / centrales.
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Otros casos del mismo grupo */}
      {caseData.group.cases.length > 1 && (
        <section className="mt-10">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">
            Otros casos de {caseData.group.name.toLowerCase()}
          </h2>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {caseData.group.cases
              .filter((c) => c.id !== caseData.id)
              .map((c) => (
                <Link
                  key={c.id}
                  to={`/metodo/${method.id}/${phase.id}/${c.id}`}
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
                >
                  <img
                    src={c.image}
                    alt={`Caso ${c.name}`}
                    loading="lazy"
                    className="h-12 w-12 shrink-0 rounded-lg bg-slate-50 object-contain p-1 ring-1 ring-slate-100"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-700">
                      {c.name}
                    </p>
                    <code className="block truncate font-mono text-xs text-slate-400">
                      {c.algorithm}
                    </code>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      )}
    </div>
  )
}
