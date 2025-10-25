import apiClient from "@/src/api/client";
import { ICreateJobRequestBody } from "@/src/dto/createJob.dto";

export const createJobService = (data: ICreateJobRequestBody) => {
  return apiClient.request(
    {
      data,
      method: "POST",
      url: "/api/recruiter/jobs",
    },
    true
  );
};
