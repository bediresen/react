import UserAvatar from "../Avatar/UserAvatar.js"
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserActivity from "../UserActivity/UserActivity.js";
import { makeStyles } from "@mui/styles";
import { GetWithAuth } from "../../services/HttpService.js";


const useStyles = makeStyles({
  root:{
    display : "flex",
  },
});

function User(){

  const[user, setUser] = useState();

  const getUser = () =>{
    GetWithAuth("/users/" + userId)
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
          {user? <UserAvatar avatarId = {user.avatarId} userId ={userId} userName={user.userName}></UserAvatar> : ""}
          {localStorage.getItem("currentUser") == userId ?<UserActivity userId = {userId}></UserActivity> : "" }
          
          User!! {userId}  
        </div>
    )
}

export default User;