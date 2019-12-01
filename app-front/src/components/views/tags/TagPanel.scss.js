import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  description: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));
