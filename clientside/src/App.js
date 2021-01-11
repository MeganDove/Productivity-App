import React, {useState, useEffect} from 'react';
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import { DragDropContext, Droppable, Draggable, DropResult, ResponderProvided, DraggableProvided, DroppableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import {useDispatch, useSelector} from 'react-redux';

import{getPosts} from './actions/posts'
import{getTasks} from './actions/tasks'
import Boards from './components/Boards/Boards'
import Form from './components/Form/Form'
import useStyles from './styles'; 

const App = () => {
    const[currentId, setCurrentId] = useState(null);
    const boards = useSelector((state) => state.posts);
    const tasks = useSelector((state) => state.tasks);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getPosts());
        dispatch(getTasks());
        console.log("updating");
    },[dispatch]);
    
    console.log(boards);
    console.log(tasks);

    return(
        <Container maxwidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Productivity</Typography>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container className={classes.mainContainer} justify= "space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Boards setCurrentId ={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default App; 