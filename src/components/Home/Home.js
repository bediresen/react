import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles"; // Import styled from @mui/material/styles
import Post from "../Post/Post";
import Comment from "../Comment/Comment";
import { Container } from "@mui/material";
import PostForm from "../Post/PostForm";


const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f5ff",

    }
}));


function Home() {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [isLoaded, setIsloaded] = useState(false);
    const [postList, setPostList] = useState([]);
    const [commentList, setCommentList] = useState([]);


    const refreshPosts = () => {
        fetch("/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsloaded(true);
                    setPostList(result)
                },
                (error) => {
                    setIsloaded(true);
                    setError(error);
                }
            )
    }



    useEffect(() => {
        refreshPosts();
    }, [postList])

    if (error) {
        return <div> Error !! </div>;
    } else if (!isLoaded) {
        return <div> Loading... </div>
    }
    else {
        return (

            <div fixed className={classes.container} >
                <PostForm userId={1} userName={"ddd"} refreshPosts={refreshPosts} />
                {postList.map( (post) => (
                    <Post
                        
                        postId={post.id}
                        userId={post.userId}
                        userName={post.userName}
                        title={post.title}
                        text={post.text}
                    />
                ))}
            </div>


        );
    }

}

export default Home;