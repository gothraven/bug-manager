import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  listHeaderBox: {
    display: "flex",
    gridTemplateColumns: "1fr 20px auto",
    alignItems: "start"
  },

  listHeader: {
    padding: 20,
    borderBottom: "1px solid #546756"
  }
}));
