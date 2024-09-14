import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error(
    "Error: SUPABASE_URL and SUPABASE_KEY are required in the environment variables."
  );
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
export default supabase;
