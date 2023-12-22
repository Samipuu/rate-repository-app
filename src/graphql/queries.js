import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          description
          forksCount
          language
          ownerAvatarUrl
          ratingAverage
          reviewCount
          fullName
          stargazersCount
        }
      }
    }
  }
`;

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

// other queries...
