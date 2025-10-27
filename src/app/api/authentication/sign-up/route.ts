import { supabaseAdmin } from "@/src/constants/supabaseAdmin.constant";

const siteUrl = process.env.SITE_URL;

export async function POST(req: Request) {
  const { email, password, role, fullName, companyName } = await req.json();

  const { data, error } = await supabaseAdmin.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        role,
        fullName,
        companyName,
      },
      emailRedirectTo: siteUrl,
    },
  });

  if (error)
    return Response.json(
      {
        message: error.message,
        ...(error.code && { code: error.code }),
        error,
      },
      { status: error.status }
    );

  return Response.json(data);
}
