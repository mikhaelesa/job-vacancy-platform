import apiClient from "@/src/api/client";
import { IJobApplicantsSuccessResponse } from "@/src/dto/jobApplicants.dto";

export const getJobApplicantsService = <T = IJobApplicantsSuccessResponse>(
  id: string
) => {
  return apiClient.request<T, unknown>(
    {
      method: "GET",
      url: `/api/recruiter/jobs/${id}/applicants`,
    },
    true
  );
};
