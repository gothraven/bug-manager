import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  userIcon: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    boxShadow: `
      0px 3px 5px -1px rgba(0,0,0,0.2),
      0px 6px 10px 0px rgba(0,0,0,0.14),
      0px 1px 18px 0px rgba(0,0,0,0.12)`
  },
  devider: {
    width: "100%",
    backgroundColor: "#B3B1AD"
  },
  bodyIcon: {
    width: theme.spacing(15),
    height: theme.spacing(15)
  }
}));
