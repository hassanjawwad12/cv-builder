import { useState } from "react";
import { supabaseClient } from "../config/supabase";
import { getCustomerBuilds } from "../api-helper/UserApis";
const useBuildsCounts = () => {
  const [builds, setBuilds] = useState(0);
  const [error, setError] = useState(null);

  const fetchBuildCounts = async () => {
    try {
      let response;
      const user = await supabaseClient.auth.getSession();
      const token = user?.data?.session?.access_token;
      if (token) {
        const response = await getCustomerBuilds(token);
        setBuilds(response?.data?.data?.builds_limit);
      }

      if (!response) {
        throw new Error("Failed to fetch builds counts");
      }
    } catch (error: any) {
      setError(error);
    }
  };

  return {
    builds,
    fetchBuildCounts,
    error,
  };
};

export default useBuildsCounts;
