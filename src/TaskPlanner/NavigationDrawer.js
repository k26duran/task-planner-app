import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import './NavigationDrawer.css';
import {Link, Redirect} from "react-router-dom";

function logOut() {
    localStorage.removeItem("isLoggedIn");

}

export default function NavigationDrawer() {

  const [state, setState] = React.useState({
    lefft: false
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar src="/logo.png" />
        </ListItemAvatar>
        <ListItemText
          primary="My Profile"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className="inline"
                color="textPrimary"
              >
                {localStorage.getItem("username")}
              </Typography>
              
            </React.Fragment>
          }
        />
    <Link to="/profile">
    <IconButton color="secondary" id="modify" >
          <EditIcon></EditIcon>
    </IconButton>
    </Link>
    </ListItem>
    <ListItem alignItems="flex-start">
    </ListItem>
    <Divider />  
      {['Log Out'].map((text, index) => (
          <ListItem button key={text} onClick={logOut}>
            <Link to="/"><ListItemIcon id="logout"><ExitToAppIcon /></ListItemIcon></Link>
            <ListItemText primary={text} />
          </ListItem>
        ))}
    </List>
    </div>
  );
  return (
    <div>
      <IconButton aria-haspopup="true" className="btn" aria-label="Menu" color="inherit" onClick={toggleDrawer('left', true)}>
          <Menu></Menu>
      </IconButton>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>

    </div>
  );
}