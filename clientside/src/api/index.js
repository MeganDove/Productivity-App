import axios from 'axios';

const url_posts = 'http://localhost:5000/posts';
const url_tasks = 'http://localhost:5000/tasks';

export const fetchPosts = () => axios.get(url_posts);
export const createPost = (newPost) => axios.post(url_posts,newPost);
export const updatePost = (id,updatedPost) => axios.patch(url_posts + '/' + id, updatedPost);
export const deletePost = (id) => axios.delete(url_posts + '/' + id);
export const likePost = (id) => axios.patch(url_posts + '/' + id + '/likePost');

export const fetchTasks = (id) => axios.get(url_tasks);
export const createTask = (boardId,newTask) => axios.post(url_tasks,{boardId,newTask});
export const updateTask = (id,updatedPost) => axios.patch(url_tasks + '/' + id, updatedPost);
export const deleteTask = (id) => axios.delete(url_tasks + '/' + id);