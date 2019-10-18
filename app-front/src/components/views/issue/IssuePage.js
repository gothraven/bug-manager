import React from "react";
// import { useParams } from "react-router-dom";
import PropType from "prop-types";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import IssueComment from "./IssueComment";

function IssuePage() {
  // const { id } = useParams();

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
    >
      <IssueHeader issue={issue} />
      <Divider />
      <Grid container spacing={3}>
        <Grid item xs>
          <IssueBody issue={issue} />
        </Grid>
        <Grid item xs={4}>
          <IssueToolBar />
        </Grid>
      </Grid>
    </Grid>
  );
}

function IssueHeader(props) {
  const {
    issue: { number, title }
  } = props;

  return (
    <Typography variant="h1" component="h1" gutterBottom>
      #{number} {title}
    </Typography>
  );
}

function IssueToolBar() {
  // const { issue } = props;

  return (
    <Box m={2}>
      <Paper>Tages</Paper>
    </Box>
  );
}

function IssueBody(props) {
  const { issue } = props;

  return (
    <>
      <IssueComment issue={issue} />
      <IssueComment creation issue={issue} />
    </>
  );
}

const issue = {
  number: 217,
  title: "Implement Issue page ",
  content:
    "Lorem cupidatat deserunt excepteur sit qui consectetur magna proident cupidatat. Exercitation et dolore quis ipsum nostrud ipsum et amet qui commodo adipisicing. Lorem eiusmod duis culpa est tempor eu magna voluptate velit nulla. Et voluptate duis commodo tempor veniam deserunt incididunt qui ullamco est velit esse. Exercitation sit sunt aliqua qui tempor sint officia Lorem ipsum voluptate sint Lorem tempor. Lorem nulla qui cupidatat ad sint mollit culpa ut dolor dolore sit ad dolor consequat. Ex deserunt amet nisi enim amet non do mollit mollit esse.",
  attachments: [],
  creatorId: "diallo",
  assignedUserIds: [
    { username: "saafiy" },
    { username: "zagbane" },
    { username: "errahmane" }
  ],
  tagsIds: [{ name: "TAG #1" }, { name: "TAG #2" }, { name: "TAG #3" }],
  projectId: "64565426524ABACAAVBA1543254"
};

IssueHeader.propTypes = {
  issue: PropType.object.isRequired
};

IssueBody.propTypes = {
  issue: PropType.object.isRequired
};

export default IssuePage;
