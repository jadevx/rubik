import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MethodPage from './pages/MethodPage'
import PhasePage from './pages/PhasePage'
import CasePage from './pages/CasePage'

export default function App() {
  return (
    <HashRouter>
      <div className="flex min-h-full flex-col">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link
              to="/"
              className="flex items-center gap-2.5 text-lg font-extrabold text-slate-800"
            >
              <span className="grid grid-cols-3 gap-0.5 rounded-md bg-slate-800 p-1" aria-hidden>
                <i className="h-2 w-2 rounded-[2px] bg-red-500" />
                <i className="h-2 w-2 rounded-[2px] bg-white" />
                <i className="h-2 w-2 rounded-[2px] bg-green-500" />
                <i className="h-2 w-2 rounded-[2px] bg-yellow-400" />
                <i className="h-2 w-2 rounded-[2px] bg-orange-500" />
                <i className="h-2 w-2 rounded-[2px] bg-blue-500" />
                <i className="h-2 w-2 rounded-[2px] bg-white" />
                <i className="h-2 w-2 rounded-[2px] bg-green-500" />
                <i className="h-2 w-2 rounded-[2px] bg-red-500" />
              </span>
              RubikTutor
            </Link>
          </div>
        </header>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/metodo/:methodId" element={<MethodPage />} />
            <Route path="/metodo/:methodId/:phaseId" element={<PhasePage />} />
            <Route
              path="/metodo/:methodId/:phaseId/:caseId"
              element={<CasePage />}
            />
          </Routes>
        </main>

        <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-400">
          Tutorial interactivo del cubo de Rubik · Método Fridrich reducido
        </footer>
      </div>
    </HashRouter>
  )
}
