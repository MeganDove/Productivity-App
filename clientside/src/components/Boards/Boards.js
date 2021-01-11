import React from 'react';
import {Grid, CircularProgress} from '@material-ui/core'
import {useSelector} from 'react-redux';

import Board from './Board/Board';
import useStyles from './styles';

const Boards = ({setCurrentId}) => {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    console.log(posts);
    
    return(
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {
                    posts.map((post) => (
                        <Grid item={post._id} item xs={12} sm={6}>
                            {console.log(post.tasks)}
                            <Board post={post} setCurrentId={setCurrentId}/>
                        </Grid>
                    ))
                }
            </Grid>
        )
    );
}

export default Boards;