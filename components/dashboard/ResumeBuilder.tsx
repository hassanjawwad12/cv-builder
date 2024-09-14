import React from "react";
import { Text, Box, Button, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import template from "../../assets/images/orange_dash_frame.png";
import resume_temp from "../../assets/images/green_dash_frame.png";

export const ResumeBuilder: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Stack
        direction={["column", "column", "row", "row"]}
        h={"full"}
        px={3}
        gap={5}
        overflowX={"auto"}
      >
        <Stack direction={"column"} w={"full"} h={"full"}>
          <Box h={"65%"} w={"full"} overflow={"hidden"}>
            <img
              src={resume_temp}
              alt="logo"
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </Box>
          <Box ml={3}>
            <Text fontSize={"24px"} fontWeight={900}>
              Resume Builder
            </Text>
            <Button
              bg={"brand.green"}
              color={"brand.white"}
              _hover={{ color: "brand.text", bg: "brand.lightGreen" }}
              onClick={() => {
                navigate("/build-resume");
              }}
            >
              Build your ATS friendly resume
            </Button>
          </Box>
        </Stack>
        <Stack w={"full"} h={"full"}>
          <Box h={"65%"} w={"full"} overflow={"hidden"}>
            <img
              src={template}
              alt="logo"
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </Box>
          <Box ml={3}>
            <Text fontSize={"24px"} fontWeight={900}>
              Templates
            </Text>
            <Button
              bg={"brand.brown"}
              color={"brand.white"}
              _hover={{ color: "brand.text", bg: "brand.lightBrown" }}
              onClick={() => {
                navigate("/template");
              }}
            >
              Get a perfect resume
            </Button>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};
