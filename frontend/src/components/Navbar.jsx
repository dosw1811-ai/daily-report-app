import { PieChart, Plus } from 'lucide-react'

export default function Navbar({ date, setDate, onOpenModal }) {
  return (
    <nav className="bg-white border-b border-slate-200 px-4 py-4 sticky top-0 z-20 shadow-sm">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="bg-indigo-600 p-2 rounded-lg text-white shrink-0">
            <PieChart size={24} />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-slate-800 leading-tight">My Daily Dashboard</h1>
            <p className="text-xs text-slate-500">Professional Reporting System</p>
          </div>
        </div>

        {/* Action Section */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            className="border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full sm:w-auto"
          />
          <button onClick={onOpenModal} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex justify-center items-center gap-2 transition-all shadow-sm w-full sm:w-auto">
            <Plus size={18} /> <span className="md:hidden lg:inline">New Entry</span>
          </button>
        </div>
      </div>
    </nav>
  )
}