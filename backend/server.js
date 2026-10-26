const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// ========================================================
// 1. READ OPERATION: Fetch all student accounts
// ========================================================
app.get('/api/test-students', async (req, res) => {
    try {
        const query = "SELECT TRIM(student_id) AS student_id, password, first_name, last_name, student_type, program_id, email, status FROM registration";
        const [rows] = await db.query(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error("❌ Read Students Error:", error);
        res.status(500).json({ error: "Server error querying student database rows." });
    }
});

// ========================================================
// 2. READ OPERATION: Fetch master course schedules
// ========================================================
app.get('/api/schedules', async (req, res) => {
    try {
        const query = `
            SELECT s.schedule_id, c.course_code, c.course_name, c.units, t.teacher_name, s.day, s.time, s.room 
            FROM schedule s
            INNER JOIN course c ON s.course_id = c.course_id
            LEFT JOIN teacher t ON s.teacher_id = t.teacher_id
        `;
        const [rows] = await db.query(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error("❌ Read Schedules Error:", error);
        res.status(500).json({ error: "Server error querying course schedules." });
    }
});

// ========================================================
// 3. CREATE OPERATION: Enroll student into selected schedules
// ========================================================
app.post('/api/enroll', async (req, res) => {
    const { student_id, schedule_ids } = req.body;
    if (!student_id || !schedule_ids || !Array.isArray(schedule_ids)) {
        return res.status(400).json({ error: "Invalid enrollment payload parameters submitted." });
    }
    try {
        let inserted = 0;
        for (const schedule_id of schedule_ids) {
            await db.query(
                "INSERT IGNORE INTO student_enrollments (student_id, schedule_id) VALUES (?, ?)",
                [student_id, schedule_id]
            );
            inserted++;
        }
        res.status(201).json({ message: `Successfully registered ${inserted} classes into your database file.` });
    } catch (error) {
        console.error("❌ Create Enrollment Error:", error);
        res.status(500).json({ error: "Failed to insert rows into student_enrollments table." });
    }
});

// ========================================================
// 4. READ OPERATION: Fetch a student's active schedule items
// ========================================================
app.get('/api/my-enrollments/:student_id', async (req, res) => {
    try {
        const query = `
            SELECT se.enrollment_id, c.course_code, c.course_name, c.units, s.day, s.time, s.room
            FROM student_enrollments se
            INNER JOIN schedule s ON se.schedule_id = s.schedule_id
            INNER JOIN course c ON s.course_id = c.course_id
            WHERE se.student_id = ?
        `;
        const [rows] = await db.query(query, [req.params.student_id]);
        res.status(200).json(rows);
    } catch (error) {
        console.error("❌ Read Active Enrollments Error:", error);
        res.status(500).json({ error: "Server error reading student enrollment list rows." });
    }
});

// ========================================================
// 5. UPDATE OPERATION: Modify a student's profile status
// ========================================================
app.put('/api/student/status', async (req, res) => {
    const { student_id, status } = req.body;
    if (!student_id || !status) {
        return res.status(400).json({ error: "Missing Student ID or Status string parameters." });
    }
    try {
        await db.query(
            "UPDATE registration SET status = ? WHERE student_id = ?",
            [status, student_id]
        );
        res.status(200).json({ message: `Student status successfully updated to ${status} inside your records.` });
    } catch (error) {
        console.error("❌ Update Status Error:", error);
        res.status(500).json({ error: "Failed to update row inside registration table." });
    }
});

// ========================================================
// 6. DELETE OPERATION: Drop/Remove an active enrollment row
// ========================================================
app.delete('/api/drop-course/:enrollment_id', async (req, res) => {
    try {
        await db.query("DELETE FROM student_enrollments WHERE enrollment_id = ?", [req.params.enrollment_id]);
        res.status(200).json({ message: "Course successfully dropped from enrollment record." });
    } catch (error) {
        console.error("❌ Delete Enrollment Error:", error);
        res.status(500).json({ error: "Failed to clear matching row execution statement." });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Express server running on port ${PORT}`);
    console.log(`📡 Student Matching Route: http://localhost:${PORT}/api/test-students`);
    console.log(`📡 Master Curriculum Route: http://localhost:${PORT}/api/schedules`);
});