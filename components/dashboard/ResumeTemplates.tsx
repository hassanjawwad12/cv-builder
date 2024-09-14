import React, { useRef, useEffect, useState } from "react";
import { Text, Stack, HStack, Flex, Skeleton } from "@chakra-ui/react";
import back from "../../assets/images/back.png";
import forward from "../../assets/images/forward.png";
import { RecentCv } from "./RecentCv";
import { getAllResumeApi } from "../../api-helper/Api";
import { supabaseClient } from "../../config/supabase";

export const ResumeTemplates: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollBackward = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 200;
    }
  };

  const scrollForward = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 200;
    }
  };
  const [resumeData, setResumeData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | undefined>("");
  useEffect(() => {
    const getData = async () => {
      try {
        const user = await supabaseClient.auth.getSession();
        const token = user?.data?.session?.access_token;
        setToken(token);
        const response = await getAllResumeApi(token);
        if (response?.data) {
          setResumeData(response?.data?.data);
          setLoading(false);
        } else {
          setResumeData([]);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    getData();
  }, [token]);

  return (
    <>
      <Stack direction="column" w={"full"} h={"full"} justify={"space-between"}>
        <Text fontWeight={900} fontSize={"24px"} ml={3}>
          Recent
        </Text>
        <HStack
          p={4}
          gap={3}
          overflowX="auto"
          css={{
            "::-webkit-scrollbar": {
              width: "0.5em",
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: "transparent",
            },
          }}
          whiteSpace="nowrap"
          h={"full"}
          w={"full"}
          ref={containerRef}
        >
          {loading ? (
            <Flex
              justify={"center"}
              align={"center"}
              w={"full"}
              h={"80%"}
              gap={5}
            >
              <Skeleton w={"30%"} h={"full"} />
              <Skeleton w={"30%"} h={"full"} />
              <Skeleton w={"30%"} h={"full"} />
            </Flex>
          ) : (
            <>
              {resumeData?.length > 0 ? (
                resumeData.map((resume: any) => (
                  <RecentCv
                    key={resume.id}
                    resumeType={resume.resume_type}
                    id={resume.id}
                    resumeName={resume.resume_name}
                    resumeDate={resume.created_at}
                    loading={loading}
                  />
                ))
              ) : (
                <Flex
                  direction={"column"}
                  justify={"center"}
                  align={"center"}
                  w={"full"}
                  h={"full"}
                >
                  <Text fontWeight={900} fontSize={"24px"}>
                    No Resume Found.
                  </Text>
                  <Text
                    fontWeight={500}
                    fontSize={"15px"}
                    mt={4}
                    color="brand.green"
                  >
                    Looks like you haven't created any resumes yet. Once you
                    create resumes, they will appear here.
                  </Text>
                </Flex>
              )}
            </>
          )}
        </HStack>
        <Stack direction={"row"} justifyContent={"end"}>
          <Stack
            bg={"brand.lightGreen"}
            h={"38px"}
            w={"38px"}
            borderRadius={"12px"}
            align={"center"}
            justify={"center"}
            onClick={scrollBackward}
          >
            <img src={back} alt="logo" height={25} width={25} />
          </Stack>
          <Stack
            bg={"brand.lightGreen"}
            h={"38px"}
            w={"38px"}
            borderRadius={"12px"}
            align={"center"}
            justify={"center"}
            onClick={scrollForward}
          >
            <img src={forward} alt="logo" height={25} width={25} />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
