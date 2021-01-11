import React from 'react';
import useStyles from './styles';
import {Grid,Card,CardActions,CardContent,CardMedia,Button,Typography} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import {useDispatch,useSelector} from 'react-redux';


const Task = ({task, setCurrentId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    console.log(task._id.toString());

    return(
        <Card className={classes.card}>
            <div> 
                <Typography className={classes.title} variant="h6">{task.title}</Typography>
            </div>
        </Card>
    );
}

export default Task;