import { useParams, Link } from 'react-router-dom'
import { getMethod } from '../data/methods'
import Breadcrumb from '../components/Breadcrumb'

const PHASE_COLORS = {
  f2l: 'from-sky-500 to-blue-600',
  oll: 'from-amber-400 to-orange-500',
  pll: 'from-violet-500 to-fuchsia-600',
}

export default function MethodPage() {
  const { methodId } = useParams()
  const method = getMethod(methodId)

  if (!method) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <p className="text-slate-500">Método no encontrado.</p>
        <Link to="/" className="text-indigo-600 hover:underline">
          ← Volver al inicio
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Breadcrumb items={[{ label: 'Inicio', to: '/' }, { label: method.name }]} />

      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-800">{method.name}</h1>
        <p className="mt-3 text-slate-500">{method.description}</p>
      </header>

      <div className="space-y-4">
        {method.phases.map((phase, index) => {
          const totalCases = phase.groups.reduce(
            (sum, g) => sum + g.cases.length,
            0,
          )
          const grad = PHASE_COLORS[phase.id] || 'from-slate-500 to-slate-700'
          return (
            <Link
              key={phase.id}
              to={`/metodo/${method.id}/${phase.id}`}
              className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${grad} text-lg font-bold text-white shadow`}
              >
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-800">
                    {phase.name}
                  </h3>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
                    {totalCases} casos
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {phase.fullName}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {phase.intro}
                </p>
              </div>
              <span className="self-center text-xl text-indigo-500 transition group-hover:translate-x-1">
                →
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
