import { StyleSheet } from "react-native";
import { useAppDispatch, useTypedSelector } from "../../services";
import {
  selectIsAuthenticated,
  selectLoggedUser,
  logout,
} from "../../services/slices/authSlice";
import { Center, Box, Avatar, Heading, Button } from "native-base";
import { Status, UserType } from "../../models/types";

export const ProfileScreen = () => {
  const user = useTypedSelector(selectLoggedUser);
  const dispatch = useAppDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Avatar
          bg="purple.600"
          alignSelf="center"
          size="xl"
          source={{
            uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
          }}
        ></Avatar>
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
          textAlign="center"
        >
          Welcome {user?.userName},
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
          textAlign="center"
        >
          {user?.aliasName}
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
          textAlign="center"
        >
          {user?.email}
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
          textAlign="center"
        >
          {user?.phoneNo}
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
          textAlign="center"
        >
          {UserType[user?.userType as UserType]}
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
          textAlign="center"
        >
          {Status[user?.status as Status]}
        </Heading>
        <Button mt="2" colorScheme="light" onPress={handleLogout}>
          Sign out
        </Button>
      </Box>
    </Center>
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
