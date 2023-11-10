import { ActivityIndicator, FlatList, Text } from "react-native";
import TrackListItem from "../../components/TrackListItem";
import { gql, useQuery } from "@apollo/client";
import { genres } from "../../../assets/data/genre";

const getRandomGenre = () => {
  const randomIndex = Math.floor(Math.random() * genres.length);
  return genres[randomIndex];
};

const query = gql`
  query MyQuery($genres: String!) {
    recommendations(seed_genres: $genres) {
      tracks {
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
            height
            width
          }
        }
      }
    }
  }
`;

export default function HomeScreen() {
  const randomGenre = getRandomGenre();
  const { data, loading, error } = useQuery(query, {
    variables: { genres: randomGenre },
  });

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }
  if (error) {
    return <Text>Failed to fetch recommendations. {error.message}</Text>;
  }
  const tracks = data?.recommendations?.tracks || [];

  return (
    <FlatList
      data={tracks}
      renderItem={({ item }) => <TrackListItem track={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
}
