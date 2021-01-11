import React, {useState,useEffect} from 'react';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import {useDispatch, useSelector} from 'react-redux';

import {createPost, updatePost} from '../../actions/posts';

const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({collectionName: '', description: '',tags: '', selectedFile: ''});
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id == currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if(post) setPostData(post)
    },[post])

    const handleSubmit = (e) => {
        // Avoids the refresh in the browser
        e.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId,postData));
        }else{
            dispatch(createPost(postData));
        }

        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({collectionName: '', description: '',tags: '', selectedFile: ''})
    }
    return(
        <Paper className= {classes.paper}>
            <form autoComplete = "off" noValidate className = {'${classes.root} ${classes.form}'} onSubmit = {handleSubmit}>
                <Typography variant="h6">Add a Collection</Typography>
                <TextField name="collectionName" variant="outlined" label="Collection name" fullWidth value={postData.collectionName} onChange={(e) => setPostData({...postData, collectionName: e.target.value})}/>
                {/* <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})}/> */}
                <TextField name="description" variant="outlined" label="Description (Optional)" fullWidth value={postData.description} onChange={(e) => setPostData({...postData, description: e.target.value})}/>
                {/* <TextField name="tags" variant="outlined" label="Labels" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value})}/> */}
                <p></p>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>ADD</Button>
                <Button variant="contained" color="secondary" size="large" onClick={clear} fullWidth>CLEAR</Button>
            </form>
        </Paper>
    );
}

export default Form;