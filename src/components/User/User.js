import { Avatar } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

function User(){

    const{userId} = useParams();
    return(
        <div>
          <Avatar></Avatar>
          User!! {userId}  
        </div>
    )
}

export default User;