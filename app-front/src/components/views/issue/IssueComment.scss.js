import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    transition: theme.transitions.create("box-shadow"),
    boxShadow: theme.shadows[1],
    borderRadius: theme.shape.borderRadius
  },
  content: {
    whiteSpace: "pre-wrap"
  }
}));
