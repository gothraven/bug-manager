import { gql } from "apollo-boost";

export const ISSUES_QUERY = gql`
  query Issues($cursor: String, $filters: String) {
    issues(first: 10, after: $cursor, filters: $filters) {
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
