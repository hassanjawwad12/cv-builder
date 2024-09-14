import React from "react";
import { Text, VStack, HStack } from "@chakra-ui/react";
import { Logo } from "../reusable-components/Logo";
import facebook from "../../assets/images/facebook.png";
import linkedin from "../../assets/images/linkedin.png";
import twitter from "../../assets/images/twitter.png";
import instagram from "../../assets/images/instagram.png";
export const DashboardFooter: React.FC = () => {

  
/*const facebookLink = process.env.VITE_FACEBOOK_LINK || '';
const instagramLink = process.env.VITE_INSTAGRAM_LINK || '';
const twitterLink = process.env.VITE_TWITTER_LINK || '';
const linkedinLink = process.env.VITE_LINKEDIN_LINK || '';*/


  const handleSocialMediaClick = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <>
      <VStack w={"full"} h={"full"} px={3} gap={8}>
        <Logo h={150} w={150} />
        <Text>
          Follow Our Social Media To Get Latest Updates And To Know More About
          Us.
        </Text>
        <HStack gap={10}>
          <img
            src={facebook}
            alt="logo"
            height={30}
            width={30}
            style={{
              cursor: "pointer",
            }}
            onClick={() => handleSocialMediaClick('https://www.facebook.com/profile.php?id=61557756654086&mibextid=LQQJ4d')}

          />
          <img
            src={instagram}
            alt="logo"
            height={30}
            width={30}
            style={{
              cursor: "pointer",
            }}
            onClick={() => handleSocialMediaClick('https://www.instagram.com/cvfix.ai?igsh=MTJ2aGc2NjAxejk2ZA%3D%3D&utm_source=qr')}
          />
          <img
            src={twitter}
            alt="logo"
            height={30}
            width={30}
            style={{
              cursor: "pointer",
            }}
            onClick={() => handleSocialMediaClick('https://x.com/cvfixai?t=ye369Ax_Z2BeaK5MZrDsPw&s=08')}
          />
          <img src={linkedin} alt="logo" height={30} width={30}
            style={{
              cursor: "pointer",
            }}
            onClick={() => handleSocialMediaClick('https://www.linkedin.com/company/cvfixai')}
          />
        </HStack>
      </VStack>
    </>
  );
};
