import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Pressable,
  StyleSheet,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { genres } from "../../assets/data/genre";

type GenreModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onSelectGenre: (genre: string) => void;
  selectedGenre: string;
};

const GenreModal = ({
  isVisible,
  onClose,
  onSelectGenre,
  selectedGenre,
}: GenreModalProps) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      presentationStyle="overFullScreen"
      statusBarTranslucent
      useNativeDriver
      style={styles.modal}
    >
      <View style={styles.modalContainer}>
        <LinearGradient
          colors={["#4300ff", "#000"]}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 20,
            paddingLeft: 10,
            height: 100,
          }}
        >
          <Pressable onPress={onClose}>
            <Ionicons name="md-chevron-back" size={24} color="white" />
          </Pressable>
          <Text style={styles.modalTitle}>Choose Genre</Text>
        </LinearGradient>
        <View style={{ paddingHorizontal: 20, alignItems: "center" }}>
          <FlatList
            data={genres}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPress={() => onSelectGenre(item)}>
                <Text
                  style={[
                    styles.genreItem,
                    selectedGenre === item && styles.selectedGenre,
                  ]}
                >
                  {item}
                </Text>
              </TouchableWithoutFeedback>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  modalContainer: {
    backgroundColor: "#000",
    flex: 1,
    marginLeft: 170,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Inter-Black",
    paddingHorizontal: 10,
    color: "#1DB954",
  },
  genreItem: {
    fontSize: 18,
    marginBottom: 10,
    color: "#fffa",
  },
  selectedGenre: {
    fontSize: 22,
    color: "#1DB954",
  },
});

export default GenreModal;
