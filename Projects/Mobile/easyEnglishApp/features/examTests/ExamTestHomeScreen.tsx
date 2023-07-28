import { StyleSheet, Image } from "react-native";
import {
  Center,
  Box,
  ScrollView,
  Heading,
  Stack,
  Pressable,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ExamTestSectionType, ExamTestType } from "../../models/types";

interface IProps {
  testType: ExamTestType;
  sectionType: ExamTestSectionType;
}

export const ExamTestHomeScreen = ({ navigation }: any) => {
  const handleDetailScreen = (props: IProps) => {
    const { testType, sectionType } = props;
    navigation.navigate("ExamTestList", {
      testType: testType,
      sectionType: sectionType,
    });
  };

  return (
    <ScrollView>
      <Center w="100%" mt="10">
        <Box safeArea>
          <Heading color={"amber.500"}>IELTS</Heading>
          <Stack direction="row" mb="2.5" mt="1.5" space={3}>
            <Pressable
              onPress={() =>
                handleDetailScreen({
                  testType: ExamTestType.IELTS,
                  sectionType: ExamTestSectionType.Speaking,
                })
              }
            >
              <Center
                w="150"
                h="150"
                bg="green.500"
                rounded="sm"
                shadow={"3"}
                _text={{
                  color: "warmGray.50",
                  fontWeight: "medium",
                }}
              >
                <FontAwesome5 name="speakap" size={24} color="white" />
                Speaking
              </Center>
            </Pressable>
            <Pressable
              onPress={() =>
                handleDetailScreen({
                  testType: ExamTestType.IELTS,
                  sectionType: ExamTestSectionType.Listening,
                })
              }
            >
            <Center
              bg="green.500"
              w="150"
              h="150"
              rounded="sm"
              shadow={"3"}
              _text={{
                color: "warmGray.50",
                fontWeight: "medium",
              }}
            >
              <MaterialIcons name="hearing" size={24} color="white" />
              Listening
            </Center>
            </Pressable>
          </Stack>
          <Stack direction="row" mb="2.5" mt="1.5" space={3}>
            <Pressable
              onPress={() =>
                handleDetailScreen({
                  testType: ExamTestType.IELTS,
                  sectionType: ExamTestSectionType.Reading,
                })
              }
            >
              <Center
                w="150"
                h="150"
                bg="green.500"
                rounded="sm"
                shadow={"3"}
                _text={{
                  color: "warmGray.50",
                  fontWeight: "medium",
                }}
              >
                <FontAwesome5 name="book-reader" size={24} color="white" />
                Reading
              </Center>
            </Pressable>
            <Pressable
              onPress={() =>
                handleDetailScreen({
                  testType: ExamTestType.IELTS,
                  sectionType: ExamTestSectionType.Writing,
                })
              }
            >
              <Center
                bg="green.500"
                w="150"
                h="150"
                rounded="sm"
                shadow={"3"}
                _text={{
                  color: "warmGray.50",
                  fontWeight: "medium",
                }}
              >
                <Entypo name="text-document" size={24} color="white" />
                Writing
              </Center>
            </Pressable>
          </Stack>
        </Box>
        <Box safeArea>
          <Heading color={"amber.500"}>General</Heading>
          <Stack direction="row" mb="2.5" mt="1.5" space={3}>
            <Center
              w="150"
              h="150"
              bg="lightBlue.400"
              rounded="sm"
              _text={{
                color: "warmGray.50",
                fontWeight: "medium",
              }}
              shadow={"3"}
            >
              <SimpleLineIcons name="speech" size={24} color="white" />
              Pronunciation
            </Center>
            <Center
              bg="lightBlue.400"
              w="150"
              h="150"
              rounded="sm"
              _text={{
                color: "warmGray.50",
                fontWeight: "medium",
              }}
              shadow={"3"}
            >
              <FontAwesome name="paragraph" size={24} color="white" />
              Grammar
            </Center>
          </Stack>
          <Stack direction="row" mb="2.5" mt="1.5" space={3}>
            <Center
              w="150"
              h="150"
              bg="lightBlue.400"
              rounded="sm"
              _text={{
                color: "warmGray.50",
                fontWeight: "medium",
              }}
              shadow={"3"}
            >
              <Ionicons name="document-text" size={24} color="white" />
              General
            </Center>
            <Center
              bg="lightBlue.400"
              w="150"
              h="150"
              rounded="sm"
              _text={{
                color: "warmGray.50",
                fontWeight: "medium",
              }}
              shadow={"3"}
            >
              <MaterialCommunityIcons
                name="tooltip-edit"
                size={24}
                color="white"
              />
              IELTSTips
            </Center>
          </Stack>
        </Box>
      </Center>
    </ScrollView>
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
