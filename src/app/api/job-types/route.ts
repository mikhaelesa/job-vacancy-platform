import { supabaseAdmin } from "@/src/constants/supabaseAdmin.constant";

export async function GET() {
  const { data: job_types, error } = await supabaseAdmin
    .from("job_types")
    .select("*");

  if (error) return Response.json({ message: error.message }, { status: 500 });

  return Response.json({
    data: job_types,
    message: "Success retrieving job types",
  });
}
