import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { graphql, useFragment } from "react-relay/hooks";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Fab from "@material-ui/core/Fab";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Dashboard from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ClassIcon from "@material-ui/icons/Class";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import SettingsIcon from "@material-ui/icons/Settings";
import { signOut } from "../../core/utils/Auth";

const drawerWidth = 200;

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
    width: theme.spacing(7) + 20,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 20
    },
    icons: {
      color: "white"
    }
  },
  listItem: {
    color: "#fff"
  },
  listItemIcon: {
    display: "grid",
    justifyContent: "center",
    color: "#fff"
  }
}));

const menuItems = [
  {
    title: "Dashboard",
    icon: <Dashboard />,
    link: "/user/dashboard"
  },
  {
    title: "Projects",
    icon: <ClassIcon />,
    link: "/user/projects"
  },
  {
    title: "tags",
    icon: <BookmarksIcon />,
    link: "/user/tags"
  },
  {
    title: "settings",
    icon: <SettingsIcon />,
    link: "/user/settings"
  }
];

function SideBar(props) {
  const { queryData } = props;
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { me } = useFragment(
    graphql`
      fragment SideBar_me on Query {
        me {
          id
          name
        }
      }
    `,
    queryData,
  );

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
              <Avatar alt="">{me.name.substr(0, 2)}</Avatar>
            </ListItemIcon>
            {open && <ListItemText primary={me.name} />}
          </ListItem>
          <ListItem button classes={{ root: classes.listItem }}>
            <Fab
              variant="extended"
              aria-label="add-issue"
              style={{ backgroundColor: "#fff" }}
              onClick={() => history.push("/user/issue/new")}
            >
              <img
                style={{ width: 30, margin: 5 }}
                src="/images/create_32dp.png"
                alt="Under development"
              />
              {open && "New Issue"}
            </Fab>
          </ListItem>
          {menuItems.map(item => (
            <ListItem
              key={item.title}
              button
              classes={{ root: classes.listItem }}
              onClick={() => history.push(item.link)}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.title} />}
            </ListItem>
          ))}
        </List>
        <ListItem
          key="Logout"
          button
          classes={{ root: classes.listItem }}
          onClick={() => {
            signOut();
            history.push("/sign-in");
          }}
        >
          <ListItemIcon classes={{ root: classes.listItemIcon }}>
            <ExitToAppIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Logout" />}
        </ListItem>
      </div>
    </Drawer>
  );
}

SideBar.defaultProps = {
  queryData: undefined
};

SideBar.propTypes = {
  queryData: PropTypes.object
};

export default SideBar;
