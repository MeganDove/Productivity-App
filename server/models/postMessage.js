import mongoose from 'mongoose';
import Task from './task.js'

const Schema = mongoose.Schema;

const postSchema = mongoose.Schema({
    description: String,
    collectionName: String,
    tags: [String],
    selectedFile: String,    
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: Task
    }],
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;