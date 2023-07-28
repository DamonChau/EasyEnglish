import { useToast } from "native-base";
import {
  Box,
  Alert,
  VStack,
  HStack,
  Text,
  CloseIcon,
  IconButton,
} from "native-base";
import { useEffect } from "react";

interface IProps {
  status: string;
  message: string;
  duration: number;
  isOpen: boolean;
  onClosed: () => void;
}

export const AlertPopup = (props: IProps) => {
  const { status, message, duration, isOpen, onClosed } = props;
  const toast = useToast();
  useEffect(() => {
    if (isOpen)
      toast.show({
        render: () => {
          return (
            <Alert w="100%" status={status}>
              <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} justifyContent="space-between">
                  <HStack space={2} flexShrink={1}>
                    <Alert.Icon mt="1" />
                    <Text fontSize="md" color="coolGray.800">
                      {message}
                    </Text>
                  </HStack>
                  <IconButton
                    variant="unstyled"
                    _focus={{
                      borderWidth: 0,
                    }}
                    icon={<CloseIcon size="3" />}
                    _icon={{
                      color: "coolGray.600",
                    }}
                  />
                </HStack>
              </VStack>
            </Alert>
          );
        },
        placement: "top",
        duration: duration,
        onCloseComplete: onClosed,
      });
  }, [isOpen]);

  return null;
};
