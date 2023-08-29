import UserAvatar from "../Avatar/UserAvatar.js"
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserActivity from "../UserActivity/UserActivity.js";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
  root:{
    display : "flex",
  },
});

function User(){

  const[user, setUser] = useState();

  const getUser = () =>{
    fetch("/users/" + userId ,{
      method :"GET",
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : localStorage.getItem("tokenKey"),
      },
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        setUser(result);
      },
    (error) => {
      console.log(error)
    }
    )
  }

  useEffect(()=>{
    getUser()
  },[])
  
  const classes = useStyles();
    const{userId} = useParams();
    
    return(
        <div className={classes.root}>
          {user? <UserAvatar avatarId = {user.avatarId} ></UserAvatar> : ""}
          <UserActivity userId = {userId}></UserActivity>
          User!! {userId}  
        </div>
    )
}

export default User;