const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Todo =require('./models/todo')
const todoRoutes=require('./routes/todo')

const app = express();
const port = 3000;


// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const uri = 'mongodb+srv://gollaanjimath123:1234567890@cluster0.fvgb7ow.mongodb.net/todos';  
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error: ", err));


app.use('/todos',todoRoutes);
// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
