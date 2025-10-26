import { supabaseAdmin } from "@/src/constants/supabaseAdmin.constant";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("jobs")
    .select(
      `
    *,
    recruiter:profiles (
      id,
      company_name
    ),
    job_type:job_types (
      id,
      name
    ),
    city:cities (
      id,
      name
    )
  `
    )
    .order("created_at", { ascending: false });

  if (error)
    return Response.json({ message: error.message, error }, { status: 500 });

  return Response.json({
    message: "Success retrieving jobs",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data: data.map(({ job_type_id, recruiter_id, city_id, ...rest }) => rest),
  });
}
