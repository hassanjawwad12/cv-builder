import React, { useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  HStack,
  Image,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Logo } from "../components/reusable-components/Logo";
import { BackButton } from "../components/reusable-components/BackButton";
import resumedownload from "../assets/images/resumedownload.png";
import { DashboardFooter } from "../components/dashboard/DashboardFooter";
import atsdownload from "../assets/images/atsDownload.png";
import atsfeedback from "../assets/images/atsFeedback.png";
import dots from "../assets/images/dots.png";
import { useLocation } from "react-router-dom";
import { getSingleResumeApi } from "../api-helper/Api";
import { supabaseClient } from "../config/supabase";
import { ViewResumeModal } from "../components/dashboard/ViewResumeModal";
import MarkdownToPdf from "../shared/MarkdownToPdf";
import MarkdownToWord from "../shared/MarkdownToWord";
export const DownloadResume: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: reportIsOpen,
    onOpen: reportOnOpen,
    onClose: reportOnClose,
  } = useDisclosure();
  const location = useLocation();
  const resumeId = new URLSearchParams(location.search).get("resumeId");
  const [resumeData, setResumeData] = useState<any>();
  const getSingleResume = async () => {
    try {
      const user = await supabaseClient.auth.getSession();
      const token = user?.data?.session?.access_token;
      const response = await getSingleResumeApi(token, resumeId);
      if (response) {
        setResumeData(response?.data?.data);
      } else {
        console.log("No data in getSingleChat response");
      }
    } catch (error) {
      console.error("Error fetching single chat:", error);
    }
  };
  useEffect(() => {
    if (resumeId) {
      getSingleResume();
    }
  }, []);
  let resumeText: any = resumeData?.resume_data;
  if (resumeText) {
    resumeText = resumeText?.replace(/```markdown|```/g, "");
  }
  return (
    <>
      <Grid
        h={["120vh", "120vh", "110vh", "110vh"]}
        templateRows="repeat(6, 1fr)"
        templateColumns="repeat(8, 1fr)"
        mb={[10, 10, 10, 10]}
      >
        <GridItem rowSpan={[1, 1, 6, 6]} colSpan={[8, 8, 1, 1]} pl={10} pt={10}>
          <Stack
            direction={["row", "row", "column", "column"]}
            spacing={["100px", "200px", "70px", "70px"]}
          >
            <Logo h={110} w={110} />
            <BackButton route="/dashboard" />
          </Stack>
        </GridItem>
        <GridItem
          rowSpan={[5, 5, 6, 6]}
          colSpan={[8, 8, 6, 6]}
          pt={[3, 3, 20, 20]}
          px={[3, 3, 20, 20]}
        >
          <Stack w={"full"} h={"100%"} pt={[0, 0, 10, 10]} px={[0, 0, 20, 20]}>
            <Stack alignItems="left">
              <Text
                fontWeight={800}
                fontSize={"44px"}
                color={"rgba(38, 39, 37, 1)"}
              >
                Your Resume
              </Text>
            </Stack>
            <Stack
              direction={["column", "column", "row", "row"]}
              w={"full"}
              h={["60%", "60%", "35%", "35%"]}
              pt={5}
              gap={5}
            >
              <Stack
                w={["90%", "90%", "45%", "45%"]}
                h={["50%", "50%", "100%", "100%"]}
                onClick={() => {
                  onOpen();
                }}
              >
                <Stack w={"100%"} h={"70%"} borderRadius={32}>
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={atsdownload}
                    alt="image"
                  />
                </Stack>
                <HStack justify={"space-between"} px={5}>
                  <Text fontWeight={900} fontSize={"24px"}>
                    ATS/ keyword optimised resume
                  </Text>
                  <Stack>
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={dots}
                      alt="image"
                    />
                  </Stack>
                </HStack>
              </Stack>
              <Stack
                w={["90%", "90%", "45%", "45%"]}
                h={["50%", "50%", "100%", "100%"]}
                onClick={() => {
                  reportOnOpen();
                }}
              >
                <Stack w={"100%"} h={"70%"} borderRadius={32}>
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={atsfeedback}
                    alt="image"
                  />
                </Stack>
                <HStack justify={"space-between"} px={5}>
                  <Text fontWeight={900} fontSize={"24px"}>
                    ATS feedback report
                  </Text>
                  <Stack>
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={dots}
                      alt="image"
                    />
                  </Stack>
                </HStack>
              </Stack>
            </Stack>
            <ViewResumeModal
              isOpen={isOpen}
              onClose={onClose}
              title={resumeData?.resume_name}
              data={resumeData?.resume_data}
            />
            <ViewResumeModal
              isOpen={reportIsOpen}
              onClose={reportOnClose}
              title={resumeData?.resume_name}
              data={resumeData?.resume_feedback_report}
            />
            <Stack
              direction={"row"}
              w={"full"}
              h={["40%", "40%", "32%", "32%"]}
              pt={10}
            >
              <Stack
                w={["40%", "40%", "28%", "28%"]}
                h={"100%"}
                bg={"brand.white"}
                borderRadius={14}
                justify={"center"}
                align={"center"}
              >
                <MarkdownToWord text={resumeText} />
                <Text
                  fontWeight={800}
                  fontSize={"16px"}
                  color={"rgba(38, 39, 37, 1)"}
                >
                  DOWNLOAD
                  <br /> DOCX FILE
                </Text>
              </Stack>
              <Stack
                w={["40%", "40%", "28%", "28%"]}
                h={"100%"}
                bg={"brand.white"}
                borderRadius={14}
                justify={"center"}
                align={"center"}
              >
                <MarkdownToPdf text={resumeText} />
                <Text
                  fontWeight={800}
                  fontSize={"16px"}
                  color={"rgba(38, 39, 37, 1)"}
                >
                  DOWNLOAD
                  <br /> PDF FILE
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </GridItem>
        <GridItem
          rowSpan={[0, 0, 6, 6]}
          colSpan={[0, 0, 1, 1]}
          py={8}
          display={["none", "none", "none", "block"]}
          h={"100vh"}
        >
          <Image
            src={resumedownload}
            alt="image"
            borderRadius="12px"
            w={"100%"}
            h={"full"}
          />
        </GridItem>
      </Grid>
      <Stack w={"full"} h={"full"} mb={10}>
        <DashboardFooter />
      </Stack>
    </>
  );
};
