import { Link } from 'react-router-dom'
import { getAllMethods } from '../data/methods'

export default function HomePage() {
  const methods = getAllMethods()

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
          Tutorial del Cubo de Rubik
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
          Aprende a resolver el cubo 3×3 con métodos visuales. Cada caso se
          anima en un cubo 3D interactivo: míralo resolverse paso a paso o de
          forma automática.
        </p>
      </header>

      <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">
        Métodos
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">
        {methods.map((method) => (
          <Link
            key={method.id}
            to={`/metodo/${method.id}`}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100"
          >
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-bold text-slate-800">{method.name}</h3>
              <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                {method.shortName}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              {method.description}
            </p>
            <div className="mt-4 flex gap-2">
              {method.phases.map((p) => (
                <span
                  key={p.id}
                  className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-mono font-semibold text-slate-600"
                >
                  {p.name}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm font-semibold text-indigo-600 group-hover:text-indigo-700">
              Empezar →
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
