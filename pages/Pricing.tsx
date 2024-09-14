import React, { useState } from "react";
import {
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
  VStack,
  Button,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { Logo } from "../components/reusable-components/Logo";
import { BackButton } from "../components/reusable-components/BackButton";
import authImage from "../assets/images/authimage.png";
import { DashboardFooter } from "../components/dashboard/DashboardFooter";
import { CiStar } from "react-icons/ci";
import { supabaseClient } from "../config/supabase";
import { subscribeToPlanApi } from "../api-helper/Api";

export const Pricing: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  interface Plan {
    id: number;
    planId: number;
    planName: string;
    price: number;
    features: string;
    image: string;
  }

  const plans1: Plan[] = [
    {
      id: 1,
      planId: 1,
      planName: "Freemium",
      price: 0.0,
      features: "5 builds",
      image: "free.png",
    },
    {
      id: 2,
      planId: 2,
      planName: "Starters",
      price: 9.99,
      features: "300 builds",
      image: "starter.png",
    },
  ];

  const plans2: Plan[] = [
    {
      id: 3,
      planId: 3,
      planName: "Recommended",
      price: 29.99,
      features: "1000 builds",
      image: "recom.png",
    },
    {
      id: 4,
      planId: 4,
      planName: "Premium",
      price: 60.0,
      features: "unlimited builds",
      image: "premium.png",
    },
  ];
  const selectPlan = async (planId: any) => {
    try {
      setLoading(true);
      const user = await supabaseClient.auth.getSession();
      const token = user?.data?.session?.access_token;
      let success_url = `${window.location.origin}/dashboard`;
      let cancel_url = `${window.location.origin}/pricing`;
      const response = await subscribeToPlanApi(
        token,
        planId,
        success_url,
        cancel_url
      );
      const redirectLink = response?.data?.data;
      window.location.href = redirectLink;
      setLoading(false);
    } catch (error) {
      console.error("Error redirecting to stripe :", error);
      setLoading(false);
      throw error;
    }
  };
  return (
    <>
      <Grid
        h={["200vh", "200vh", "110vh", "110vh"]}
        templateRows="repeat(6, 1fr)"
        templateColumns={["auto", "auto", "auto", "repeat(9, 1fr)"]}
        mb={[10, 10, 40, 40]}
      >
        <GridItem rowSpan={[1, 1, 6, 6]} colSpan={[9, 9, 1, 1]} pl={10} pt={10}>
          <Stack
            direction={["row", "row", "column", "column"]}
            spacing={["100px", "200px", "70px", "70px"]}
          >
            <Logo h={110} w={110} />
            <BackButton route="/dashboard" />
          </Stack>
        </GridItem>
        <GridItem
          rowSpan={[5, 5, 6, 6]}
          colSpan={[9, 9, 6, 6]}
          pt={[3, 3, 20, 20]}
          px={[3, 3, 20, 20]}
        >
          <Stack w={"full"} h={"100%"} pt={[0, 0, 10, 10]} px={[0, 0, 20, 20]}>
            <Stack alignItems="left">
              <Text
                fontWeight={800}
                fontSize={"44px"}
                color={"rgba(38, 39, 37, 1)"}
              >
                Pricing
              </Text>
            </Stack>
            <Stack
              width="100%"
              mt={10}
              direction={["column", "column", "row", "row"]}
            >
              {plans1.map((plan) => (
                <VStack
                  width={["100%", "100%", "43%", "43%"]}
                  alignItems={["center", "center", "flex-start", "flex-start"]}
                  bg="brand.main"
                  p={2}
                  key={plan.id}
                >
                  <Image src={plan.image} alt={plan.image} />
                  <Text fontWeight="extrabold" fontSize="2xl" ml={["", "6"]}>
                    {plan.planName}
                  </Text>
                  <HStack
                    ml={["", "6"]}
                    fontSize="md"
                    color="brand.green"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontWeight="extrabold" fontSize="lg">
                      <CiStar />
                    </Text>
                    <Text color="brand.text">{plan.features}</Text>
                  </HStack>
                  <Text ml={["", "6"]} fontWeight="extrabold" fontSize="4xl">
                    ${plan.price.toFixed(2)}{" "}
                    <Text as="span" color="brand.green" fontSize="md">
                      /MONTH
                    </Text>
                  </Text>
                  <Button
                    variant={"solid"}
                    size="lg"
                    colorScheme={"white"}
                    bg="brand.green"
                    py={2}
                    px={10}
                    mt={4}
                    ml={["", "6"]}
                    _hover={{
                      bg: "brand.lightGreen",
                      color: "black",
                      transition: "0.5s",
                    }}
                    onClick={() => selectPlan(plan.planId)}
                  >
                    {loading ? (
                      <Spinner />
                    ) : (
                      <Text color="white" _hover={{ color: "black" }}>
                        BUY NOW
                      </Text>
                    )}
                  </Button>
                </VStack>
              ))}
            </Stack>

            <Stack
              width="100%"
              mt={10}
              direction={["column", "column", "row", "row"]}
            >
              {plans2.map((plan) => (
                <VStack
                  width={["100%", "100%", "43%", "43%"]}
                  alignItems={["center", "center", "flex-start", "flex-start"]}
                  bg="brand.main"
                  p={2}
                  key={plan.id}
                >
                  <Image src={plan.image} alt={plan.image} />
                  <Text fontWeight="extrabold" fontSize="2xl" ml={["", "6"]}>
                    {plan.planName}
                  </Text>
                  <HStack
                    ml={["", "6"]}
                    fontSize="md"
                    color="brand.green"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontWeight="extrabold" fontSize="lg">
                      <CiStar />
                    </Text>
                    <Text color="brand.text">{plan.features}</Text>
                  </HStack>
                  <Text ml={["", "6"]} fontWeight="extrabold" fontSize="4xl">
                    ${plan.price.toFixed(2)}{" "}
                    <Text as="span" color="brand.green" fontSize="md">
                      /MONTH
                    </Text>
                  </Text>
                  <Button
                    variant={"solid"}
                    size="lg"
                    colorScheme={"white"}
                    bg="brand.green"
                    py={2}
                    px={10}
                    mt={4}
                    ml={["", "6"]}
                    _hover={{
                      bg: "brand.lightGreen",
                      color: "black",
                      transition: "0.5s",
                    }}
                    onClick={() => selectPlan(plan.planId)}
                  >
                    {loading ? (
                      <Spinner />
                    ) : (
                      <Text color="white" _hover={{ color: "black" }}>
                        BUY NOW
                      </Text>
                    )}
                  </Button>
                </VStack>
              ))}
            </Stack>
          </Stack>
        </GridItem>
        <GridItem
          rowSpan={[0, 0, 6, 6]}
          colSpan={[0, 0, 0, 2]}
          display={["none", "none", "none", "block"]}
          h={"100vh"}
        >
          <Image src={authImage} alt="image" w={"100%"} h={"full"} />
        </GridItem>
      </Grid>
      <Stack w={"full"} h={"full"} mb={10} mt={40}>
        <DashboardFooter />
      </Stack>
    </>
  );
};
