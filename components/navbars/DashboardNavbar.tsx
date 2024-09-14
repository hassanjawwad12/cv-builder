import React from "react";
import { HStack, Text, Circle, Stack, Box, Image, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Logo } from "../reusable-components/Logo";
import profile_pic from "../../assets/images/profile.png";
import green_temp from "../../assets/images/green_temp.png";
import orange_temp from "../../assets/images/orange_temp.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { logout } from "../profile/Settings";

export const DashboardNavbar: React.FC<any> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user_profile_pic = useSelector((state: any) => state.user?.data?.user_metadata?.avatar_url);

  return (
    <>
      <HStack gap={10} width={"98%"} px={4} display={{ base: "block", lg: "flex" }}>
        <HStack width={"100%"} justifyContent={"space-between"} mt={["4", "4", "", ""]}>
          <Link to="/dashboard">
            <Logo h={110} w={110} />
          </Link>
          <Box display={{ base: "block", lg: "none" }}>
            <RxHamburgerMenu size={30} onClick={onOpen} />
          </Box>
        </HStack>

        {/* Drawer for mobile screens */}
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <HStack display={{ base: "flex", lg: "none" }} alignItems={"center"} flexDirection="column" gap={6} fontWeight={"bold"}>
                <Link to="/build-resume">
                  <HStack>
                    <Image src={green_temp} alt="logo" p={["2", "2", "0", "0"]} style={{ height: "42px", width: "32.67px" }} />
                    <Stack direction={"column"} w={"290px"} gap={[4, 4, -2, -2]} _hover={{ cursor: "pointer" }}>
                      <Text fontSize={"22px"} fontWeight={900}>
                        Resume builder
                      </Text>
                      <Text>Build your ATS friendly resume</Text>
                    </Stack>
                  </HStack>
                </Link>
                <Link to="/template">
                  <HStack _hover={{ cursor: "pointer" }}>
                    <Image src={orange_temp} alt="logo" p={["2", "2", "0", "0"]} style={{ height: "42px", width: "32.67px" }} />
                    <Stack direction={"column"} gap={[4, 4, -2, -2]} w={"200px"}>
                      <Text fontSize={"22px"} fontWeight={900} mt={["5", "5", "0", "0"]}>
                        Template
                      </Text>
                      <Text>Get a perfect resume</Text>
                    </Stack>
                  </HStack>
                </Link>
                <Link to={"/profile"}>
                  <Circle size="14" bg={"rgba(89, 194, 39, 0.1)"} mt={["5", "5", "0", "0"]}>
                    <Image src={!user_profile_pic ? profile_pic : user_profile_pic} alt="logo" height={55} width={55} borderRadius={"full"} />
                  </Circle>
                </Link>
                <Circle bg={"rgba(89, 194, 39, 0.1)"} mt={["5", "5", "0", "0"]} _hover={{
                  cursor: "pointer",
                  bg: "rgba(89, 194, 39, 0.3)"
                }} onClick={logout}>
                  <HStack bg={"green.200"} p={4} borderRadius={"10px"}>
                    <IoLogOutOutline size={30} />
                    <Text fontSize={"22px"} fontWeight={900} as={"p"}>
                      {"SignOut"}
                    </Text>
                  </HStack>
                </Circle>

              </HStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* Navigation for desktop screens */}
        <HStack display={{ base: "none", lg: "flex" }} alignItems={"center"} gap={6} fontWeight={"bold"}>
          <Link to="/build-resume">
            <HStack>
              <Image src={green_temp} alt="logo" p={["2", "2", "0", "0"]} style={{ height: "42px", width: "32.67px" }} />
              <Stack direction={"column"} w={"290px"} gap={[4, 4, -2, -2]} _hover={{ cursor: "pointer" }}>
                <Text fontSize={"22px"} fontWeight={900}>
                  Resume builder
                </Text>
                <Text>Build your ATS friendly resume</Text>
              </Stack>
            </HStack>
          </Link>
          <Link to="/template">
            <HStack _hover={{ cursor: "pointer" }}>
              <Image src={orange_temp} alt="logo" p={["2", "2", "0", "0"]} style={{ height: "42px", width: "32.67px" }} />
              <Stack direction={"column"} gap={[4, 4, -2, -2]} w={"200px"}>
                <Text fontSize={"22px"} fontWeight={900} mt={["5", "5", "0", "0"]}>
                  Template
                </Text>
                <Text>Get a perfect resume</Text>
              </Stack>
            </HStack>
          </Link>
          <Link to={"/profile"}>
            <Circle size="14" bg={"rgba(89, 194, 39, 0.1)"} mt={["5", "5", "0", "0"]}>
              <Image src={!user_profile_pic ? profile_pic : user_profile_pic} alt="logo" height={55} width={55} borderRadius={"full"} />
            </Circle>
          </Link>
        </HStack>
      </HStack>
    </>
  );
};