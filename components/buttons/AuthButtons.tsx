import React from "react";
import { Button, Text, Spinner } from "@chakra-ui/react";

export const AuthButton: React.FC<any> = ({
  name,
  onClick,
  isLoading,
  bg,
  hover_bg,
  hover_color,
}) => {
  return (
    <Button
      disabled={isLoading}
      type="submit"
      height="50px"
      borderRadius="8px"
      bg={bg ? bg : "brand.green"}
      color="brand.white"
      onClick={onClick}
      _hover={{
        bg: hover_bg ? hover_bg : "brand.lightGreen",
        color: hover_color ? hover_color : "brand.green",
      }}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <Text
          fontSize={["16", "16", "16", "16"]}
          fontWeight={800}
          lineHeight="29px"
          letterSpacing="0em"
          textAlign="center"
          mx="auto"
        >
          {name}
        </Text>
      )}
    </Button>
  );
};
