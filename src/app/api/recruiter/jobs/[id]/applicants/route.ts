import { supabaseAdmin } from "@/src/constants/supabaseAdmin.constant";
import { USER_ROLE } from "@/src/constants/userRole.constant";
import verifyUser from "@/src/helpers/verifyUser.helper";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await verifyUser(req);
  const { id } = await params;
  if (!user || user.user_metadata.role !== USER_ROLE.recruiter)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { data, error, status } = await supabaseAdmin
    .from("job_applications")
    .select(
      `*,
        province:provinces(id, name)
      `
    )
    .eq("job_id", id);
  if (error) return NextResponse.json({ message: error.message }, { status });

  return NextResponse.json(
    { data, message: "Success retrieving applicants" },
    { status: 200 }
  );
}
