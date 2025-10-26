import { supabaseAdmin } from "@/src/constants/supabaseAdmin.constant";

export async function GET() {
  const { data, error } = await supabaseAdmin.from("cities").select(`
      id,
      name,
      province:province_id (
        id,
        name
      )
    `);

  if (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }

  const domiciles = data.map((c) => {
    const province = Array.isArray(c.province) ? c.province[0] : c.province;

    return {
      province_id: province.id,
      city_id: c.id,
      name: `${c.name} - ${province.name}`,
    };
  });

  return Response.json(
    { data: domiciles, message: "Success retrieving domiciles" },
    { status: 200 }
  );
}
