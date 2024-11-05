const express = require('express');
const router = express.Router();
const Todo = require('../models/todo'); // Import the Todo model

// Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new todo
router.post('/', async (req, res) => {
    const { uniqueId, taskName, isChecked } = req.body;
    const newTodo = new Todo({ uniqueId, taskName, isChecked });
    try {
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a todo by uniqueId
router.put('/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findOneAndUpdate(
            { uniqueId: req.params.id }, // Find the todo by uniqueId
            req.body, // Update with the data in the request body
            { new: true } // Return the updated document
        );
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (request, response) =>{
    const todoId= request.params.id
    try {
        // Use Mongoose to find the Todo by its ID and delete it
        const deletedTodo = await Todo.findByIdAndDelete(todoId);
        
        if (deletedTodo) {
            response.status(200).json({ message: 'Todo deleted successfully', deletedTodo });
        } else {
            response.status(404).json({ message: 'Todo not found' });
        }
    } catch (error) {
        // Handle any errors that occur during the deletion process
        response.status(500).json({ message: 'Error deleting the todo', error });
    }

})

module.exports = router; // Export the router
