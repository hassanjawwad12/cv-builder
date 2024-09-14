import supabase from "../Model/supabase.js";

export const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Kindly provide token" });
    }
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id, email, app_metadata, user_metadata } = data?.user;
    req.user = {
      id,
      email,
      provider: app_metadata?.provider || null,
      user_metadata: user_metadata || {},
    };

    next();
  } catch (error) {
    console.error("Error extracting user UUID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
