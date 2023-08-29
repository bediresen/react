import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import { Button, AppBar, Toolbar, IconButton, Typography , Dialog } from '@mui/material';
import Post from '../Post/Post';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const columns = [
  {
    id: 'User Activity',
    label: 'User Activity',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PopUp(props) {

  const{isOpen , postId, setIsOpen} = props;
  const[post,setPost] = useState(null);
  const [open, setOpen] = useState(false);


  const getPost = () => {
    fetch("/posts/" +postId , {
      method: "GET",
      headers:{
        "Content-Type" : "application/json",
        "Authorization" : localStorage.getItem("tokenKey"),
      },
    })
    .then(res=> res.json())
    .then(
      (result) => {
        console.log(result);
        setPost(result);
      },
      (error) => {
        console.log(error)
      }
    )
    
  }

  useEffect(() => {
    setOpen(isOpen);
  } , [isOpen])

  useEffect(() =>{
    getPost();
  }, [postId]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  };

  

  return (
    <div>
   
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Close
            </Typography>
          
          </Toolbar>
        </AppBar>
        {post ? (
  <Post
    likes={post.postLikes}
    postId={post.id}
    userId={post.userId}
    userName={post.userName}
    title={post.title}
    text={post.text}
  />
) : (
  "loading"
)}
      </Dialog> 
    </div>
  )
}

function UserActivity(props) {
  const { userId } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [error, setError] = useState(null);
  const [rows, setRows] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const[selectedPost , setSelectedPost] = useState(null);
  const[isOpen, setIsOpen] = useState(false);


  const handleNotification = (postId) => {
    setSelectedPost(postId);
    setIsOpen(true);
  };

  const getActivity = () => {
    fetch("/users/activity/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("tokenKey"),
      },
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setRows(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  useEffect(() => {
    getActivity();
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div> 
     {isOpen? <PopUp isOpen={isOpen} postId = {selectedPost}  setIsOpen={setIsOpen}/> : ""}
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              User Activity
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <Button onClick={() => handleNotification(row[1])}>
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                    {row[3] + " " + row[0] + " your post"}
                  </TableRow>
                </Button>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    </div>
  );
}
export default UserActivity;