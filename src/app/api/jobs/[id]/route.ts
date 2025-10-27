import { supabaseAdmin } from "@/src/constants/supabaseAdmin.constant";
import verifyUser from "@/src/helpers/verifyUser.helper";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { user } = await verifyUser(req);

  const { data, error } = await supabaseAdmin
    .from("jobs")
    .select(
      `*,
      recruiter:profiles (id, company_name),
      job_type:job_types (id, name),
      city:cities (id, name),
      job_applications!left (user_id)
    `
    )
    .eq("id", id)
    .single();

  if (error)
    return NextResponse.json({ message: error.message }, { status: 500 });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { city_id, recruiter_id, job_type_id, job_applications, ...response } =
    data;

  if (!user?.id)
    return NextResponse.json(
      {
        data: { ...response, is_applied: false },
        message: "Success retrieving job",
      },
      { status: 200 }
    );

  return NextResponse.json(
    {
      data: {
        ...response,
        is_applied:
          job_applications?.some(
            (application: { user_id: string }) =>
              application.user_id === user.id
          ) ?? false,
      },
      message: "Success retrieving job",
    },
    { status: 200 }
  );
}
