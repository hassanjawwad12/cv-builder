import {
  VStack,
  Text,
  Stack,
  Button,
  Image,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { CiStar } from "react-icons/ci";
import { supabaseClient } from "../../config/supabase";
import { subscribeToPlanApi } from "../../api-helper/Api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Pricing: React.FC = () => {
  const navigate = useNavigate();
  interface Plan {
    id: number;
    planId: number;
    planName: string;
    price: number;
    features: string;
    image: string;
  }

  const plans: Plan[] = [
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
  const [loading, setLoading] = useState(false);
  const selectPlan = async (planId: any) => {
    try {
      setLoading(true);
      const user = await supabaseClient.auth.getSession();
      const token = user?.data?.session?.access_token;
      if (!token) {
        navigate("/login");
        return;
      }
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
    <VStack
      width="100%"
      alignItems="center"
      bg="brand.main"
      p={2}
      px={"3%"}
      mt={20}
      id="pricing"
    >
      <Text fontSize="md" color="brand.green">
        TRUST ME!
      </Text>
      <Text
        color="brand.text"
        fontWeight="extrabold"
        fontSize={["2xl", "2xl", "5xl", "5xl"]}
      >
        Its Worth It!
      </Text>

      <Stack
        width="100%"
        justifyContent=" space-between"
        mt={10}
        direction={["column", "column", "row", "row"]}
      >
        {plans.map((plan) => (
          <VStack
            width={["100%", "100%", "23%", "23%"]}
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
              px={6}
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
                  START NOW
                </Text>
              )}
            </Button>
          </VStack>
        ))}
      </Stack>
    </VStack>
  );
};
