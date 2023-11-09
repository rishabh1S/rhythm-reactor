import React, { Dispatch, SetStateAction } from "react";
import {
  Modal,
  Pressable,
  Text,
  View,
  StyleSheet,
  Image,
  Share,
} from "react-native";
import MarqueeView from "react-native-marquee-view";
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { usePlayerContext } from "../providers/PlayerProvider";
import { LinearGradient } from "expo-linear-gradient";

type PlayerModelProps = {
  isModalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};

const PlayerModal = ({ isModalVisible, setModalVisible }: PlayerModelProps) => {
  const {
    track,
    isPlaying,
    positionMillis,
    playableDurationMillis,
    onPlayPause,
    countWords,
  } = usePlayerContext();

  const circleSize = 8;
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const playNextTrack = async () => {
    // if (currentSound) {
    //   await currentSound.stopAsync();
    //   setCurrentSound(null);
    // }
    // value.current += 1;
    // if (value.current < savedTracks.length) {
    //   const nextTrack = savedTracks[value.current];
    //   setCurrentTrack(nextTrack);
    //   extractColors();
    //   await play(nextTrack);
    // } else {
    //   console.log("end of playlist");
    // }
  };

  const playPreviousTrack = async () => {
    // if (currentSound) {
    //   await currentSound.stopAsync();
    //   setCurrentSound(null);
    // }
    // value.current -= 1;
    // if (value.current < savedTracks.length) {
    //   const nextTrack = savedTracks[value.current];
    //   setCurrentTrack(nextTrack);
    //   await play(nextTrack);
    // } else {
    //   console.log("end of playlist");
    // }
  };

  const handleShare = () => {
    if (track && track.preview_url) {
      Share.share({
        message: `Check out this track: ${track.name} by ${track.artists[0]?.name}`,
        url: track.preview_url,
        title: "Share Track",
      })
        .then((result) => {
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              console.log(`Shared via ${result.activityType}`);
            } else {
              console.log("Shared");
            }
          } else if (result.action === Share.dismissedAction) {
            console.log("Dismissed");
          }
        })
        .catch((error) => {
          console.error("Sharing failed with error:", error);
        });
    }
  };

  if (!track) {
    return null;
  }
  const image = track.album.images?.[0];
  const shouldUseMarqueeView = countWords(track.name) > 5;
  const progressBarWidth = (positionMillis / playableDurationMillis) * 100;
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        statusBarTranslucent={true}
        hardwareAccelerated={true}
        presentationStyle="overFullScreen"
        onRequestClose={() => setModalVisible(false)}
      >
        <LinearGradient colors={["#ff7f50", "#000"]} style={styles.container}>
          <View style={styles.header}>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <AntDesign
                onPress={() => setModalVisible(false)}
                name="down"
                size={24}
                color="white"
              />
              <Text style={styles.headerText}>{track.name}</Text>
              <Entypo name="dots-three-vertical" size={24} color="white" />
            </Pressable>

            <View style={{ height: 70 }} />

            <View style={{ padding: 10 }}>
              <Image
                source={{
                  uri: image.url,
                }}
                style={styles.image}
              />
              <View style={styles.trackInfoContainer}>
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
                <AntDesign name="heart" size={24} color="#1DB954" />
              </View>

              <View style={{ marginTop: 10 }}>
                <View style={styles.progressBar}>
                  <View
                    style={[styles.progress, { width: `${progressBarWidth}%` }]}
                  />
                  <View
                    style={[
                      {
                        position: "absolute",
                        top: -3,
                        width: circleSize,
                        height: circleSize,
                        borderRadius: circleSize / 2,
                        backgroundColor: "white",
                      },
                      {
                        left: `${progressBarWidth}%`,
                        marginLeft: -circleSize / 2,
                      },
                    ]}
                  />
                </View>
                <View style={styles.timeInfo}>
                  <Text style={styles.time}>{formatTime(positionMillis)}</Text>

                  <Text style={styles.time}>
                    {formatTime(playableDurationMillis)}
                  </Text>
                </View>
              </View>
              <View style={styles.controls}>
                <Pressable>
                  <Entypo name="shuffle" size={24} color="white" />
                </Pressable>
                <Pressable onPress={playPreviousTrack}>
                  <Ionicons name="play-skip-back" size={30} color="white" />
                </Pressable>
                <Pressable onPress={onPlayPause}>
                  {track?.preview_url && isPlaying ? (
                    <AntDesign name="pausecircle" size={60} color="white" />
                  ) : (
                    <Pressable onPress={onPlayPause} style={styles.playButton}>
                      <Entypo
                        name="controller-play"
                        size={30}
                        color={track?.preview_url ? "black" : "gray"}
                      />
                    </Pressable>
                  )}
                </Pressable>
                <Pressable onPress={playNextTrack}>
                  <Ionicons name="play-skip-forward" size={30} color="white" />
                </Pressable>
                <Pressable>
                  <Feather name="repeat" size={24} color="white" />
                </Pressable>
              </View>
              <View style={styles.bottomControls}>
                <Pressable>
                  <MaterialIcons name="devices" size={20} color="white" />
                </Pressable>
                <Pressable onPress={handleShare}>
                  <AntDesign name="sharealt" size={20} color="white" />
                </Pressable>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    height: "100%",
    width: "100%",
    marginTop: 40,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  image: {
    width: 330,
    height: 330,
    borderRadius: 8,
  },
  trackInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 120,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    color: "lightgray",
  },
  progressBar: {
    width: "100%",
    marginTop: 10,
    height: 3,
    backgroundColor: "gray",
    borderRadius: 5,
  },
  progress: {
    height: "100%",
    backgroundColor: "white",
  },
  timeInfo: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  time: {
    fontSize: 13,
    color: "gray",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
  },
});

export default PlayerModal;
