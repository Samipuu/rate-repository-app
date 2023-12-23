import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation signIn($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview($review: CreateReviewInput) {
    createReview(review: $review) {
      repositoryId
    }
  }
`;

export const SIGN_UP = gql`
  mutation signUp($user: CreateUserInput) {
    createUser(user: $user) {
      username
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation delete($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;
