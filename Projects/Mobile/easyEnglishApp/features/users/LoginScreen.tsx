import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Text,
  Container,
} from "native-base";
import { useLoginMutation } from "../users/usersApi";
import {
  selectIsAuthenticated,
  setLoggedSession,
} from "../../services/slices/authSlice";
import { Users } from "../../models/types";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../../services/helpers";
import { useAppDispatch, useTypedSelector } from "../../services";
import { LoginType } from "../../models/types";
import { AlertPopup } from "../common/AlertPopup";

export const LoginScreen = ({ navigation }: any) => {
  const [login] = useLoginMutation();
  const isAuthenticated = useTypedSelector(selectIsAuthenticated);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleLoginOk = () => {
    navigation.navigate("MyStudy");
  };

  const handleLogin = async (event: any) => {
    try {
      const u = {} as Users;
      u.userName = userName;
      u.password = password;
      u.loginType = LoginType.SYSTEM;
      const response = await login(u).unwrap();
      dispatch(setLoggedSession(response));
      setIsOpen(true);
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const msg =
          "error" in err
            ? err.error
            : JSON.parse(JSON.stringify(err.data)).error;
        setErrMsg(msg);
      } else if (isErrorWithMessage(err)) console.log(err.message);
    }
  };

  return (
    <>
      <AlertPopup
        status="success"
        message="Login successfully!!!"
        duration={3000}
        isOpen={isOpen}
        onClosed={handleLoginOk}
      />
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Welcome
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Sign in to continue!
          </Heading>
          {errMsg ? (
            <Text mt="1" color="red.600" noOfLines={2}>
              {errMsg}
            </Text>
          ) : null}
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>User Name</FormControl.Label>
              <Input
                value={userName}
                onChangeText={(text) => {
                  setUserName(text);
                }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
              />
              <Link
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "indigo.500",
                }}
                alignSelf="flex-end"
                mt="1"
              >
                Forget Password?
              </Link>
            </FormControl>
            <Button mt="2" colorScheme="light" onPress={handleLogin}>
              Sign in
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                I'm a new user.{" "}
              </Text>
              <Link
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                href="#"
              >
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </>
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
