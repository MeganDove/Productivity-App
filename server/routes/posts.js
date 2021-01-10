import express from 'express';

import { getPosts, getPost, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/tasks.js';

const router = express.Router();

router.get('/posts', getPosts);
router.post('/posts', createPost);
router.patch('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);
router.patch('/posts/:id/likePost', likePost);

router.get('/tasks',getTasks);
router.post('/tasks',createTask);

export default router;