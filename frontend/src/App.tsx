import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './lib/auth'
import { AppLayout } from './components/AppLayout'
import { LoadingState } from './components/ui'
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })))
const TasksPage = lazy(() => import('./pages/TasksPage').then(m => ({ default: m.TasksPage })))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })))
const HabitsPage = lazy(() => import('./pages/HabitsPage').then(m => ({ default: m.HabitsPage })))
const NotesPage = lazy(() => import('./pages/NotesPage').then(m => ({ default: m.NotesPage })))
const CalendarPage = lazy(() => import('./pages/CalendarPage').then(m => ({ default: m.CalendarPage })))
const FinancePage = lazy(() => import('./pages/FinancePage').then(m => ({ default: m.FinancePage })))
const SettingsPage = lazy(() => import('./pages/SettingsPage').then(m => ({ default: m.SettingsPage })))
function Router() { return <Suspense fallback={<LoadingState />}><Routes><Route path="/" element={<AppLayout />}><Route index element={<DashboardPage />} /><Route path="tasks" element={<TasksPage />} /><Route path="projects" element={<ProjectsPage />} /><Route path="habits" element={<HabitsPage />} /><Route path="notes" element={<NotesPage />} /><Route path="calendar" element={<CalendarPage />} /><Route path="finance" element={<FinancePage />} /><Route path="settings" element={<SettingsPage />} /></Route></Routes></Suspense> }
export default function App() { return <BrowserRouter><AuthProvider><Router /></AuthProvider></BrowserRouter> }
