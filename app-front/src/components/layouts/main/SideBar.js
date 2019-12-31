import React from "react";
import propTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Dashboard from "@material-ui/icons/Dashboard";
import HelpIcon from "@material-ui/icons/HelpRounded";
import SignOutIcon from "@material-ui/icons/PowerSettingsNew";
import ClassIcon from "@material-ui/icons/Class";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import { signOut } from "../../core/utils/Auth";
import UserAvatar from "../../lib/UserAvatar";
import NewIssueDialog from "../../lib/NewIssueDialog";
import { Can } from "../../core/Ability";

import useStyles from "./SideBar.scss";

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
    title: "Tags",
    icon: <BookmarksIcon />,
    link: "/user/tags"
  },
  {
    title: "Settings",
    icon: <SettingsIcon />,
    link: "/user/settings"
  }
];

function SideBar(props) {
  const { me } = props;
  const history = useHistory();
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{ paper: classes.drawer }}
    >
      <Grid
        container
        className={classes.grid}
        direction="column"
        justify="space-between"
      >
        <Grid item>
          <List>
            <ListItem 
              key="Profil"
              classes={{ root: classes.listItem }}
              onClick={() => history.push("/user/profil")}
              button 
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <UserAvatar user={me} />
              </ListItemIcon>
            </ListItem>
            <ListItem button classes={{ root: classes.listItem }}>
              <NewIssueDialog />
            </ListItem>
            {menuItems.map(item => (
              <Can key={item.title} I="see" this={item.title}>
                {() => (
                  <ListItem
                    button
                    classes={{ root: classes.listItem }}
                    onClick={() => history.push(item.link)}
                  >
                    <ListItemIcon classes={{ root: classes.listItemIcon }}>
                      {item.icon}
                    </ListItemIcon>
                  </ListItem>
                )}
              </Can>
            ))}
          </List>
        </Grid>
        <Grid item>
          <List>
            <ListItem button classes={{ root: classes.listItem }}>
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <HelpIcon />
              </ListItemIcon>
            </ListItem>
            <ListItem
              key="Logout"
              button
              classes={{ root: classes.listItem }}
              onClick={() => {
                signOut();
                history.push("/user/sign-in");
              }}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <SignOutIcon />
              </ListItemIcon>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Drawer>
  );
}

SideBar.propTypes = {
  me: propTypes.shape({
    id: propTypes.string,
    name: propTypes.string,
    email: propTypes.string,
    role: propTypes.string
  }).isRequired
};

export default SideBar;
