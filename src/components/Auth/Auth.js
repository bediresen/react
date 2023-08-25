import { FormControl, InputLabel, Input, Button, FormHelperText } from "@mui/material";
import React, { useState } from "react";

function Auth() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsername = (value) => {
        setUsername(value);
    }

    const handlePassword = (value) => {
        setPassword(value);
    }

    const handleLogin = () => {
        sendRequest("register")
        setUsername("")
        setPassword("")
    }

    const handleRegister = () => {
        sendRequest("login")
        setUsername("")
        setPassword("")
    }

    const sendRequest = (path) => {
        fetch("/auth/" + path, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                userName : username,
                password : password,
            }),
        })
        .then((res) => res.json())
        .then((result) => result)
        .catch((err) => console.log(err))
    }


    return (
        <FormControl style={{ marginTop: 30 }} >
            <InputLabel>Username</InputLabel >
            <Input
                onChange={(i) => handleUsername(i.target.value)} />
            <InputLabel style={{ top: 80 }}>Password</InputLabel>
            <Input style={{ top: 40 }}
                onChange={(i) => handlePassword(i.target.value)} />

            <Button variant="contained"
                style={{
                    marginTop: 60,
                    background: "blue",
                    color: "white"
                }}
                onClick={handleRegister}
            > Register
            </Button>
            <FormHelperText style={{ margin: 20 }}> Are you already registered?</FormHelperText>
            <Button variant="contained"
                style={{
                    background: "blue",
                    color: "white"
                }}
                onClick={handleLogin}
                > Login
            </Button>

        </FormControl>
    )

}

export default Auth;