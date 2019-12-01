import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  card: {
    minWidth: 350,
    margin: 10,
    borderBottom: "2px solid #0B9ED9"
  },
  cardTitle: {
    marginRight: "0px",
    "& button": {
      transition: "background .3s ease-in-out",
      "& svg": {
        fontSize: 20
      }
    }
  }
}));
