import { StyleSheet, Text, View } from "react-native";

export const UnAuthorizeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>You are not authorized to access this screen. Please login.</Text>
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
