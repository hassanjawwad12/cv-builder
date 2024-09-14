import {
  Stack,
  Image,
  Text,
  Box,
  Button,
  Skeleton,
  Popover,
  PopoverTrigger,
} from "@chakra-ui/react";
import React from "react";
import Circle from "./Circle";
import star from "../../assets/images/Star.png";
import create from "../../assets/images/create.png";
import { formatDate } from "../../shared/ReusableFunctions";
import ProfileImage from "../Popovers/ProfileImage";
interface ImageProps {
  customer: any;
  user: any;
}
export const Middle: React.FC<ImageProps> = ({ customer,user }) => {
  let planName = "No plan";
  let buildLimit: string | number = 0;
  if (customer?.plan === 1) {
    planName = "Freemium";
    buildLimit = 5;
  } else if (customer?.plan === 2) {
    planName = "Starters";
    buildLimit = 300;
  } else if (customer?.plan === 3) {
    planName = "Recommended";
    buildLimit = 1000;
  } else if (customer?.plan === 4) {
    planName = "Premium";
    buildLimit = 10000;
  }
  console.log("customer", user);
  return (
    <Stack
      width={["100%", "100%", "40%", "40%"]}
      gap={6}
      direction={["column", "column", "column", "column"]}
      py={2}
      justifyItems={["center", "center", "center", "center"]}
      align={["center", "center", "flex-start", "flex-start"]}
    >
      <Image
        src={user?.avatar_url ? user?.avatar_url : "/person.png"}
        alt="Logo"
        width="20"
        height="20"
        display={["none", "block"]}
        zIndex={1}
        position="relative"
        borderRadius={12}
      />
      {user?.full_name ? (
        <Text
          fontWeight={"extrabold"}
          fontSize={["xl", "2xl", "3xl", "4xl"]}
          color="black"
          mt={2}
        >
          {user?.full_name}
        </Text>
      ) : (
        <Skeleton height="40px" w={"300px"} />
      )}
      <Box
        fontWeight={"bold"}
        bg={"brand.lightBrown"}
        p={2}
        rounded="md"
        color={"brand.brown"}
        _hover={{
          bg: "brand.brown",
          color: "brand.white",
          transition: "0.5s",
        }}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Image src={star} alt="star" width="5" height="5" mr={2} />
        <Text>{planName}</Text>
      </Box>
      {customer?.created_at ? (
        <Box
          fontWeight={"bold"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Image src={create} alt="star" width="5" height="5" mr={2} />
          <Text>Created on {formatDate(customer?.created_at)}</Text>
        </Box>
      ) : (
        <Skeleton height="40px" w={"300px"} />
      )}
      <Popover>
        <PopoverTrigger>
          <Button
            fontSize={"16px"}
            fontWeight={600}
            bg={"brand.lightGreen"}
            p={2}
            color="brand.green"
            rounded="md"
            _hover={{
              bg: "brand.green",
              color: "brand.white",
              transition: "0.5s",
            }}
          >
            ADD A PROFILE PICTURE
          </Button>
        </PopoverTrigger>
        <ProfileImage />
      </Popover>
      <Text
        fontWeight={"extrabold"}
        fontSize={["xl", "2xl", "3xl", "4xl"]}
        color="black"
        mt={2}
      >
        Usage
      </Text>
      <Circle customer={customer} buildLimit={buildLimit} />
    </Stack>
  );
};
