import React from "react";
import { Link } from "react-router-dom";
import { Stack, HStack, Text } from "@chakra-ui/react";
import back from "../../assets/images/back.png";
export const BackButton: React.FC<any> = ({ route }) => {
  return (
    <HStack
      gap={6}
      bg={"brand.white"}
      h={"80px"}
      w={"166px"}
      borderRadius={"12px"}
      align={"center"}
      justify={"center"}
      mr={20}
    >
      <Stack
        as={Link}
        to={route}
        bg={"brand.lightGreen"}
        h={"64px"}
        w={"74px"}
        borderRadius={"12px"}
        align={"center"}
        justify={"center"}
      >
        <img src={back} alt="logo" height={40} width={40} />
      </Stack>
      <Text fontWeight={800} fontSize={"15px"} color={"rgba(38, 39, 37, 1)"}>
        BACK
      </Text>
    </HStack>
  );
};
