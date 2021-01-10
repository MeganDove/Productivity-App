import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';
import Task from '../models/task.js';

import post from './posts.js';

const router = express.Router();

export const getTasks = async (req, res) => { 
    try {
        const tasks = await Task.find();
                
        res.status(200).json(tasks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createTask = async (req, res) => {
    console.log("creating task")
    const { title, description, tags } = req.body.newTask;

    const newTask = new Task( {title, description, tags} )


    try {
        await newTask.save();
        await PostMessage.findByIdAndUpdate(req.body.boardId, {$push: {tasks: newTask}}, { new: true });

        res.status(201).json(newTask);
    } catch (error) {
        console.log(error)
        res.status(409).json({ message: error });
    }
}

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { description, collectionName, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { collectionName, description, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}


export default router;