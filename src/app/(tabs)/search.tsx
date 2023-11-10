import {
  FlatList,
  TextInput,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import TrackListItem from "../../components/TrackListItem";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query MyQuery($q: String!) {
    search(q: $q) {
      tracks {
        items {
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
  }
`;

export default function SearchScreen() {
  const [search, setSearch] = useState("");

  const { data, loading, error } = useQuery(query, {
    variables: { q: search },
  });

  const tracks = data?.search?.tracks?.items || [];

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <FontAwesome
            name="search"
            size={22}
            color="black"
            style={styles.icon}
          />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="What do you want to listen to?"
            style={styles.input}
          />
          {search !== "" && (
            <AntDesign
              onPress={() => setSearch("")}
              name="close"
              style={styles.icon}
              size={22}
              color="black"
            />
          )}
        </View>
      </View>
      {loading && <ActivityIndicator />}
      {error && <Text>Failed to fetch tracks</Text>}
      <FlatList
        data={tracks}
        renderItem={({ item }) => <TrackListItem track={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 6,
    flex: 1,
    margin: 5,
  },
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontWeight: "500",
    fontSize: 16,
  },
});
