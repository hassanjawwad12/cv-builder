import { Spinner, Stack, Text } from "@chakra-ui/react";
import React from "react";
interface ExamData {
  title?: string;
  description1?: string;
  description2?: string;
}
export const CraftResume: React.FC<ExamData> = ({
  title,
  description1,
  description2,
}) => {
  return (
    <Stack w={"full"} h={["100vh", "100vh", "100vh", "100vh"]}>
      <Stack
        align={"center"}
        justify={"center"}
        h={["90vh"]}
        w={"full"}
        gap={5}
      >
        <Text
          textAlign={"center"}
          fontWeight={800}
          fontSize={"48px"}
          lineHeight={"55px"}
          color={"black"}
          mb={3}
        >
          {title}
        </Text>
        <Text
          textAlign={"center"}
          fontSize={"28px"}
          fontWeight={300}
          color={"rgba(89, 194, 39, 1)"}
          mb={4}
        >
          {description1}
          <br /> {description2}.
        </Text>
        <Spinner
          size="xl"
          thickness="4px"
          speed="0.95s"
          emptyColor="gray.200"
          color="rgba(89, 194, 39, 1)"
        />
      </Stack>
    </Stack>
  );
};
