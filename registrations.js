const express = require('express');
const router = express.Router();
const ExcelJS = require('exceljs');
const { Registration } = require('../server');

router.post('/registrations', async (req, res) => {
    console.log('Request received:', req.body); // Debug
    try {
        const { name, email, phone, year, branch } = req.body;
        const registration = new Registration({ name, email, phone, year, branch });
        await registration.save();
        console.log('Data saved to MongoDB'); // Debug

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Registrations');
        worksheet.columns = [
            { header: 'Name', key: 'name', width: 20 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Phone', key: 'phone', width: 15 },
            { header: 'Year', key: 'year', width: 10 },
            { header: 'Branch', key: 'branch', width: 20 }
        ];
        worksheet.addRow({ name, email, phone, year, branch });

        await workbook.xlsx.writeFile('./registrations.xlsx'); // Relative path
        console.log('Excel file written'); // Debug
        res.send(`Saved: ${name}, ${email} - Exported to Excel`);
    } catch (err) {
        console.error('Error:', err.message); // Error
        res.status(500).send('Error: ' + err.message);
    }
});

module.exports = router;