import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@mui/styles";
import { Avatar, InputAdornment, CardContent, OutlinedInput } from "@mui/material";
import { Link } from 'react-router-dom'
import { Input } from "@mui/icons-material";
import { Button } from "@mui/material";
import { PostWithAuth, RefreshToken } from "../../services/HttpService";

const useStyles = makeStyles((theme) => ({
    comment: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    small: {
        width: 32,
        height: 32,
    },

    link: {
        textDecoration: "none",
        boxShadow: "none",
        color: "white"
    }
}));

function CommentForm(props) {

    const { userId, userName, postId, setCommentRefresh } = props;
    const classes = useStyles();
    const [text, setText] = useState("");



    const logout = () => {
        localStorage.removeItem("tokenKey");
        localStorage.removeItem("currentUser")
        localStorage.removeItem("userName")
        localStorage.removeItem("refreshKey")
        window.location.href = (0);
    }

    const saveComment = () => {
        PostWithAuth("/comments",{
            postId: postId, 
            userId : userId,
            text : text,
          })
          .then((res) => {
            if(!res.ok) {
                RefreshToken()
                .then((res) => { if(!res.ok) {
                    logout();
                } else {
                   return res.json()
                }})
                .then((result) => {
                    console.log(result)

                    if(result != undefined){
                        localStorage.setItem("tokenKey",result.accessToken);
                        saveComment();
                        setCommentRefresh();
                    }})
                .catch((err) => {
                    console.log(err)
                })
            } else 
            res.json()
        })
          .catch((err) => {
            console.log(err)
          })
    }

    const handleSubmit = () => {
        saveComment(postId, userId);
        setText("");
        setCommentRefresh();
    }

    const handleChange = (e) => {
        setText(e);
    }

    return (
        <CardContent className={classes.comment}>
            <OutlinedInput

                id="outlined-adornment-amount"
                multiline
                inputProps={{ maxLength: 250 }}
                fullWidth
                onChange={(input) => handleChange(input.target.value)}
                startAdornment={
                    <InputAdornment position="start">
                        <Link className={classes.link} to={{ pathname: 'users/' + userId }}

                        >
                            <Avatar aria-label="recipe" className={classes.small}>
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        <Button
                            variant="contained"
                            style={{ backgroundColor: "blue", color: "white", }}
                            onClick={handleSubmit}>
                            Comment
                        </Button>
                    </InputAdornment>
                }
                value={text}
                style={{ color: "black", backgroundColor: "white" }}
            >

            </OutlinedInput>
        </CardContent>
    )

}

export default CommentForm;