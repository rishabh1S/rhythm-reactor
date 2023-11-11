import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  StyleSheet,
} from "react-native";
import TrackListItem from "../../components/TrackListItem";
import { gql, useQuery } from "@apollo/client";
import { LinearGradient } from "expo-linear-gradient";

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
    <>
      <LinearGradient colors={["#4300ff", "#000"]} style={{ height: 150 }}>
        <View style={styles.container}>
          <Text style={styles.headerText}>Liked Songs</Text>
        </View>
      </LinearGradient>
      <FlatList
        data={tracks}
        renderItem={({ item }) => <TrackListItem track={item} />}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontFamily: "Inter-Black",
    letterSpacing: 0.8,
    color: "white",
    fontSize: 24,
  },
});
