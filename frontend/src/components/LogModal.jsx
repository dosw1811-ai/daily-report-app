import { X } from 'lucide-react'

export default function LogModal({ showModal, isEditing, formData, setFormData, onClose, onSubmit }) {
  if (!showModal) return null

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-800">{isEditing ? 'แก้ไขรายการ' : 'เพิ่มรายการใหม่'}</h3>
          <button onClick={onClose}><X size={20} className="text-slate-400 hover:text-slate-600"/></button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-500 mb-1">รายละเอียดงาน</label>
            <textarea 
              rows="3"
              className="w-full border border-slate-300 rounded-xl p-3 text-base focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="วันนี้ทำอะไรไปบ้าง..."
              value={formData.detail}
              onChange={e => setFormData({...formData, detail: e.target.value})}
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-500 mb-1">หมวดหมู่</label>
              <select 
                className="w-full border border-slate-300 rounded-xl p-3 text-base focus:ring-2 focus:ring-indigo-500 outline-none appearance-none bg-white"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option value="Development">💻 การพัฒนา (Dev)</option>
                <option value="Meeting">🗣️ ประชุม (Meeting)</option>
                <option value="Bug Fix">🐛 แก้ไขบั๊ก (Bug Fix)</option>
                <option value="Documentation">📄 เอกสาร (Docs)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-500 mb-1">สถานะ</label>
              <select 
                className="w-full border border-slate-300 rounded-xl p-3 text-base focus:ring-2 focus:ring-indigo-500 outline-none appearance-none bg-white"
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
              >
                <option value="Completed">✅ เสร็จสมบูรณ์</option>
                <option value="In Progress">⏳ รอดำเนินการ</option>
              </select>
            </div>
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold text-lg mt-2 shadow-lg transition-all">
            {isEditing ? 'บันทึกการแก้ไข' : 'เพิ่มรายการ'}
          </button>
        </form>
      </div>
    </div>
  )
}