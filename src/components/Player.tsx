import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePlayerContext } from "../providers/PlayerProvider";
import MarqueeView from "react-native-marquee-view";
import { useEffect } from "react";

type PlayerProps = {
  onPress: () => void;
};

const Player = ({ onPress }: PlayerProps) => {
  const {
    track,
    isPlaying,
    positionMillis,
    playableDurationMillis,
    playTrack,
    onPlayPause,
    countWords,
  } = usePlayerContext();

  useEffect(() => {
    if (track) {
      playTrack(track);
    }
  }, [track]);

  if (!track) {
    return null;
  }
  const image = track.album.images?.[0];
  const shouldUseMarqueeView = countWords(track.name) > 5;
  const progressBarWidth = (positionMillis / playableDurationMillis) * 100;
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={styles.player}>
        {image && <Image source={{ uri: image.url }} style={styles.image} />}

        <View style={{ flex: 1 }}>
          {shouldUseMarqueeView ? (
            <MarqueeView>
              <Text style={styles.title}>{track.name}</Text>
            </MarqueeView>
          ) : (
            <Text style={styles.title}>{track.name}</Text>
          )}
          <Text style={styles.subtitle}>{track.artists[0]?.name}</Text>
        </View>

        <Ionicons
          name={"heart-outline"}
          size={20}
          color={"white"}
          style={{ marginHorizontal: 10 }}
        />
        <Ionicons
          onPress={onPlayPause}
          disabled={!track?.preview_url}
          name={track?.preview_url ? (isPlaying ? "pause" : "play") : "play"}
          size={22}
          color={track?.preview_url ? "white" : "gray"}
        />
      </Pressable>
      <View style={styles.progressBar}>
        <View
          style={[styles.progressIndicator, { width: `${progressBarWidth}%` }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    top: -120,
    height: 60,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
  },
  player: {
    backgroundColor: "#286660",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    padding: 3,
    paddingRight: 15,
  },
  title: {
    color: "white",
  },
  subtitle: {
    color: "lightgray",
    fontSize: 12,
  },
  image: {
    height: "100%",
    aspectRatio: 1,
    marginRight: 10,
    borderRadius: 5,
  },
  progressBar: {
    height: 2,
    borderRadius: 3,
  },
  progressIndicator: {
    height: "100%",
    backgroundColor: "white",
    borderRadius: 3,
  },
});

export default Player;
