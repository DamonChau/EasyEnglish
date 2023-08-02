import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { Feather } from "@expo/vector-icons";

interface MusicPlayerProps {
  blob: Blob;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ blob }) => {
  const [audioInstance, setAudioInstance] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    // Create a new audio instance when the component mounts
    initializeAudio();
    return () => {
      // Clean up resources when the component unmounts
      stopAndUnloadAudio();
    };
  }, []);

  React.useEffect(() => {
    return audioInstance
      ? () => {
          audioInstance.stopAsync();
          audioInstance.unloadAsync();
        }
      : undefined;
  }, [audioInstance]);

  const initializeAudio = async () => {
    try {
      const localUri = `${FileSystem.cacheDirectory}music.mp3`;

      // Get the Blob data as a Base64 string
      const base64Data = await readBlobData(blob);

      // Save the Base64 string as a local file
      await FileSystem.writeAsStringAsync(localUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const { sound } = await Audio.Sound.createAsync(
        { uri: localUri },
        { shouldPlay: false } // Set shouldPlay to false to prevent immediate playback
      );
      setAudioInstance(sound);
    } catch (error) {
      console.error("Error initializing audio:", error);
    }
  };

  const readBlobData = async (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        const base64Data = dataUrl.split(",")[1];
        resolve(base64Data);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(blob);
    });
  };

  const playMusic = async () => {
    try {
      if (audioInstance) {
        const status = await audioInstance.getStatusAsync();
        if (!status.isLoaded) {
          await initializeAudio();
        }
        await audioInstance.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error playing music:", error);
    }
  };

  const pauseMusic = async () => {
    try {
      if (audioInstance) {
        await audioInstance.pauseAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Error pausing music:", error);
    }
  };

  const stopAndUnloadAudio = async () => {
    try {
      if (audioInstance) {
        await audioInstance.stopAsync();
        await audioInstance.unloadAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Error stopping audio:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={isPlaying ? pauseMusic : playMusic}
        >
          {isPlaying ? (
            <Feather name="pause-circle" size={24} color="black" />
          ) : (
            <Feather name="play" size={24} color="black" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={stopAndUnloadAudio}
        >
          <Feather name="stop-circle" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  controlButton: {
    marginHorizontal: 16,
  },
});

export default MusicPlayer;
