import { supabaseAdmin } from "@/src/constants/supabaseAdmin.constant";
import { buildDynamicSchema } from "@/src/dto/applyJob.dto";
import verifyUser from "@/src/helpers/verifyUser.helper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await verifyUser(req);
  if (!user) return Response.json({ message: "Unauthorized" }, { status: 401 });

  const { id: jobId } = await params;

  const { data: job, error: jobError } = await supabaseAdmin
    .from("jobs")
    .select(
      `
    id,
    full_name_setting,
    photo_profile_setting,
    gender_setting,
    domicile_setting,
    email_setting,
    phone_number_setting,
    linkedin_setting,
    date_of_birth_setting
  `
    )
    .eq("id", jobId)
    .single();
  if (jobError || !job)
    return NextResponse.json({ message: "Job not found" }, { status: 404 });

  const schema = buildDynamicSchema(job);
  const fd = await req.formData();
  const photo = fd.get("photo") as File;
  const provinceId = fd.get("provinceId")?.toString();

  const payload = {
    full_name: fd.get("fullName") || undefined,
    date_of_birth: fd.get("dateOfBirth") || undefined,
    province_id: provinceId ? parseInt(provinceId) : undefined,
    email: fd.get("email") || undefined,
    phone_number: fd.get("phoneNumber") || undefined,
    linkedin: fd.get("linkedin") || undefined,
    gender: fd.get("gender") || undefined,
    photo_profile: photo.name || undefined,
  };

  const parseResult = schema.safeParse(payload);
  if (!parseResult.success) {
    return NextResponse.json(
      {
        message: "Validation failed",
        errors: parseResult.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const fileExt = photo.name.split(".").pop();
  const fileName = `${user.id}-${jobId}-${Date.now()}.${fileExt}`;
  const { error: uploadError } = await supabaseAdmin.storage
    .from("job_application_photos")
    .upload(fileName, photo, {
      contentType: photo.type,
    });
  if (uploadError)
    return NextResponse.json({ message: uploadError.message }, { status: 500 });

  const {
    data: { publicUrl },
  } = supabaseAdmin.storage
    .from("job_application_photos")
    .getPublicUrl(fileName);

  const { error: applyJobError, status } = await supabaseAdmin
    .from("job_applications")
    .insert([
      {
        user_id: user?.id,
        job_id: jobId,
        full_name: fd.get("fullName"),
        date_of_birth: fd.get("dateOfBirth"),
        province_id: fd.get("provinceId"),
        email: fd.get("email"),
        linkedin: fd.get("linkedin"),
        phone_number: fd.get("phoneNumber"),
        phone_code_id: fd.get("phoneCode"),
        photo_url: publicUrl,
      },
    ]);

  if (applyJobError)
    return NextResponse.json({ message: applyJobError.message }, { status });

  return NextResponse.json(
    { message: "Applied successfully" },
    { status: 200 }
  );
}
