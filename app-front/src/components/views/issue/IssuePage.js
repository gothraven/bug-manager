import React from "react";
// import { useParams } from "react-router-dom";
import PropType from "prop-types";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IssueComment from "./IssueComment";
import IssueHistory from "./IssueHistory";
import IssueTags from "./IssueTags";
import IssueAssignees from "./IssueAssignees";

function IssuePage() {
  // const { id } = useParams();
  const issue = requestIssue;

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
          <IssueAssignees assignees={assignees} />
          <IssueTags tags={tags} />
        </Grid>
      </Grid>
    </Grid>
  );
}

function IssueHeader(props) {
  const {
    issue: { title }
  } = props;

  return (
    <Typography variant="h1" component="h1" gutterBottom>
      # {title}
    </Typography>
  );
}

function IssueBody(props) {
  const { issue } = props;
  const {
    history: { comments, actions }
  } = issue;

  function issueBodyNodes() {
    return [
      <IssueComment
        key={issue.id}
        content={issue.content}
        user={issue.creator}
      />,
      ...comments
        .concat(actions)
        .sort((a, b) => a.createdAt - b.createdAt)
        .map(x => {
          if (x.type === undefined) {
            return (
              <IssueComment key={x.id} user={x.user} content={x.content} />
            );
          }
          return (
            <IssueHistory
              key={x.id}
              user={x.user}
              type={x.type}
              data={x.data}
            />
          );
        })
    ];
  }

  return (
    <>
      {issueBodyNodes()}
      <IssueComment creation user={issue.creator} />
    </>
  );
}

const assignees = [
  { id: 1, full_name: "MOUCTAR DIALLO", color: "#FF8051" },
  { id: 2, full_name: "NADIR SI MOHAMEND", color: "#00B8FB" },
  { id: 3, full_name: "ZAGBANE SAFYI", color: "#02725E" },
  { id: 4, full_name: "LIDWING NICE", color: "#FF5E5B" }
];

const tags = [
  { id: 1, name: "Core API", color: "#FF8051" },
  { id: 2, name: "FRONt END", color: "#00B8FB" },
  { id: 3, name: "BACK END", color: "#02725E" },
  { id: 4, name: "UPEC PROJECT", color: "#FF5E5B" },
  { id: 5, name: "Tag ejhsdfbnx", color: "#04F2AE" },
  { id: 6, name: "Tag sdjfw sdb", color: "#FF505B" }
];

const requestIssue = {
  id: "234CD42ABFE",
  title: "Implement Issue page",
  createdAt: 1571385880,
  updatedAt: 1571385880,
  content:
    "Lorem cupidatat deserunt excepteur sit qui consectetur magna proident cupidatat. Exercitation et dolore quis ipsum nostrud ipsum et amet qui commodo adipisicing. Lorem eiusmod duis culpa est tempor eu magna voluptate velit nulla. Et voluptate duis commodo tempor veniam deserunt incididunt qui ullamco est velit esse. Exercitation sit sunt aliqua qui tempor sint officia Lorem ipsum voluptate sint Lorem tempor. Lorem nulla qui cupidatat ad sint mollit culpa ut dolor dolore sit ad dolor consequat. Ex deserunt amet nisi enim amet non do mollit mollit esse.",
  attachments: [],
  creator: { id: "64565426524A", name: "diallo" },
  assignedUsers: [
    { id: "14565426524A", name: "saafiy" },
    { id: "24565426524A", name: "mouctar" }
  ],
  tags: [
    { id: "762576257265", name: "TAG #1", color: "#343434" },
    { id: "262576257265", name: "TAG #2", color: "#FFF00F" },
    { id: "362576257265", name: "TAG #3", color: "#765765" }
  ],
  project: { id: "645654265", title: "Bug Manager" },
  history: {
    actions: [
      {
        id: "64565426522A",
        user: { id: "64565426524A", name: "diallo" },
        type: "assignUser",
        data: {
          user: { id: "145x65426524A", name: "saafiy" }
        },
        createdAt: 1571385887,
        updatedAt: 1571385887
      },
      {
        id: "6456542652",
        user: { id: "6456x5426524A", name: "diallo" },
        type: "unassignUser",
        data: {
          user: { id: "14565426524A", name: "saafiy" }
        },
        createdAt: 1571385887,
        updatedAt: 1571385887
      },
      {
        id: "645654265A",
        user: { id: "645d65426524A", name: "diallo" },
        type: "addTag",
        data: {
          action: { id: "14565426524A", name: "TAG XYZ" }
        },
        createdAt: 1571385887,
        updatedAt: 1571385887
      }
    ],
    comments: [
      {
        id: "6454342652A",
        user: { id: "14565426524A", name: "saafiy" },
        content: "Lorem cupidatat deserunt excepteur sit qui",
        createdAt: 1571385880,
        updatedAt: 1571385880
      },
      {
        id: "6456523652A",
        user: { id: "64565426524A", name: "diallo" },
        content: "Lorem cupidataxcepteur sit qui",
        createdAt: 1571385887,
        updatedAt: 1571385887
      }
    ]
  }
};

IssueHeader.propTypes = {
  issue: PropType.object.isRequired
};

IssueBody.propTypes = {
  issue: PropType.object.isRequired
};

export default IssuePage;
