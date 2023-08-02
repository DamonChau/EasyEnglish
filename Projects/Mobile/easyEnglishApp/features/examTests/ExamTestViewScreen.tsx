import React, { useState, useEffect } from "react";
import { StyleSheet, Image, useWindowDimensions } from "react-native";
import { Center, Box, Heading, Text, ScrollView, Spinner } from "native-base";
import { useTypedSelector } from "../../services";
import { selectIsAuthenticated } from "../../services/slices/authSlice";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../../services/helpers";
import { useDownloadFilesMutation, FileDownload } from "../users/usersApi";
import { useGetExamTestQuery } from "./examTestsApi";
import draftToHtml from "draftjs-to-html";
import RenderHtml from "react-native-render-html";
import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
import MusicPlayer from "../common/MusicPlayer";

export const ExamTestViewScreen = ({ route, navigation }: any) => {
  const { id } = route.params;
  const { data, isFetching, isLoading, isSuccess, isError, error } =
    useGetExamTestQuery(id);
  const [downloadFile] = useDownloadFilesMutation();
  const [audio, setAudio] = useState<Blob>();
  const isAuthenticated = useTypedSelector(selectIsAuthenticated);
  const [erroMsg, setErrorMsg] = useState("");
  const [convertedContent, setConvertedContent] = useState("");
  const { width } = useWindowDimensions();
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);

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

  useEffect(() => {
    if (data) {
      setConvertedContent(draftToHtml(JSON.parse(data?.content as string)));

      if (data.audioFile) {
        const downloadAudiofiles = async () => {
          const file: FileDownload = {
            filename: data.audioFile,
          };
          try {
            const blob = await downloadFile(file).unwrap();
            setAudio(blob);
            setIsAudioLoaded(true);
          } catch (err) {
            if (isFetchBaseQueryError(err)) {
              const msg =
                "error" in err
                  ? err.error
                  : JSON.parse(JSON.stringify(err.data)).error;
              setErrorMsg(msg);
            } else if (isErrorWithMessage(err)) console.log(err.message);
          }
        };

        downloadAudiofiles();
      }
    }
  }, [data]);

  return (
    <Center w="100%">
      <Box safeArea p="2">
        {erroMsg ? (
          <Text mt="1" color="red.600" fontWeight="medium" size="sm">
            {erroMsg}
          </Text>
        ) : null}

        {!isLoading && (
          <>
            <Heading fontSize="xl" pb="3" color={"amber.500"}>
              {data?.testname}
            </Heading>
            <Heading fontSize="md" pb="3" color={"amber.500"}>
              {data?.title}
            </Heading>

            {isAudioLoaded ? (
              <MusicPlayer blob={audio as Blob}></MusicPlayer>
            ) : data?.audioFile ? (
              <Spinner color="amber.500" />
            ) : null}

            <ScrollView paddingLeft={0} paddingRight={0}>
              <RenderHtml
                contentWidth={width}
                source={{ html: convertedContent }}
              />
            </ScrollView>
          </>
        )}
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
