export type TProfileInformation = "mandatory" | "optional" | "off";

export interface ICreateJobRequestBody {
  name: string;
  jobTypeId: number;
  description: string;
  candidateNeeded: number;
  minimumSalary: number;
  maximumSalary: number;
  minimumProfileInformation: {
    fullName?: TProfileInformation;
    photoProfile?: TProfileInformation;
    gender?: TProfileInformation;
    domicile?: TProfileInformation;
    email?: TProfileInformation;
    phoneNumber?: TProfileInformation;
    linkedin?: TProfileInformation;
    dateOfBirth?: TProfileInformation;
  };
}

export interface ICreateJobSuccessResponse {
  message: string;
  data: {
    candidates_needed: number;
    created_at: string;
    date_of_birth_setting: TProfileInformation;
    description: string;
    domicile_setting: TProfileInformation;
    email_setting: TProfileInformation;
    full_name_setting: TProfileInformation;
    gender_setting: TProfileInformation;
    id: string;
    job_type_id: number;
    linkedin_setting: TProfileInformation;
    maximum_salary: number;
    minimum_salary: number;
    name: string;
    phone_number_setting: TProfileInformation;
    photo_profile_setting: TProfileInformation;
    recruiter_id: string;
  };
}
