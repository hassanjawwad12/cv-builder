import React, { useState } from "react";
import { supabaseClient } from "../config/supabase";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  GridItem,
  HStack,
  Image,
  Stack,
  Text,
  Input,
  InputRightElement,
  InputLeftElement,
  InputGroup,
  Box,
  useToast,
} from "@chakra-ui/react";
import { Logo } from "../components/reusable-components/Logo";
import lock from "../assets/images/lock.png";
import { AuthButton } from "../components/buttons/AuthButtons";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { resetPasswordValidationSchema } from "../shared/Validations";
import authImage from "../assets/images/authimage.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BackButton } from "../components/reusable-components/BackButton";
import { Link } from "react-router-dom";
export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClick = () => setShow(!show);
  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    const { error } = await supabaseClient.auth.updateUser({
      password: values.password,
    });
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
    } else {
      toast({
        title: "Success",
        description: "Your password reset successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
      navigate("/login");
    }
  };

  return (
    <Grid
      h="100vh"
      templateRows="repeat(6, 1fr)"
      templateColumns="repeat(8, 1fr)"
    >
      <GridItem rowSpan={[1, 1, 6, 6]} colSpan={[8, 8, 1, 1]} pl={10} pt={10}>
        <Stack
          direction={["row", "row", "column", "column"]}
          spacing={["100px", "200px", "70px", "70px"]}
        >
          <Logo h={110} w={110} />
          <BackButton route="/" />
        </Stack>
      </GridItem>
      <GridItem rowSpan={[5, 5, 6, 6]} colSpan={[8, 8, 5, 5]}>
        <Stack w={"full"} h={"full"} align={"center"} justify={"center"}>
          <Formik
            initialValues={{ password: "" }}
            validationSchema={resetPasswordValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Stack
                spacing="5"
                w={["300px", "300px", "500px", "500px"]}
                minH={"300px"}
              >
                <Stack alignItems="left">
                  <Text
                    fontWeight={800}
                    fontSize={"44px"}
                    color={"rgba(38, 39, 37, 1)"}
                  >
                    Reset Password
                  </Text>
                </Stack>
                <Stack spacing={"5"}>
                  <Field name="password">
                    {({ field }: { field: any }) => (
                      <div>
                        <InputGroup
                          size="md"
                          mb={3}
                          color={"rgba(253, 253, 253, 0.39)"}
                        >
                          <Input
                            {...field}
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="Password"
                            color={"black"}
                            bg={"brand.white"}
                            h={"50px"}
                            pl={"55px"}
                          />
                          <InputLeftElement
                            width="4.5rem"
                            color={"brand.green"}
                            h={"50px"}
                          >
                            <img src={lock} alt="lock" height={20} width={20} />
                          </InputLeftElement>
                          <InputRightElement
                            width="4.5rem"
                            color={"brand.green"}
                            h={"60px"}
                          >
                            {show ? (
                              <VisibilityOutlinedIcon onClick={handleClick} />
                            ) : (
                              <VisibilityOffOutlinedIcon
                                onClick={handleClick}
                              />
                            )}
                          </InputRightElement>
                        </InputGroup>
                        <Box color={"red"}>
                          <ErrorMessage name="password" component="div" />
                        </Box>
                      </div>
                    )}
                  </Field>
                  <AuthButton name="RESET PASSWORD" isLoading={isLoading} />
                  <HStack justify="center" mb={["", "", "5", "5"]}>
                    <Text fontSize={"16px"} fontWeight={600}>
                      Don’t want to reset?
                      <Link to={"/login"}>
                        <Box
                          as="span"
                          color={"brand.green"}
                          fontSize={"16px"}
                          fontWeight={600}
                          ml={2}
                        >
                          Log in
                        </Box>
                      </Link>
                    </Text>
                  </HStack>
                </Stack>
              </Stack>
            </Form>
          </Formik>
        </Stack>
      </GridItem>
      <GridItem
        rowSpan={[0, 0, 6, 6]}
        colSpan={[0, 0, 2, 2]}
        py={8}
        pr={8}
        display={["none", "none", "block", "block"]}
      >
        <Image
          src={authImage}
          alt="image"
          borderRadius="12px"
          w={"100%"}
          h={"full"}
        />
      </GridItem>
    </Grid>
  );
};
