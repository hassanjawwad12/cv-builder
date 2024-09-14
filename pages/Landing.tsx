import { VStack, Text, HStack, Button, Image, Stack } from "@chakra-ui/react";
import { Explores } from "../components/landing/Explores";
import { Pricing } from "../components/landing/Pricings";
import { Question } from "../components/landing/Questions";
import { Follow } from "../components/landing/Follows";
import { LandingNavbar } from "../components/navbars/LandingNavbar";
import { useNavigate } from "react-router-dom";
import { What } from "../components/landing/Whats";
import { FAQs } from "../components/landing/FAQs";

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <VStack
        width="100%"
        //height={["full", "full", "540vh", "555vh"]}
        alignItems="center"
        bg="brand.main"
      >
        <LandingNavbar />
        <HStack width="100%" justifyContent=" space-between" px="3%" mt={10}>
          <VStack
            alignItems={["center", "flex-start"]}
            width={["100%", "100%", "40%", "40%"]}
            py={1}
            textAlign={["center", "left"]}
          >
            <Text fontSize="lg" fontWeight="semibold" color="brand.green">
              Accelerate your success story
            </Text>
            <Text
              color="brand.text"
              fontWeight="extrabold"
              fontSize={["2xl", "2xl", "7xl", "7xl"]}
              width={["100%", "100%", "85%", "85%"]}
            >
              Perfect your Resume in minutes
            </Text>
            <Text fontSize="md" width={["100%", "100%", "82%", "82%"]}>
              Unlock career opportunities with our ATS-friendly resume builder
              using Artificial Intelligence. Make an impact in just 5 seconds
              with a professionally crafted resume{" "}
            </Text>
            <Button
              variant={"solid"}
              size="lg"
              colorScheme={"white"}
              bg="brand.green"
              py={2}
              px={3}
              mt={4}
              _hover={{
                bg: "brand.lightGreen",
                color: "black",
                transition: "0.5s",
              }}
              onClick={() => {
                navigate("/build-resume");
              }}
            >
              Build your ATS friendly resume
            </Button>
          </VStack>

          <Image
            src="starting.png"
            alt="Logo"
            width="50%"
            height="auto"
            display={["none", "block"]}
          />
        </HStack>
        <Explores />
        <What />
        <Pricing />
        <FAQs />
        <Question />
        <Follow />
        
        <HStack w={"93%"} h={"5vh"} my={[4, 4, 4, 2]} justify={"space-between"}>
          <HStack>
            <Text
              fontWeight={500}
              fontSize={"16px"}
              color={"rgba(65, 68, 63, 1)"}
            >
              © 2024 CVfix.io All Rights Reserved.
            </Text>
          </HStack>
          <Stack
            direction={["column", "column", "row", "row"]}
            w={["60%", "60%", "60%", "40%"]}
            justify={"space-between"}
            spacing={[1, 1, 1, 1]}
          >
            <Text
              textDecoration={"underline"}
              fontWeight={500}
              fontSize={"16px"}
              color={"rgba(65, 68, 63, 1)"}
            >
              Privacy Policy
            </Text>
            <Text
              textDecoration={"underline"}
              fontWeight={500}
              fontSize={"16px"}
              color={"rgba(65, 68, 63, 1)"}
            >
              Terms of service
            </Text>
            <Text
              textDecoration={"underline"}
              fontWeight={500}
              fontSize={"16px"}
              color={"rgba(65, 68, 63, 1)"}
            >
              Cookies Settings
            </Text>
          </Stack>
        </HStack>
      </VStack>
    </>
  );
};
