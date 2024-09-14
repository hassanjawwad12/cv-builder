import supabase from "../Model/supabase.js";
export const getAllResumeTemplateService = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("history")
      .select("*")
      .eq("user_id", userId);

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

export const getSingleResumeTemplateService = async (id) => {
  try {
    const { data, error } = await supabase
      .from("history")
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
