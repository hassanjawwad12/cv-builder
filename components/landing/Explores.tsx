import React from "react";
import { VStack, Text, Image, Stack } from "@chakra-ui/react";

export const Explores: React.FC = () => {
  return (
    <>
      <VStack
        width="100%"
        justifyContent="center"
        alignItems="center"
        mt={10}
        id="aboutid"
      >
        <Image src="laning2.png" alt="Logo" height="100%" width="95%" />
        <Stack
          width="100%"
          justifyContent=" space-between"
          px="3%"
          mt={10}
          direction={["column", "column", "row", "row"]}
          textAlign={["center", "left"]}
        >
          <Text
            fontSize={["2xl", "6xl"]}
            fontWeight="extrabold"
            width={["100%", "100%", "50%", "50%"]}
          >
            We Craft It With Precision And Impact...
          </Text>
          <Text
            fontSize={["sm", "md"]}
            color="#41443F"
            width={["100%", "100%", "37%", "37%"]}
          >
            At CVFix, our vision is to empower job seekers by eliminating the
            hassle of tailoring resumes to each job description. We believe that
            a resume should never be a barrier to securing the ideal job. Our
            mission is to simplify the candidate experience, providing them with
            efficient, tailored resumes that not only meet industry standards
            but also significantly save their time. With our user-friendly
            resume builder, we aim to revolutionize the job application process,
            ensuring every candidate stands out effortlessly in the competitive
            job market.
          </Text>
        </Stack>
      </VStack>
    </>
  );
};
