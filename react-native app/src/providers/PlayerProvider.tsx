import {
  PropsWithChildren,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { Track } from "../../assets/data/types";
import { AVPlaybackStatus, Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { useMutation, useQuery } from "@apollo/client";
import {
  insertFavoriteMutation,
  isFavoriteQuery,
  removeFavoriteMutation,
} from "../../assets/data/favorite";

type PlayerContextType = {
  track?: Track;
  setTrack: (track: Track) => void;
  isPlaying: boolean;
  sound?: Sound;
  positionMillis: number;
  playableDurationMillis: number;
  playTrack: (track: Track) => void;
  onPlayPause: () => void;
  onLike: () => void;
  isLiked: boolean;
  countWords: (str: string) => number;
};

const PlayerContext = createContext<PlayerContextType>({
  setTrack: () => {},
  isPlaying: false,
  positionMillis: 0,
  playableDurationMillis: 0,
  playTrack: () => {},
  onPlayPause: () => {},
  onLike: () => {},
  isLiked: false,
  countWords: (str) => 0,
});

export default function PlayerProvider({ children }: PropsWithChildren) {
  const [track, setTrack] = useState<Track>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Sound | undefined>();
  const [positionMillis, setPositionMillis] = useState(0);
  const [playableDurationMillis, setPlayableDurationMillis] = useState(0);
  const [insertFavorite] = useMutation(insertFavoriteMutation);
  const [removeFavorite] = useMutation(removeFavoriteMutation);

  const { data, refetch } = useQuery(isFavoriteQuery, {
    variables: { userId: "rishabh", trackId: track?.id || "" },
  });
  const isLiked = data?.favoritesByTrackidAndUserid?.length > 0;

  useEffect(() => {
    if (sound) {
      const intervalId = setInterval(async () => {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setPositionMillis(status.positionMillis);
          setPlayableDurationMillis(status.playableDurationMillis || 0);
        } else {
          setPositionMillis(0);
        }
      }, 500);
      return () => clearInterval(intervalId);
    }
  }, [sound]);

  const playTrack = async (newTrack: Track) => {
    if (sound) {
      await sound.unloadAsync();
    }

    if (!newTrack?.preview_url) {
      return;
    }

    const { sound: newSound } = await Audio.Sound.createAsync({
      uri: newTrack.preview_url,
    });
    setSound(newSound);
    newSound.setOnPlaybackStatusUpdate(onPlayBackStatusUpdate);
    await newSound.playAsync();
  };

  const onPlayPause = async () => {
    if (!sound) {
      return;
    }
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  const onPlayBackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      return;
    }
    setIsPlaying(status.isPlaying);
  };

  const onLike = async () => {
    if (!track) return;
    if (isLiked) {
      await removeFavorite({
        variables: { userId: "rishabh", trackId: track.id },
      });
    } else {
      await insertFavorite({
        variables: { userId: "rishabh", trackId: track.id },
      });
    }
    refetch();
  };

  function countWords(str: string) {
    return str.split(" ").filter((word: string) => word).length;
  }

  return (
    <PlayerContext.Provider
      value={{
        track,
        setTrack,
        isPlaying,
        sound,
        positionMillis,
        playableDurationMillis,
        playTrack,
        onPlayPause,
        onLike,
        isLiked,
        countWords,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayerContext = () => useContext(PlayerContext);
