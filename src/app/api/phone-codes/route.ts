import { supabaseAdmin } from "@/src/constants/supabaseAdmin.constant";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabaseAdmin.from("phone_code").select("*");

  if (error)
    return NextResponse.json({ message: error.message }, { status: 500 });

  return NextResponse.json(
    { data, message: "Success retrieving phone code" },
    { status: 200 }
  );
}
