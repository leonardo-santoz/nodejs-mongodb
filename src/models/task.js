const mongoose = require('../database');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        defualt: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;