import { HStack, Text, Button, Box } from "@chakra-ui/react";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { Logo } from "../reusable-components/Logo";
import { useNavigate } from "react-router-dom";

export const LandingNavbar: React.FC = () => {
  const navigate = useNavigate();
  const [navTranslation, setNavTranslation] = useState("translateX(-100%)");
  const toggleNav = () => {
    navTranslation === "translateX(-100%)"
      ? setNavTranslation("translateX(0)")
      : setNavTranslation("translateX(-100%)");
  };

  const handleScroll = (id: string) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <HStack
      width={"100%"}
      justifyContent={"space-between"}
      display={{ base: "flex", lg: "flex" }}
      flexDirection={{ base: "column", lg: "row" }}
      px={4}
      mt={4}
    >
      <HStack width={"100%"} justifyContent={"space-between"}>
        <Link to="/">
          <Logo h={110} w={110} />
        </Link>
        <Box display={{ base: "block", lg: "none" }}>
          <RxHamburgerMenu size={30} onClick={toggleNav} />
        </Box>
      </HStack>
      <HStack
        spacing={10}
        display={{ base: navTranslation === "translateX(0)" ? "flex" : "none", lg: "flex" }}
        alignItems={"center"}
        flexDirection={{ base: "column", lg: "row" }}
        position={{ base: navTranslation === "translateX(0)" ? "fixed" : "absolute", lg: "initial" }}
        left={0}
        top={0}
        gap={2}
        fontWeight={"bold"}
        zIndex={20}
        padding={{ base: 10, lg: 0 }}
        background={"brand.main"}
        shadow={{ base: "xl", lg: "none" }}
        minHeight={{ base: navTranslation === "translateX(0)" ? "100vh" : "auto", lg: "fit-content" }}
        transform={{ base: navTranslation, lg: "translateX(0)" }}
        transition={"transform 200ms linear"}
        width={{ base: "100%", lg: "auto" }}
      >
        <Box display={{ base: "block", lg: "none" }} _hover={{
          cursor: "pointer",
        }}>
          <RxHamburgerMenu size={30} onClick={toggleNav} />
        </Box>
        <Button bg={"none"} onClick={() => handleScroll("aboutid")}>
          <Text>ABOUT</Text>
        </Button>
        <Button bg={"none"} onClick={() => handleScroll("whatid")}>
          <Text>PRODUCTS</Text>
        </Button>
        <Button bg={"none"} onClick={() => handleScroll("pricing")}>
          <Text>PRICING</Text>
        </Button>
        <Button
          bg={"brand.lightGreen"}
          variant={"solid"}
          size="md"
          color="green.400"
          onClick={() => {
            navigate("/login");
          }}
          _hover={{ bg: "brand.green", color: "white", transition: "0.5s" }}
        >
          LOGIN
        </Button>
        <Button
          variant={"solid"}
          size="md"
          colorScheme={"white"}
          bg={"brand.green"}
          _hover={{ bg: "brand.lightGreen", color: "green.400", transition: "0.5s" }}
          onClick={() => {
            navigate("/signup");
          }}
        >
          SIGN UP
        </Button>
      </HStack>
    </HStack>
  );
};