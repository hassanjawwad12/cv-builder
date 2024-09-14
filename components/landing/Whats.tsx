import { VStack, Text, Stack, Image, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const What: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <VStack
        width="100%"
        alignItems="start"
        bg="brand.main"
        px="3%"
        mt={20}
        id="whatid"
      >
        <Text fontSize="lg" fontWeight="semibold" color="brand.green">
          ITS ALL ON YOU
        </Text>
        <Text
          color="brand.text"
          fontWeight="extrabold"
          fontSize={["2xl", "2xl", "6xl", "6xl"]}
        >
          What we got...
        </Text>

        <Stack
          width="100%"
          justifyContent=" space-between"
          mt={10}
          direction={["column", "column", "row", "row"]}
          textAlign={["center", "left"]}
          py={2}
        >
          <VStack
            width={["100%", "100%", "50%", "50%"]}
            alignItems={["center", "flex-start"]}
          >
            <Image src="landing3.png" alt="Logo" width="100%" height="auto" />
            <Text fontWeight="extrabold" fontSize="3xl">
              Resume Builder
            </Text>
            <Text fontSize="md" width={["100%", "95%"]}>
              Personalize your career narrative with our intuitive Resume
              Builder. Tailor every detail to reflect your unique strengths and
              achievements, creating a standout resume that speaks volumes about
              your professional journey
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
          <VStack
            width={["100%", "100%", "50%", "50%"]}
            alignItems={["center", "flex-start"]}
          >
            <Image src="landing4.png" alt="Logo" width="100%" height="auto" />
            <Text fontWeight="extrabold" fontSize="3xl">
              Templates
            </Text>
            <Text fontSize="md" width={["100%", "95%"]}>
              Elevate your resume effortlessly with our curated Template. Choose
              from a selection of professionally designed layout and let your
              information seamlessly integrate, presenting a polished and
              impactful snapshot of your qualifications.
            </Text>
            <Button
              variant={"solid"}
              size="lg"
              colorScheme={"white"}
              bg="brand.brown"
              py={2}
              px={3}
              mt={4}
              _hover={{
                bg: "brand.lightGreen",
                color: "black",
                transition: "0.5s",
              }}
              onClick={() => {
                navigate("/template");
              }}
            >
              Get a Perfect Resume
            </Button>
          </VStack>
        </Stack>
      </VStack>
    </>
  );
};
