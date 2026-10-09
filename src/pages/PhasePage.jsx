import { useParams, Link } from 'react-router-dom'
import { getMethod, getPhase } from '../data/methods'
import Breadcrumb from '../components/Breadcrumb'

export default function PhasePage() {
  const { methodId, phaseId } = useParams()
  const method = getMethod(methodId)
  const phase = getPhase(methodId, phaseId)

  if (!method || !phase) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <p className="text-slate-500">Fase no encontrada.</p>
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
          { label: phase.name },
        ]}
      />

      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-800">
          {phase.name}{' '}
          <span className="text-lg font-normal text-slate-400">
            {phase.fullName}
          </span>
        </h1>
        <p className="mt-3 max-w-3xl text-slate-500">{phase.intro}</p>
      </header>

      <div className="space-y-8">
        {phase.groups.map((group) => (
          <section key={group.id}>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-400">
              {group.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.cases.map((c) => (
                <Link
                  key={c.id}
                  to={`/metodo/${method.id}/${phase.id}/${c.id}`}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <img
                      src={c.image}
                      alt={`Caso ${c.name}`}
                      loading="lazy"
                      className="h-16 w-16 shrink-0 rounded-xl bg-slate-50 object-contain p-1 ring-1 ring-slate-100"
                    />
                    <div className="min-w-0">
                      <h3 className="truncate font-bold text-slate-800">
                        {c.name}
                      </h3>
                      {c.code && (
                        <span className="mt-0.5 inline-block rounded bg-indigo-100 px-1.5 py-0.5 text-xs font-mono font-semibold text-indigo-700">
                          {c.code}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="line-clamp-2 text-xs text-slate-400">
                    {c.description}
                  </p>
                  <code className="mt-3 block rounded-lg bg-slate-900 px-2.5 py-2 font-mono text-sm font-medium text-emerald-300">
                    {c.algorithm}
                  </code>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
