import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { Track } from "../types";
import { usePlayerContext } from "../providers/PlayerProvider";

type TrackListItemProps = {
  track: Track;
};

export default function TrackListItem({ track }: TrackListItemProps) {
  const { setTrack } = usePlayerContext();
  return (
    <Pressable onPress={() => setTrack(track)} style={styles.container}>
      <Image
        source={{ uri: track.album.images[0]?.url }}
        style={styles.image}
      />
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {track.name}
        </Text>
        <Text style={styles.subtitle}>{track.artists[0]?.name}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    padding: 2,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
  subtitle: {
    color: "gray",
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 10,
    marginRight: 10,
  },
});
