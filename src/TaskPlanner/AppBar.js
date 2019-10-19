import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import NavigationDrawer from './NavigationDrawer';
import {NewTask} from '../Task/NewTask';
import {Link, Redirect} from "react-router-dom";

export default function PrimarySearchAppBar() {
    
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);    
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  
  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
    <Link to="/filter">
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton aria-label="filter" aria-controls="primary-search-account-menu"
          aria-haspopup="true" color="inherit">
            <SearchIcon />
        </IconButton>
        <p>Filter</p>
      </MenuItem>
    </Link>
    </Menu>
  );

  return (
    <div >
      <AppBar position="static">
        <Toolbar>
          <div>
           <NavigationDrawer></NavigationDrawer>
          </div> 
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            >
          <div id="options">
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
          </Grid>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}