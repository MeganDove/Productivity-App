import{FETCH_ALL_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK} from '../constants/actionTypes'

export default (tasks = [], action) => {
    switch(action.type){
        case FETCH_ALL_TASKS:
            return action.payload;
        case CREATE_TASK:
            return [...tasks, action.payload];
        case UPDATE_TASK:
            return tasks.map((task) => task._id == action.payload._id ? action.payload : task);
        case DELETE_TASK:
            return tasks.filter((task) => task._id !== action.payload);
        default:
            return tasks;
    }
}
