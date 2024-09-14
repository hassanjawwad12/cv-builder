import { Stack } from "@chakra-ui/react";
import { DashboardFooter } from "../components/dashboard/DashboardFooter";
import { DashboardNavbar } from "../components/navbars/DashboardNavbar";
import { BackOption } from "../components/profile/BackOptions";
import { Middle } from "../components/profile/Middles";
import Setting from "../components/profile/Settings";
import { getCustomerDataApi } from "../api-helper/UserApis";
import { useEffect, useState } from "react";
import { supabaseClient } from "../config/supabase";
import { useSelector } from "react-redux";

export const Profile: React.FC = () => {
  const [customerData, setCustomerData] = useState<any>({});
  const customer = useSelector((state: any) => state.user?.data?.user_metadata);
  const getCustomerData = async () => {
    try {
      const user = await supabaseClient.auth.getSession();
      const token = user?.data?.session?.access_token;
      const response = await getCustomerDataApi(token);
      if (response) {
        setCustomerData(response.data.data);
      } else {
        console.log("No data in getSingleChat response");
      }
    } catch (error) {
      console.error("Error fetching single chat:", error);
    }
  };
  useEffect(() => {
    getCustomerData();
  }, []);
  return (
    <Stack
      width={"100%"}
      direction={"column"}
      h={["280vh", "280vh", "160vh", "150vh"]}
    >
      <DashboardNavbar  />

      <Stack
        width="100%"
        justifyContent=" space-between"
        mt={10}
        direction={["column", "column", "row", "row"]}
        py={2}
      >
        <BackOption />

        <Middle user={customer} customer={customerData} />
        <Setting/>
        
      </Stack>
      <DashboardFooter />
    </Stack>
  );
};
