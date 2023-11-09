import {
  PropsWithChildren,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { Track } from "../../../Cloudburst/src/types";
import { AVPlaybackStatus, Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";

type PlayerContextType = {
  track?: Track;
  setTrack: (track: Track) => void;
  isPlaying: boolean;
  sound?: Sound;
  positionMillis: number;
  playableDurationMillis: number;
  playTrack: (track: Track) => void;
  onPlayPause: () => void;
  countWords: (str: string) => number;
};

const PlayerContext = createContext<PlayerContextType>({
  setTrack: () => {},
  isPlaying: false,
  positionMillis: 0,
  playableDurationMillis: 0,
  playTrack: () => {},
  onPlayPause: () => {},
  countWords: (str) => 0,
});

export default function PlayerProvider({ children }: PropsWithChildren) {
  const [track, setTrack] = useState<Track>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Sound | undefined>();
  const [positionMillis, setPositionMillis] = useState(0);
  const [playableDurationMillis, setPlayableDurationMillis] = useState(0);

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
        countWords,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayerContext = () => useContext(PlayerContext);
