
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@mui/styles";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { List, ListItem ,Checkbox, ListItemButton  , ListItemText ,ListItemAvatar , Avatar  , ListItemSecondaryAction, Radio} from '@mui/material';
import { useState } from 'react';
import Post from '../Post/Post';


const useStyles = makeStyles({
    root : {
    maxWidth : 345,
    margin : 50,
},

popUp: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
},
modal: {
    display : 'flex',
    maxWidth: 200,
}

})

function UserAvatar(props) {
    const {avatarId, userId, userName} = props;
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState([1]);
    const [selectedValue, setSelectedValue] = useState(avatarId);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
    saveAvatar();}

const saveAvatar = () =>{

  fetch("/users/" +localStorage.getItem("currentUser"),{
    method:"PUT",
    headers: {
      "Content-Type" : "application/json",
      "Authorization" : localStorage.getItem("tokenKey"),
    },
    body : JSON.stringify({
      avatar : selectedValue,
    }),
  })
  .then((res) => res.json())
  .catch((err) => console.log(err))
}


const classes = useStyles();

const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };


    return (

        <div> 
          
          <Card className={classes.root}>
            <CardMedia
                component="img"
                alt="User Avatar"
                image={`/avatars/avatar${selectedValue}.png`}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Username
                </Typography>
                <Typography variant="body2" color="text.secondary">
                   User info
                </Typography>
            </CardContent>
            <CardActions>
            <Button onClick={handleOpen}>Change Avatar</Button>
        <Modal
        className={classes.modal}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
           
           
           <List dense>
      {[1, 2, 3, 4].map((key) => {
        const labelId = `checkbox-list-secondary-label-${key}`;
        return (
          <ListItem key={key} button>
              <CardMedia
              style = {{maxWidth: 100}}
              component="img"
              alt={`Avatar n°${key}`}
              image={`/avatars/avatar${key}.png`}
              title="User Avatar"
              />
            <ListItemSecondaryAction>
              <Radio
                edge="end"
                value= {key}
                onChange={handleChange}
                checked={""+selectedValue === ""+key}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
    
    
        </Modal> 
            </CardActions>
        </Card>
            


        </div>
        
    )

}

export default UserAvatar;