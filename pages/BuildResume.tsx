import React, { useState, useEffect } from "react";
import {
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
  Input,
  VStack,
  useColorModeValue,
  useToast,
  Button,
  Progress,
} from "@chakra-ui/react";
import { Logo } from "../components/reusable-components/Logo";
import { BackButton } from "../components/reusable-components/BackButton";
import authImage from "../assets/images/authimage.png";
import { DashboardFooter } from "../components/dashboard/DashboardFooter";
import fileadd from "../assets/images/fileadd.png";
import fileupgrad from "../assets/images/fileupgrad.png";
import { FileUpload } from "../components/uploading/FileUpload";
import {
  extractTextFromPdf,
  extractTextFromWordFile,
} from "../shared/ReusableFunctions";
import { atsFriendlyResumeApi } from "../api-helper/Api";
import { supabaseClient } from "../config/supabase";
import { useNavigate } from "react-router-dom";
import useBuildsCounts from "../shared/useCommonHooks";
import { CraftResume } from "../components/modals/CraftResume";

export const BuildResume: React.FC = () => {
  const { builds, fetchBuildCounts } = useBuildsCounts();
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [resume, setResume] = useState<File>();
  const [jobDesc, setJobDesc] = useState<File>();
  const [jobText, setJobText] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isExamCreated, setIsExamCreated] = useState(false);

  const handleUpload = async () => {
    if (builds <= 0) {
      toast({
        title: "Error",
        description:
          "Kindly create or upgrade your subscription to access this functionality.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate("/pricing");
    } else {
      if (resume && (jobDesc || jobText)) {
        setIsExamCreated(true);
        setLoading(true);
        let resumeText;
        if (resume.type === "application/pdf") {
          resumeText = await extractTextFromPdf(resume);
        } else if (
          resume.type === "application/msword" ||
          resume.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          resumeText = await extractTextFromWordFile(resume);
          console.log("resumeText", resumeText);
        }
        let query = "";
        if (jobDesc) {
          let jobDescText;
          if (jobDesc.type === "application/pdf") {
            jobDescText = await extractTextFromPdf(jobDesc);
          } else if (
            jobDesc.type === "application/msword" ||
            jobDesc.type ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ) {
            jobDescText = await extractTextFromWordFile(jobDesc);
          }
          query =
            `Resume:\n${resumeText}\n\n` + `Job Description:\n${jobDescText}`;
        } else {
          query = `Resume:\n${resumeText}\n\n` + `Job Description:\n${jobText}`;
        }
        try {
          const user = await supabaseClient.auth.getSession();
          const token = user?.data?.session?.access_token;
          const response = await atsFriendlyResumeApi(token, name, query);
          if (response) {
            toast({
              title: "Success",
              description:
                "Your ATS friendly resume has been created successfully.",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            setLoading(false);
            navigate(`/download-resume?resumeId=${response?.data?.data?.id}`);
            setIsExamCreated(false);
          }
        } catch (error) {
          console.error("Error:", error);
          setLoading(false);
        }
      } else {
        toast({
          title: "Error",
          description: "Please upload both resume and job description files.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  const handleJobFileUpload = async (
    file: File,
    setProgress: (progress: number) => void
  ) => {
    const uploadDelay = 5000;
    return new Promise<void>((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setJobDesc(file);
          resolve();
        }
      }, uploadDelay / 100);
    });
  };
  const handleResumeFileUpload = async (
    file: File,
    setProgress: (progress: number) => void
  ) => {
    const uploadDelay = 5000;
    return new Promise<void>((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setResume(file);
          resolve();
        }
      }, uploadDelay / 100);
    });
  };
  useEffect(() => {
    fetchBuildCounts();
  }, []);
  useEffect(() => {
    if (loading) {
      let progress = 5;
      setUploadProgress(progress);
      const uploadInterval = setInterval(() => {
        if (progress <= 100) {
          progress += 5;
          setUploadProgress(progress);
        } else {
          clearInterval(uploadInterval);
        }
      }, 3000);
      return () => {
        clearInterval(uploadInterval);
      };
    }
  }, [loading]);
  const borderColor = useColorModeValue(
    "rgba(89, 194, 39, 1)",
    "rgba(89, 194, 39, 0.5)"
  );
  const backgroundColor = useColorModeValue(
    "rgba(89, 194, 39, 0.1)",
    "rgba(89, 194, 39, 0.05)"
  );
  return (
    <>
      {isExamCreated ? (
        <CraftResume
          title="Analyzing Your Resume"
          description1="Your Resume is Being Crafted. Sit Tight for a Detailed Insight"
          description2="We will shortly redirect you to your ATS friendly resume"
        />
      ) : (
        <>
          <Grid
            h={"auto"}
            templateRows="repeat(6, 1fr)"
            templateColumns="repeat(8, 1fr)"
          >
            <GridItem
              rowSpan={[1, 1, 6, 6]}
              colSpan={[8, 8, 1, 1]}
              pl={10}
              pt={10}
            >
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
              colSpan={[8, 8, 5, 5]}
              pt={[2, 2, 20, 20]}
              px={[0, 0, 20, 20]}
            >
              <Stack
                w={"full"}
                h={"auto"}
                pt={[0, 0, 10, 10]}
                px={[0, 0, 20, 20]}
              >
                <VStack alignItems="left" px={[0, 0, 20, 20]} mb={2}>
                  <Stack>
                    <Text
                      fontWeight={800}
                      fontSize={"44px"}
                      color={"rgba(38, 39, 37, 1)"}
                    >
                      Build Resume
                    </Text>
                  </Stack>
                  <Stack spacing={3}>
                    <Input
                      placeholder="Name your resume"
                      size="lg"
                      bg={"brand.white"}
                      w={["80%", "80%", "50%", "50%"]}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Stack>
                </VStack>
                <Stack
                  w={"full"}
                  h={"full"}
                  pt={5}
                  gap={5}
                  justify={"center"}
                  alignItems={"center"}
                >
                  <Stack
                    w={["90%", "90%", "80%", "80%"]}
                    h={"auto"}
                    bg={"rgba(89, 194, 39, 0.1)"}
                    borderRadius={10}
                    p={3}
                  >
                    <VStack
                      h={"auto"}
                      w={"full"}
                      borderRadius={10}
                      border={"2px dashed rgba(89, 194, 39, 1)"}
                      justify={"center"}
                      p={2}
                    >
                      <Image
                        src={fileadd}
                        alt="image"
                        borderRadius="12px"
                        w={"10"}
                        h={"12"}
                        mt={1}
                      />
                      <Text
                        fontWeight={800}
                        fontSize={"24px"}
                        color={"rgba(38, 39, 37, 1)"}
                      >
                        Upload Your Resume
                      </Text>
                      <Text
                        fontWeight={500}
                        fontSize={"16px"}
                        color={"rgba(65, 68, 63, 1)"}
                        textAlign={"center"}
                      >
                        Drag & drop or copy and paste your
                        <br /> old resume here. We accept PDF, DOC, DOCX
                      </Text>
                      <FileUpload onFileUpload={handleResumeFileUpload} />
                    </VStack>
                  </Stack>
                  <Stack w={"80%"} h={"3vh"}>
                    <Text
                      fontWeight={600}
                      fontSize={"14px"}
                      color={"rgba(0, 0, 0, 0.4)"}
                      textAlign={"center"}
                    >
                      and
                    </Text>
                  </Stack>
                  <Stack
                    w={["90%", "90%", "80%", "80%"]}
                    h={"auto"}
                    bg={backgroundColor}
                    borderRadius={10}
                    p={3}
                  >
                    <VStack
                      h={"auto"}
                      borderRadius={10}
                      border={`2px dashed ${borderColor}`}
                      justify={"center"}
                      p={5}
                    >
                      <Image
                        src={fileupgrad}
                        alt="image"
                        borderRadius="12px"
                        w={"10"}
                        h={"12"}
                      />
                      <Text
                        fontWeight={800}
                        fontSize={"24px"}
                        color={"rgba(38, 39, 37, 1)"}
                        textAlign={"center"}
                      >
                        Upload Your <br /> Job Description
                      </Text>
                      <Text
                        fontWeight={500}
                        fontSize={"16px"}
                        color={"rgba(65, 68, 63, 1)"}
                        textAlign={"center"}
                      >
                        Drag & drop or copy and paste your
                        <br /> latest job description here. We accept
                        <br /> PDF, DOC, DOCX
                      </Text>
                      {jobText === "" && (
                        <FileUpload onFileUpload={handleJobFileUpload} />
                      )}
                      {jobText !== "" ||
                        (!jobDesc && (
                          <Text
                            fontWeight={600}
                            fontSize={"14px"}
                            color={"rgba(0, 0, 0, 0.4)"}
                            textAlign={"center"}
                          >
                            or
                          </Text>
                        ))}
                      {!jobDesc && (
                        <>
                          <Stack spacing={1} w={["90%", "90%", "60%", "60%"]}>
                            <Input
                              placeholder="Add job description here..."
                              size="lg"
                              bg={"brand.white"}
                              w={"full"}
                              h={"40px"}
                              value={jobText}
                              onChange={(e) => setJobText(e.target.value)}
                              disabled={jobDesc}
                            />
                          </Stack>
                        </>
                      )}
                    </VStack>
                  </Stack>
                  <Stack w={["90%", "90%", "80%", "80%"]}>
                    {loading ? (
                      <Progress
                        colorScheme="green"
                        hasStripe
                        isAnimated
                        height="25px"
                        value={uploadProgress}
                      />
                    ) : (
                      <Button
                        disabled={loading}
                        type="submit"
                        height="50px"
                        borderRadius="8px"
                        bg={
                          !resume && (!jobDesc || !jobText)
                            ? "rgba(225, 225, 225, 1)"
                            : "brand.green"
                        }
                        color={"brand.white"}
                        onClick={handleUpload}
                        _hover={{
                          bg: "brand.lightGreen",
                          color: "brand.green",
                        }}
                      >
                        <Text
                          fontSize={["16", "16", "16", "16"]}
                          fontWeight={800}
                          lineHeight="29px"
                          letterSpacing="0em"
                          textAlign="center"
                          mx="auto"
                        >
                          BUILD RESUME
                        </Text>
                      </Button>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </GridItem>
            <GridItem
              rowSpan={[0, 0, 6, 6]}
              colSpan={[0, 0, 2, 2]}
              py={8}
              pr={8}
              display={["none", "none", "none", "block"]}
              h={"100vh"}
            >
              <Image
                src={authImage}
                alt="image"
                borderRadius="12px"
                w={"100%"}
                h={"full"}
              />
            </GridItem>
          </Grid>
          <Stack w={"full"} h={"full"} mt={[40, 70, 70, 20]} mb={10}>
            <DashboardFooter />
          </Stack>
        </>
      )}
    </>
  );
};
