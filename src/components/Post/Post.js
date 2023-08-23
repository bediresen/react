
import Comment from "../Comment/Comment"
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
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Add this import
import CardMedia from '@mui/material/CardMedia'; // Add this import
import Collapse from '@mui/material/Collapse'; // Add this import
import { styled } from '@mui/material/styles'; // Import styled from @mui/material/styles
import { makeStyles } from "@mui/styles";
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from 'react-router-dom'


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
  const { postId, title, text, userName, userId } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const isInitialMount = useRef(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments(); // Pass the postId to the function
    console.log(commentList)
  };

  const handleLike = () => {
    setLiked(!liked);
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
  };


  useEffect(() => {
    if (isInitialMount.current)
      isInitialMount.current = false;
    else
      refreshComments();
  }, [commentList])

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
      <CardActions disableSpacing>

        <IconButton
          onClick={handleLike}
          aria-label="add to favorites">
          <FavoriteIcon style={liked ? { color: "red" } : null} />
        </IconButton>

        <CommentIcon
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </CommentIcon>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>

        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Post;