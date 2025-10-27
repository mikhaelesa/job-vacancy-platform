import { supabaseAdmin } from "@/src/constants/supabaseAdmin.constant";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await req.json();
  const { id } = await params;

  const { error, status } = await supabaseAdmin
    .from("jobs")
    .update({ status: body.status })
    .eq("id", id)
    .select();

  if (error) return NextResponse.json({ message: error.message }, { status });

  return NextResponse.json({ message: "Status updated" }, { status: 200 });
}
