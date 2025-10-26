import z from "zod";

export const TProfileInformationEnum = z.enum(["mandatory", "optional", "off"]);

export const CreateJobSchema = z
  .object({
    name: z.string().min(1, "Job name is required"),
    description: z.string().min(1, "Description is required"),
    jobTypeId: z.number("Job type is required"),
    candidateNeeded: z.number().int().min(1, "At least 1 candidate required"),
    minimumSalary: z.number().nonnegative().optional(),
    maximumSalary: z.number().nonnegative().optional(),
    cityId: z.number("Location must be selected"),
    minimumProfileInformation: z.object({
      fullName: TProfileInformationEnum,
      photoProfile: TProfileInformationEnum,
      gender: TProfileInformationEnum,
      domicile: TProfileInformationEnum,
      email: TProfileInformationEnum,
      phoneNumber: TProfileInformationEnum,
      linkedin: TProfileInformationEnum,
      dateOfBirth: TProfileInformationEnum,
    }),
  })
  .refine(
    (data) => {
      // Run salary comparison only when BOTH are provided
      if (data.minimumSalary && data.maximumSalary) {
        return data.minimumSalary <= data.maximumSalary;
      }
      return true;
    },
    {
      message: "Minimum salary must be less than or equal to maximum salary",
      path: ["minimumSalary"],
    }
  );

export type ICreateJobRequestBody = z.infer<typeof CreateJobSchema>;

export interface ICreateJobSuccessResponse {
  message: string;
  data: {
    candidates_needed: number;
    created_at: string;
    date_of_birth_setting: string;
    description: string;
    domicile_setting: string;
    email_setting: string;
    full_name_setting: string;
    gender_setting: string;
    id: string;
    job_type_id: number;
    linkedin_setting: string;
    maximum_salary: number;
    minimum_salary: number;
    name: string;
    phone_number_setting: string;
    photo_profile_setting: string;
    recruiter_id: string;
    city_id: number;
  };
}
