import { gql } from "@apollo/client";

export const insertFavoriteMutation = gql`
  mutation MyMutation($userId: String!, $trackId: String!) {
    insertFavorites(userid: $userId, trackid: $trackId) {
      id
      trackid
      userid
    }
  }
`;

export const removeFavoriteMutation = gql`
  mutation MyMutation($trackId: String!, $userId: String!) {
    deleteFavorites(trackid: $trackId, userid: $userId) {
      id
    }
  }
`;

export const isFavoriteQuery = gql`
  query MyQuery($trackId: String!, $userId: String!) {
    favoritesByTrackidAndUserid(trackid: $trackId, userid: $userId) {
      id
      trackid
      userid
    }
  }
`;
