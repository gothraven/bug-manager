import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  userIcon: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    // boxShadow: `
    //   0px 3px 5px -1px rgba(0,0,0,0.2),
    //   0px 6px 10px 0px rgba(0,0,0,0.14),
    //   0px 1px 18px 0px rgba(0,0,0,0.12)`
    boxShadow: theme.shadows[1]
  },
  iconSelected: {
    width: 17,
    height: 17,
  },
  close: {
    opacity: 0.6,
    width: 18,
    height: 18
  }
}));
