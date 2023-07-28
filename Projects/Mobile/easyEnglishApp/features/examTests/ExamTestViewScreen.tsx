import { StyleSheet, Text, View } from "react-native";

export const ExamTestViewScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ExamTestView</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
