import { supabaseAdmin } from "@/src/constants/supabaseAdmin.constant";

export async function POST(req: Request) {
  const { email, password, role } = await req.json();

  const { data, error } = await supabaseAdmin.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        role: role,
      },
    },
  });

  if (error)
    return Response.json(
      { message: error.message, ...(error.code && { code: error.code }) },
      { status: error.status }
    );

  return Response.json(data);
}
