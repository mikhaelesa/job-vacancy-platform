import { supabaseAdmin } from "../constants/supabaseAdmin.constant";

export async function verifyUser(req: Request) {
  const accessToken = req.headers.get("Authorization")?.split(" ")[1];
  if (!accessToken) {
    return { user: null, error: "Unauthorized" };
  }

  const { data, error } = await supabaseAdmin.auth.getUser(accessToken);
  if (error || !data?.user) {
    return { user: null, error: "Unauthorized" };
  }

  return { user: data.user, error: null };
}

export default verifyUser;
