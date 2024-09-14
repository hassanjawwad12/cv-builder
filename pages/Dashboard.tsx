import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { ResumeBuilder } from "../components/dashboard/ResumeBuilder";
import { DashboardNavbar } from "../components/navbars/DashboardNavbar";
import { UpgradePlan } from "../components/dashboard/Upgrade";
import { DashboardFooter } from "../components/dashboard/DashboardFooter";
import { ResumeTemplates } from "../components/dashboard/ResumeTemplates";

export const Dashboard: React.FC = () => {
  return (
    <Grid
      h={["280vh", "280vh", "200vh", "200vh"]}
      templateRows="repeat(13, 1fr)"
      templateColumns="repeat(2, 1fr)"
      gap={4}
    >
      <GridItem rowSpan={1} colSpan={2}>
        <DashboardNavbar />
      </GridItem>
      <GridItem rowSpan={3} colSpan={2}>
        <ResumeTemplates />
      </GridItem>
      <GridItem rowSpan={3} colSpan={2}>
        <ResumeBuilder />
      </GridItem>
      <GridItem rowSpan={3} colSpan={2}>
        <UpgradePlan />
      </GridItem>
      <GridItem rowSpan={3} colSpan={2} py={20}>
        <DashboardFooter />
      </GridItem>
    </Grid>
  );
};
