import { gql } from "@apollo/client";

export const PROMOTIONS_QUERY = gql`
  query Promotions {
    promotions {
      id
      description
      imageUrl
      detailsUrl
      createDttm
      updateDttm
      club { id name }
      __typename
    }
  }
`;

export const EVENTS_QUERY = gql`
  query Events {
    events {
      id
      imageUrl
      title
      detailsUrl
      description
      club { id name }
      eventDttm
      headliners
      price
      __typename
    }
  }
`;