import { ActivityIndicator, FlatList } from "react-native";
import TrackListItem from "../../components/TrackListItem";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query getFavorites($userId: String!) {
    favoritesByUserid(userid: $userId) {
      id
      trackid
      userid
      track {
        id
        name
        preview_url
        external_urls {
          spotify
        }
        artists {
          id
          name
        }
        album {
          id
          name
          images {
            url
            width
            height
          }
        }
      }
    }
  }
`;

export default function FavoritesScreen() {
  const { data, loading, error, refetch } = useQuery(query, {
    variables: { userId: "rishabh" },
  });

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }
  if (error) {
    console.log(error);
  }
  const tracks = (data?.favoritesByUserid || []).map(
    (fav: { track: any }) => fav.track
  );

  return (
    <FlatList
      data={tracks}
      renderItem={({ item }) => <TrackListItem track={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
}
