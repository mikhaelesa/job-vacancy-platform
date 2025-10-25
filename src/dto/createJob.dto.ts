export interface ICreateJobRequestBody {
  name: string;
  jobTypeId: number;
  description: string;
  candidateNeeded: number;
  minimumSalary: number;
  maximumSalary: number;
  minimumProfileInformation: {
    fullName?: "mandatory" | "optional" | "off";
    photoProfile?: "mandatory" | "optional" | "off";
    gender?: "mandatory" | "optional" | "off";
    domicile?: "mandatory" | "optional" | "off";
    email?: "mandatory" | "optional" | "off";
    phoneNumber?: "mandatory" | "optional" | "off";
    linkedin?: "mandatory" | "optional" | "off";
    dateOfBirth?: "mandatory" | "optional" | "off";
  };
}
