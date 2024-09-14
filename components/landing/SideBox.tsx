import { Text, Stack, Image, HStack } from "@chakra-ui/react";

export const SideBox: React.FC = () => {


    /*const facebookLink = process.env.VITE_FACEBOOK_LINK || '';
    const instagramLink = process.env.VITE_INSTAGRAM_LINK || '';
    const twitterLink = process.env.VITE_TWITTER_LINK || '';
    const linkedinLink = process.env.VITE_LINKEDIN_LINK || '';*/


    const handleSocialMediaClick = (link: string) => {
        window.open(link, "_blank");
    };

    return (
        <>
            <Stack
                w={"50%"}
                h={"31vh"}
                bg={"brand.green"}
                borderRadius={"12px"}
                align={'flex-start'}
                position={'relative'}
            >
                <Image position={'absolute'} src="ptr.png" alt="pattern" height={'auto'} width={'100%'} zIndex={1} />
                <Text
                    color={"white"}
                    fontSize={"2xl"}
                    fontWeight={"bold"}
                    mt={6}
                    p={4}
                    zIndex={4}
                >
                    FOLLOW US
                </Text>
                <Text
                    color={"white"}
                    fontSize={"lg"}
                    fontWeight={"semibold"}
                    textAlign={['center', 'left']}
                    px={4}
                    zIndex={4}
                >
                    Follow our social media to get latest updates and to know more about us.
                </Text>
                <HStack
                    align={'center'}
                    justifyContent={'center'}
                    spacing={4} mt={4} zIndex={4}>
                    <img
                        src="facebook1.svg"
                        alt="logo"
                        height={35}
                        width={35}
                        style={{
                            position: "absolute",
                            top: 160,
                            left: 52,
                            zIndex: 33,
                            cursor: "pointer",
                        }}
                        onClick={() => handleSocialMediaClick('https://www.facebook.com/profile.php?id=61557756654086&mibextid=LQQJ4d')}

                    />
                    <img
                        src="instagram1.svg"
                        alt="logo"
                        height={35}
                        width={35}
                        style={{
                            position: "absolute",
                            top: 161,
                            left: 143,
                            zIndex: 33,
                            cursor: "pointer",
                        }}
                        onClick={() => handleSocialMediaClick('https://www.instagram.com/cvfix.ai?igsh=MTJ2aGc2NjAxejk2ZA%3D%3D&utm_source=qr')}

                    />
                    <img
                        src="x1.svg"
                        alt="logo"
                        height={35}
                        width={35}
                        style={{
                            position: "absolute",
                            top: 161,
                            left: 233,
                            zIndex: 33,
                            cursor: "pointer",
                        }}
                        onClick={() => handleSocialMediaClick('https://x.com/cvfixai?t=ye369Ax_Z2BeaK5MZrDsPw&s=08')}
                    />
                    <img
                        src="lin.svg"
                        alt="logo"
                        height={35}
                        width={35}
                        color="white"
                
                        style={{
                            position: "absolute",
                            top: 161,
                            left: 323,
                            zIndex: 33,
                            cursor: "pointer",
                        }}
                        onClick={() => handleSocialMediaClick('https://www.linkedin.com/company/cvfixai')}
                    />
                </HStack>
            </Stack>
        </>
    );
};


