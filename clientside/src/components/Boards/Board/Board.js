import React, {useState,useEffect} from 'react';
import useStyles from './styles';
import {Grid,Card,CardActions,CardContent,CardMedia,Button, TextField,Typography,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import moment from 'moment';
import {useDispatch,useSelector} from 'react-redux';
import { ObjectID } from 'mongodb';

import {getPosts,updatePost,deletePost,likePost} from '../../../actions/posts';
import {getTasks,createTask} from '../../../actions/tasks';


import Task from './Task/Task'

const Board = ({post, setCurrentId}) => {
    const [taskData, setTaskData] = useState({title: '',description: '', tags: ''});
    const [postData, setPostData] = useState(post);
    console.log(postData);

    const classes = useStyles();
    const dispatch = useDispatch();

    // TO DO
        // Allow tasks to be moved between boards
    
    const [taskIds,setTaskIds] = useState(post.tasks);
    console.log(taskIds)
    const allTasks = useSelector((state) => state.tasks);
    console.log(allTasks)
    const [tasks,setTasks] = useState([]);

    const [unique,setUnique] = useState(true);
    
    useEffect(()=> {
        taskIds.map((t)=>{
            allTasks.map((t2)=> {
                if(t == t2._id){
                    let unique = true;
                    tasks.map((t3)=> {
                        if(t3._id === t2._id){
                            unique = false;
                        }
                    })
                    if(unique){
                        setTasks(tasks => [...tasks,t2]);
                    }
                }
            })
         })
         console.log("updating tasks")
    },[allTasks])

    console.log(tasks);

    const onDragEnd=(result)=>{
        if(!result.destination){
            return
        }
        const startIndex = result.source.index;
        const endIndex = result.destination.index;

        const tasksCopy = Array.from(tasks);
        const[removed] = tasksCopy.splice(startIndex,1);
        tasksCopy.splice(endIndex,0,removed);

        setTasks(tasksCopy)
        console.log(postData.tasks == tasksCopy)
        setPostData({...postData,tasks: tasksCopy});
    }

    useEffect (()=>{
        console.log(postData);
        dispatch(updatePost(post._id,postData));
    },[postData])

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
        if(taskData.title != ''){
            console.log("taskData")
            //setTasks([]);
            setTasks(tasks => [...tasks,taskData])
            setPostData({...postData,tasks: tasks});
            updatePost(post._id,postData);
            dispatch(createTask(post._id,taskData))
        }
    };

    return( 
        <DragDropContext onDragEnd={onDragEnd}>
            <Card className={classes.card}>
                {/* <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/> */}
                <div>
                    <Typography className={classes.title} variant="h6">{post.collectionName}</Typography>
                    {/* <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography> */}
                </div>
                <div className={classes.overlay2}>
                    <Button style={{color:"black"}} size="small" onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="default" />
                    </Button>
                </div>
                <div className={classes.details}>
                </div>
                {/* <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography> */}
                
                <Droppable droppableId="boardDroppable" type= "board">
                    {(provided, snapshot)=> ( 
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p" gutterBottom>{post.description}</Typography>
                            <Grid container alignItems="stretch" spacing={3} innerRef={provided.innerRef} {...provided.droppableProps}>
                                {
                                    tasks.map((task,index) => (
                                        <Draggable key={task._id.toString()} draggableId={task._id.toString()} index={index} type= "board">
                                            {(provided,snapshot)=> (
                                                <Grid item={post._id} item xs={12} sm={12} innerRef={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                                        <Task task={task} setCurrentId={setCurrentId}/>
                                                </Grid>
                                            )}  
                                        </Draggable>
                                        
                                    ))
                                }
                            </Grid>
                            {provided.placeholder}
                        </CardContent>
                    )}
                    
                </Droppable>
                
                <CardActions className={classes.cardActions}>
                    {/* <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
                        <ThumbUpAltIcon fontSize="small"/>
                        Like &nbsp;
                        {post.likeCount}
                    </Button> */}
                    <Button size="small" color="primary" onClick={() => {handleClickOpen()}}>
                        Add Task
                    </Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">New Task:</DialogTitle>
                    <DialogContent>
                        <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Task Name"
                        fullWidth
                        onChange={(e) => setTaskData({...taskData, title: e.target.value, _id: new ObjectID()})}
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField 
                        margin="dense"
                        id="desc"
                        label="Description (optional)"
                        fullWidth
                        onChange={(e) => setTaskData({...taskData, description: e.target.value})}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={handleClose} color="primary">
                        Add
                        </Button>
                    </DialogActions>
                    </Dialog>
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small"/>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </DragDropContext>
    );
}

export default Board;