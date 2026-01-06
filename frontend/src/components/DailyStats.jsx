export default function DailyStats({ stats, completionRate }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Tasks</p>
        <p className="text-3xl font-bold text-slate-800 mt-1">{stats.total}</p>
      </div>
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Completion Rate</p>
        <p className="text-3xl font-bold text-emerald-600 mt-1">{completionRate}%</p>
      </div>
    </div>
  )
}