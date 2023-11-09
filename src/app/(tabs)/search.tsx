import { FlatList, TextInput, View, Text, StyleSheet } from "react-native";
import { tracks } from "../../../assets/data/tracks";
import TrackListItem from "../../components/TrackListItem";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

export default function SearchScreen() {
  const [search, setSearch] = useState("");
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <FontAwesome
            name="search"
            size={22}
            color="black"
            style={styles.Searchicon}
          />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="What do you want to listen to?"
            style={styles.input}
          />
          {search !== "" && (
            <Text onPress={() => setSearch("")} style={styles.Crossicon}>
              &#x2715;
            </Text>
          )}
        </View>
      </View>
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
  Searchicon: {
    margin: 10,
  },
  Crossicon: {
    fontSize: 18,
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontWeight: "500",
    fontSize: 16,
  },
});
