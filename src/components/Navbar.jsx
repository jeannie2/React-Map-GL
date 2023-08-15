import { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{backgroundColor: "black"}}>
          <Typography id="navbar-text" variant="h5" component="div" sx={{ flexGrow: 1, color: "white" }}>
            NYC Graffiti
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { sm: 'none' } }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={toggleDrawer}
            sx={{ display: { sm: 'none' } }}
          >
            <List>
              <ListItem button component={Link} to="/">
                <ListItemText className="list-item-text" primary="Home" />
              </ListItem>
              <ListItem button component={Link} to="/pins/new">
                <ListItemText className="list-item-text" primary="New pin" />
              </ListItem>
              <ListItem button component={Link} to="https://data.cityofnewyork.us/Social-Services/graffiti/a26u-usa7?defaultRender=page">
                <ListItemText className="list-item-text" primary="API" />
              </ListItem>
            </List>
          </Drawer>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, whiteSpace: 'nowrap' }}>
            <List className="list-item" component="nav" sx={{ display: 'flex' }}>
              <ListItem button component={Link} to="/">
                <ListItemText className="list-item-text" primary="Home" />
              </ListItem>
              <ListItem button component={Link} to="/pins/new">
                <ListItemText className="list-item-text" primary="New pin" />
              </ListItem>
              <ListItem button component={Link} to="https://data.cityofnewyork.us/Social-Services/graffiti/a26u-usa7?defaultRender=page">
                <ListItemText className="list-item-text" primary="API" />
              </ListItem>
            </List>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
