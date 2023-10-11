import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { persistor, store } from "./services";
import { PersistGate } from "redux-persist/integration/react";
import { NativeBaseProvider } from "native-base";
import { Router } from "./features/Router";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <StatusBar style="light"></StatusBar>
          <Router />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
