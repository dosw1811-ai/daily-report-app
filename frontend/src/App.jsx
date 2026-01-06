import { useState, useEffect, useRef } from 'react'
import html2canvas from 'html2canvas'
import Swal from 'sweetalert2'

// นำเข้าชิ้นส่วนย่อยที่เราแยกไว้
import Navbar from './components/Navbar'
import DailyStats from './components/DailyStats'
import LogList from './components/LogList'
import ReportView from './components/ReportView'
import LogModal from './components/LogModal'

function App() {
  const [logs, setLogs] = useState([])
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  
  const [formData, setFormData] = useState({ 
    detail: '', 
    logDate: '', 
    category: 'Development', 
    status: 'Completed' 
  })
  const [isEditing, setIsEditing] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const reportRef = useRef(null)

  // คำนวณ Stats
  const stats = {
    total: logs.length,
    completed: logs.filter(l => l.status === 'Completed').length,
    inProgress: logs.filter(l => l.status === 'In Progress').length,
    devCount: logs.filter(l => l.category === 'Development').length
  }
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const fetchLogs = async () => {
    try {
      const response = await fetch(`http://localhost:3000/logs?date=${date}`)
      const data = await response.json()
      setLogs(data)
    } catch (error) { console.error(error) }
  }

  useEffect(() => {
    fetchLogs()
    setFormData(prev => ({ ...prev, logDate: date }))
  }, [date])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.detail) return Swal.fire('Warning', 'กรุณากรอกรายละเอียดงาน', 'warning')

    const url = isEditing 
      ? `http://localhost:3000/logs/${isEditing}`
      : 'http://localhost:3000/logs';
    
    const method = isEditing ? 'PUT' : 'POST';

    await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    closeModal()
    fetchLogs()
    Swal.fire({ icon: 'success', title: isEditing ? 'Updated' : 'Saved', timer: 1500, showConfirmButton: false })
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({ title: 'ยืนยันการลบ?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33' })
    if (result.isConfirmed) {
      await fetch(`http://localhost:3000/logs/${id}`, { method: 'DELETE' })
      fetchLogs()
    }
  }

  const handleDownloadImage = async () => {
    if (reportRef.current) {
      const canvas = await html2canvas(reportRef.current, { scale: 2, useCORS: true, allowTaint: true, scrollY: -window.scrollY })
      const link = document.createElement("a")
      link.href = canvas.toDataURL("image/png")
      link.download = `Report-${date}.png`
      link.click()
    }
  }

  const openModal = (log = null) => {
    if (log) {
      setFormData({ detail: log.detail, logDate: log.logDate, category: log.category, status: log.status })
      setIsEditing(log._id)
    } else {
      setFormData({ detail: '', logDate: date, category: 'Development', status: 'Completed' })
      setIsEditing(null)
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setIsEditing(null)
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      
      {/* 1. Navbar */}
      <Navbar date={date} setDate={setDate} onOpenModal={() => openModal()} />

      <div className="container mx-auto px-4 mt-8 flex flex-col xl:flex-row gap-8">
        
        {/* Left Column */}
        <div className="w-full xl:w-5/12 space-y-6">
          {/* 2. Stats */}
          <DailyStats stats={stats} completionRate={completionRate} />
          {/* 3. Log List */}
          <LogList logs={logs} onEdit={openModal} onDelete={handleDelete} />
        </div>

        {/* Right Column */}
        <div className="w-full xl:w-7/12">
           {/* 4. Report View */}
           <ReportView 
              date={date} 
              logs={logs} 
              stats={stats} 
              reportRef={reportRef} 
              onDownload={handleDownloadImage}
              completionRate={completionRate}
           />
        </div>
      </div>

      {/* 5. Modal */}
      <LogModal 
        showModal={showModal} 
        isEditing={isEditing} 
        formData={formData} 
        setFormData={setFormData} 
        onClose={closeModal} 
        onSubmit={handleSubmit} 
      />

    </div>
  )
}

export default App