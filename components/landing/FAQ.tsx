import React from "react";
import { VStack, Text, Box } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

export const FAQ: React.FC = () => {
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
        "To create a resume that is compatible with ATS systems and includes all the necessary keywords, simply upload or paste your resume and job description into the ATS-friendly resume builder. Then, click the build button to generate your resume. - how does it work",
    },
    {
      id: 2,
      name: "Is it Secure",
      features: "300 builds",
    },
    {
      id: 3,
      name: "Is it easy to use",
      features: "1000 builds",
    },
    {
      id: 4,
      name: "Can I access it on multiple devices",
      features: "unlimited builds",
    },
  ];

  return (
    <VStack
      width="100%"
      alignItems={["center", "flex-start"]}
      bg="brand.main"
      px="3%"
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

      <VStack width="100%" alignItems="center" px="3%" mt={20}>
        {FAQS.map((FAQS) => (
          <Accordion
            defaultIndex={[0]}
            allowMultiple
            width={["90%", "80%"]}
            alignSelf="center"
            bg="#59C2271A"
            key={FAQS.id}
            borderRadius="md"
          >
            <AccordionItem p={2}>
              <h2>
                <AccordionButton>
                  <Box
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
              <AccordionPanel pb={2} color="white" bg="brand.green">
                {FAQS.features}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
      </VStack>
    </VStack>
  );
};
