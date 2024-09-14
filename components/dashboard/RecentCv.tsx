import React from "react";
import { Text, Stack, Box, HStack } from "@chakra-ui/react";
import resume from "../../assets/images/recentCV.png";
import template from "../../assets/images/recentTemplate.png";
import title from "../../assets/images/title.png";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../shared/ReusableFunctions";

export const RecentCv: React.FC<any> = ({
  resumeType,
  id,
  resumeName,
  resumeDate,
}) => {
  const navigate = useNavigate();
  const handleNavigate = (id: any) => {
    if (resumeType === "resume") {
      navigate(`/download-resume?resumeId=${id}`);
    } else {
      navigate(`/download-template?resumeId=${id}`);
    }
  };

  return (
    <>
      <Stack direction={"column"} minWidth="300px" h={"full"}>
        <Box onClick={() => handleNavigate(id)}>
          <img src={resumeType === "resume" ? resume : template} alt="logo" />
        </Box>
        <Stack direction={"column"} ml={10} gap={3}>
          <Text
            fontSize={"30px"}
            fontWeight={900}
            lineHeight={"35px"}
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            {resumeName
              ? resumeName.length > 15
                ? resumeName.substring(0, 15) + "..."
                : resumeName
              : " Untitled"}
          </Text>

          <HStack gap={1}>
            <img
              src={title}
              alt="logo"
              style={{ height: "25px", width: "25px" }}
            />
            <Text
              fontSize={"18px"}
              fontWeight={600}
              color={"rgba(65, 68, 63, 1)"}
              lineHeight={"16px"}
            >
              {formatDate(resumeDate)}
            </Text>
          </HStack>
        </Stack>
      </Stack>
    </>
  );
};
