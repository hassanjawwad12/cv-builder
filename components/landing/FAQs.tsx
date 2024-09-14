import React from "react";
import { VStack, Text, Box } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

export const FAQs: React.FC = () => {
  interface FAQs {
    id: number;
    name: string;
    features: string;
  }

  const FAQS: FAQs[] = [
    {
      id: 1,
      name: "How does it work?",
      features:
        "To create a resume that is compatible with ATS systems and includes all the necessary keywords, simply upload or paste your resume and job description into the ATS-friendly resume builder. Then, click the build button to generate your resume.",
    },
    {
      id: 2,
      name: "Is it Secure?",
      features:
        "Yes, CVFix takes your security seriously. We employ industry-standard encryption protocols to safeguard your personal information. Your data is stored securely, and we follow best practices to protect it from unauthorized access.",
    },
    {
      id: 3,
      name: "Is it easy to use?",
      features:
        "Yes, CVFix is designed with user-friendliness in mind. Our intuitive resume builder allows you to effortlessly create tailored resumes without any technical hassle. You don't need to be an expert in resume writing – our platform guides you through the process seamlessly.",
    },
    {
      id: 4,
      name: "Can I access it on multiple devices?",
      features:
        "Yes, absolutely! CVFix is designed to be accessible from any device with internet connectivity. Whether you're on your laptop, tablet, or smartphone, you can easily log in to your account and work on your resume seamlessly.",
    },
  ];

  return (
    <VStack
      width="100%"
      alignItems={["center", "flex-start"]}
      bg="brand.main"
      px="4%"
      mt={20}
      py={2}
    >
      <Text fontSize="lg" fontWeight="semibold" color="brand.green">
        HAVE DOUBTS...?
      </Text>
      <Text
        color="brand.text"
        fontWeight="extrabold"
        fontSize={["2xl", "2xl", "4xl", "4xl"]}
      >
        Frequently asked questions
      </Text>

      <VStack
        borderRadius={"12px"}
        width="100%"
        alignItems="center"
        px="5px"
        mt={10}
      >
        {FAQS.map((FAQS) => (
          <Accordion
            defaultIndex={[0]}
            allowMultiple
            width={"full"}
            alignSelf="center"
            bg="#59C2271A"
            key={FAQS.id}
            borderRadius={"18px"}
          >
            <AccordionItem p={2}>
              <h2>
                <AccordionButton>
                  <Box
                    borderRadius={"12px"}
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontSize={["lg", "lg", "2xl", "2xl"]}
                    color="#41443F"
                    fontWeight="extrabold"
                  >
                    {FAQS.name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel
                pb={2}
                color="white"
                bg="brand.green"
                borderRadius={"12px"}
              >
                {FAQS.features}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
      </VStack>
    </VStack>
  );
};
