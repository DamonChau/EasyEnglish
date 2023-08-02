import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import {
  FlatList,
  Box,
  VStack,
  Heading,
  HStack,
  Pressable,
  Spacer,
  Text,
} from "native-base";
import { useGetExamTestsBySectionQuery } from "./examTestsApi";
import { parseISO } from "date-fns";

interface IProps {
  id: string;
}

export const ExamTestListScreen = ({ navigation, route }: any) => {
  const { testType, sectionType } = route.params;
  const [erroMsg, setErrorMsg] = useState("");
  const { data, isFetching, isLoading, isSuccess, isError, error } =
    useGetExamTestsBySectionQuery({
      testType: testType,
      sectionType: sectionType,
    });

  const viewDetail = ({ id }: IProps) => {
    navigation.navigate("ExamTestView", { id: id });
  };

  useEffect(() => {
    if (error) {
      if ("status" in error) {
        // you can access all properties of `FetchBaseQueryError` here
        const msg = "error" in error ? error.error : JSON.stringify(error.data);
        setErrorMsg(msg);
      } else {
        // you can access all properties of `SerializedError` here
        setErrorMsg(error.message as string);
      }
    }
  }, [isError]);

  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3" color={"amber.500"}>
        Tests
      </Heading>
      {erroMsg ? <Text>{erroMsg}</Text> : null}
      {data && (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Pressable onPress={() => viewDetail({ id: item.id })}>
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: "muted.50",
                }}
                borderColor="muted.800"
                pl={["2", "4"]}
                pr={["2", "5"]}
                py="2"
              >
                <HStack space={[2, 3]} justifyContent="space-between">
                  <Image
                    source={require("../../assets/IELTSbg.jpg")}
                    style={styles.image}
                  />
                  <VStack>
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      bold
                    >
                      {item.testname}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {item.title}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Text
                    fontSize="xs"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    alignSelf="flex-start"
                  >
                    {parseISO(item.createdDate).toDateString()}
                  </Text>
                </HStack>
              </Box>
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 150 / 2,
    overflow: "hidden",
  },
});
