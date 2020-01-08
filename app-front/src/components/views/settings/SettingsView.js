import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AccountSettings from "./AccountSettings";
import SecuritySettings from "./SecuritySettings";
import UsersSettings from "./UsersSettings";
import StatusSettings from "./StatusSettings";
import { Can } from "../../core/Ability";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: "flex"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

function SettingsView() {
  const classes = useStyles();
  const [value, setValue] = React.useState(3);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        <Tab label="Account" {...a11yProps(0)} />
        <Tab label="Security" {...a11yProps(1)} />
        <Can I="see" a="UsersSettings">
          {() => (
            <Tab
              label="Users"
              onClick={e => handleChange(e, 2)}
              {...a11yProps(2)}
            />
          )}
        </Can>
        <Can I="see" a="StatusSettings">
          {() => (
            <Tab
              label="Life Cycle"
              onClick={e => handleChange(e, 3)}
              {...a11yProps(3)}
            />
          )}
        </Can>
      </Tabs>
      <TabPanel value={value} index={0}>
        <AccountSettings />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SecuritySettings />
      </TabPanel>
      <Can I="see" a="UsersSettings">
        {() => (
          <TabPanel value={value} index={2}>
            <UsersSettings />
          </TabPanel>
        )}
      </Can>
      <Can I="see" a="StatusSettings">
        {() => (
          <TabPanel value={value} index={3}>
            <StatusSettings />
          </TabPanel>
        )}
      </Can>
    </div>
  );
}

export default SettingsView;
