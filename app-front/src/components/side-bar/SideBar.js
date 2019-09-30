import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    background: "#0747A6",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    background: "#0747A6",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    },
    icons: {
      color: "white"
    }
  },
  listItem: {
    color: "#fff"
  },
  listItemIcon: {
    color: "#fff"
  }
}));

const menuItems = [
  {
    title: "Dashboard",
    icon: <InboxIcon />,
    link: "/user/dashboard"
  },
  {
    title: "Projects",
    icon: <MailIcon />,
    link: "/user/issue"
  }
];

function SideBar(props) {
  const { history } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })
      }}
      open={open}
    >
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <List>
          <ListItem button classes={{ root: classes.listItem }}>
            <ListItemIcon classes={{ root: classes.listItemIcon }}>
              <Avatar alt="">RS</Avatar>
            </ListItemIcon>
            <ListItemText primary="Remy Sharp" />
          </ListItem>
          {menuItems.map(item => (
            <ListItem
              button
              classes={{ root: classes.listItem }}
              onClick={() => history.push(item.link)}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
}

SideBar.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(SideBar);
