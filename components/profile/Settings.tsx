import { Stack, Text, Box, VStack, HStack, useToast } from "@chakra-ui/react";
import { IoLogOutOutline } from "react-icons/io5";
import { Icon } from "@chakra-ui/react";
import PopoverComponent from "../Popovers/Name";
import Password from "../Popovers/Password";
import Delete from "../Popovers/DeleteAcc";
import { supabaseClient } from "../../config/supabase";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/store";

export const logout: React.MouseEventHandler<any> = async () => {
  try {
    await supabaseClient.auth.signOut();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const Setting: React.FC = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  
  const handleUpdateName = async (newValue: string) => {
    const { data: userUploaded } = await supabaseClient
      .auth
      .updateUser({
        data: { full_name: newValue }
      });
    console.log("userUploaded", userUploaded);
    dispatch(setUser(userUploaded?.user));
    if (userUploaded?.user) {
      toast({
        title: "Success",
        description: "Name edited successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };
  const handleUpdatePhone = async (newValue: string) => {
    const { data: userUploaded } = await supabaseClient
      .auth
      .updateUser({
        data: { phone: newValue }
      });
    console.log("userUploaded", userUploaded);
    dispatch(setUser(userUploaded?.user));
    if (userUploaded?.user) {
      toast({
        title: "Success",
        description: "Phone edited successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };
  const handleUpdatePassword = async (newValue: string) => {
    const Backend_Url: string = import.meta.env.VITE_BACKEND_URL;
    window.location.href = "/reset-password";

    const { error } = await supabaseClient.auth.resetPasswordForEmail(
      newValue,
      {
        redirectTo: `${Backend_Url}reset-password`,
      }
    );
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: "Success",
        description: "Check your email for reset password link",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <Stack
      width={["95%", "95%", "25%", "25%"]}
      gap={6}
      mt={10}
      direction="column"
      py={2}
      justifyItems={["center", "center", "center", "center"]}
      bg={"white"}
      px={4}
      rounded={"xl"}
      height={"fit-content"}
      mr={["0", "0", "4", " 4"]}
      border="1px gray.200"
      mb={10}
    >
      <Text
        fontWeight={"extrabold"}
        fontSize={["xl", "2xl", "3xl", "3xl"]}
        color="black"
        mt={2}
      >
        Settings
      </Text>
      <Box w="100%" h="1px" bg="#C2E1B3" mt={1} />
      <Text
        fontWeight={"extrabold"}
        fontSize={["lg", "lg", "xl", "xl"]}
        color="black"
        mt={2}
      >
        Account Settings
      </Text>
      <VStack
        mt={4}
        ml={8}
        align={"flex-start"}
        fontSize={["sm", "sm", "md", "md"]}
        gap={5}
        color="black"
        textTransform={"uppercase"}
      >
        <HStack>
          <Text>Change Name</Text>
          <PopoverComponent
            heading="Change Name"
            content="Enter name here"
            onSubmit={handleUpdateName}
          />
        </HStack>

        <HStack>
          <Text>Change Password</Text>
          <Password onSubmit={handleUpdatePassword} />
        </HStack>

        <HStack>
          <Text>Change Phone Number</Text>
          <PopoverComponent
            heading="Change Phone Number"
            content="Enter phone number here"
            onSubmit={handleUpdatePhone}
          />
        </HStack>

        <HStack>
          <Text>Delete account</Text>
          <Delete />
        </HStack>
      </VStack>

      <Box w="100%" h="1px" bg="#E1E1E1" mt={1} />
      <Text
        fontWeight={"extrabold"}
        fontSize={["lg", "lg", "xl", "xl"]}
        color="black"
        mt={2}
      >
        Other
      </Text>
      <Text
        ml={8}
        mt={2}
        fontSize={["sm", "sm", "md", "md"]}
        textTransform={"uppercase"}
      >
        Help Center
      </Text>
      <Box w="100%" h="1px" bg="#E1E1E1" mt={2} />

      <HStack alignContent={"center"} p={4} onClick={logout} cursor={"pointer"}>
        <Icon as={IoLogOutOutline} boxSize={6} color="brand.green" />

        <Text fontSize={["sm", "sm", "md", "md"]}>LOGOUT</Text>
      </HStack>
    </Stack>
  );
};

export default Setting;
