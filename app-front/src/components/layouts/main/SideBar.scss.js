import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  drawer: {
    background: "#0747A6",
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    },
  },
  grid: {
    height: '100%',
  },
  listItem: {
    color: "#fff",
    paddingLeft: 0,
    paddingRight: 0,
    display: "grid",
    justifyContent: "center",
    gridAutoFlow: "column"
  },
  listItemIcon: {
    display: "grid",
    justifyContent: "center",
    color: "#fff"
  }
}));
