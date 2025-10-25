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
