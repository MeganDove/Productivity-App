import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const taskSchema = Schema({
    title: String,
    description: String,
    tags: [String],
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var Task = mongoose.model('Task', taskSchema);


export default Task;