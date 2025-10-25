import { supabaseAdmin } from "@/src/constants/supabaseAdmin.constant";
import { USER_ROLE } from "@/src/constants/userRole.constant";
import { ICreateJobRequestBody } from "@/src/dto/createJob.dto";

// Create job
export async function POST(req: Request) {
  const accessToken = req.headers.get("Authorization")?.split(" ")[1];
  if (!accessToken)
    return Response.json({ message: "Unauthorized" }, { status: 401 });

  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(
    accessToken
  );
  if (userError)
    return Response.json({ message: "Unauthorized" }, { status: 401 });

  const role = userData.user.user_metadata.role;
  if (role !== USER_ROLE.recruiter) {
    return Response.json(
      { error: "Forbidden: only recruiters can create jobs" },
      { status: 403 }
    );
  }

  const body: ICreateJobRequestBody = await req.json();

  const { data, error } = await supabaseAdmin
    .from("jobs")
    .insert([
      {
        name: body.name,
        recruiter_id: userData.user.id,
        description: body.description,
        job_type_id: body.jobTypeId,
        candidates_needed: body.candidateNeeded,
        minimum_salary: body.minimumSalary,
        maximum_salary: body.maximumSalary,
        full_name_setting: body.minimumProfileInformation.fullName,
        photo_profile_setting: body.minimumProfileInformation.photoProfile,
        gender_setting: body.minimumProfileInformation.gender,
        domicile_setting: body.minimumProfileInformation.domicile,
        email_setting: body.minimumProfileInformation.email,
        phone_number_setting: body.minimumProfileInformation.phoneNumber,
        linkedin_setting: body.minimumProfileInformation.linkedin,
        date_of_birth_setting: body.minimumProfileInformation.dateOfBirth,
      },
    ])
    .select("*")
    .single();

  if (error) return Response.json({ message: error.message }, { status: 500 });

  return Response.json({ message: "Successfully created new job", data });
}
