import { supabaseAdmin } from "@/src/constants/supabaseAdmin.constant";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const accessToken = req.headers.get("Authorization")?.split(" ")[1];
  if (!accessToken)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(
    accessToken
  );
  if (userError || !userData?.user)
    return Response.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await supabaseAdmin.from("job_applications").insert([
    {
      user_id: userData.user.id,
      job_id: id,
    },
  ]);

  return NextResponse.json(
    { message: "Applied successfully" },
    { status: 200 }
  );
}
