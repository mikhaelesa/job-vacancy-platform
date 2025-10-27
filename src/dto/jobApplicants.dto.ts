export interface IJobApplicantsSuccessResponse {
  data: {
    id: string;
    gender: string | null;
    created_at: string;
    job_id: string;
    user_id: string;
    updated_at: null;
    full_name: string | null;
    date_of_birth: string | null;
    province_id: number | null;
    email: string | null;
    linkedin: string | null;
    phone_code_id: number | null;
    phone_number: string | null;
    photo_url: string | null;
    province: {
      id: number;
      name: string;
    } | null;
  }[];
}
