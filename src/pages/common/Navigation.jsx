import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
// import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

export default function Navigation() {
  const [open, setOpen] = useState(false);

  const nav = useNavigate();

  //drawer
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const email = JSON.parse(localStorage.getItem("FinanceToken")).email;

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[email].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 && <AlternateEmailIcon />}
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Add"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 && <AddIcon />}
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <Divider /> */}
      <List>
        {["Logout"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={toggleModal}>
              <ListItemIcon >
                <LogoutIcon  />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  //end of drawer
  const handleLogout = () => {
    localStorage.removeItem("FinanceToken");
    nav("/login");
  };

  const toggleModal = () => setOpen(!open);

  return (
    <>
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
              {["left"].map((anchor) => (
                <React.Fragment key={anchor}>
                  <MenuIcon onClick={toggleDrawer(anchor, true)} />
                  <SwipeableDrawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                    onOpen={toggleDrawer(anchor, true)}
                  >
                    {list(anchor)}
                  </SwipeableDrawer>
                </React.Fragment>
              ))}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Finance Tracker
            </Typography>
            {/* <Button color="inherit" onClick={toggleModal}>
              Logout
            </Button> */}
          </Toolbar>
        </AppBar>
      </Box>

      {open && (
        <Modal
          open={open}
          toggleModal={toggleModal}
          title="Logout"
          message="Are you sure want to logout?"
          onClick={handleLogout}
        />
      )}

      <div></div>
    </>
  );
}
// {JSON.parse(localStorage.getItem("FinanceToken")).email}
