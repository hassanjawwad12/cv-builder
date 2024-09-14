import React from "react";
import { BackButton } from "../reusable-components/BackButton";
import { Image, Box } from "@chakra-ui/react";

export const BackOption: React.FC = () => {
  return (
    <Box position="relative">
      <Box zIndex={2} position="absolute" pl={6}>
        <BackButton route="/dashboard" />
      </Box>

      <Image
        src="back.png"
        alt="Logo"
        width="95%"
        height="auto"
        display={["none", "none", "block", "block"]}
        zIndex={1}
        position="relative"
      />
    </Box>
  );
};
