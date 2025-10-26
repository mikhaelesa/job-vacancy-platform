import { supabaseAdmin } from "@/src/constants/supabaseAdmin.constant";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("jobs")
    .select(
      `*,
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
    )`
    )
    .eq("id", id)
    .single();

  if (error)
    return NextResponse.json({ message: error.message }, { status: 500 });

  const { city_id, recruiter_id, job_type_id, ...response } = data;

  return NextResponse.json(
    { data: response, message: "Success retrieving job" },
    { status: 200 }
  );
}
