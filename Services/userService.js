import supabase from "../Model/supabase.js";
export const getCustomer = async (id) => {
  console.log(id);
  try {
    const { data, error } = await supabase
      .from("customer")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
    return {
      data: data,
      error: false,
      status: 200,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
      status: 500,
      err: error,
    };
  }
};

export const getCustomerBuilds = async (id) => {
  console.log(id);
  try {
    const { data, error } = await supabase
      .from("customer")
      .select("builds_limit")
      .eq("id", id)
      .single();

    if (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
    return {
      data: data,
      error: false,
      status: 200,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
      status: 500,
      err: error,
    };
  }
};