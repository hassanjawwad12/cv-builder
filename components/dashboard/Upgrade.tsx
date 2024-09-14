import { VStack, Text, Stack, Button, Box, Image } from "@chakra-ui/react";
import upgrade from "../../assets/images/upgradeFrame.png";
import { useNavigate } from "react-router-dom";
export const UpgradePlan: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Stack direction={"row"} w={"full"} h={"full"} py={8}>
      <Box
        h={"full"}
        w={"60%"}
        overflow={"hidden"}
        display={["none", "none", "none", "block"]}
      >
        <Image
          src={upgrade}
          alt="logo"
          style={{ height: "100%", width: "100%" }}
          // display = {["none","none","none","block"]}
        />
      </Box>
      <VStack
        width={["100%", "100%", "100%", "40%"]}
        alignItems={["center", "center", "center", "flex-start"]}
        // justifyContent={["center", "center", "center", "flex-start"]}
        zIndex="popover"
        gap={3}
      >
        <Text fontSize="lg" fontWeight="semibold" color="brand.green">
          GET MEXIMUM FROM US
        </Text>
        <Text
          lineHeight={"50px"}
          fontWeight={900}
          fontSize={"42px"}
          textAlign={["center", "center", "center", "left"]}
        >
          Upgrade Your Plan To Scale Up Your Resume
        </Text>
        <Text fontWeight={600} fontSize={"16px"} color={"rgba(65, 68, 63, 1)"}>
          Unlimited Builds To Get Your Dream Job
        </Text>
        <Button
          variant={"solid"}
          size="lg"
          color="white"
          bg="brand.green"
          _hover={{
            bg: "brand.lightGreen",
            color: "brand.text",
          }}
          onClick={() => {
            navigate("/pricing");
          }}
        >
          UPGRADE NOW
        </Button>
      </VStack>
    </Stack>
  );
};
