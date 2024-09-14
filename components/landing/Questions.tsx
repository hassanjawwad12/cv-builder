import { VStack, Text, Stack, Button, Image } from "@chakra-ui/react";

export const Question: React.FC = () => {
  return (
    <>
      <VStack
        width="100%"
        alignItems="center"
        bg="brand.main"
        px="5px"
        mt={20}
        py={2}
      >
        <Stack
          width="100%"
          justifyContent=" space-between"
          px="3%"
          mt={10}
          direction={["column", "column", "row", "row"]}
          textAlign={["center", "left"]}
        >
          <Image
            src="qq.png"
            alt="Logo"
            width="70%"
            height="auto"
            display={["none", "block"]}
          />
          <VStack
            width={["100%", "100%", "50%", "50%"]}
            alignItems={["center", "flex-start"]}
            zIndex="popover"
            mt={10}
          >
            <Text fontSize="lg" fontWeight="semibold" color="brand.green">
              DON'T HESITATE
            </Text>

            <Text
              fontWeight="extrabold"
              fontSize={["2xl", "2xl", "5xl", "5xl"]}
              width="70%"
            >
              Still Have Any Questions?
            </Text>
            <Text fontSize="md" width={["100%", "95%"]}>
              Contact our support team for further assistance.
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
            >
              Contact us
            </Button>
          </VStack>
        </Stack>
      </VStack>
    </>
  );
};

export default Question;
