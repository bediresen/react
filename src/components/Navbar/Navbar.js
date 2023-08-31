import React from "react";
import { Link  } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import "./Navbar.scss"
import { LockOpen } from "@mui/icons-material";

function Navbar() {


const onClick = () => {
    localStorage.removeItem("tokenKey");
    localStorage.removeItem("currentUser")
    localStorage.removeItem("userName")
    localStorage.removeItem("refreshKey")
    window.location.href = (0);
}

    return (
        <div>


            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} textAlign={"left"}>
                            <Link className="linkHome" to="/"> Home </Link>
                        </Typography>
                        <Typography variant="h6" component="div">
                            { localStorage.getItem("currentUser") == null ? <Link className="linkUser" to={{ pathname: '/auth/'  }}>Login/Register</Link> :
                        <div>
                        <IconButton onClick={onClick} > <LockOpen className="linkHome"></LockOpen></IconButton>
                        <Link className="linkUser" to={{ pathname: '/users/' + localStorage.getItem("currentUser") }}>Profile</Link>
                        </div>}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>


        </div>
    )
}

export default Navbar;