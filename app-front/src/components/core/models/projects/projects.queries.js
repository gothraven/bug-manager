import { gql } from 'apollo-boost';

export const PROJECTS_QUERY = gql`
  query Projects($cursor: String) {
    projects(first: 10, after: $cursor) {
      edges {
        id
        name
        description
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProjectMutation($name: String! $description: String) {
    createProject(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProjectMutation(
    $id: ID!
    $name: String
    $description: String
  ) {
    updateProject(id: $id, name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProjectMutation($id: ID!) {
    deleteProject(id: $id)
  }
`;
