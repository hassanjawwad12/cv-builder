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
  Select,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import msgbox from "../assets/images/msgbox.png";
import lock from "../assets/images/lock.png";
import { AuthButton } from "../components/buttons/AuthButtons";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { authValidationSchema } from "../shared/Validations";
import authImage from "../assets/images/authimage.png";
import { Logo } from "../components/reusable-components/Logo";
import name from "../assets/images/name.png";
import industry from "../assets/images/industry.png";
import phone from "../assets/images/phone.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BackButton } from "../components/reusable-components/BackButton";
import { countryCodes } from "../shared/Constants";

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClick = () => setShow(!show);
  const [countryCode, setCountryCode] = useState<string>("+1");

  const handleCountryCodeChange = (e: any) => {
    setCountryCode(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    const { data, error } = await supabaseClient.auth.signUp({
      email: values.email,
      password: values.password,
      phone: `${countryCode}${values.phone}`,
      options: {
        data: {
          phone: `${countryCode}${values.phone}`,
          full_name: values.name,
          industry: values.industry ? values.industry : "other",
          avatar_url:
            "https://pirhnotjbjjypuctvsmm.supabase.co/storage/v1/object/public/avatar/user.jpeg?t=2024-03-20T01%3A05%3A30.668Z",
        },
      },
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
      if (data?.user?.id) {
        toast({
          title: "Success",
          description: "Check your email for the confirmation link",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        navigate("/login");
        setIsLoading(false);
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setIsLoading(false);
      }
      //const id = data?.user?.id;

      // const base_url = import.meta.env.VITE_BACKEND_URL;
      // await axios.post(`${base_url}api/user/create`, {
      //   id,
      //   ...values,
      // });
    }
  };

  const getCountryFlag = (code: string) => {
    const countryObj = Object.values(countryCodes).find(
      (item: { code: string }) => item.code === code
    );
    return countryObj?.flag;
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
      <GridItem rowSpan={[5, 5, 6, 6]} colSpan={[8, 8, 5, 5]} pt={20}>
        <Stack w={"full"} h={"100%"} align={"center"} justify={"center"}>
          <Formik
            initialValues={{
              name: "",
              phone: "",
              email: "",
              password: "",
              industry: "",
            }}
            validationSchema={authValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Stack
                spacing="1"
                w={["300px", "300px", "500px", "500px"]}
                minH={"400px"}
              >
                <Stack alignItems="left">
                  <Text
                    fontWeight={800}
                    fontSize={"44px"}
                    color={"rgba(38, 39, 37, 1)"}
                  >
                    Sign Up
                  </Text>
                </Stack>
                <Stack spacing={"1"}>
                  <Field name="name">
                    {({ field }: { field: any }) => (
                      <div>
                        <InputGroup
                          size="md"
                          mb={1}
                          color={"rgba(253, 253, 253, 0.39)"}
                        >
                          <Input
                            {...field}
                            id="name"
                            type="text"
                            placeholder="Name"
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
                            <img src={name} alt="msg" height={20} width={20} />
                          </InputLeftElement>
                        </InputGroup>
                        <Box color={"red"}>
                          <ErrorMessage name="name" component="div" />
                        </Box>
                      </div>
                    )}
                  </Field>
                  <Field name="email">
                    {({ field }: { field: any }) => (
                      <div>
                        <InputGroup
                          size="md"
                          mb={1}
                          color={"rgba(253, 253, 253, 0.39)"}
                        >
                          <Input
                            {...field}
                            id="email"
                            type="email"
                            placeholder="Email"
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
                            <img
                              src={msgbox}
                              alt="msg"
                              height={20}
                              width={20}
                            />
                          </InputLeftElement>
                        </InputGroup>
                        <Box color={"red"}>
                          <ErrorMessage name="email" component="div" />
                        </Box>
                      </div>
                    )}
                  </Field>
                  <Stack
                    justifyContent={"space-between"}
                    direction={"row"}
                    w={"100%"}
                  >
                    <Field name="code">
                      {({ field }: { field: any }) => (
                        <div style={{ width: "30%" }}>
                          <InputGroup
                            size="xl"
                            mb={1}
                            width={"100%"}
                            color={"rgba(253, 253, 253, 0.39)"}
                          >
                            <Select
                              {...field}
                              id="code"
                              color={"rgba(0, 0, 0, 0.6)"}
                              bg={"brand.white"}
                              h={"50px"}
                              pl={"60px"}
                              _focus={{
                                boxShadow: "none",
                                borderColor: "transparent",
                              }}
                              onChange={handleCountryCodeChange}
                              value={countryCode}
                            >
                              {Object.entries(countryCodes).map(
                                ([code, country]) => (
                                  <option
                                    key={code}
                                    value={country?.code}
                                  >{`${code+" "+country?.code}`}</option>
                                )
                              )}
                            </Select>
                            <InputLeftElement
                              width="4.5rem"
                              color={"brand.green"}
                              bg={"brand.white"}
                              borderLeftRadius={"6px"}
                              h={"49px"}
                            >
                              <img
                                src={getCountryFlag(countryCode)}
                                alt="msg"
                                height={20}
                                width={20}
                              />
                            </InputLeftElement>
                          </InputGroup>
                          <Box color={"red"}>
                            <ErrorMessage name="code" component="div" />
                          </Box>
                        </div>
                      )}
                    </Field>
                    <Field name="phone">
                      {({ field }: { field: any }) => (
                        <div style={{ width: "68%" }}>
                          <InputGroup
                            color={"rgba(253, 253, 253, 0.39)"}
                            size="md"
                            mb={1}
                          >
                            <Input
                              {...field}
                              id="phone"
                              type="number"
                              placeholder="Phone Number"
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
                              <img
                                src={phone}
                                alt="msg"
                                height={20}
                                width={20}
                              />
                            </InputLeftElement>
                          </InputGroup>
                          <Box color={"red"}>
                            <ErrorMessage name="phone" component="div" />
                          </Box>
                        </div>
                      )}
                    </Field>
                  </Stack>
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
                            h={"50px"}
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
                  <Field name="industry">
                    {({ field }: { field: any }) => (
                      <div>
                        <InputGroup
                          size="md"
                          mb={3}
                          color={"rgba(253, 253, 253, 0.39)"}
                        >
                          <Select
                            {...field}
                            id="industry"
                            placeholder="Industry"
                            color={"rgba(0, 0, 0, 0.6)"}
                            bg={"brand.white"}
                            h={"50px"}
                            pl={"55px"}
                            _focus={{
                              boxShadow: "none",
                              borderColor: "transparent",
                            }}
                          >
                            <option value="Education">Education</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Technology">Technology</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Finance">Finance</option>
                            <option value="Retail">Retail</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Hospitality">Hospitality</option>
                            <option value="Transportation">
                              Transportation
                            </option>
                            <option value="Media">Media</option>
                            <option value="other">other</option>
                          </Select>
                          <InputLeftElement
                            width="4.5rem"
                            color={"brand.green"}
                            bg={"brand.white"}
                            borderLeftRadius={"6px"}
                            h={"50px"}
                          >
                            <img
                              src={industry}
                              alt="msg"
                              height={20}
                              width={20}
                            />
                          </InputLeftElement>
                        </InputGroup>
                        <Box color={"red"}>
                          <ErrorMessage name="industry" component="div" />
                        </Box>
                      </div>
                    )}
                  </Field>
                  <AuthButton name="SIGN UP" isLoading={isLoading} />
                  <HStack justify="center" mb={["", "", "5", "5"]} mt={5}>
                    <Text fontSize={"16px"} fontWeight={600}>
                      Already have an account?{" "}
                      <Link to="/login">
                        <Box
                          as="span"
                          color={"brand.green"}
                          fontSize={"16px"}
                          fontWeight={600}
                        >
                          Login
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
