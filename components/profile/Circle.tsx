import { Text, VStack, Button } from "@chakra-ui/react";
import ProgressBar from "./ProgresBar";
import { useNavigate } from "react-router-dom";

export const Circle: React.FC<any> = ({ customer, buildLimit }) => {
  const navigate = useNavigate();
  return (
    <VStack
      bg={"white"}
      rounded="lg"
      p={4}
      gap={3}
      alignItems={"center"}
      justifyContent={"center"}
      width={["100%", "100%", "40%", "40%"]}
    >
      <ProgressBar value={customer?.builds_limi || 0} total={buildLimit} />
      <Text fontSize="2xl" mt={2} fontWeight={"bold"}>
        Used Builds
      </Text>
      <Text fontSize="lg" mt={2}>
        {`${customer?.builds_limit || 0} / ${buildLimit} builds`}
      </Text>
      <Button
        fontSize={"16px"}
        fontWeight={600}
        bg={"brand.green"}
        p={2}
        color="white"
        rounded="md"
        mt={4}
        _hover={{
          bg: "brand.lightGreen",
          color: "brand.green",
          transition: "0.5s",
        }}
        onClick={() => {
          navigate("/pricing");
        }}
      >
        Change Plan
      </Button>
    </VStack>
  );
};

export default Circle;
