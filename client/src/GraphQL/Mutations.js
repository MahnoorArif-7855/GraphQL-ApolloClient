import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createUser($firstName: String!, $occupation: String!) {
    createUser(firstName: $firstName, occupation: $occupation) {
      id
    }
  }
`;
export const CREATE_FEEDBACK_MUTATION = gql`
  mutation createFeedback(
    $userId: String!
    $firstName: String!
    $feedback: String!
  ) {
    createFeedback(
      userId: $userId
      firstName: $firstName
      feedback: $feedback
    ) {
      id
    }
  }
`;
