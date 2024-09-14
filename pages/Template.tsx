import React, { useState } from "react";
import { Grid, GridItem, Image, Stack } from "@chakra-ui/react";
import { Logo } from "../components/reusable-components/Logo";
import { BackButton } from "../components/reusable-components/BackButton";
import templateimage from "../assets/images/templateimage.png";
import { TemplateInputGroup } from "../components/template/TemplateInputGroup";
import { DashboardFooter } from "../components/dashboard/DashboardFooter";
import { CraftResume } from "../components/modals/CraftResume";
export const Template: React.FC = () => {
  const [isExamCreated, setIsExamCreated] = useState(false);

  return (
    <>
      {isExamCreated ? (
        <CraftResume
          title="Creating Your Resume Template"
          description1="Your Resume Template is Being Crafted. Sit Tight for a Detailed Insight"
          description2="We will shortly redirect you to your ATS friendly resume template"
        />
      ) : (
        <>
          <Grid
            h={"auto"}
            templateRows="repeat(12, 1fr)"
            templateColumns="repeat(8, 1fr)"
          >
            <GridItem rowSpan={[1, 1, 10, 10]} colSpan={[8, 8, 1, 1]} p={10}>
              <Stack
                direction={["row", "row", "column", "column"]}
                spacing={["100px", "200px", "70px", "70px"]}
              >
                <Logo h={110} w={110} />
                <BackButton route="/dashboard" />
              </Stack>
            </GridItem>
            <GridItem
              rowSpan={[11, 11, 11, 11]}
              colSpan={[8, 8, 5, 5]}
              pt={[0, 0, 30, 40]}
              px={[20, 20, 30, 40]}
            >
              <TemplateInputGroup setIsExamCreated={setIsExamCreated} />
            </GridItem>
            <GridItem
              rowSpan={[0, 0, 11, 11]}
              colSpan={[0, 0, 2, 2]}
              py={8}
              pr={8}
              display={["none", "none", "none", "block"]}
            >
              <Image
                src={templateimage}
                alt="image"
                borderRadius="12px"
                w={"100%"}
                h={"100vh"}
              />
            </GridItem>
          </Grid>
          <Stack w={"full"} h={"full"} mt={[30, 20, 20, 2]} mb={5}>
            <DashboardFooter />
          </Stack>
        </>
      )}
    </>
  );
};
