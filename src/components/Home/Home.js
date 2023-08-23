import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles"; // Import styled from @mui/material/styles
import Post from "../Post/Post";
import { Container } from "@mui/material";


const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent : "center",
        alignItems : "center",
        backgroundColor: "#cfe8fc",
        height : "100vh",
    }
}))


function Home() {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [isLoaded, setIsloaded] = useState(false);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
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
    }, [])

    if (error) {
        return <div> Error !! </div>;
    } else if (!isLoaded) {
        return <div> Loading... </div>
    }
    else {
        return (

            <Container fixed className={classes.container}>
                {postList.map(post => (
                    <Post userId = {post.userId} userName = {post.userName} title = {post.title} text =  { post.text } ></Post>
                ))}

            </Container>

        );
    }

}

export default Home;