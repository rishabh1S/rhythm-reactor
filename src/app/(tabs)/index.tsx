import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import TrackListItem from "../../components/TrackListItem";
import { gql, useQuery } from "@apollo/client";
import { genres } from "../../../assets/data/genre";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
// import Modal from "react-native-modal";
import GenreModal from "../../components/GenreModal";

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
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("pop");
  const { data, loading, error } = useQuery(query, {
    variables: { genres: selectedGenre },
  });

  // if (loading) {
  //   return <ActivityIndicator style={{ flex: 1 }} />;
  // }
  // if (error) {
  //   return <Text>Failed to fetch recommendations. {error.message}</Text>;
  // }
  const tracks = data?.recommendations?.tracks || [];

  const imageUrl =
    "https://t3.ftcdn.net/jpg/01/66/39/54/240_F_166395402_UcbaS5Z5Tj1rEbMvzhHR1U7DpCgCWd3r.jpg";
  return (
    <>
      <LinearGradient colors={["#FF5B22", "#000"]} style={{ height: 130 }}>
        <View style={styles.container}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                resizeMode: "cover",
              }}
              source={{ uri: imageUrl }}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Hi, Good Morning
            </Text>
          </View>
          <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
            <MaterialCommunityIcons
              name="lightning-bolt-outline"
              size={24}
              color="white"
            />
          </TouchableWithoutFeedback>
          {/* Modal */}
          <GenreModal
            isVisible={isModalVisible}
            onClose={() => setModalVisible(false)}
            onSelectGenre={(genre) => {
              setSelectedGenre(genre);
              setModalVisible(false);
            }}
            selectedGenre={selectedGenre}
          />
        </View>
      </LinearGradient>
      {loading && <ActivityIndicator style={{ flex: 1 }} />}
      {error && <Text>Failed to fetch tracks</Text>}
      <FlatList
        data={tracks}
        renderItem={({ item }) => <TrackListItem track={item} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontFamily: "Inter-Black",
    letterSpacing: 0.8,
    color: "white",
    fontSize: 24,
  },
});
