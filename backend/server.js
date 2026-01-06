const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 1. เปิดใช้งาน Middleware (จำได้ไหมว่าต้องใช้อะไรบ้าง?)
app.use(express.json());
app.use(cors());

// 2. เชื่อมต่อ Database
// ตั้งชื่อ Database ว่า 'daily-log-db'
mongoose.connect('mongodb+srv://dosw1811_db_user:lds3O1koJtGPo13O@cluster0.rkilswt.mongodb.net/daily-log-db?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('☁️  Cloud DB Connected!'))
    .catch(err => console.log(err));

// 3. สร้าง Schema และ Model (โจทย์ใหม่!)
const logSchema = new mongoose.Schema({
    detail: String,
    logDate: String,
    category: { type: String, default: 'General' }, // เพิ่มหมวดหมู่ (Dev, Meeting, etc.)
    status: { type: String, default: 'Completed' }  // เพิ่มสถานะ (Completed, In-Progress)
});

const Log = mongoose.model('Log', logSchema);

// API 1: เพิ่มบันทึกใหม่ (POST)
app.post('/logs', async (req, res) => {
    const { detail, logDate, category, status } = req.body; // รับค่าเพิ่ม
    const newLog = new Log({ detail, logDate, category, status });
    await newLog.save();
    res.json({ message: "บันทึกสำเร็จ" });
});

// API 2: ดึงข้อมูลตามวันที่เลือก (GET)
// เช่น /logs?date=2024-01-06
app.get('/logs', async (req, res) => {
    const { date } = req.query; // รับวันที่ส่งมาจากหน้าบ้าน
    
    let logs;
    if (date) {
        // ถ้าส่งวันที่มา ให้หาเฉพาะวันนั้น
        logs = await Log.find({ logDate: date });
    } else {
        // ถ้าไม่ส่งมา ให้หาทั้งหมด
        logs = await Log.find();
    }
    
    res.json(logs);
});

// API 3: แก้ไขข้อมูล (PUT)
app.put('/logs/:id', async (req, res) => {
    const { id } = req.params;
    const { detail, logDate, category, status } = req.body;
    await Log.findByIdAndUpdate(id, { detail, logDate, category, status });
    res.json({ message: "อัปเดตสำเร็จ" });
});

// API 4: ลบข้อมูล (DELETE)
app.delete('/logs/:id', async (req, res) => {
    const { id } = req.params;
    await Log.findByIdAndDelete(id);
    res.json({ message: "ลบสำเร็จ" });
});
app.listen(3000, () => {
    console.log('Server running on port 3000');
});