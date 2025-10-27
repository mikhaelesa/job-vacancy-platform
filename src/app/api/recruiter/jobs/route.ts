import { supabaseAdmin } from "@/src/constants/supabaseAdmin.constant";
import { USER_ROLE } from "@/src/constants/userRole.constant";
import {
  CreateJobSchema,
  ICreateJobRequestBody,
} from "@/src/dto/createJob.dto";
import verifyUser from "@/src/helpers/verifyUser.helper";

export async function POST(req: Request) {
  const { user } = await verifyUser(req);

  if (!user) return Response.json({ message: "Unauthorized" }, { status: 401 });

  const role = user.user_metadata.role;
  if (role !== USER_ROLE.recruiter) {
    return Response.json(
      { error: "Forbidden: only recruiters can create jobs" },
      { status: 403 }
    );
  }

  const body: ICreateJobRequestBody = await req.json();
  const parseResult = CreateJobSchema.safeParse(body);
  if (!parseResult.success) {
    return Response.json(
      {
        message: "Validation failed",
        errors: parseResult.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const validData = parseResult.data;
  const { data, error } = await supabaseAdmin
    .from("jobs")
    .insert([
      {
        name: validData.name,
        recruiter_id: user.id,
        description: validData.description,
        job_type_id: validData.jobTypeId,
        city_id: validData.cityId,
        candidates_needed: validData.candidateNeeded,
        minimum_salary: validData.minimumSalary,
        maximum_salary: validData.maximumSalary,
        full_name_setting: validData.minimumProfileInformation.fullName,
        photo_profile_setting: validData.minimumProfileInformation.photoProfile,
        gender_setting: validData.minimumProfileInformation.gender,
        domicile_setting: validData.minimumProfileInformation.domicile,
        email_setting: validData.minimumProfileInformation.email,
        phone_number_setting: validData.minimumProfileInformation.phoneNumber,
        linkedin_setting: validData.minimumProfileInformation.linkedin,
        date_of_birth_setting: validData.minimumProfileInformation.dateOfBirth,
      },
    ])
    .select("*")
    .single();

  if (error) return Response.json({ message: error.message }, { status: 500 });
  return Response.json({ message: "Successfully created new job", data });
}

export async function GET(req: Request) {
  const { user } = await verifyUser(req);
  if (!user) return Response.json({ message: "Unauthorized" }, { status: 401 });

  const recruiterId = user.id;
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.trim() ?? "";

  let query = supabaseAdmin
    .from("jobs")
    .select("*")
    .eq("recruiter_id", recruiterId)
    .order("created_at", { ascending: false });

  if (search) query = query.or(`name.ilike.%${search}%`);
  const { data, error } = await query;

  if (error) return Response.json({ message: error.message }, { status: 500 });
  return Response.json({ message: "Success retrieving jobs", data });
}
