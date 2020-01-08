import { gql } from "apollo-boost";

export const STATUSES_QUERY = gql`
  query Statuses {
    statuses {
      id
      name
      description
    }
  }
`;

export const CREATE_STATUS = gql`
  mutation CreateStatusMutation($name: String!, $description: String) {
    createStatus(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

export const UPDATE_STATUS = gql`
  mutation UpdateStatusMutation($id: ID!, $name: String, $description: String) {
    updateStatus(id: $id, name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

export const DELETE_STATUS = gql`
  mutation DeleteStatusMutation($id: ID!) {
    deleteStatus(id: $id)
  }
`;
