import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query MyQuery {
    me {
      id
      age
      description
      firstName
      geolocationAllowed
      imageUrl
      isBartender
      lastName
      sex
      telegramId
      username
    }
  }
`;

export const GIFTS_RECEIVED_QUERY = gql`
  query GiftsReceived {
    giftsReceived {
      giftItem {
        id
        name
        imageUrl
        createDttm
        description
        cost
        see
        size
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $age: Int!
    $description: String!
    $firstName: String!
    $lastName: String!
    $sex: String!
  ) {
    updateUser(
      age: $age
      description: $description
      firstName: $firstName
      lastName: $lastName
      sex: $sex
    ) {
      id
      age
      description
      firstName
      lastName
      sex
      __typename
    }
  }
`;