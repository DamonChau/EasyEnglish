import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Switch,
  FlatList,
  Spacer,
} from "native-base";
import { Audio } from "expo-av";
import * as Contacts from "expo-contacts";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { Camera } from "expo-camera";
import { Linking } from "react-native";

type PermissionItem = {
  key: string;
  label: string;
  value: boolean;
};

const settingsData = [
  { key: "RECORD_AUDIO", label: "Audio Recording" },
  { key: "CAMERA", label: "Camera" },
  { key: "CONTACTS", label: "Contacts" },
  { key: "LOCATION", label: "Location" },
  { key: "POST_NOTIFICATIONS", label: "Post Notifications" },
];

export const SettingsScreen = () => {
  const [permissions, setPermissions] = useState<PermissionItem[]>([]);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const results = await Promise.all(
      settingsData.map((item) => getPermissionStatus(item.key))
    );
    const newPermissions = settingsData.map((item, index) => ({
      ...item,
      value: results[index].status === "granted",
    }));
    setPermissions(newPermissions);
  };

  const getPermissionStatus = async (permissionKey: any) => {
    switch (permissionKey) {
      case "RECORD_AUDIO":
        return await Audio.getPermissionsAsync();
      case "CAMERA":
        return await Camera.getCameraPermissionsAsync();
      case "CONTACTS":
        return await Contacts.getPermissionsAsync();
      case "LOCATION":
        return await Location.getForegroundPermissionsAsync();
      case "POST_NOTIFICATIONS":
        return await Notifications.getPermissionsAsync();
      default:
        return { status: "undetermined" };
    }
  };

  const requestPermission = async ({
    permissionKey,
    value,
  }: {
    permissionKey: string;
    value: boolean;
  }) => {
    switch (permissionKey) {
      case "RECORD_AUDIO":
        return await Audio.requestPermissionsAsync();
      case "CAMERA":
        return await Camera.requestCameraPermissionsAsync();
      case "CONTACTS":
        return await Contacts.requestPermissionsAsync();
      case "LOCATION":
        return await Location.requestForegroundPermissionsAsync();
      case "POST_NOTIFICATIONS":
        return await Notifications.getPermissionsAsync();
      default:
        return { status: "undetermined" };
    }
  };

  const handleToggle = useCallback(
    async ({
      permissionKey,
      value,
    }: {
      permissionKey: string;
      value: boolean;
    }) => {
      if (value) {
        const { status } = await requestPermission({ permissionKey, value });

        if (status === "denied") {
          Linking.openSettings();
        }

        setPermissions((prevPermissions) =>
          prevPermissions.map((item) => {
            if (item.key === permissionKey) {
              return { ...item, value: status === "granted" };
            }
            return item;
          })
        );
      } else {
        // You can handle other logic here if needed when the toggle is off.
        // For this example, I'm just updating the state.
        setPermissions((prevPermissions) =>
          prevPermissions.map((item) => {
            if (item.key === permissionKey) {
              return { ...item, value: false };
            }
            return item;
          })
        );
      }
    },
    []
  );
  const renderItem = ({ item }: { item: PermissionItem }) => (
    <Box
      w="97%"
      bgColor="#a3a3a3"
      rounded="lg"
      ml={2}
      mt={3}
      paddingX={2}
    >
      <HStack space={[2, 3]} justifyContent="space-between">
        <Text color="#fafafa" fontSize="md">
          {item.label}
        </Text>
        <Spacer />
        <Switch
          size="md"
          colorScheme="emerald"
          value={item.value}
          onToggle={() =>
            handleToggle({ permissionKey: item.key, value: !item.value })
          }
        />
      </HStack>
    </Box>
  );

  return (
    <Box w="100%" mt={2} bgColor={"#737373"} paddingX={1.5} paddingY={3} rounded="lg">
      <Heading color="amber.500" size={"md"} paddingLeft={2}>
        Permissions
      </Heading>
      <FlatList
        data={permissions}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </Box>
  );
};
