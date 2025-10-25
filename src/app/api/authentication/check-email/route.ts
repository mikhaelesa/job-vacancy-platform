import { supabaseAdmin } from "@/src/constants/supabaseAdmin.constant";

export async function POST(req: Request) {
  const { email } = await req.json();

  const { data, error } = await supabaseAdmin.rpc("get_user_by_email", {
    email_arg: email,
  });

  if (error) return Response.json({ message: error.message }, { status: 500 });

  const user = data?.[0];
  return Response.json({
    exists: !!user,
    confirmed: !!user?.email_confirmed_at,
  });
}
