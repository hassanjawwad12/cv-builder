import { VStack, Text, Button, Stack } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import logo from "../../assets/images/logo.png";
import { SideBox } from "./SideBox";
export const Follow: React.FC = () => {
  return (
    <>
      <VStack width="100%" alignItems="center" bg="brand.main" px="5px" mt={20}>
        <Stack
          width="100%"
          justifyContent=" space-between"
          px="3%"
          direction={["column", "column", "row", "row"]}
          textAlign={["center", "left"]}
        >
          <VStack
            width={["100%", "100%", "60%", "70%"]}
            alignItems={["center", "flex-start"]}
            zIndex="popover"
            mt={[1, 1, 1, 1]}
            spacing={[1, 1, 1, 8]}
          >
            <img src={logo} alt="logo" height={110} width={110} />
            <Text
              fontWeight="bold"
              fontSize="lg"
              width={["100%", "100%", "100%", "68%"]}
            >
              Stay up to date on all the latest features and releases by joining
              our newsletter.
            </Text>
            <InputGroup size="lg" width={["100%", "100%", "72%", "72%"]} mt={1}>
              <Input
                pr="4.5rem"
                type="email"
                placeholder="Email Address"
                bg={"rgba(255, 255, 255, 1)"}
                fontSize={"14px"}
                fontWeight={500}
              />
              <InputRightElement width="6rem">
                <Button
                  fontWeight={600}
                  size="16px"
                  colorScheme={"white"}
                  bg="brand.green"
                  p={3}
                  _hover={{
                    bg: "brand.lightGreen",
                    color: "black",
                    transition: "0.5s",
                  }}
                >
                  SIGN UP
                </Button>
              </InputRightElement>
            </InputGroup>
          </VStack>
          <SideBox />
        </Stack>
      </VStack>
    </>
  );
};
