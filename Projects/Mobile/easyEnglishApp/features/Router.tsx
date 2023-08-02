import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileScreen } from "./users/ProfileScreen";
import { LoginScreen } from "./users/LoginScreen";
import { ExamTestHomeScreen } from "./examTests/ExamTestHomeScreen";
import { ExamTestViewScreen } from "./examTests/ExamTestViewScreen";
import { ExamTestListScreen } from "./examTests/ExamTestListScreen";
import { SettingsScreen } from "./common/SettingsScreen";
import { MyStudyScreen } from "./users/MyStudyScreen";
import { UnAuthorizeScreen } from "./users/UnAuthorizeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useTypedSelector } from "../services";
import { selectIsAuthenticated } from "../services/slices/authSlice";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AssignmentStatus } from "../models/types";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();

const UserNavigator = () => {
  const isAuthenticated = useTypedSelector(selectIsAuthenticated);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: headerTintColor,
        headerTitleStyle: styles.headerTitle,
      }}
    >
      {isAuthenticated ? (
        <Stack.Screen name="Profile" component={ProfileScreen} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

const MyStudyNavigator = () => {
  const isAuthenticated = useTypedSelector(selectIsAuthenticated);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: headerTintColor,
        headerTitleStyle: styles.headerTitle,
      }}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="MyStudy" component={MyStudyTabNavigator} />
          <Stack.Screen name="ExamTestView" component={ExamTestViewScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="UnAuthorized" component={UnAuthorizeScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const MyStudyTabNavigator = () => {
  return (
    <TopTab.Navigator
      initialRouteName="Favourite"
      screenOptions={{
        tabBarActiveTintColor: "#fafafa",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: "#a3a3a3" },
      }}
    >
      <TopTab.Screen
        name="Favourite"
        component={MyStudyScreen}
        initialParams={{ status: AssignmentStatus.Favourite }}
        options={{ tabBarLabel: "Favourite" }}
      />
      <TopTab.Screen
        name="Bookmarked"
        component={MyStudyScreen}
        initialParams={{ status: AssignmentStatus.Bookmarked }}
        options={{ tabBarLabel: "Bookmarked" }}
      />
      <TopTab.Screen
        name="Assigned"
        component={MyStudyScreen}
        initialParams={{ status: AssignmentStatus.Assigned }}
        options={{ tabBarLabel: "Assigned" }}
      />
      <TopTab.Screen
        name="Done"
        component={MyStudyScreen}
        initialParams={{ status: AssignmentStatus.Done }}
        options={{ tabBarLabel: "Done" }}
      />
    </TopTab.Navigator>
  );
};

const ExamTestNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: headerTintColor,
        headerTitleStyle: styles.headerTitle,
      }}
    >
      <Stack.Screen
        name="ExamTestHome"
        component={ExamTestHomeScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen name="ExamTestList" component={ExamTestListScreen} />
      <Stack.Screen name="ExamTestView" component={ExamTestViewScreen} />
    </Stack.Navigator>
  );
};

const SettingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: headerTintColor,
        headerTitleStyle: styles.headerTitle,
      }}
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export const Router = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="ExamTestList"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === "HomeTab") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "AccountTab") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            } else if (route.name === "MyStudyTab") {
              iconName = focused ? "document-text" : "document-text-outline";
            } else if (route.name === "SettingsTab") {
              iconName = focused ? "settings" : "settings-outline";
            } else {
              iconName = "ios-information-circle";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          headerTintColor: "royalblue",
          headerStyle: {
            backgroundColor: "#fff",
          },
        })}
      >
        <Tab.Screen
          name="HomeTab"
          component={ExamTestNavigator}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="MyStudyTab"
          component={MyStudyNavigator}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="AccountTab"
          component={UserNavigator}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="SettingsTab"
          component={SettingNavigator}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const headerTintColor = "#fff";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#f4511e",
  },
  headerTitle: {
    fontWeight: "bold",
  },
});
