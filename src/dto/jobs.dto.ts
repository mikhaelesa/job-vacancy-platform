export interface IJobsSuccessResponse {
  data: {
    id: string;
    created_at: string;
    recruiter_id: string;
    name: string;
    description: string;
    job_type_id: number;
    job_type: {
      id: number;
      name: string;
    };
    city: {
      id: number;
      name: string;
    };
    candidates_needed: number;
    minimum_salary: number;
    maximum_salary: number;
    full_name_setting: string;
    photo_profile_setting: string;
    gender_setting: string;
    domicile_setting: string;
    email_setting: string;
    phone_number_setting: string;
    linkedin_setting: string;
    date_of_birth_setting: string;
    status: string;
    recruiter: {
      id: string;
      company_name: string;
    };
  }[];
  message: string;
}
