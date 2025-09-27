const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Schema
const registrationSchema = new mongoose.Schema({ name: String, email: String, phone: String, year: String, branch: String });
const Registration = mongoose.model('Registration', registrationSchema);
module.exports = { Registration }; // Model export

app.use(express.json());
app.use(express.static('public'));

// Route
const registrationsRouter = require('./routes/registrations');
app.use('/api', registrationsRouter);

mongoose.connect('mongodb+srv://kalashshivpure_db_user:IjAUsbpYmFouru0x@cluster0.uwunr9g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(3000, () => console.log('Server on http://localhost:3000'));