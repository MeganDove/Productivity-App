import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';
import Task from '../models/task.js';

import post from './posts.js';

const router = express.Router();

export const getTasks = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createTask = async (req, res) => {
    console.log("creating task")
    const { title, description, tags } = req.body;

    const newTask = new Task( {title, description, tags} )
    console.log(req.params.id)

    await PostMessage.findByIdAndUpdate(req.params.id, {$push: {tasks: newTask}}, { new: true });

    try {
        await newTask.save();

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