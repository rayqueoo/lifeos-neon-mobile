import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { CalendarDays, CheckSquare2, ChevronRight, CircleDollarSign, Command, FolderKanban, LayoutDashboard, Menu, NotebookPen, Settings2, Sparkles, X } from 'lucide-react'

const items = [
  { to: '/', label: 'Visão geral', icon: LayoutDashboard, end: true },
  { to: '/tasks', label: 'Tarefas', icon: CheckSquare2 },
  { to: '/projects', label: 'Projetos', icon: FolderKanban },
  { to: '/habits', label: 'Hábitos', icon: Sparkles },
  { to: '/notes', label: 'Notas', icon: NotebookPen },
  { to: '/calendar', label: 'Calendário', icon: CalendarDays },
  { to: '/finance', label: 'Finanças', icon: CircleDollarSign },
]
const titleByPath: Record<string, string> = Object.fromEntries(items.map(item => [item.to, item.label]))

export function AppLayout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const title = titleByPath[location.pathname] || (location.pathname === '/settings' ? 'Configurações' : 'LifeOS')

  return <div className="app-shell min-h-screen bg-[#050a0f] md:flex">
    {open && <button aria-label="Fechar menu" className="fixed inset-0 z-30 bg-[#02070b]/75 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)} />}
    <aside className={`sidebar-scroll fixed inset-y-0 left-0 z-40 flex w-[264px] flex-col border-r border-cyan-300/15 bg-[#071018]/95 px-4 py-5 text-white shadow-[8px_0_40px_rgba(0,196,255,.06)] transition-transform md:static md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between px-2 pb-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-200/40 bg-cyan-300/10 text-cyan-300 shadow-[0_0_22px_rgba(32,217,255,.18)]"><Command size={21} /></span>
          <span><span className="block text-[17px] font-bold tracking-tight">LifeOS <b className="text-[10px] font-semibold text-cyan-300">V2.0</b></span><span className="text-[10px] uppercase tracking-[.2em] text-slate-500">personal system</span></span>
        </Link>
        <button aria-label="Fechar menu" className="rounded-lg p-2 text-slate-400 hover:bg-white/10 md:hidden" onClick={() => setOpen(false)}><X size={18} /></button>
      </div>
      <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[.18em] text-slate-500">Workspace</p>
      <nav className="sidebar-scroll flex-1 space-y-1 overflow-y-auto">
        {items.map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition ${isActive ? 'border border-cyan-300/40 bg-cyan-300/12 text-cyan-200 shadow-[0_0_18px_rgba(32,217,255,.14)]' : 'text-slate-400 hover:bg-white/[.06] hover:text-white'}`}><Icon size={17} strokeWidth={1.8} />{label}</NavLink>)}
      </nav>
      <div className="mt-5 rounded-2xl border border-cyan-300/15 bg-cyan-300/[.04] p-3.5"><div className="flex items-center gap-2 text-cyan-300"><Sparkles size={15} /><span className="text-xs font-semibold">Um passo de cada vez</span></div><p className="mt-2 text-xs leading-5 text-slate-400">Organize suas prioridades e mantenha o foco no que importa.</p></div>
      <div className="mt-4 border-t border-white/10 pt-3"><NavLink to="/settings" onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium ${isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/[.08]'}`}><Settings2 size={17} />Configurações</NavLink><div className="mt-3 flex items-center gap-3 rounded-xl px-2 py-2"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-300/35 bg-cyan-300/10 text-xs font-bold text-cyan-200">LO</span><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold">Meu LifeOS</p><p className="truncate text-[10px] text-slate-500">Somente neste celular</p></div></div></div>
    </aside>
    <main className="min-w-0 flex-1">
      <header className="sticky top-0 z-20 flex h-[68px] items-center gap-3 border-b border-cyan-300/10 bg-[#050a0f]/85 px-4 backdrop-blur-xl sm:px-7 lg:px-10"><button aria-label="Abrir menu" onClick={() => setOpen(true)} className="rounded-xl p-2 text-slate-300 hover:bg-white/10 md:hidden"><Menu size={19} /></button><div className="flex min-w-0 flex-1 items-center gap-2 text-xs text-slate-600"><span className="hidden sm:inline">LifeOS</span><ChevronRight size={13} className="hidden sm:inline" /><span className="truncate font-semibold text-slate-200">{title}</span></div><div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex"><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.8)]" /> Dados sincronizados</div><button onClick={() => navigate('/settings')} aria-label="Configurações" className="rounded-xl p-2 text-slate-400 hover:bg-white/10"><Settings2 size={18} /></button></header>
      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-9"><Outlet /></div>
      <footer className="px-5 pb-6 text-center text-[11px] text-slate-600">LifeOS · Um espaço para organizar o que importa</footer>
    </main>
  </div>
}
