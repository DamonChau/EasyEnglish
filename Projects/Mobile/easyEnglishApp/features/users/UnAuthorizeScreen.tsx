import { StyleSheet, View } from "react-native";
import { Text } from "native-base";
export const UnAuthorizeScreen = () => {
  return (
    <View style={styles.container}>
      <Text color="red.600" noOfLines={2}>
        You are not authorized to access this screen. Please login.
      </Text>
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
