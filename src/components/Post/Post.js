import { Container, setRef } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React, { useState, useEffect, useRef } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse'; // Add this import
import { styled } from '@mui/material/styles'; // Import styled from @mui/material/styles
import { makeStyles } from "@mui/styles";
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from 'react-router-dom'
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";
import { LocalLaundryService } from "@mui/icons-material";
import { DeleteWithAuth, PostWithAuth } from "../../services/HttpService";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 800,
    display: "flex",
    flexDirection: "column",
    margin: 20, // This centers the card within its container

    textAlign: "left",
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



function Post(props) {
  const { postId, title, text, userName, userId, likes } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const[isLiked, setIsLiked] = useState(false);
  const isInitialMount = useRef(true);
  const[likeCount, setLikeCount] = useState(likes.length || 0)
  const [likeId, setLikeId] = useState(null);
  const[refresh , setRefresh] = useState(false);
  let disabled = localStorage.getItem("currentUser") == null ? true : false;

const setCommentRefresh = () =>{
  setRefresh(true);
}

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments(); // Pass the postId to the function
    console.log(commentList)
  };

  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      saveLike();
      setLikeCount(likeCount + 1);
    } else {
      setIsLiked(false);
      deleteLike();
      setLikeCount(likeCount - 1);
    }
  };


  const refreshComments = () => {
    fetch("/comments?postId=" + postId)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
      setRefresh(false)
  };

  const saveLike = () => {
    PostWithAuth("/likes" , {
      postId : postId,
      userId : localStorage.getItem("currentUser")
    })
  .then((res) => res.json())
  .catch((err) => console.log(err))
  }

  const deleteLike = () => {
    DeleteWithAuth("/likes/" + likeId)
    .catch((err) => console.log(err))
  }

  const checkLikes = () =>{
    var likeControl = likes.find((like => "" + like.userId === localStorage.getItem("currentUser")));
    if(likeControl != null){
      setLikeId(likeControl.id)
      setIsLiked(true);
    }
   
  }

  useEffect(() => {checkLikes()} , [])

  useEffect(() => {
    if (isInitialMount.current)
      isInitialMount.current = false;
    else
      refreshComments();
  }, [refresh])

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

        title={title}

      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      
      <CardActions disableSpacing style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleLike} aria-label="add to favorites" disabled={disabled}>
            <FavoriteIcon style={isLiked ? { color: "red" } : null} />
          </IconButton>
          {likeCount}
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <CommentIcon
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            style={{ marginLeft: 'auto' }} 
          >
            <ExpandMoreIcon />
          </CommentIcon>
        </div>
      </CardActions>
      
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Container fixed className={classes.container}>
          {error ? "error" :
            isLoaded ? commentList.map(comment => (
              <Comment userId={comment.userId} userName={comment.userName} text={comment.text}></Comment>
            )) : "Loading"}
            {disabled? "" :
           <CommentForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("currentUser")} postId={postId} setCommentRefresh = {setCommentRefresh}></CommentForm>}
        </Container>
      </Collapse>
    </Card>
  );
}

export default Post;