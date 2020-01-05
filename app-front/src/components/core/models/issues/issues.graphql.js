import { gql } from "apollo-boost";

export const ISSUES_QUERY = gql`
  query Issues($cursor: String) {
    issues(first: 10, after: $cursor) {
      edges {
        id
        createdAt
        updatedAt
        title
        creator {
          id
          name
        }
        status {
          id
          name
        }
        open
        assignedUsers {
          id
          name
        }
        tags {
          id
          name
          color
        }
        project {
          name
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const ISSUE_QUERY = gql`
  query IssuePageQuery($id: ID!) {
    issue(id: $id) {
      id
      title
      createdAt
      updatedAt
      creator {
        id
        name
      }
      assignedUsers {
        id
        name
      }
      tags {
        id
        name
        description
        color
      }
      project {
        id
        name
      }
      changes {
        id
        createdAt
        updatedAt
        creator {
          id
          name
        }
        type
        data {
          user {
            name
          }
          tag {
            name
          }
          project {
            name
          }
          status {
            name
          }
        }
      }
      comments {
        id
        createdAt
        updatedAt
        content
        creator {
          id
          name
          role
        }
      }
    }
  }
`;

export const CREATE_ISSUE = gql`
  mutation CreateIssueMutation($title: String!, $content: String!) {
    createIssue(title: $title, content: $content) {
      id
    }
  }
`;

export const ISSUE_ADD_TAG = gql`
  mutation IssueAddTagMutation($id: ID!, $tagId: ID!) {
    addTag(id: $id, tagId: $tagId) {
      tags {
        id
        name
        description
        color
      }
      changes {
        id
        createdAt
        updatedAt
        creator {
          id
          name
        }
        type
        data {
          user {
            name
          }
          tag {
            name
          }
          project {
            name
          }
          status {
            name
          }
        }
      }
    }
  }
`;

export const ISSUE_REMOVE_TAG = gql`
  mutation IssueRemoveTagMutation($id: ID!, $tagId: ID!) {
    removeTag(id: $id, tagId: $tagId) {
      tags {
        id
        name
        description
        color
      }
      changes {
        id
        createdAt
        updatedAt
        creator {
          id
          name
        }
        type
        data {
          user {
            name
          }
          tag {
            name
          }
          project {
            name
          }
          status {
            name
          }
        }
      }
    }
  }
`;

export const ISSUE_ATTACH_TO_PROJECT = gql`
  mutation IssueAttachToProjectMutation($id: ID!, $projectId: ID!) {
    attachToProject(id: $id, projectId: $projectId) {
      project {
        id
        name
      }
      changes {
        id
        createdAt
        updatedAt
        creator {
          id
          name
        }
        type
        data {
          user {
            name
          }
          tag {
            name
          }
          project {
            name
          }
          status {
            name
          }
        }
      }
    }
  }
`;

export const ISSUE_DETATCH_FROM_PROJECT = gql`
  mutation IssueDetatchFromProjectMutation($id: ID!, $projectId: ID!) {
    detatchFromProject(id: $id, projectId: $projectId) {
      project {
        id
        name
      }
      changes {
        id
        createdAt
        updatedAt
        creator {
          id
          name
        }
        type
        data {
          user {
            name
          }
          tag {
            name
          }
          project {
            name
          }
          status {
            name
          }
        }
      }
    }
  }
`;

export const ISSUE_ASSIGNE_USER = gql`
  mutation IssueAssignUserMutation($id: ID!, $userId: ID!) {
    assignUser(id: $id, userId: $userId) {
      assignedUsers {
        id
        name
      }
      tags {
        id
        name
        description
        color
      }
      changes {
        id
        createdAt
        updatedAt
        creator {
          id
          name
        }
        type
        data {
          user {
            name
          }
          tag {
            name
          }
          project {
            name
          }
          status {
            name
          }
        }
      }
    }
  }
`;

export const ISSUE_UNASSIGN_USER = gql`
  mutation IssueUnassignUserMutation($id: ID!, $userId: ID!) {
    unassignUser(id: $id, userId: $userId) {
      assignedUsers {
        id
        name
      }
      tags {
        id
        name
        description
        color
      }
      changes {
        id
        createdAt
        updatedAt
        creator {
          id
          name
        }
        type
        data {
          user {
            name
          }
          tag {
            name
          }
          project {
            name
          }
          status {
            name
          }
        }
      }
    }
  }
`;
