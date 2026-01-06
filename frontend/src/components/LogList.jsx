import { Trash2, Edit2, CheckCircle2, Clock, Briefcase, Code2, Users } from 'lucide-react'

export default function LogList({ logs, onEdit, onDelete }) {
  const getCategoryIcon = (cat) => {
    switch(cat) {
      case 'Development': return <Code2 size={16} />;
      case 'Meeting': return <Users size={16} />;
      default: return <Briefcase size={16} />;
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-semibold text-slate-700">Today's Entries</h3>
        <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded-full">{logs.length} items</span>
      </div>
      <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
        {logs.length > 0 ? logs.map((log) => (
          <div key={log._id} className="p-4 hover:bg-slate-50 transition-colors group">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className={`mt-1 p-1.5 rounded-md h-fit ${log.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                    {log.status === 'Completed' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                </div>
                <div>
                  <p className="font-medium text-slate-800">{log.detail}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wide px-2 py-0.5 rounded border bg-slate-100 text-slate-500 border-slate-200">
                      {getCategoryIcon(log.category)} {log.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onEdit(log)} className="p-2 text-slate-400 hover:text-indigo-600"><Edit2 size={16} /></button>
                <button onClick={() => onDelete(log._id)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        )) : (
          <div className="p-10 text-center text-slate-400 text-sm">No tasks recorded today.</div>
        )}
      </div>
    </div>
  )
}