const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 1. Fetch All Students (The route you verified in your browser)
app.get('/api/students', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM registration');
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve students from database' });
    }
});

// Replace the old app.post('/api/login') route in backend/server.js with this:
app.post('/api/login', async (req, res) => {
    const { studentId, password } = req.body;

    if (!studentId || !password) {
        return res.status(400).json({ error: 'Please fill in all fields.' });
    }

    try {
        const [users] = await db.query(
            'SELECT * FROM registration WHERE student_id = ? AND password = ?',
            [studentId, password]
        );

        if (users && users.length > 0) {
            const user = users[0];
            
            // RBAC RULE ENGINE: Classify the account privilege tier role dynamically
            const role = user.student_id.startsWith('ADMIN-') ? 'admin' : 'student';
            
            return res.status(200).json({
                message: 'Authentication successful',
                role: role, // Explicit RBAC validation parameter
                user: {
                    student_id: user.student_id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    student_type: user.student_type,
                    program_id: user.program_id,
                    status: user.status,
                    email: user.email
                }
            });
        } else {
            return res.status(401).json({ error: 'Invalid ID or Password' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server database error' });
    }
});

app.get('/api/available-schedules', async (req, res) => {
    try {
        const [schedules] = await db.query(`
            SELECT 
                s.schedule_id, 
                c.course_code, 
                c.course_name, 
                c.units, 
                t.teacher_name, 
                s.day, 
                s.time, 
                s.room
            FROM schedule s
            JOIN course c ON s.course_id = c.course_id
            JOIN teacher t ON s.teacher_id = t.teacher_id
        `);
        res.status(200).json(schedules);
    } catch (err) {
        console.error('Failed to fetch schedule blocks:', err);
        res.status(500).json({ error: 'Database schedule retrieval failed' });
    }
});

app.post('/api/register', async (req, res) => {
    const { firstName, lastName, email, password, programId } = req.body;

    if (!firstName || !lastName || !email || !password || !programId) {
        return res.status(400).json({ error: 'Please populate all entry fields.' });
    }

    try {
        // Generate a student ID sequence block automatically
        const currentYear = new Date().getFullYear();
        const randSeq = Math.floor(1000 + Math.random() * 9000); // 4-digit unique random integer sequence
        const generatedStudentId = `IT-${currentYear}-${randSeq}`;

        // Execute SQL insertion into your registration table schema layout profiles
        await db.query(
            `INSERT INTO registration (student_id, password, first_name, last_name, student_type, program_id, email, status) 
             VALUES (?, ?, ?, ?, 'New', ?, ?, 'Pending')`,
            [generatedStudentId, password, firstName, lastName, programId, email]
        );

        res.status(201).json({ 
            message: 'Registration profile inserted successfully!',
            student_id: generatedStudentId 
        });
    } catch (err) {
        console.error('Registration processing error:', err);
        res.status(500).json({ error: err.code === 'ER_DUP_ENTRY' ? 'Email address already registered.' : 'Database transaction failure.' });
    }
});

// NEW STUDENT REGISTRATION (CREATE OPERATOR)
app.post('/api/register', async (req, res) => {
    const { firstName, lastName, email, password, programId } = req.body;

    if (!firstName || !lastName || !email || !password || !programId) {
        return res.status(400).json({ error: 'Please populate all entry fields.' });
    }

    try {
        // Generate a clean institutional ID sequence block (e.g., IT-2026-XXXX)
        const currentYear = new Date().getFullYear();
        const randSeq = Math.floor(1000 + Math.random() * 9000); 
        const generatedStudentId = `IT-${currentYear}-${randSeq}`;

        // Insert into your XAMPP MySQL database table schema row structures
        await db.query(
            `INSERT INTO registration (student_id, password, first_name, last_name, student_type, program_id, email, status) 
             VALUES (?, ?, ?, ?, 'New', ?, ?, 'Pending')`,
            [generatedStudentId, password, firstName, lastName, programId, email]
        );

        // Send the new unique ID back to React downstream components
        res.status(201).json({ 
            message: 'Registration profile created successfully!',
            student_id: generatedStudentId 
        });
    } catch (err) {
        console.error('Registration processing error:', err);
        res.status(500).json({ 
            error: err.code === 'ER_DUP_ENTRY' ? 'Email address already registered.' : 'Database transaction failure.' 
        });
    }
});

// CRUCIAL MISSING PIECE: Force the Express server engine to stay awake and listen on port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Operational Express backend active and listening on port ${PORT}`);
});