import * as api from '../api/index.js'
import{FETCH_ALL_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK} from '../constants/actionTypes'

// Action Creators
export const getTasks = () => async (dispatch) => {
    try{
        const{data} = await api.fetchTasks();
        dispatch({type: FETCH_ALL_TASKS, payload: data})
    }
    catch(error){
        console.log(error.message);
    }
}

export const createTask = (id,task) => async (dispatch) => {
    console.log('creating task')
    try{
        const{data} = await api.createTask(id,task);
        dispatch({type: CREATE_TASK, payload: data})
    }
    catch(error){
        console.log(error.message);
    }
}

export const updateTask = (id, task) => async (dispatch) => {
    try{
        const{data} = await api.updatePost(id,task);
        dispatch({type: UPDATE_TASK, payload: data})
    }
    catch(error){
        console.log(error.message);
    }
}

export const deleteTask = (id) => async (dispatch) => {
    try{
        await api.deleteTask(id);
        dispatch({type: DELETE_TASK, payload: id})
    }
    catch(error){
        console.log(error);
    }
}