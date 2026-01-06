import { Calendar, Download, Briefcase, Code2, Users, ArrowRightLeft } from 'lucide-react' // เพิ่ม icon

export default function ReportView({ date, logs, stats, reportRef, onDownload, completionRate }) {
  
  const getCategoryIcon = (cat) => {
    switch(cat) {
      case 'Development': return <Code2 size={14} />;
      case 'Meeting': return <Users size={14} />;
      default: return <Briefcase size={14} />;
    }
  }

  const getStatusColor = (status) => {
    return status === 'Completed' 
      ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
      : 'bg-amber-100 text-amber-700 border-amber-200';
  }

  const formatThaiDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('th-TH', options);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
          <Calendar size={20} /> ตัวอย่างรายงาน
        </h2>
        
        {/* ปุ่มดาวน์โหลด */}
        <button onClick={onDownload} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex justify-center items-center gap-2 shadow-sm transition-all">
          <Download size={18} /> ดาวน์โหลดรูปภาพ
        </button>
      </div>

      {/* แจ้งเตือนสำหรับมือถือ */}
      <div className="md:hidden flex items-center gap-2 text-xs text-slate-400 bg-slate-100 p-2 rounded-lg">
        <ArrowRightLeft size={14} />
        <span>เลื่อนซ้าย-ขวา เพื่อดูรายงานเต็มใบ</span>
      </div>

      {/* --- กล่องครอบ Scrollable --- */}
      <div className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
        {/* กำหนด min-width ให้กระดาษ เพื่อบังคับให้มันกว้างเท่า A4 เสมอ (ไม่บี้) */}
        <div ref={reportRef} className="bg-white p-6 md:p-10 rounded-xl shadow-lg border border-slate-200 min-w-[700px] min-h-[600px] relative">
          
          <div className="flex justify-between items-start border-b-2 border-slate-800 pb-6 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight">รายงานประจำวัน</h1>
              <p className="text-slate-500 mt-2 text-lg font-medium">วันที่: {formatThaiDate(date)}</p>
            </div>
          </div>

          {/* Grid Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8">
              <div className="bg-slate-50 p-4 md:p-5 rounded-xl border border-slate-100">
                  <p className="text-sm text-slate-500 font-bold mb-2">งานที่เสร็จสมบูรณ์</p>
                  <p className="text-4xl font-bold text-emerald-600">{stats.completed}</p>
              </div>
              <div className="bg-slate-50 p-4 md:p-5 rounded-xl border border-slate-100">
                  <p className="text-sm text-slate-500 font-bold mb-2">รอดำเนินการ</p>
                  <p className="text-4xl font-bold text-amber-600">{stats.inProgress}</p>
              </div>
              <div className="bg-slate-50 p-4 md:p-5 rounded-xl border border-slate-100">
                  <p className="text-sm text-slate-500 font-bold mb-2">งานพัฒนา (Dev)</p>
                  <p className="text-4xl font-bold text-indigo-600">{stats.devCount}</p>
              </div>
          </div>

          {/* Table */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 border-l-4 border-indigo-600 pl-3">บันทึกกิจกรรม</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 text-sm font-semibold text-slate-500 align-middle w-24">เวลา</th>
                  <th className="py-3 text-sm font-semibold text-slate-500 align-middle">คำอธิบาย</th>
                  <th className="py-3 text-sm font-semibold text-slate-500 align-middle w-32 text-center">หมวดหมู่</th>
                  <th className="py-3 text-sm font-semibold text-slate-500 align-middle w-28 text-right">สถานะ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log, i) => (
                  <tr key={i} className="text-sm">
                    <td className="py-4 text-slate-400 font-mono text-sm align-middle leading-none">09:00 น.</td>
                    <td className="py-4 text-slate-800 font-medium text-base align-middle leading-tight">{log.detail}</td>
                    <td className="py-4 align-middle text-center">
                      <div className="flex items-center justify-center">
                        <span className="flex items-center gap-1 px-2 py-1 rounded text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 leading-none">
                            {getCategoryIcon(log.category)}
                            {log.category}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-right align-middle">
                      <div className="flex items-center justify-end">
                        <span className={`flex items-center px-2 py-1 rounded text-xs font-bold border leading-none ${getStatusColor(log.status)}`}>
                          {log.status === 'Completed' ? 'สมบูรณ์' : 'รอดำเนินการ'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="absolute bottom-8 left-10 right-10 border-t border-slate-200 pt-4 flex justify-between items-center text-sm text-slate-400">
            <p>สร้างโดยระบบแดชบอร์ดรายวัน</p>
            <p>: ชินวัตร หมุนดี</p>
          </div>
        </div>
      </div>
    </div>
  )
}