import UserAvatar from "../Avatar/UserAvatar.js"
import React from "react";
import { useParams } from "react-router-dom";
import UserActivity from "../UserActivity/UserActivity.js";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
  root:{
    display : "flex",
  },
});

function User(){
  const classes = useStyles();
    const{userId} = useParams();
    
    return(
        <div className={classes.root}>
          <UserAvatar avatarId = {0} ></UserAvatar>
          <UserActivity></UserActivity>
          User!! {userId}  
        </div>
    )
}

export default User;