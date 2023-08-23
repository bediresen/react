import React, { useState } from "react";

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Button} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Add this import
import CardMedia from '@mui/material/CardMedia'; // Add this import
import Collapse from '@mui/material/Collapse'; // Add this import
import { styled } from '@mui/material/styles'; // Import styled from @mui/material/styles
import { makeStyles } from "@mui/styles";
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from 'react-router-dom'
import { InputAdornment, OutlinedInput } from "@mui/material";


const useStyles = makeStyles((theme) => ({
  root: {
    width: 800,
    display: "flex",
    flexDirection: "column",
    margin: 20, // This centers the card within its container
  
    textAlign :"left",
  },
}))

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));



function PostForm(props) {

  const {userName , userId } = props;
  const classes = useStyles();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");


const savePost = () =>{
    fetch("/posts",
    {
        method :"POST",
        headers :{
            "Content-Type" : "application/json",
        },
        body : JSON.stringify({
            title : title,
            userId : userId,
            text: text,
        }),
    })
    .then( (res) => res.json() )
    .catch( (err) => console.log("error") )
}

  const handleSubmit = () => {
    savePost();
  };

  const handleTitle = (event) => {
    setTitle(event);
  };

  const handleText = (e) => {
    setText(e);
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Link className="linkUser" to={{ pathname: '/users/' + userId }}> 
          
          <Avatar sx={{ backgroundColor: "blue" }} aria-label="recipe">
            {userName.charAt(0).toUpperCase()}
          </Avatar>
           </Link>
          
        }
    
        title={<OutlinedInput
        id="outlined-adornment-amount"
        multiline
        placeholder="Title"
        inputProps = {{maxLength : 25}}
        fullWidth
        onChange={ (i) => handleTitle(i.target.value ) }
        >
        </OutlinedInput>}
 
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
        <OutlinedInput
        id="outlined-adornment-amount"
        multiline
        placeholder="Text"
        inputProps = {{maxLength : 250}}
        fullWidth
        onChange={ (i) => handleText(i.target.value) }
        endAdornment = {
            <InputAdornment position="end">
            <Button
            variant="contained" 
            style={{backgroundColor: "blue", color : "white" , }}
            onClick={handleSubmit}>
                POST
            </Button>
            </InputAdornment>
        }>
        
        </OutlinedInput>
        </Typography>
      </CardContent>
   
    </Card>
  );
}

export default PostForm;