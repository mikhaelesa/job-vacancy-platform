export interface IRecruiterJobsSuccessResponse {
  message: string;
  data: {
    id: string;
    created_at: string;
    recruiter_id: string;
    name: string;
    description: string;
    job_type_id: number;
    candidates_needed: number;
    minimum_salary: number;
    status: string;
    maximum_salary: number;
    full_name_setting: string;
    photo_profile_setting: string;
    gender_setting: string;
    domicile_setting: string;
    email_setting: string;
    phone_number_setting: string;
    linkedin_setting: string;
    date_of_birth_setting: string;
  }[];
}

export interface IRecruiterJobsSearchParams {
  search?: string;
}
